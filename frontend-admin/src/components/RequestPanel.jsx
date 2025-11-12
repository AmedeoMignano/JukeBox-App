import React, { useEffect, useState } from "react";
import { getPending } from "../services/requestservice";

const RequestPanel = ({ access, stomp }) => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [removing, setRemoving] = useState([]);

  const getRequests = async () => {
    try {
      const result = await getPending(access);
      setRequests(result.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Errore nel caricamento");
    }
  };

  useEffect(() => {
    if (!access) return;
    getRequests();
  }, [access]);

  useEffect(() => {
    if (!access || !stomp) return;

    // console.log("Sottoscritto a", `/topic/event/${access}/requests`);

    const subscription = stomp.subscribe(
      `/topic/event/${access}/requests`,
      (msg) => {
        const data = JSON.parse(msg.body);
        if (!data?.id || !data?.guestName || data.status !== "PENDING") return;

        // console.log("Nuova richiesta:", data);

        setRequests((prev) => {
          const existing = prev.find((r) => r.id === data.id);
          const newList = existing
            ? prev.map((r) => (r.id === data.id ? data : r))
            : [data, ...prev];
          // console.log("Stato aggiornato, richieste:", newList);
          return [...newList];
        });
      }
    );

    return () => subscription.unsubscribe();
  }, [stomp, access]);

  const updateStatus = (id, status) => {
    setRemoving((prev) => [...prev, id]);
    setTimeout(() => {
      setRequests((prev) => prev.filter((r) => r.id !== id));
      setRemoving((prev) => prev.filter((rId) => rId !== id));
    }, 500);
    stomp.send("/app/requests/update", {}, JSON.stringify({ id, status }));
  };

  return (
    <div className="transition-all">
      {Array.isArray(requests) && requests.length > 0 ? (
        requests.map((req) => (
          <div
            key={req.id}
            className={`bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2 mb-4 transition-all duration-500 ${
              removing.includes(req.id)
                ? "opacity-0 translate-y-4 scale-95"
                : "opacity-100 translate-y-0 scale-100"
            }`}
          >
            <div>
              <p className="text-[18px]">
                Richiesta da:{" "}
                <span className="text-red-700 font-semibold">
                  {req.guestName}
                </span>
              </p>
              <p className="text-2xl text-red-700 font-bold">
                {req.artist} - {req.songTitle}
              </p>
            </div>
            <div className="flex justify-around pt-2">
              <button
                type="button"
                className="button-accept cursor-pointer"
                onClick={() => updateStatus(req.id, "ACCEPTED")}
              >
                Accetta
              </button>
              <button
                type="button"
                className="button-reject cursor-pointer"
                onClick={() => updateStatus(req.id, "REJECTED")}
              >
                Respingi
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center bg-white rounded-2xl shadow-md p-4">
          <p className="text-gray-600">
            {error || "Nessuna richiesta al momento"}
          </p>
        </div>
      )}
    </div>
  );
};

export default RequestPanel;
