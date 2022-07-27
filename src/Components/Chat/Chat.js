import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { User } from "../Join/Join";
import "./Chat.css";
import sendIcon from "../../images/send.png";

let socket;
const ENDPOINT = "http://localhost:4500";
// const socket = io(ENDPOINT, { transports: ["websocket"] });

function Chat() {
  const [id, setId] = useState("");

  const sendMsg = () => {
    const msg = document.getElementById("chatInput").value;
    socket.emit("msg", { msg, id });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      alert(User + " connected");
      setId(socket.id);
    });

    socket.emit("joined", { User });

    socket.on("welcome", (data) => {
      console.log(data.user, ": ", data.message);
    });

    socket.on("userJoined", (data) => {
      console.log(data.user, ": ", data.message);
    });

    socket.on("leave", (data) => {
      console.log(data.user, ": ", data.message);
    });

    return () => {
      // socket.emit('disconnect');
      socket.off();
    };
  }, []);

  useEffect(() => {

    socket.on("sendMsg", (data) => {
      console.log(data);
    });

    return () => {
      
    };
  }, []);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header"></div>
        <div className="chatBox"></div>
        <div className="inputBox">
          <input type="text" name="" id="chatInput" />
          <button onClick={sendMsg} className="sendBtn">
            <img src={sendIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
