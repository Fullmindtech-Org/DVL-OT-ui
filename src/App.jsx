import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/Sidebar";
import OrdenesTrabajo from "./pages/OrdenesTrabajo/OrdenesTrabajo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div
              className={`flex h-screen bg-zinc-300 flex-col md:flex-row md:overflow-hidden`}
            >
              <div className="w-full flex-none md:w-64">
                <SideBar/>
              </div>
              <div
                className={`flex-grow p-4 md:overflow-y-auto md:p-8 bg-zinc-300`}
              >
                <Routes>
                  <Route path="/*" element={<OrdenesTrabajo />} />
                  {/* <Route path="/colores/*" element={<Colores />} />
                  <Route path="/prendas/*" element={<Prendas />} />
                  <Route path="/telas/*" element={<Telas />} /> */}
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
