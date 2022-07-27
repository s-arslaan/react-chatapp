import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { User } from "../Join/Join";
import "./Chat.css";
import sendIcon from "../../images/send.png";

const ENDPOINT = "http://localhost:4500";

function Chat() {
  const socket = io(ENDPOINT, { transports: ["websocket"] });

  useEffect(() => {
    socket.on("connect", () => {
      alert(User + " connected");
    });

    socket.emit("joined", { User });

    socket.on("welcome", (data) => {
      console.log(data.user, data.message);
    });
    
    socket.on("userJoined", (data) => {
      console.log(data.user, data.message);
    });

    return () => {};
  }, [socket]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header"></div>
        <div className="chatBox"></div>
        <div className="inputBox">
          <input type="text" name="" id="chatInput" />
          <button className="sendBtn">
            <img src={sendIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
