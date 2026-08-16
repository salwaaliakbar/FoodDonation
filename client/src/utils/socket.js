import { io } from "socket.io-client";
import { API_BASE_URL } from "../config/api";

const socket = io(API_BASE_URL, {
  autoConnect: false, // manual connect to avoid premature connection
});

export default socket;
