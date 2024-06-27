import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Create from "./Create/Create";

export default function OrdenesTrabajo() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/OT/crear" element={<Create />} />
    </Routes>
  );
}