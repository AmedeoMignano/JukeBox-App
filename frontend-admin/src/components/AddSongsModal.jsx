import React, { useEffect, useMemo, useState } from "react";
import { getAllSongs } from "../services/songService";
import { addSongToRepertory } from "../services/eventservice";
import Spinner from "./Spinner";

const AddSongsModal = ({
  eventId,
  closeModal,
  currentRepertory,
  onUpdateRepertory,
}) => {
  const [songs, setSongs] = useState([]);
  const [searchSong, setSearchSong] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentSongIds = useMemo(() => {
    return new Set(currentRepertory.map((song) => song.id));
  }, [currentRepertory]);

  const fetchSongs = async () => {
    try {
      const response = await getAllSongs();
      setSongs(response);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const availableSongs = useMemo(() => {
    return songs
      .filter((song) => !currentSongIds.has(song.id))
      .filter(
        (song) =>
          song.title.toLowerCase().includes(searchSong.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchSong.toLowerCase())
      );
  }, [songs, currentSongIds, searchSong]);

  const toggleSong = (song) => {
    if (selectedSongs.some((s) => s.id === song.id)) {
      setSelectedSongs(selectedSongs.filter((s) => s.id !== song.id));
    } else {
      setSelectedSongs([...selectedSongs, song]);
    }
  };

  const handleAddSongs = async () => {
    if (selectedSongs.length === 0) {
      alert("Seleziona almeno un brano da aggiungere");
      return;
    }

    try {
      const songsIdsToAdd = selectedSongs.map((s) => s.id);
      const response = await addSongToRepertory(eventId, songsIdsToAdd);
      console.log(response);
      onUpdateRepertory();
      closeModal();
    } catch (err) {
      setError(err);
      alert(err.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg relative">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Aggiungi Brani al Repertorio
        </h2>

        <input
          type="text"
          placeholder="Cerca canzone (Titolo o Artista)..."
          className="w-full border p-2 rounded mb-2"
          value={searchSong}
          onChange={(e) => setSearchSong(e.target.value)}
        />

        <div className="max-h-64 overflow-y-auto border rounded p-2 mb-4">
          {availableSongs.length > 0 ? (
            availableSongs.map((song) => {
              const isSelected = selectedSongs.some((s) => s.id === song.id);
              return (
                <div
                  key={song.id}
                  className={`cursor-pointer p-2 rounded flex justify-between items-center ${
                    isSelected ? "bg-red-200 font-bold" : "hover:bg-gray-100"
                  }`}
                  onClick={() => toggleSong(song)}
                >
                  {song.artist} - {song.title}
                  {isSelected && (
                    <span className="text-red-700">Selezionato</span>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 italic">
              {searchSong
                ? "Nessun brano trovato."
                : "Tutti i brani disponibili sono già nel repertorio."}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          <p className="font-medium">Selezionati ({selectedSongs.length}):</p>
          {selectedSongs.map((song) => (
            <span
              key={song.id}
              className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm"
            >
              {song.title}
            </span>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={closeModal}
            className="bg-gray-300 px-4 py-2 rounded-xl hover:bg-gray-400 cursor-pointer"
          >
            Annulla
          </button>
          <button
            onClick={handleAddSongs}
            disabled={selectedSongs.length === 0}
            className={`px-4 py-2 rounded-xl cursor-pointer ${
              selectedSongs.length > 0
                ? "bg-red-700 text-white hover:bg-red-800"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            Aggiungi ({selectedSongs.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSongsModal;
