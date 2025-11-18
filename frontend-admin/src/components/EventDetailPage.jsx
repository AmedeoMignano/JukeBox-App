import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getEventById,
  deleteEvent,
  deleteFromRepertory,
} from "../services/eventservice";
import UpdateEventModal from "../components/UpdateEventModal";
import Spinner from "./Spinner";
import { Trash } from "react-bootstrap-icons";
import AddSongsModal from "./AddSongsModal";
import toast from "react-hot-toast";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false);

  const fetchEvent = async () => {
    try {
      const response = await getEventById(id);
      setEvent(response);
      // console.log(response);
      // console.log(id);
    } catch (err) {
      //   console.error("Errore nel caricamento evento:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const renderStatus = (status) => {
    switch (status) {
      case "ACCEPTED":
        return (
          <p className="font-medium text-[1.1rem]">
            Stato: <span className="text-green-600">ACCETTATA</span>
          </p>
        );
      case "REJECTED":
        return (
          <p className="font-medium text-[1.1rem]">
            Stato: <span className="text-red-500">RIFIUTATA</span>
          </p>
        );
      case "PENDING":
        return (
          <p className="font-medium text-[1.1rem]">
            Stato: <span className="text-blue-500">IN ATTESA</span>
          </p>
        );
      default:
        return <p className="text-[1.1rem]">Stato: Sconosciuto</p>;
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Sei sicuro di voler eliminare questo evento?")) return;
    const deleteEv = deleteEvent(id);
    await toast.promise(deleteEv, {
      loading: "Eliminazione evento in corso...",
      success: `Evento '${event.name}' eliminato`,
      error: (err) => {
        return `Errore: ${err.message}`;
      },
    });
    navigate("/events");
  };

  const handleDeleteSong = async (songId, songTitle) => {
    if (!window.confirm(`Sei sicuro di voler eliminare ${songTitle}?`)) return;

    const deleteSong = deleteFromRepertory(id, songId);
    await toast.promise(deleteSong, {
      loading: "Eliminazione in corso..",
      success: `Canzone '${songTitle}' eliminata con successo`,
      error: (err) => {
        return `Errore: ${err.message}`;
      },
    });
    fetchEvent();
  };

  if (loading)
    return (
      <div className="pt-5 flex justify-center min-h-screen bg-gray-100">
        <Spinner />
      </div>
    );
  if (!event)
    return <p className="text-center mt-10 text-2xl text-red-700">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-red-700 mb-3 font-poppins">
          {event.name}
        </h1>
        <p className="text-gray-600 mb-1">
          <span className="font-medium">{event.location}</span>
        </p>
        <p className="text-gray-600 mb-1">
          {event.date ? event.date : "Data non disponibile"}
        </p>
        <p className="text-gray-600 mb-1">
          Codice accesso: <span className="font-mono">{event.accessCode}</span>
        </p>
        <p className="text-gray-600 mb-1">
          Stato:{" "}
          <span className={event.active ? "text-green-600" : "text-gray-500"}>
            {event.active ? "Attivo" : "Inattivo"}
          </span>
        </p>

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="shadow-button-blue cursor-pointer"
          >
            Modifica Evento
          </button>
          <button
            onClick={handleDelete}
            className="shadow-button-red cursor-pointer"
          >
            Elimina
          </button>
          <button
            onClick={() => navigate("/events")}
            className="shadow-button-teal cursor-pointer"
          >
            Indietro
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl mx-auto">
        <div className=" w-full flex items-center justify-content-between mb-10">
          <div className="me-auto">
            <h2 className="text-2xl font-semibold text-red-700 mb-3 me-auto font-poppins">
              Repertorio
            </h2>
          </div>
          <div>
            <button
              className="shadow-button-red cursor-pointer"
              onClick={() => {
                setIsAddSongModalOpen(true);
              }}
            >
              Aggiungi brano
            </button>
          </div>
        </div>

        {event.repertory && event.repertory.length > 0 ? (
          <ul className="divide-y divide-red-800">
            {event.repertory.map((song) => (
              <li key={song.id} className="py-2">
                <p className="font-medium text-[1.2rem]">
                  {song.artist} -{" "}
                  <span className="text-red-700">{song.title}</span>
                </p>
                <div className="my-2">
                  <button
                    className="flex items-center cursor-pointer shadow-button-red"
                    onClick={() => handleDeleteSong(song.id, song.title)}
                  >
                    Elimina <Trash className=" ms-2" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">Nessuna canzone associata</p>
        )}
      </div>

      <div className="bg-white rounded-2xl mt-5 shadow-md p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-red-700 mb-3 font-poppins">
          Richieste
        </h2>
        {event.requests && event.requests.length > 0 ? (
          <ul className="divide-y divide-red-800">
            {event.requests.map((req) => (
              <li key={req.id} className="py-2">
                <p className="font-medium text-[1.1rem]">
                  Richiesta da:{" "}
                  <span className="text-red-700">{req.guestName}</span>
                </p>
                <p className="font-medium text-[1.1rem]">
                  Brano: <span className="text-red-700">{req.songTitle}</span>
                </p>
                {renderStatus(req.status)}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nessuna richiesta per questo evento</p>
        )}
      </div>

      {isModalOpen && (
        <UpdateEventModal
          event={event}
          closeModal={() => setIsModalOpen(false)}
          onEventUpdated={fetchEvent}
        />
      )}

      {isAddSongModalOpen && (
        <AddSongsModal
          eventId={id}
          closeModal={() => setIsAddSongModalOpen(false)}
          currentRepertory={event.repertory}
          onUpdateRepertory={fetchEvent}
        />
      )}
    </div>
  );
};

export default EventDetailPage;
