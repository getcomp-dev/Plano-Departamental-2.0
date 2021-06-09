import socketIo from "socket.io-client";

export default socketIo("http://200.131.219.57:3000", { autoConnect: false });
