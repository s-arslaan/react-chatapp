import React, { useState } from "react";
import "./Join.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

let User;

const sendUser = () => {
  User = document.getElementById("joinInput").value;
  // document.getElementById("joinInput").value = "";
  console.log(User);
};

function Join() {
  const [name, setName] = useState("");
  console.log(name);

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
          onChange={(e) => setName(e.target.value)}
        />
        <Link onClick={(e) => (!name ? e.preventDefault() : null)} to="/chat">
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
