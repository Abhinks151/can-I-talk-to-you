import { allContacts } from "../services/appService.js";
import { toogleStatusAndUpdateLastSeen } from "../services/userService.js";
import { userSocket } from "./userSocket.js";


export const registerSockets = async function registerSockets(io) {

  io.on('connection', async (socket) => {
    console.log("A user connected");

    try {
      userSocket(io, socket);



      socket.on('disconnect', async () => {
        try {
          await toogleStatusAndUpdateLastSeen(socket.id)


          const allUsers = await allContacts();
          io.emit('allContacts', allUsers);
          console.log('A user disconnected');
        } catch (error) {
          console.log(error)
        }
      });

    } catch (error) {
      console.log(error)
    }
  });
}
