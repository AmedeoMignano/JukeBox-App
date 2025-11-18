import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventByAccessCode } from "../services/eventservice";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { useWebSocket } from "../context/WebSocketContext";

const GuestEvent = () => {
  const { accessCode } = useParams();
  const { stompClient, guestData } = useWebSocket();
  const [event, setEvent] = useState(null);
  const [guestName, setGuestName] = useState(
    localStorage.getItem("guestName") || "Anonimo"
  );
  const [songs, setSongs] = useState([]);
  const [phase, setPhase] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const guestParsed = guestData;
  const [eventName, setEventName] = useState("");

  const loadEvent = async () => {
    setIsLoading(true);
    try {
      const response = await getEventByAccessCode(accessCode);
      // console.log(response);
      //   console.log(guestName);
      //   console.log(guestParsed);
      const currentPhase = response.phase;
      // console.log(currentPhase);

      const filteredSongs = response.repertory
        ? response.repertory.filter((song) => song.category === currentPhase)
        : [];

      // console.log(filteredSongs);
      setEvent(response);
      setEventName(response.name);
      setPhase(currentPhase);
      setSongs(filteredSongs);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvent();
  }, [accessCode]);

  useEffect(() => {
    if (!stompClient || !accessCode) return;
    const subscription = stompClient.subscribe(
      `/topic/event/${accessCode}/phase`,
      (msg) => {
        const data = JSON.parse(msg.body);
        console.log(data);
        setSongs(data.songs);
        setPhase(data.phase);

        console.log(phase);
        console.log(songs);
      }
    );
    return () => subscription.unsubscribe();
  }, [stompClient, accessCode]);

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  const sendRequest = (songId) => {
    if (!stompClient || !accessCode) return;

    if (!songId) {
      toast.error("Errore: ID del brano non valido.");
      return;
    }

    const payload = {
      guestId: guestParsed.id,
      songId: songId,
      guestName: guestName,
    };

    try {
      stompClient.send("/app/requests/create", {}, JSON.stringify(payload));
      toast.loading("Invio richiesta... in attesa di risposta", {
        id: "request",
      });
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div>
      <div className="bg-red-100 text-center py-5">
        <h1 className="font-medium text-3xl font-poppins">
          Benvenuto, <span className="text-red-700">{guestName}</span>
        </h1>
        <p className="text-2xl font-poppins">
          grazie per essere presente per l'evento:{" "}
          <span className="text-red-700 font-imperial text-5xl">
            {eventName}
          </span>
        </p>
        <p className="text-2xl mt-3 font-poppins">
          Questo è il <span className="text-red-700">Banda Corta Jukebox</span>{" "}
          , scegli un brano dal nostro jukebox e noi lo eseguiremo per te
        </p>
      </div>
      <div className="flex min-h-screen justify-center home-bg p-4">
        <div className="relative w-full max-w-2xl">
          {/* <!-- Top arrotondato (contenitore esterno) --> */}
          <div className="neon-border-top relative mt-10 h-80 overflow-hidden rounded-t-full border-8 border-white bg-yellow-900 shadow-2xl">
            {/* <!-- Specchio/Display centrale con bordi --> */}
            <div className="absolute inset-8 flex flex-col items-center justify-center rounded-t-full border-4 border-yellow-800 bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500 shadow-inner">
              <h1 className="text-center text-[2rem] sm:text-5xl font-bold text-white drop-shadow-l mt-5 font-imperial">
                Banda Corta Jukebox
              </h1>
              <p className="font-medium text-1xl text-white">
                Fase Evento : <span className="text-red-700">{phase}</span>
              </p>
              <input
                type="text"
                placeholder="Cerca brano"
                className="border w-50 sm:w-100 bg-white border-2 border-black py-2 mt-3 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-red-700"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* <!-- Telaio per la lista --> */}
          <div className="neon-border-bottom relative rounded-b-3xl border-8 border-white bg-yellow-900 p-6 shadow-2xl">
            {/* <!-- Contenitore lista --> */}
            <div className="bg-opacity-60 max-h-96 overflow-y-auto rounded-lg border-4 border-yellow-600 bg-black p-4">
              {/* <!-- Lista canzoni --> */}
              {isLoading && (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              )}

              <ul className="space-y-3">
                {filteredSongs.map((song, index) => (
                  <li
                    key={`${song.id}-${index}`}
                    className="bg-opacity-30 hover:bg-opacity-40 rounded bg-yellow-100 p-4 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-black font-poppins">
                          {song.title}
                        </div>
                        <div className="text-sm text-red-600 font-poppins">
                          {song.artist}
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          className="bg-red-700 h-15 w-15 rounded-full hover:bg-red-800 cursor-pointer text-white"
                          onClick={() => sendRequest(song.id)}
                        >
                          Richiedi
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestEvent;
