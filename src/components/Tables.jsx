import { useEffect, useState } from "react";
import { fetchOrdenTrabajo, fetchOrdenesTrabajo } from "../lib/data";
import { generateAndDownloadPDF, showToast } from "../lib/utils";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export function TablaOT({ limit, currentPage, query }) {
  const [OT, setOT] = useState(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    fetchOrdenesTrabajo(limit, currentPage, query)
      .then((data) => {
        if (data && data.rows) {
          setOT(data.rows);
        } else {
          showToast(
            "error",
            "Error al obtener los datos, recargue la página",
            "dark"
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        showToast("error", error, "dark");
      });
  }, [limit, currentPage, query, update]);

  const handleDelete = (id) => {
    console.log("Delete", id, setUpdate);
  };

  const handleGeneratePDF = async (id) => {
    const ot = await fetchOrdenTrabajo(id);
    generateAndDownloadPDF(ot);
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-zinc-300 text-black p-2 md:pt-0">
          <div className="md:hidden">
            {OT?.map((ot) => (
              <div
                key={ot.orden_trabajo_id}
                className="mb-2 w-full rounded-md bg-color p-4"
              >
                <div className="flex items-center justify-between border-b border-zinc-300 pb-2">
                  <div>
                    <p>{ot.orden_trabajo_id}</p>
                    <div className="mb-2 flex items-center">
                      <p>{ot.cliente}</p>
                      <p className="mx-2">-</p>
                      <p>
                        {new Date(
                          ot.fecha_probable_entrega
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs text-black ${
                      ot.prioridad === "Alta"
                        ? "bg-red-600"
                        : ot.prioridad === "Media"
                        ? "bg-yellow-400"
                        : "bg-green-500"
                    }`}
                  >
                    Prioridad: {ot.prioridad}
                  </span>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {ot.prenda_nombre} de {ot.tela_nombre} {ot.color_nombre} -
                      Talle {ot.talle}
                    </p>
                    <p>Cantidad: {ot.cantidad}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`OT/actualizar/${ot.orden_trabajo_id}`}
                      className="rounded-md border p-2 hover:bg-mainColor text-black border-zinc-300"
                    >
                      <i className="ri-pencil-line text-xl" />
                    </Link>
                    <button
                      className="rounded-md border p-2 hover:bg-mainColor text-black border-zinc-300"
                      onClick={() => handleDelete(ot.orden_trabajo_id)}
                    >
                      <i className="ri-delete-bin-line text-xl" />
                    </button>
                    <button
                      className="rounded-md border p-2 hover:bg-mainColor text-black border-zinc-300"
                      onClick={() => handleGeneratePDF(ot.orden_trabajo_id)}
                    >
                      <i className="ri-file-pdf-fill text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-black md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium sm:pl-6">
                  Cod. OT
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Cliente
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  FPE
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Prioridad
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Prenda
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Color
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tela
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Talle
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Cant.
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-color">
              {OT?.map((ot) => (
                <tr
                  key={ot.orden_trabajo_id}
                  className="w-full border-b py-3 text-sm border-zinc-300 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {ot.orden_trabajo_id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{ot.cliente}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {new Date(ot.fecha_probable_entrega).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs text-black ${
                        ot.prioridad === "Alta"
                          ? "bg-red-600"
                          : ot.prioridad === "Media"
                          ? "bg-yellow-400"
                          : "bg-green-500"
                      }`}
                    >
                      {ot.prioridad}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {ot.prenda_nombre}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {ot.color_nombre}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {ot.tela_nombre}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{ot.talle}</td>
                  <td className="whitespace-nowrap px-3 py-3">{ot.cantidad}</td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`OT/actualizar/${ot.orden_trabajo_id}`}
                        className="rounded-md border p-2 hover:bg-mainColor text-black border-zinc-300"
                      >
                        <i className="ri-pencil-line text-xl" />
                      </Link>
                      <button
                        className="rounded-md border p-2 hover:bg-mainColor text-black border-zinc-300"
                        onClick={() => handleDelete(ot.orden_trabajo_id)}
                      >
                        <i className="ri-delete-bin-line text-xl" />
                      </button>
                      <button
                        className="rounded-md border p-2 hover:bg-mainColor text-black border-zinc-300"
                        onClick={() => handleGeneratePDF(ot.orden_trabajo_id)}
                      >
                        <i className="ri-file-pdf-fill text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

TablaOT.propTypes = {
  query: PropTypes.string,
  currentPage: PropTypes.number,
  limit: PropTypes.number,
};
