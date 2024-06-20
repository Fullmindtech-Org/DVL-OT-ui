import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Create from "./Create/Create";

export default function OrdenesTrabajo() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
    </Routes>
  );
}