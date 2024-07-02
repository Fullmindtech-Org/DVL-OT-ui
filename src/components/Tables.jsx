import { useEffect, useState } from "react";
import {
  fetchColor,
  fetchColores,
  fetchOrdenTrabajo,
  fetchOrdenesTrabajo,
  fetchPrenda,
  fetchPrendas,
  fetchTela,
  fetchTelas,
} from "../lib/data";
import { generateAndDownloadPDF, showToast } from "../lib/utils";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  eliminarColor,
  eliminarOrdenTrabajo,
  eliminarPrenda,
  eliminarTela,
  modificarColor,
  modificarPrenda,
  modificarTela,
} from "../lib/actions";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "Estas seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarOrdenTrabajo(id, setUpdate, update);
        Swal.fire({
          title: "Borrado!",
          text: "La orden de trabajo ha sido eliminada.",
          icon: "success",
        });
      }
    });
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

export function TablaColores({ limit, currentPage, update, setUpdate }) {
  const [colores, setColores] = useState(null);

  useEffect(() => {
    fetchColores(limit, currentPage)
      .then((data) => {
        if (data && data.rows) {
          setColores(data.rows);
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
  }, [limit, currentPage, update]);

  const handleEdit = (id) => {
    fetchColor(id)
      .then((data) => {
        const nombreActualDelColor = data[0].color_nombre;

        Swal.fire({
          title: `Actualizar el nombre del color`,
          input: "text",
          inputValue: nombreActualDelColor,
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Actualizar",
          showLoaderOnConfirm: true,
          preConfirm: async (nuevoNombre) => {
            await modificarColor(
              { id: id, nombre: nuevoNombre },
              setUpdate,
              update
            );
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });
      })
      .catch((error) => {
        showToast("error", error, "dark");
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarColor(id, setUpdate, update);
        Swal.fire({
          title: "Borrado!",
          text: "El color ha sido eliminado.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-zinc-300 text-black p-2 md:pt-0">
          <table className="min-w-full text-black">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium sm:pl-6">
                  Código Color
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Color
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-color">
              {colores?.map((color) => (
                <tr
                  key={color.color_id}
                  className="w-full border-b py-3 text-sm border-zinc-300 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {color.color_id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {color.color_nombre}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-2">
                      <button
                        className="rounded-md border p-2 hover:bg-mainColor text-black border-zinc-300"
                        onClick={() => handleEdit(color.color_id)}
                      >
                        <i className="ri-pencil-line text-xl" />
                      </button>
                      <button
                        className="rounded-md border p-2 hover:bg-mainColor text-black border-zinc-300"
                        onClick={() => handleDelete(color.color_id)}
                      >
                        <i className="ri-delete-bin-line text-xl" />
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

export function TablaPrendas({ limit, currentPage, update, setUpdate }) {
  const [prendas, setPrendas] = useState(null);

  useEffect(() => {
    fetchPrendas(limit, currentPage)
      .then((data) => {
        if (data && data.rows) {
          setPrendas(data.rows);
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
  }, [limit, currentPage, update]);

  const handleEdit = (id) => {
    fetchPrenda(id)
      .then((data) => {
        const nombreActualDePrenda = data[0].prenda_nombre;

        Swal.fire({
          title: `Actualizar el nombre de la prenda`,
          input: "text",
          inputValue: nombreActualDePrenda,
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Actualizar",
          showLoaderOnConfirm: true,
          preConfirm: async (nuevoNombre) => {
            await modificarPrenda(
              { id: id, nombre: nuevoNombre },
              setUpdate,
              update
            );
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });
      })
      .catch((error) => {
        showToast("error", error, "dark");
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarPrenda(id, setUpdate, update);
        Swal.fire({
          title: "Borrado!",
          text: "La prenda ha sido eliminado.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-zinc-300 text-black p-2 md:pt-0">
          <table className="min-w-full text-black">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium sm:pl-6">
                  Código Prenda
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Prenda
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-color">
              {prendas?.map((prenda) => (
                <tr
                  key={prenda.prenda_id}
                  className="w-full border-b py-3 text-sm border-zinc-300 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {prenda.prenda_id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {prenda.prenda_nombre}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-2">
                      <button
                        className="rounded-md border p-2 hover:bg-mainColor text-black border-zinc-300"
                        onClick={() => handleEdit(prenda.prenda_id)}
                      >
                        <i className="ri-pencil-line text-xl" />
                      </button>
                      <button
                        className="rounded-md border p-2 hover:bg-mainColor text-black border-zinc-300"
                        onClick={() => handleDelete(prenda.prenda_id)}
                      >
                        <i className="ri-delete-bin-line text-xl" />
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

export function TablaTelas({ limit, currentPage, update, setUpdate }) {
  const [telas, setTelas] = useState(null);

  useEffect(() => {
    fetchTelas(limit, currentPage)
      .then((data) => {
        if (data && data.rows) {
          setTelas(data.rows);
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
  }, [limit, currentPage, update]);

  const handleEdit = (id) => {
    fetchTela(id)
      .then((data) => {
        const nombreActualDeTela = data[0].tela_nombre;

        Swal.fire({
          title: `Actualizar el nombre de la tela`,
          input: "text",
          inputValue: nombreActualDeTela,
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Actualizar",
          showLoaderOnConfirm: true,
          preConfirm: async (nuevoNombre) => {
            await modificarTela(
              { id: id, nombre: nuevoNombre },
              setUpdate,
              update
            );
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });
      })
      .catch((error) => {
        showToast("error", error, "dark");
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarTela(id, setUpdate, update);
        Swal.fire({
          title: "Borrado!",
          text: "La prenda ha sido eliminado.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-zinc-300 text-black p-2 md:pt-0">
          <table className="min-w-full text-black">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium sm:pl-6">
                  Código Tela
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tela
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-color">
              {telas?.map((tela) => (
                <tr
                  key={tela.tela_id}
                  className="w-full border-b py-3 text-sm border-zinc-300 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {tela.tela_id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {tela.tela_nombre}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-2">
                      <button
                        className="rounded-md border p-2 hover:bg-mainColor text-black border-zinc-300"
                        onClick={() => handleEdit(tela.tela_id)}
                      >
                        <i className="ri-pencil-line text-xl" />
                      </button>
                      <button
                        className="rounded-md border p-2 hover:bg-mainColor text-black border-zinc-300"
                        onClick={() => handleDelete(tela.tela_id)}
                      >
                        <i className="ri-delete-bin-line text-xl" />
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

TablaTelas.propTypes = {
  limit: PropTypes.number,
  currentPage: PropTypes.number,
  update: PropTypes.bool,
  setUpdate: PropTypes.func,
};

TablaPrendas.propTypes = {
  limit: PropTypes.number,
  currentPage: PropTypes.number,
  update: PropTypes.bool,
  setUpdate: PropTypes.func,
};

TablaColores.propTypes = {
  limit: PropTypes.number,
  currentPage: PropTypes.number,
  update: PropTypes.bool,
  setUpdate: PropTypes.func,
};

TablaOT.propTypes = {
  query: PropTypes.string,
  currentPage: PropTypes.number,
  limit: PropTypes.number,
};
