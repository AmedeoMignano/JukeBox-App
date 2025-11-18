import React, { useState } from "react";
import { updateSong } from "../services/songService";
import toast from "react-hot-toast";

const UpdateSongModal = ({ closeModal, onSongUpdated, songToUpdate }) => {
  const [form, setForm] = useState({
    title: songToUpdate.title,
    artist: songToUpdate.artist,
    category: songToUpdate.category,
  });
  const [error, setError] = useState("");

  const handleUpdateSong = async () => {
    if (!form.title || !form.artist || !form.category) {
      setError("Tutti i campi sono obbligatori.");
      return;
    }
    const update = updateSong(songToUpdate.id, form);
    await toast.promise(update, {
      loading: "Modifica in corso...",
      success: "Modifica effettuata!",
      error: (err) => {
        console.log(err);
        return "Errore nella modifica della canzone!";
      },
    });
    closeModal();
    onSongUpdated();
  };
  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg relative">
        <h2 className="text-2xl font-semibold text-center mb-4 font-poppins">
          Modifica Canzone
        </h2>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Titolo Canzone"
          className="w-full border p-2 rounded mb-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          type="text"
          placeholder="Artista"
          className="w-full border p-2 rounded mb-2"
          value={form.artist}
          onChange={(e) => setForm({ ...form, artist: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded mb-4 bg-white"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="" disabled>
            Seleziona una categoria
          </option>
          <option value="CENA">CENA</option>
          <option value="BALLO">BALLO</option>
        </select>

        <div className="flex justify-between">
          <button
            onClick={closeModal}
            className="shadow-button-teal cursor-pointer"
          >
            Annulla
          </button>
          <button
            onClick={handleUpdateSong}
            className="shadow-button-blue cursor-pointer"
          >
            Salva Modifiche
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateSongModal;
