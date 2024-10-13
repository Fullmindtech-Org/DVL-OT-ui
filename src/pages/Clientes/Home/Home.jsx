import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TablaClientes } from "../../../components/Tables";
import { fetchClientes } from "../../../lib/data";
import Pagination from "../../../components/Pagination";
import Swal from "sweetalert2";
import { guardarCliente } from "../../../lib/actions";
import { readFirstColumnStream } from "../../../lib/utils";

export default function Home() {
  const [totalPages, setTotalPages] = useState(0);
  const [update, setUpdate] = useState(false);
  const [searchParams] = useSearchParams();
  const limit = 10;

  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    async function fetchAndLogTotalPages() {
      const data = await fetchClientes(limit, page);
      if (data && data.totalPages) {
        setTotalPages(data.totalPages);
      }
    }
    fetchAndLogTotalPages();
  }, [limit, page, update]);

  const handleCreate = () => {
    Swal.fire({
      title: "Ingresa el nombre del Cliente que deseas crear",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Crear",
      showLoaderOnConfirm: true,
      preConfirm: async (cliente) => {
        await guardarCliente({ Cliente: cliente }, setUpdate, update);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
      const columnValues = await readFirstColumnStream(file);

      for (const value of columnValues) {
        if (value) {
          await guardarCliente({ Cliente: value }, setUpdate, update);
        }
      }

      Swal.fire(
        "Importación completada",
        "Los clientes han sido subidos con éxito.",
        "success"
      );
    } catch (error) {
      console.error("Error al importar el archivo", error);
      Swal.fire("Error", "Ocurrió un error al importar el archivo.", "error");
    }
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-2xl text-black">Clientes</h2>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <button
          onClick={() => handleCreate()}
          className="flex h-10 items-center rounded-lg bg-mainColor text-black hover:bg-orange-300 px-4 text-sm font-medium  transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span className="hidden md:block">Crear Cliente</span>
          <i className="ri-add-fill md:ml-4 text-2xl" />
        </button>
      </div>
      {/* Input y botón para importar archivo Excel */}
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <label className="flex h-10 items-center rounded-lg bg-mainColor text-black hover:bg-orange-300 px-4 text-sm font-medium  transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
          <span className=" hidden md:block">Importar .xlsx</span>
          <i className="ri-file-upload-fill md:ml-4 text-2xl" />
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>
      <TablaClientes
        limit={limit}
        currentPage={Number(page)}
        update={update}
        setUpdate={setUpdate}
      />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
