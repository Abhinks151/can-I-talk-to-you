import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const server = http.createServer(app);
const io = new Server(server);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

const users = [];

io.on('connection', async (socket) => {
  console.log("A user connected");


  socket.on('userRegister', async (username) => {
    console.log(`User ${username} joined the chat`);
    users.push({ id: socket.id, name: username });

    for (let i = 0; i < users.length; i++) {
      if (username !== users[i].name) {
        io.emit('userJoined', users[i].name);
      }
    }
  }); 


  socket.on('disconnect', async () => {
    console.log('A user disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
