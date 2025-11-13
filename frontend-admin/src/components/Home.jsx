import React, { useEffect, useState } from "react";
import { getActiveEvent } from "../services/eventservice";
import Spinner from "./Spinner";
import { connectWebSocket } from "../services/websocketservice";
import RequestPanel from "./RequestPanel";

const Home = () => {
  const [event, setEvent] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [error, setError] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [currentPhase, setCurrentPhase] = useState("");
  const [isChanging, setIsChanging] = useState(false);
  useEffect(() => {
    const loadActiveEvent = async () => {
      setError("");
      setIsloading(true);
      try {
        const result = await getActiveEvent();
        // console.log(result);
        setEvent(result || []);
        setCurrentPhase(result.phase);
        setAccessCode(result.accessCode);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setIsloading(false);
      }
    };

    loadActiveEvent();
  }, []);

  useEffect(() => {
    if (!stompClient || !accessCode) return;
    const subscription = stompClient.subscribe(
      `/topic/event/${accessCode}/phase`,
      (msg) => {
        const data = JSON.parse(msg.body);
        console.log(data.songs);
        setCurrentPhase(data.phase);
      }
    );
    return () => subscription.unsubscribe();
  }, [stompClient, accessCode]);

  const tooglePhase = () => {
    const nextPhase = currentPhase === "CENA" ? "BALLO" : "CENA";
    setIsChanging(true);
    const body = {
      eventId: event.id,
      phase: nextPhase,
    };

    stompClient.send("/app/event/change-phase", {}, JSON.stringify(body));

    setCurrentPhase(nextPhase);

    setTimeout(() => setIsChanging(false), 2000);
  };

  useEffect(() => {
    if (!stompClient || !accessCode) return;
    const sub = stompClient.subscribe(
      `/topic/event/${accessCode}/requests`,
      (msg) => {
        const newReq = JSON.parse(msg.body);
        console.log(newReq);

        // controllo se la richiesta ha stato diverso da PENDING non aggiorno
        // così il counter non aumenta anche se accetto o respingo la richiesta
        if (newReq.status !== "PENDING") {
          return;
        }
        setEvent((prev) => {
          const existingIndex = prev?.requests?.findIndex((r) => {
            // console.log("existing:", r.id);
            // console.log("nuova richiesta:" + newReq.id);
            r.id === newReq.id;
          });
          console.log(existingIndex);

          if (existingIndex !== -1) {
            // Richiesta esistente l'aggiorno
            const updatedRequests = [...(prev?.requests || [])];
            updatedRequests[existingIndex] = newReq;
            return {
              ...prev,
              requests: updatedRequests,
            };
          } else {
            // Nuova richiesta l'aggiungo
            return {
              ...prev,
              requests: [newReq, ...(prev?.requests || [])],
            };
          }
        });
      }
    );
    return () => sub.unsubscribe();
  }, [stompClient, accessCode]);

  useEffect(() => {
    if (!accessCode || stompClient) return;
    connectWebSocket((stomp) => setStompClient(stomp));
  }, [accessCode]);

  return (
    <div className="px-4 pt-7 h-screen bg-gray-100">
      {isloading && <Spinner />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h1 className=" ps-3 mb-2 text-3xl">Evento Attivo</h1>
          <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2">
            <h1 className="text-2xl text-red-700">
              {event ? event.name : error}
            </h1>
            <p className="text-[18px]">
              {" "}
              Fase:{" "}
              <span className="text-red-700">
                {currentPhase === "CENA" ? "CENA" : "BALLO"}
              </span>
            </p>
            <p className="text-[18px]">
              Numero totali richieste:{" "}
              <span className="text-red-700">
                {event ? event.requests.length : ""}
              </span>
            </p>
            <p className="text-[18px]">
              Numero totali ospiti che si sono collegati:{" "}
              <span className="text-red-700">
                {event ? event.guests.length : ""}
              </span>
            </p>
            <button
              type="button"
              className="login-button mb-4 cursor-pointer"
              disabled={isChanging}
              onClick={tooglePhase}
            >
              Cambia fase in {currentPhase === "CENA" ? "BALLO" : "CENA"}
            </button>
          </div>
        </div>
        <div>
          <h1 className=" ps-3 mb-2 text-3xl">Richieste in arrivo</h1>

          {stompClient && accessCode ? (
            <RequestPanel
              key={accessCode}
              access={accessCode}
              stomp={stompClient}
            />
          ) : (
            <div className="text-center bg-white rounded-2xl shadow-md p-4">
              <p className="text-gray-600">
                {error || "Nessuna richiesta al momento"}
              </p>
            </div>
          )}
        </div>
        {/* <div>
          <h1 className=" ps-3 mb-2 text-3xl">Evento Attivo</h1>
          <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2">
            <h1 className="text-1xl text-red-700">
              {event ? event.name : error}
            </h1>
          </div>
        </div> */}
      </div>

      <div></div>
    </div>
  );
};

export default Home;
