import React, { useEffect, useState } from "react";
import { deleteSong, getAllSongs } from "../services/songService";
import Spinner from "./Spinner";
import { Pencil, Trash } from "react-bootstrap-icons";
import CreateSongModal from "./CreateSongModal";
import UpdateSongModal from "./UpdateSongModal";
import toast from "react-hot-toast";
import gsap from "gsap";

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
      // console.log(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSong = async (id, songTitle) => {
    if (!window.confirm(`Sei sicuro di voler eliminare ${songTitle}?`)) return;
    const deleteS = deleteSong(id);
    await toast.promise(deleteS, {
      loading: "Eliminazione in corso...",
      success: "Eliminazione completata!",
      error: (err) => {
        console.log(err);
        return "Errore nella cancellazione della canzone!";
      },
    });
    fetchSongs();
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

  useEffect(() => {
    if (!isLoading) {
      gsap.fromTo(
        ".song-card",
        {
          x: -100,
          opacity: 0,
        },
        {
          zIndex: -1,
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [isLoading]);

  if (isLoading)
    return (
      <div className="flex min-h-screen bg-gray-100 py-10 justify-center ">
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
      <h1 className="text-center mb-5 text-3xl text-red-700 font-playfair">
        Lista Canzoni
      </h1>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Cerca canzone per nome o artista"
          className="border p-2 rounded-xl w-30 sm:w-1/3 lg:w-1/2 shadow-sm bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="shadow-button-red cursor-pointer"
          onClick={() => setCreateAddSongModalOpen(true)}
        >
          + Aggiungi
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6 mt-10 max-w-4xl mx-auto song-card">
        <ul className="divide-y divide-red-800">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song) => (
              <li key={song.id} className="pb-5 pt-3">
                <p className="font-medium text-[1.1rem]">
                  Titolo: <span className="text-red-700">{song.title}</span>
                </p>
                <p className="font-medium text-[1.1rem]">
                  Artista: <span className="text-red-700">{song.artist}</span>
                </p>
                <p className="font-medium text-[1.1rem]">
                  Categoria:{" "}
                  <span className="text-red-700">{song.category}</span>
                </p>
                <div className="flex justify-between my-2">
                  <button
                    className="flex items-center cursor-pointer shadow-button-red"
                    onClick={() => handleDeleteSong(song.id, song.title)}
                  >
                    Elimina <Trash className=" ms-2" />
                  </button>
                  <button
                    className="flex items-center  cursor-pointer shadow-button-blue"
                    onClick={() => handleEditSong(song)}
                  >
                    Modifica <Pencil className=" ms-2" />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="font-medium text-red-700">
              Nessuna canzone corrispondente
            </p>
          )}
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
