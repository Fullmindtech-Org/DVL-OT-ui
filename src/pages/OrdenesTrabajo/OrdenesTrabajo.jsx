import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Create from "./Create/Create";
import Update from "./Update/Update";

export default function OrdenesTrabajo() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/OT/crear" element={<Create />} />
      <Route path="/OT/actualizar/:id" element={<Update />} />
    </Routes>
  );
}