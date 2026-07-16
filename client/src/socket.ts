import { io } from "socket.io-client";
import API from "./config/api";

export const socket = io(API.BASE, {
  transports: ["websocket"],
  autoConnect: true,
});