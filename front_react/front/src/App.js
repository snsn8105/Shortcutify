// src/App.js
import { Route, Routes } from "react-router-dom";
import Home from "./handmade/Home";
import Login1 from "./handmade/Login1";
import Make from "./handmade/Make";
import Record from "./handmade/Record";
import Signup from "./handmade/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login1" element={<Login1 />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/make" element={<Make />} />
      <Route path="/Record" element={<Record />} />
    </Routes>
  );
}

export default App;
