import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import SideBar from "./components/Sidebar";
import OrdenesTrabajo from "./pages/OrdenesTrabajo/OrdenesTrabajo";
import Colores from "./pages/Colores/Colores";
import Prendas from "./pages/Prendas/Prendas";
import Telas from "./pages/Telas/Telas";
import { PDFViewer } from "@react-pdf/renderer";
import PDF from "./components/PDF";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
        transition={Bounce}
      />
      <Routes>
        <Route
          path="*"
          element={
            <div
              className={`flex h-screen bg-zinc-300 flex-col md:flex-row md:overflow-hidden`}
            >
              <div className="w-full flex-none md:w-64">
                <SideBar />
              </div>
              <div
                className={`flex-grow p-4 md:overflow-y-auto md:p-8 bg-zinc-300`}
              >
                <Routes>
                  <Route path="/*" element={<OrdenesTrabajo />} />
                  <Route path="/colores/*" element={<Colores />} />
                  <Route path="/prendas/*" element={<Prendas />} />
                  <Route path="/telas/*" element={<Telas />} />
                </Routes>
              </div>
            </div>
          }
        />
        <Route path="/PDF" element={<PDFViewer style={{ width: '100%', height: '100vh' }}><PDF/></PDFViewer>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
