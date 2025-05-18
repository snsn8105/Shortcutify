// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./handmade/Home";
import Login1 from "./handmade/Login1";
import Signup from "./handmade/Signup";
import Make from "./handmade/Make";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login1" element={<Login1 />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/make" element={<Make />} />
    </Routes>
  );
}

export default App;