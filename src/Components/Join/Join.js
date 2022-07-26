import React from "react";
import "./Join.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

let User;

function Join() {
  const sendUser = () => {
    User = document.getElementById("joinInput").value;
  };

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>Chat App</h1>
        <input
          placeholder="Enter your name"
          type="text"
          name=""
          id="joinInput"
        />
        <Link to="/chat">
          <button onClick={sendUser} className="joinbtn">
            Login In
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Join;
export { User };
