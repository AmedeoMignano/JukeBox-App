import { createContext, useContext, useEffect, useState } from "react";
import { connectWebSocket } from "../services/websocketservice";
import { client } from "stompjs";
import toast from "react-hot-toast";

const WebSocketContext = createContext();

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);

  const guestSession = localStorage.getItem("guestSession");
  const guest = guestSession ? JSON.parse(guestSession) : null;
  console.log(guest);
  const guestId = guest?.id;
  const accessCode = guest?.accessCode;

  useEffect(() => {
    connectWebSocket((client) => {
      setStompClient(client);
    });
  }, []);

  useEffect(() => {
    if (!stompClient) return;

    const subscription = stompClient.subscribe("/user/queue/errors", (msg) => {
      const err = JSON.parse(msg.body);
      toast.dismiss("request");
      toast.error(err.message);
    });

    return () => subscription.unsubscribe();
  }, [stompClient]);

  useEffect(() => {
    if (!stompClient || !guestId) return;

    const subscription = stompClient.subscribe(
      `/topic/event/${accessCode}/requests/${guestId}`, // ascolta genericamente tutti gli eventi
      (msg) => {
        const data = JSON.parse(msg.body);

        if (data.status === "REJECTED") {
          toast.error(`Richiesta respinta: ${data.songName}`, {
            id: "request",
          });
        } else {
          toast.success(`Richiesta accettata: ${data.songName}!`, {
            id: "request",
          });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [stompClient, guestId]);

  return (
    <WebSocketContext.Provider value={{ stompClient }}>
      {children}
    </WebSocketContext.Provider>
  );
};
