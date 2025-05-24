// src/App.js
import { Route, Routes } from "react-router-dom";
import Home from "./handmade/Home";
import Login from "./handmade/Login";
import Make from "./handmade/Make";
import Record from "./handmade/Record";
import Signup from "./handmade/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/make" element={<Make />} />
      <Route path="/Record" element={<Record />} />
    </Routes>
  );
}

export default App;
