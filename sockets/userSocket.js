import { createUser, findUserByName, updateSocketId } from "../services/userService.js";


export const userSocket = async (io, socket) => {
  try {
    socket.on('userRegister', async (username) => {
      console.log(`User ${username} joined the chat`);

      const userExist = await findUserByName(username);

      if (userExist) {
        await updateSocketId(username, socket.id);
        io.to(userExist.socketId).emit('userJoined', userExist);
      } else {
        const newUser = await createUser({
          name: username,
          socketId: socket.id,
          isActive: true,
          lastSeen: new Date()
        });

        io.to(socket.id).emit('userJoined', newUser);
      }
      // for (let i = 0; i < users.length; i++) {
      //   if (users[i].name === username) {
      //     user = users[i];
      //   }
      // }

      // if (user) {
      //   user.socketId = socket.id;
      //   io.to(user.socketId).emit('userJoined', user);
      // } else {
      //   users.push({ socketId: socket.id, name: username });
      //   io.to(socket.id).emit('userJoined', { socketId: socket.id, name: username });
      // }

      // console.log(users);
    });
  } catch (error) {
    console.log(error)
  }
}