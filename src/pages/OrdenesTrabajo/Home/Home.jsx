import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Search from "../../../components/Search";
import { TablaOT } from "../../../components/Tables";
import { fetchOrdenesTrabajo } from "../../../lib/data";
import Pagination from "../../../components/Pagination";

export default function Home() {
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams] = useSearchParams();
  const limit = 10;

  const page = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query") || "";

  useEffect(() => {
    async function fetchAndLogTotalPages() {
      const data = await fetchOrdenesTrabajo(limit, page, query);
      if (data && data.totalPages) {
        setTotalPages(data.totalPages);
      }
    }
    fetchAndLogTotalPages();
  }, [limit, page, query]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-2xl text-black">Ordenes de Trabajo</h2>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar Orden de Trabajo..." />
        <Link
          to={"/OT/crear"}
          className="flex h-10 items-center rounded-lg bg-mainColor text-black hover:bg-orange-300 px-4 text-sm font-medium  transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span className="hidden md:block">Crear OT</span>
          <i className="ri-add-fill md:ml-4 text-2xl" />
        </Link>
      </div>
      <TablaOT limit={limit} currentPage={Number(page)} query={query} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
