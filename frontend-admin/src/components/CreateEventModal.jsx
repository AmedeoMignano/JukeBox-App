import React, { useState, useEffect } from "react";
import { createEvent } from "../services/eventservice";
import { getAllSongs } from "../services/songService";

const CreateEventModal = ({ closeModal, onEventCreated }) => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [searchSong, setSearchSong] = useState("");
  const [form, setForm] = useState({
    name: "",
    location: "",
    date: "",
    active: false,
  });

  const fetchSongs = async () => {
    try {
      const response = await getAllSongs();
      setSongs(response);
    } catch (err) {
      err.message;
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  useEffect(() => {
    if (searchSong) {
      setFilteredSongs(
        songs.filter((s) =>
          s.title.toLowerCase().includes(searchSong.toLowerCase())
        )
      );
    } else {
      setFilteredSongs([]);
    }
  }, [searchSong, songs]);

  const handleCreate = async () => {
    try {
      await createEvent({
        ...form,
        songsId: selectedSongs.map((s) => s.id),
      });
      onEventCreated();
      closeModal();
    } catch (err) {
      console.error("Errore creazione evento:", err);
    }
  };

  const toggleSong = (song) => {
    if (selectedSongs.some((s) => s.id === song.id)) {
      setSelectedSongs(selectedSongs.filter((s) => s.id !== song.id));
    } else {
      setSelectedSongs([...selectedSongs, song]);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg relative">
        <h2 className="text-2xl font-semibold text-center mb-4">Crea Evento</h2>

        <input
          type="text"
          placeholder="Nome evento"
          className="w-full border p-2 rounded mb-2"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full border p-2 rounded mb-2"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          type="date"
          className="w-full border p-2 rounded mb-2"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <label className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Imposta come attivo
        </label>

        <input
          type="text"
          placeholder="Cerca canzone..."
          className="w-full border p-2 rounded mb-2"
          value={searchSong}
          onChange={(e) => setSearchSong(e.target.value)}
        />

        {filteredSongs.length > 0 && (
          <div className="max-h-32 overflow-y-auto border rounded p-2 mb-2">
            {filteredSongs.map((song) => (
              <div
                key={song.id}
                className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                onClick={() => toggleSong(song)}
              >
                {song.artist} - {song.title}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1 mb-3">
          {selectedSongs.map((song) => (
            <span
              key={song.id}
              className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm"
            >
              {song.title}
            </span>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={closeModal}
            className="bg-gray-300 px-4 py-2 rounded-xl cursor-pointer"
          >
            Annulla
          </button>
          <button
            onClick={handleCreate}
            className="bg-red-700 text-white px-4 py-2 rounded-xl cursor-pointer"
          >
            Crea
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;
