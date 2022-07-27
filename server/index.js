const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = 4500 || process.env.PORT;

// cors is used to maintain a link between urls
app.use(cors());
// to get a msg on browser
app.get("/", (req, res) => {
  res.send("HELL ITS WORKIN!");
});

const server = http.createServer(app);
const io = socketIO(server);

let users = [{}];

io.on("connection", (socket) => {
  console.log("new connection");

  socket.on("joined", ({ User }) => {
    users[socket.id] = User;
    console.log(`${User} has joined`);
    
    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: `${users[socket.id]} has joined the chat!`,
    });
    
  });

  socket.emit("welcome", { user: "Admin", message: "Welcome to the Chat!" });
});

server.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});
