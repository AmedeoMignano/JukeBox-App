import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connectWebSocket } from "../services/websocketservice";
import { getEventByAccessCode } from "../services/eventservice";

const GuestEvent = () => {
  const { accessCode } = useParams();
  const [stompClient, setStompClient] = useState(null);
  const [event, setEvent] = useState(null);
  const [guestName, setGuestName] = useState(
    localStorage.getItem("guestName") || "Anonimo"
  );
  const guestSession = localStorage.getItem("guestSession");
  const [songs, setSongs] = useState([]);
  const [phase, setPhase] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const guestParsed = JSON.parse(guestSession);
  const guestId = guestParsed.id;
  const [requestStatus, setRequestStatus] = useState("");
  const [eventName, setEventName] = useState("");
  const [responseStatus, setResponseStatus] = useState("");
  const [responseSongName, setResponseSongName] = useState("");

  const initWebSocket = () => {
    connectWebSocket((stomp) => {
      setStompClient(stomp);
    });
  };

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
      initWebSocket();
    } catch (err) {
      console.log(err);
      setError(err);
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

  useEffect(() => {
    if (!stompClient || !accessCode) return;
    const subscription = stompClient.subscribe("/user/queue/errors", (msg) => {
      const err = JSON.parse(msg.body);
      console.error("Errore:", err.message);
      setError(err.message);
      setRequestStatus("");
    });
    return () => subscription.unsubscribe();
  }, [stompClient, accessCode]);

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (requestStatus) {
      const timer = setTimeout(() => setRequestStatus(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const sendRequest = (songId) => {
    if (!stompClient || !accessCode) return;

    if (!songId) {
      setError("Errore: ID del brano non valido.");
      return;
    }

    const payload = {
      guestId: guestParsed.id,
      songId: songId,
      guestName: guestName,
    };

    try {
      stompClient.send("/app/requests/create", {}, JSON.stringify(payload));
      setRequestStatus("Richiesta Inviata!");
      //   console.log(requestStatus);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (!stompClient || !accessCode || !guestId) return;
    const subscription = stompClient.subscribe(
      `/topic/event/${accessCode}/requests/${guestId}`,
      (msg) => {
        const data = JSON.parse(msg.body);
        // console.log(data);
        setResponseSongName(data.songName);
        if (data.status === "REJECTED") {
          setResponseStatus("RESPINTA");
        } else {
          setResponseStatus("ACCETTATA");
        }
      }
    );
    // console.log(responseSongName);
    // console.log(responseStatus);
    return () => subscription.unsubscribe();
  }, [stompClient, accessCode, guestId]);

  return (
    <div>
      <div className="bg-red-100 text-center py-5">
        <h1 className="font-medium text-3xl">
          Benvenuto, <span className="text-red-700">{guestName}</span>
        </h1>
        <p className="text-2xl">
          grazie per essere presente per l'evento:{" "}
          <span className="text-red-700">{eventName}</span>
        </p>
        <p className="text-2xl mt-3">
          Questo è <span className="text-red-700">Banda-Corta-Jukebox</span> ,
          scegli un brano dal nostro jukebox e noi lo eseguiremo per te
        </p>
      </div>
      <div className="flex min-h-screen justify-center home-bg p-4">
        <div className="relative w-full max-w-2xl">
          {/* <!-- Top arrotondato (contenitore esterno) --> */}
          <div className="neon-border-top relative mt-10 h-80 overflow-hidden rounded-t-full border-8 border-white bg-yellow-900 shadow-2xl">
            {/* <!-- Specchio/Display centrale con bordi --> */}
            <div className="absolute inset-8 flex flex-col items-center justify-center rounded-t-full border-4 border-yellow-800 bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500 shadow-inner">
              <h1 className="text-center text-[20px] sm:text-3xl font-bold text-white drop-shadow-l mt-5">
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
              {error && (
                <p className="text-center text-red-700 font-semibold mb-2">
                  {error}
                </p>
              )}
              {requestStatus && (
                <p className="text-center text-green-600 font-semibold">
                  {requestStatus}
                </p>
              )}
              <ul className="space-y-3">
                {filteredSongs.map((song, index) => (
                  <li
                    key={`${song.id}-${index}`}
                    className="bg-opacity-30 hover:bg-opacity-40 rounded bg-yellow-100 p-4 transition-all hover:bg-yellow-500"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-black">
                          {song.title}
                        </div>
                        <div className="text-sm text-red-600">
                          {song.artist}
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          className="bg-red-700 h-20 w-20 rounded-full hover:bg-red-800 cursor-pointer text-white"
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
