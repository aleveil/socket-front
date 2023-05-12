import { io } from "socket.io-client";

export const socket = io("https://socket-grid.herokuapp.com/", { autoConnect: false });
// export const socket = io("http://localhost:3000", { autoConnect: false });
