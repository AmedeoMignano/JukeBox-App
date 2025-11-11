import React, { useEffect, useState } from "react";
import { getAllEvents } from "../services/eventservice";
import EventCard from "./EventCard";
import Spinner from "./Spinner";
import CreateEventModal from "./CreateEventModal";

const Event = () => {
  const [event, setEvent] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await getAllEvents();
      setEvent(response);
      console.log(response);
      setIsLoading(false);
    } catch (err) {
      err.message;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = event.filter((ev) =>
    ev.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-10 min-h-screen bg-gray-100">
      <h1 className="text-center mb-5 text-2xl text-red-700">Lista Eventi</h1>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Cerca evento per nome..."
          className="border p-2 rounded-xl w-1/2 shadow-sm bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-700 text-white px-4 py-2 rounded-xl shadow hover:bg-red-800 cursor-pointer"
        >
          + Crea Evento
        </button>
      </div>
      <div className="flex justify-center">{isLoading && <Spinner />}</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
        {filteredEvents.map((ev) => (
          <EventCard key={ev.id} events={ev} />
        ))}
      </div>
      {isModalOpen && (
        <CreateEventModal
          closeModal={() => setIsModalOpen(false)}
          onEventCreated={fetchEvents}
        />
      )}
    </div>
  );
};

export default Event;
