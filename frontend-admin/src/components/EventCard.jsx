import React from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ events }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md flex flex-col justify-between">
      <div>
        <h2 className="text-2xl text-red-700">{events.name}</h2>
        <p>{events.location}</p>
        <p>
          Data: <span className="text-red-700">{events.date}</span>
        </p>
        <p>
          Codice accesso:{" "}
          <span className="text-red-700">{events.accessCode}</span>
        </p>
      </div>
      <button
        onClick={() => navigate(`/events/${events.id}`)}
        className="mt-4 bg-red-700 text-white py-2 rounded-xl hover:bg-red-800 transition"
      >
        Vai all'evento
      </button>
    </div>
  );
};

export default EventCard;
