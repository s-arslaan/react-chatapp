const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = 4500 || process.env.PORT;

let users = [{}];

// cors is used to maintain a link between urls
app.use(cors());

// to get a msg on browser
app.get("/", (req, res) => {
    res.send("HELL ITS WORKIN!");
});

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
    console.log("new connection");

    socket.on("joined", ({ User }) => {
        users[socket.id] = User;
        console.log(`${User} has joined`);

        socket.broadcast.emit("userJoined", {
            user: "Admin",
            message: `${users[socket.id]} has joined the chat!`,
        });

        socket.emit("welcome", {
            user: "Admin",
            message: `Welcome to the Chat, ${User}`,
        });
    });

    socket.on("message", ({ message, id }) => {
        // this will send to everyone including you
        io.emit("sendMsg", { user: users[id], message: message, id:id });
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit("leave", {
            user: "Admin",
            message: `${users[socket.id]} has left the chat!`,
        });

        console.log(`${users[socket.id]} left`);
    });
});

server.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});
