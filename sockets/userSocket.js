import { allContacts } from "../services/appService.js";
import { createUser, findUserByName, updateSocketId } from "../services/userService.js";

export const userSocket = async (io, socket) => {
  try {
    socket.on('userRegister', async (username) => {
      console.log(`User ${username} joined the chat`);
      const userExist = await findUserByName(username);
       
      if (userExist) {
        // console.log(socket.id)
        // console.log(userExist.socketId)
        await updateSocketId(username, socket.id);
        // io.to(userExist.socketId).emit('userJoined', userExist);
        io.to(socket.id).emit('userJoined', userExist);
      } else {
        const newUser = await createUser({
          name: username,
          socketId: socket.id,
          isActive: true,
          lastSeen: new Date()
        });

        io.to(socket.id).emit('userJoined', newUser);
      }
      
      //find better way to do it
      const allUsers = await allContacts();
      io.emit('allContacts', allUsers);

    });
  } catch (error) {
    console.log(error)
  }
}