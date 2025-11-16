import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { API_URL } from "./APIservice";

const SOCKET_URL = `${API_URL}/ws`;

export const connectWebSocket = (onConnectCallback) => {
  const socket = new SockJS(SOCKET_URL);
  const stompClient = Stomp.over(function () {
    return socket;
  });

  stompClient.connect({}, () => {
    console.log("websocket Connesso");
    onConnectCallback(stompClient);
  });
  return stompClient;
};
