import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";

export default function OrdenesTrabajo() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}