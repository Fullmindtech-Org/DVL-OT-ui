import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TablaColores } from "../../../components/Tables";
import { fetchColores } from "../../../lib/data";
import Pagination from "../../../components/Pagination";
import Swal from "sweetalert2";
import { guardarColor } from "../../../lib/actions";

export default function Home() {
  const [totalPages, setTotalPages] = useState(0);
  const [update, setUpdate] = useState(false);
  const [searchParams] = useSearchParams();
  const limit = 5;

  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    async function fetchAndLogTotalPages() {
      const data = await fetchColores(limit, page);
      if (data && data.totalPages) {
        setTotalPages(data.totalPages);
      }
    }
    fetchAndLogTotalPages();
  }, [limit, page, update])

  const handleCreate = () => {
    Swal.fire({
      title: "Ingresa el nombre del color que deseas crear",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Crear",
      showLoaderOnConfirm: true,
      preConfirm: async (color) => {
        await guardarColor({ nombre: color }, setUpdate, update);
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-2xl text-black">
          Colores
        </h2>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <button onClick={() => handleCreate()} className="flex h-10 items-center rounded-lg bg-mainColor text-black hover:bg-orange-300 px-4 text-sm font-medium  transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
          <span className="hidden md:block">Crear Color</span>
          <i className="ri-add-fill md:ml-4 text-2xl" />
        </button>
      </div>
      <TablaColores limit={limit} currentPage={Number(page)} update={update} setUpdate={setUpdate} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}