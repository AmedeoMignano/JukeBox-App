import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGuestSession } from "../services/guestsessionservice";
import Spinner from "./Spinner";
import { useWebSocket } from "../context/WebSocketContext";
import gsap from "gsap";

const GuestHome = () => {
  const [guestName, setGuestName] = useState(
    localStorage.getItem("guestName") || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setGuestData } = useWebSocket();

  useEffect(() => {
    {
      gsap.fromTo(
        ".register-card",
        {
          scale: 2,
          opacity: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!guestName.trim()) return setError("Inserisci nome!");
    try {
      setIsLoading(true);
      const response = await createGuestSession();
      //   console.log(response);
      // console.log(response.accessCode);
      const { accessCode } = response;

      localStorage.setItem("guestName", guestName);
      localStorage.setItem("guestSession", JSON.stringify(response));
      if (setGuestData) setGuestData(response);

      navigate(`/guest/event/${accessCode}`, { replace: true });
    } catch (err) {
      //   console.log(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    {
      gsap.fromTo(
        ".register-card",
        {
          scale: 2,
          opacity: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return (
    <div className="home-bg">
      <div className="home-card register-card">
        <h1 className="text-2xl font-semibold text-red-700 mb-4 font-poppins">
          Benvenuto in Banda Corta Jukebox
        </h1>
        <p className="text-gray-400 mb-6">
          Inserisci il tuo nome per accedere all'evento
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Il tuo nome"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="input-home"
          />
          <button className="home-button cursor-pointer" disabled={isLoading}>
            {isLoading ? <Spinner /> : "Entra nell'evento"}
          </button>
        </form>
        {error && (
          <div className="mt-3">
            <p className="text-red-500">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestHome;
