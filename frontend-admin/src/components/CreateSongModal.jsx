import React, { useState } from "react";
import { createSong } from "../services/songService";
import toast from "react-hot-toast";

const CreateSongModal = ({ closeModal, onCreatedSong }) => {
  const [form, setForm] = useState({
    title: "",
    artist: "",
    category: "",
  });

  const handleCreateSong = async () => {
    const create = createSong({ ...form });
    await toast.promise(create, {
      loading: "Creazione canzone...",
      success: `Canzone '${form.title}' aggiunta!`,
      error: (err) => {
        console.log(err);
        return "Errore nel caricamento della canzone!";
      },
    });
    closeModal();
    onCreatedSong();
  };
  return (
    <div className="fixed inset-0 bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg relative">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Crea Canzone
        </h2>

        <input
          type="text"
          placeholder="Titolo Canzone"
          className="w-full border p-2 rounded mb-2"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          type="text"
          placeholder="Artista"
          className="w-full border p-2 rounded mb-2"
          onChange={(e) => setForm({ ...form, artist: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded mb-2 bg-white"
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
            onClick={handleCreateSong}
            className="cursor-pointer shadow-button-red"
          >
            Crea
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSongModal;
