import React, { useState } from "react";
import { createSong } from "../services/songService";

const CreateSongModal = ({ closeModal, onCreatedSong }) => {
  const [form, setForm] = useState({
    title: "",
    artist: "",
    category: "",
  });
  const [error, setError] = useState("");

  const handleCreateSong = async () => {
    try {
      const response = await createSong({ ...form });
      console.log(response);
      closeModal();
      onCreatedSong();
    } catch (err) {
      setError(err);
      console.log(err);
    }
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
            className="bg-gray-300 px-4 py-2 rounded-xl cursor-pointer"
          >
            Annulla
          </button>
          <button
            onClick={handleCreateSong}
            className="bg-red-700 text-white px-4 py-2 rounded-xl cursor-pointer"
          >
            Crea
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSongModal;
