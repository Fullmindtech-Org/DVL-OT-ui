import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import SideBar from "./components/Sidebar";
import OrdenesTrabajo from "./pages/OrdenesTrabajo/OrdenesTrabajo";
import Colores from "./pages/Colores/Colores";
import Prendas from "./pages/Prendas/Prendas";
import Telas from "./pages/Telas/Telas";
import Talles from "./pages/Talles/Talles";
import Clientes from "./pages/Clientes/Clientes";

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
              className={`flex flex-col h-screen bg-zinc-300 justify-between`}
            >
              <div className="flex flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-64">
                  <SideBar />
                </div>
                <div
                  className={`flex-grow p-4 md:overflow-y-auto md:p-8 bg-zinc-300`}
                >
                  <Routes>
                    <Route path="/*" element={<OrdenesTrabajo />} />
                    <Route path="/clientes/*" element={<Clientes />} />
                    <Route path="/colores/*" element={<Colores />} />
                    <Route path="/prendas/*" element={<Prendas />} />
                    <Route path="/telas/*" element={<Telas />} />
                    <Route path="/talles/*" element={<Talles />} />
                    <Route path="/cintas/*" element={<Telas />} />
                  </Routes>
                </div>
              </div>

              <footer className="text-center p-4 bg-gray-300">
                © Desarrollado por{" "}
                <a
                  href="https://fullmindtech.com.ar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Fullmindtech
                </a>
              </footer>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
