import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { registerSockets } from './sockets/index.js';
import { connection } from './config/connection.js';
const app = express();
const server = http.createServer(app);
const io = new Server(server);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

connection();
registerSockets(io);

// io.on('connection', async (socket) => {
//   console.log("A user connected");


//   socket.on('userRegister', async (username) => {
//     console.log(`User ${username} joined the chat`);

//     let user;
//     for (let i = 0; i < users.length; i++) {
//       if (users[i].name === username) {
//         user = users[i];
//       }
//     }

//     if (user) {
//       user.socketId = socket.id;
//       io.to(user.socketId).emit('userJoined', user);
//     } else {
//       users.push({ socketId: socket.id, name: username });
//       io.to(socket.id).emit('userJoined', { socketId: socket.id, name: username });
//     }




//     // console.log(users);
//   });


//   socket.on('disconnect', async () => {
//     console.log('A user disconnected');
//   });
// });

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
