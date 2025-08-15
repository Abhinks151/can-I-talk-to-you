import { toogleStatusAndUpdateLastSeen } from "../services/userService.js";
import { userSocket } from "./userSocket.js";


export const registerSockets = function registerSockets(io) {

  io.on('connection', async (socket) => {
    console.log("A user connected");





    userSocket(io, socket);

    socket.on('disconnect', async () => {
      await toogleStatusAndUpdateLastSeen(socket.id)
      console.log('A user disconnected');
    });
  });
}
// hook in chat events
// chatSocket(io, socket);