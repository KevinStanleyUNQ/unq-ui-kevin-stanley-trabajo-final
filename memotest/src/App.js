import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { PlayerOneProvider } from "./context/playerOneContext";
import { BoardProvider } from "./context/boardContext";
import Login from "./page/Login/Login";
import MemoGame from "./page/MemoGame/MemoGame";

function App() {
  return (
    <PlayerOneProvider>
      <BoardProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/game" element={<MemoGame />} />
            {/* <Route path="/board4x4" element={<Board5x5 />} /> */}
            {/* <Route path="/board4x4" element={<Board8x8 />} /> */}
          </Routes>
        </BrowserRouter>
      </BoardProvider>
    </PlayerOneProvider>
  );
}

export default App;