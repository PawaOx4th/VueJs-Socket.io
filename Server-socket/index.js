const express = require('express');

const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);

let users = [];
let messages = [];
let index = 0;

io.on('connection', (socket) => {
  let date = new Date();
  console.log(`Socket io has Start`);

  socket.emit('loggedIn', {
    users: users.map((user) => user.username),
    messages: messages,
    time: date.getTime(),
  });

  // NewUser
  socket.on('newuser', (username) => {
    console.log(`${username} has arrived at the Chat Room`);
    socket.username = username;
    users.push(socket);

    io.emit('userOnline', socket.username);
  });

  socket.on('msg', (msg) => {
    let date = new Date();
    let message = {
      index: index,
      username: socket.username,
      msg: msg,
      timestamp: date.getTime(),
      time: `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`,
    };

    messages.push(message);
    io.emit('msg', message);

    index++;
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`${socket.usersname} has left this Chat Room 🏠`);
    io.emit('userLeft', socket.username);
    users.splice(users.indexOf(socket), 1);
  });
});

http.listen(process.env.PORT || 4000, () => {
  console.log(`Listening on port ${process.env.PORT || 4000}`);
});
