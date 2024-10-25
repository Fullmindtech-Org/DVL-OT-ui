import { useEffect, useState } from "react";
import {
  fetchCliente,
  fetchClientes,
  fetchColor,
  fetchColores,
  fetchOrdenTrabajo,
  fetchOrdenesTrabajo,
  fetchPrenda,
  fetchPrendas,
  fetchTalle,
  fetchTalles,
  fetchTela,
  fetchTelas,
} from "../lib/data";
import { showToast } from "../lib/utils";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  eliminarCliente,
  eliminarColor,
  eliminarOrdenTrabajo,
  eliminarPrenda,
  eliminarTalle,
  eliminarTela,
  modificarCliente,
  modificarColor,
  modificarPrenda,
  modificarTalle,
  modificarTela,
} from "../lib/actions";
import Swal from "sweetalert2";
import ReactPDF from "@react-pdf/renderer";
import PDF from "./PDF";
import { saveAs } from "file-saver";
import Caret from "./Caret";

export function TablaOT({ limit, currentPage, query }) {
  const [OT, setOT] = useState(null);
  const [update, setUpdate] = useState(false);
  const [sort, setSort] = useState({
    label: "Cod. OT",
    field: "orden_trabajo_id",
    order: "des",
  });

  const headers = [
    { label: "Cod. OT", field: "orden_trabajo_id" },
    { label: "Cliente", field: "cliente" },
    { label: "FPE", field: "fecha_probable_entrega" },
    { label: "Prioridad", field: "prioridad" },
    { label: "Fecha Creación", field: "fecha_creacion" },
    { label: "Estado", field: "estado" },
    // Agrega más headers según sea necesario
  ];
  function handleHeaderClick(field) {
    const newOrder =
      sort.field === field && sort.order === "asc" ? "des" : "asc";
    setSort({ field, order: newOrder });
  }

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

  function getSortedArray(array) {
    if (!array) return [];
    return array.sort((a, b) => {
      const fieldA = a[sort.field];
      const fieldB = b[sort.field];
      if (sort.order === "asc") {
        return fieldA > fieldB ? 1 : fieldA < fieldB ? -1 : 0;
      } else {
        return fieldA < fieldB ? 1 : fieldA > fieldB ? -1 : 0;
      }
    });
  }

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

    const blob = await ReactPDF.pdf(<PDF ot={ot} />).toBlob();
    saveAs(blob, `${id}.pdf`);
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-zinc-300 text-black p-2 md:pt-0">
          <div className="md:hidden">
            {getSortedArray(OT)?.map((ot) => (
              <div
                key={ot.orden_trabajo_id}
                className="mb-2 w-full rounded-md bg-color p-4"
              >
                <div className="flex items-center justify-between border-b border-zinc-300 pb-2">
                  <div>
                    <p>{ot.orden_trabajo_id}</p>
                    <div className="mb-2 flex items-center overflow-hidden">
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
                {headers.map((header) => (
                  <th
                    key={header.field}
                    scope="col"
                    className="px-3 py-5 font-medium sm:pl-6 cursor-pointer"
                    onClick={() => handleHeaderClick(header.field)}
                  >
                    <div className="flex items-center">
                      {header.label}
                      {header.field === sort.field && (
                        <Caret
                          direction={
                            sort.field === header.field
                              ? sort.order === "asc"
                                ? "up"
                                : "down"
                              : "up"
                          }
                        />
                      )}
                    </div>
                  </th>
                ))}
                <th scope="col" className="px-3 py-5 font-medium">
                  {/* Temp */}
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  {/* Temp */}
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody>{/* Renderiza las filas de la tabla aquí */}</tbody>
            <tbody className="bg-color">
              {OT?.map((ot) => (
                <tr
                  key={ot.orden_trabajo_id}
                  className="w-full border-b py-3 text-sm border-zinc-300 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {ot.orden_trabajo_id}
                  </td>
                  <td className="max-w-xs truncate overflow-hidden whitespace-nowrap px-3 py-3">
                    {ot.cliente}
                  </td>
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
                  {/*Estos están para ser futuros nuevos campos*/}
                  <td className="whitespace-nowrap px-3 py-3">
                    {" "}
                    {new Date(ot.fecha_creacion).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">{ot.estado}</td>
                  <td className="whitespace-nowrap px-3 py-3"></td>
                  {/*Estos están para ser futuros nuevos campos*/}
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

export function TablaClientes({ limit, currentPage, update, setUpdate }) {
  const [clientes, setClientes] = useState(null);

  useEffect(() => {
    fetchClientes(limit, currentPage)
      .then((data) => {
        if (data && data.rows) {
          setClientes(data.rows);
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
        showToast("error", error.message, "dark");
      });
  }, [limit, currentPage, update]);

  const handleEdit = (id) => {
    fetchCliente(id)
      .then((data) => {
        const nombreActualDeCliente = data[0].Cliente;

        Swal.fire({
          title: `Actualizar el nombre del Cliente`,
          input: "text",
          inputValue: nombreActualDeCliente,
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Actualizar",
          showLoaderOnConfirm: true,
          preConfirm: (nuevoNombre) => {
            return modificarCliente(
              { id: id, Cliente: nuevoNombre },
              setUpdate,
              update
            );
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });
      })
      .catch((error) => {
        showToast("error", error.message, "dark");
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarCliente(id, setUpdate, update).then(() => {
          Swal.fire("Borrado!", "El cliente ha sido eliminado.", "success");
        });
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-black overflow-hidden">
        <thead className="rounded-lg text-left text-sm font-normal">
          <tr>
            <th scope="col" className="px-3 py-5 font-medium sm:pl-6">
              Código Cliente
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Cliente
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-color max-w-full">
          {clientes?.map((cliente) => (
            <tr
              key={cliente.id}
              className="text-ellipsis max-w-full border-b py-3 text-sm border-zinc-300 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
              <td className="whitespace-nowrap py-3 pl-6 pr-3">{cliente.id}</td>
              <td className="whitespace-nowrap px-3 py-3">{cliente.Cliente}</td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex flex-col md:flex-row md:justify-end gap-2">
                  <button
                    className="rounded-md border p-2 hover:bg-mainColor text-black border-zinc-300"
                    onClick={() => handleEdit(cliente.id)}
                  >
                    <i className="ri-pencil-line text-xl" />
                  </button>
                  <button
                    className="rounded-md border p-2 hover:bg-mainColor text-black border-zinc-300"
                    onClick={() => handleDelete(cliente.id)}
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
  );
}

export function TablaTalles({ limit, currentPage, update, setUpdate }) {
  const [talles, setTalles] = useState(null);

  useEffect(() => {
    fetchTalles(limit, currentPage)
      .then((data) => {
        if (data && data.rows) {
          setTalles(data.rows);
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
        showToast("error", error.message, "dark");
      });
  }, [limit, currentPage, update]);

  const handleEdit = (id) => {
    fetchTalle(id)
      .then((data) => {
        const nombreActualDeTalle = data[0].talle_nombre;

        Swal.fire({
          title: `Actualizar el nombre del talle`,
          input: "text",
          inputValue: nombreActualDeTalle,
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Actualizar",
          showLoaderOnConfirm: true,
          preConfirm: (nuevoNombre) => {
            return modificarTalle(
              { id: id, talle: nuevoNombre },
              setUpdate,
              update
            );
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });
      })
      .catch((error) => {
        showToast("error", error.message, "dark");
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarTalle(id, setUpdate, update).then(() => {
          Swal.fire("Borrado!", "El talle ha sido eliminado.", "success");
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
                  Código Talle
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Talle
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-color">
              {talles?.map((talle) => (
                <tr
                  key={talle.talle_id}
                  className="w-full border-b py-3 text-sm border-zinc-300 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {talle.talle_id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {talle.talle_nombre}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-2">
                      <button
                        className="rounded-md border p-2 hover:bg-mainColor text-black border-zinc-300"
                        onClick={() => handleEdit(talle.talle_id)}
                      >
                        <i className="ri-pencil-line text-xl" />
                      </button>
                      <button
                        className="rounded-md border p-2 hover:bg-mainColor text-black border-zinc-300"
                        onClick={() => handleDelete(talle.talle_id)}
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

TablaTalles.propTypes = {
  limit: PropTypes.number,
  currentPage: PropTypes.number,
  update: PropTypes.bool,
  setUpdate: PropTypes.func,
};

TablaTelas.propTypes = {
  limit: PropTypes.number,
  currentPage: PropTypes.number,
  update: PropTypes.bool,
  setUpdate: PropTypes.func,
};

TablaClientes.propTypes = {
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
