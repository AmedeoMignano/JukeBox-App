import React, { useEffect, useState } from "react";
import { deleteSong, getAllSongs } from "../services/songService";
import Spinner from "./Spinner";
import { Pencil, Trash } from "react-bootstrap-icons";
import CreateSongModal from "./CreateSongModal";
import UpdateSongModal from "./UpdateSongModal";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateSongModalOpen, setCreateAddSongModalOpen] = useState(false);
  const [songToEdit, setSongToEdit] = useState(null);

  const fetchSongs = async () => {
    try {
      const response = await getAllSongs();
      //   console.log(response);
      setSongs(response);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSong = async (id, songTitle) => {
    if (!window.confirm(`Sei sicuro di voler eliminare ${songTitle}?`)) return;
    try {
      await deleteSong(id);
      await fetchSongs();
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchSongs();
  }, []);

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );
  const handleEditSong = (song) => {
    setSongToEdit(song);
  };

  const closeUpModal = () => {
    setSongToEdit(null);
  };

  if (isLoading)
    return (
      <div className="flex mt-10 justify-center">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="flex mt-10 justify-center">
        <p className="text-red-700 text-center">{error}</p>
      </div>
    );
  return (
    <div className="p-10 min-h-screen bg-gray-100">
      <h1 className="text-center mb-5 text-2xl text-red-700">Lista Canzoni</h1>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Cerca canzone per nome o artista"
          className="border p-2 rounded-xl w-30 sm:w-1/3 lg:w-1/2 shadow-sm bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-red-700 text-white px-4 py-2 rounded-xl shadow hover:bg-red-800 cursor-pointer"
          onClick={() => setCreateAddSongModalOpen(true)}
        >
          + Aggiungi
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6 mt-10 max-w-4xl mx-auto">
        <ul className="divide-y divide-gray-300">
          {filteredSongs.map((song) => (
            <li key={song.id} className="pb-5 pt-3">
              <p className="font-medium">
                Titolo: <span className="text-red-700">{song.title}</span>
              </p>
              <p className="font-medium">
                Artista: <span className="text-red-700">{song.artist}</span>
              </p>
              <p className="font-medium">
                Categoria: <span className="text-red-700">{song.category}</span>
              </p>
              <div className="flex justify-between">
                <button
                  className="flex items-center text-white bg-red-700 rounded p-1 mt-2 cursor-pointer hover:bg-red-800"
                  onClick={() => handleDeleteSong(song.id, song.title)}
                >
                  Elimina <Trash className=" ms-2" />
                </button>
                <button
                  className="flex items-center text-white bg-blue-600 rounded p-1 mt-2 cursor-pointer hover:bg-blue-700"
                  onClick={() => handleEditSong(song)}
                >
                  Modifica <Pencil className=" ms-2" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isCreateSongModalOpen && (
        <CreateSongModal
          closeModal={() => setCreateAddSongModalOpen(false)}
          onCreatedSong={fetchSongs}
        />
      )}

      {songToEdit && (
        <UpdateSongModal
          closeModal={closeUpModal}
          onSongUpdated={fetchSongs}
          songToUpdate={songToEdit}
        />
      )}
    </div>
  );
};

export default Songs;
