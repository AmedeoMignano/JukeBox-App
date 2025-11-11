import React, { useEffect, useState } from "react";
import { getPending } from "../services/requestservice";

const RequestPanel = ({ access, stomp }) => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [removing, setRemoving] = useState([]);
  const [loadedRequests, setLoadedRequests] = useState(false);
  const getRequests = async () => {
    try {
      const result = await getPending(access);
      setRequests(result.data);
      setLoadedRequests(true);
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
    const subscription = stomp.subscribe(
      `/topic/event/${access}/requests`,
      (msg) => {
        const data = JSON.parse(msg.body);
        if (!data || !data.id || !data.guestName) return;
        if (data.status !== "PENDING") return;

        setRequests((prev) => {
          const existing = prev.find((r) => r.id === data.id);
          return existing
            ? prev.map((r) => (r.id === data.id ? data : r))
            : [data, ...prev];
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
    setTimeout(() => getRequests(), 1000);
  };

  return (
    <>
      {requests.length === 0 ? (
        <div className="text-center bg-white rounded-2xl shadow-md p-4">
          <p className="text-gray-600">{error}</p>
        </div>
      ) : (
        <div>
          {Array.isArray(requests) &&
            requests.map((req) => (
              <div
                key={req.id}
                className={`bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2 mb-4 transition-all duration-500 ${
                  removing.includes(req.id)
                    ? "opacity-0 translate-y-4 scale-95"
                    : loadedRequests
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4"
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
            ))}
        </div>
      )}
    </>
  );
};

export default RequestPanel;
