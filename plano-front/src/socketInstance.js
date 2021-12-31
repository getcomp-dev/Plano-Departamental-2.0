import socketIo from "socket.io-client";

export default socketIo("http://localhost:3000", { autoConnect: false });
