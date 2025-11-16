import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const SOCKET_URL = "https://rich-sheelagh-amedeomignano-0e8df352.koyeb.app/ws";

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
