import { createContext, useContext, useEffect, useState } from "react";
import { connectWebSocket } from "../services/websocketservice";
import toast from "react-hot-toast";

const WebSocketContext = createContext();

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);
  const [guestData, setGuestData] = useState(() => {
    const guestSession = localStorage.getItem("guestSession");
    return guestSession ? JSON.parse(guestSession) : null;
  });

  useEffect(() => {
    connectWebSocket((client) => {
      setStompClient(client);
    });
  }, []);
  const guestId = guestData?.id;
  const accessCode = guestData?.accessCode;

  useEffect(() => {
    if (!stompClient || !guestId || !accessCode) return;

    const subscription = stompClient.subscribe("/user/queue/errors", (msg) => {
      const err = JSON.parse(msg.body);
      toast.dismiss("request");
      toast.error(err.message);
    });

    return () => subscription.unsubscribe();
  }, [accessCode, guestId, stompClient]);

  useEffect(() => {
    if (!stompClient || !guestId || !accessCode) return;

    const subscription = stompClient.subscribe(
      `/topic/event/${accessCode}/requests/${guestId}`,
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
  }, [stompClient, guestId, accessCode]);

  return (
    <WebSocketContext.Provider value={{ stompClient, guestData, setGuestData }}>
      {children}
    </WebSocketContext.Provider>
  );
};
