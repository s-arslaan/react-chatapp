import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { User } from "../Join/Join";
import "./Chat.css";
import sendIcon from "../../images/send.png";
import closeIcon from "../../images/closeIcon.png";
import Message from "../Message/Message";
import ScrollToBottom from "react-scroll-to-bottom";

let socket;
const ENDPOINT = "https://arschat.onrender.com/";
// const ENDPOINT = "http://localhost:4500";
// const ENDPOINT = "https://rct-chatapp.herokuapp.com/";
// const socket = io(ENDPOINT, { transports: ["websocket"] });

function Chat() {
    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMsg = () => {
        const message = document.getElementById("chatInput").value;
        socket.emit("message", { message, id });
        document.getElementById("chatInput").value = "";
    };

    // console.log(messages);

    useEffect(() => {
        socket = io(ENDPOINT, { transports: ["websocket"] });

        socket.on("connect", () => {
            // alert(User + " connected");
            setId(socket.id);
        });

        socket.emit("joined", { User });

        socket.on("welcome", (data) => {
            setMessages([...messages, data]);
            // console.log(data.user, " (welcome): ", data.message);
        });

        return () => {
            // socket.emit('disconnect');
            socket.off();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        socket.on("sendMsg", (data) => {
            setMessages([...messages, data]);
            // console.log(data);
        });

        socket.on("userJoined", (data) => {
            setMessages([...messages, data]);
            // console.log(data.user, " (userjoined): ", data.message);
        });

        socket.on("leave", (data) => {
            setMessages([...messages, data]);
            // console.log(data.user, ": ", data.message);
        });

        return () => {
            socket.off();
        };
    }, [messages]);

    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>Chat App</h2>
                    <a href="/">
                        {" "}
                        <img src={closeIcon} alt="Close" />
                    </a>
                </div>
                <ScrollToBottom className="chatBox">
                    {messages.map((item, i) => (
                        <Message
                            user={item.id === id ? "" : item.user}
                            message={item.message}
                            classs={item.id === id ? "right" : "left"}
                            key={i}
                        />
                    ))}
                </ScrollToBottom>
                <div className="inputBox">
                    <input
                        onKeyPress={(e) =>
                            e.key === "Enter" ? sendMsg() : null
                        }
                        type="text"
                        name=""
                        id="chatInput"
                    />
                    <button onClick={sendMsg} className="sendBtn">
                        <img src={sendIcon} alt="" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
