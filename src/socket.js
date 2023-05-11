import { io } from "socket.io-client";

export const socket = io("https://socket-grid.herokuapp.com/", { autoConnect: false });
