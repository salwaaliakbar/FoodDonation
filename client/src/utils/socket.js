import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: false, // manual connect to avoid premature connection
});

export default socket;
