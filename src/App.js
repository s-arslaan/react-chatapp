import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./Components/Chat/Chat";
import Join from "./Components/Join/Join";

// const ENDPOINT = "http://localhost:4500";
// const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Join/>} />
          <Route exact path="/chat" element={<Chat/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
