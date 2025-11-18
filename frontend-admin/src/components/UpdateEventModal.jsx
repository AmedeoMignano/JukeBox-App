import React, { useState } from "react";
import { updateEvent } from "../services/eventservice";
import toast from "react-hot-toast";

const UpdateEventModal = ({ event, closeModal, onEventUpdated }) => {
  const [form, setForm] = useState({
    name: event.name,
    location: event.location,
    date: event.date,
    active: event.active,
  });

  const handleUpdate = async () => {
    const updatePromise = updateEvent(event.id, form);
    await toast.promise(updatePromise, {
      loading: "Aggiornamento evento...",
      success: "Evento aggiornato!",
      error: (err) => {
        return `Errore: ${err.message}`;
      },
    });
    closeModal(), onEventUpdated();
  };

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-40 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Modifica Evento
        </h2>

        <input
          type="text"
          value={form.name}
          placeholder="Nome evento"
          className="w-full border p-2 rounded mb-2"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          value={form.location}
          placeholder="Location"
          className="w-full border p-2 rounded mb-2"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          type="date"
          value={form.date}
          className="w-full border p-2 rounded mb-2"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <label className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Evento attivo
        </label>

        <div className="flex justify-between">
          <button
            onClick={closeModal}
            className="shadow-button-teal cursor-pointer"
          >
            Annulla
          </button>
          <button
            onClick={handleUpdate}
            className="shadow-button-blue cursor-pointer"
          >
            Salva
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEventModal;
