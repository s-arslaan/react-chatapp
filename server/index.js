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

io.on("connection", () => {
  console.log("new connection");
});

server.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});
