import { useState, useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  fetchCliente,
  fetchColores,
  fetchOrdenTrabajo,
  fetchPrendas,
  fetchTalles,
  fetchTelas,
} from "../lib/data";
import { Link, useNavigate } from "react-router-dom";
import { guardarOrdenTrabajo, modificarOrdenTrabajo } from "../lib/actions";
import PropTypes from "prop-types";
import { showToast } from "../lib/utils";
import React from "react";
import UploadButton from "./UploadButton";
import SearchClientes from "./SearchClientes";

export function FormOT({ mode, otId }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
    watch,
    setError,
    clearErrors,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pedidos",
  });
  const [prendas, setPrendas] = useState([]);
  const [colores, setColores] = useState([]);
  const [telas, setTelas] = useState([]);
  const [talles, setTalles] = useState([]);
  const [isValidSelection, setIsValidSelection] = useState(false);
  const hasFetchedPrendas = useRef(false);
  const hasFetchedColores = useRef(false);
  const hasFetchedTelas = useRef(false);
  const hasFetchedTalles = useRef(false);
  const today = new Date().toISOString().split("T")[0];

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!isValidSelection) {
      setError("cliente_id", {
        type: "manual",
        message: "Debe seleccionar un cliente válido.",
      });
      return;
    }
    try {
      const clienteId = data.cliente_id;
      const cliente = await fetchCliente(clienteId);

      if (!cliente) {
        setError("cliente_id", {
          type: "manual",
          message: "Cliente no válido. Seleccione un cliente existente.",
        });
        return;
      } else {
        clearErrors("cliente_id");
      }
      let response;
      if (mode === "update") {
        response = await modificarOrdenTrabajo(otId, data);
      } else {
        response = await guardarOrdenTrabajo(data);
      }

      if (response.status === (mode === "update" ? 200 : 201)) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error en la operación:", error);
    }
  };

  useEffect(() => {
    const fetchAndSetValues = async () => {
      if (mode === "update" && otId) {
        try {
          const ot = await fetchOrdenTrabajo(otId);

          const fechaCreacionFormatted = ot.fecha_creacion.split("T")[0];
          const fechaProbableEntregaFormatted =
            ot.fecha_probable_entrega.split("T")[0];

          setValue("estado_nombre", ot.estado_id);
          setValue("comentario_falta_material", ot.comentario_falta_material);
          setValue("fecha", fechaCreacionFormatted);
          setValue("fecha_probable_entrega", fechaProbableEntregaFormatted);
          setValue("cliente_id", ot.cliente_id);
          setValue("prioridad", ot.prioridad);
          setValue("nro_pedido", ot.nro_pedido);
          remove();

          ot.pedidos.forEach((pedido) => {
            append({
              id_prenda: pedido.prenda_id,
              id_color: pedido.color_id,
              id_tela: pedido.tela_id,
              cantidad: pedido.cantidad,
              talle: pedido.talle,
              cinta_reflectiva: pedido.cinta_reflectiva === 1,
              logo_frente: pedido.logo_frente === 1,
              logo_espalda: pedido.logo_espalda === 1,
            });
          });
        } catch (error) {
          showToast("error", "Error al obtener la orden de trabajo");
        }
      }
    };

    fetchAndSetValues();
  }, [mode, otId, setValue, append, remove]);

  useEffect(() => {
    if (!hasFetchedPrendas.current) {
      hasFetchedPrendas.current = true;
      fetchPrendas(1000, 1).then((data) => {
        if (data && data.rows) {
          setPrendas(data.rows);
        }
      });
    }
    if (!hasFetchedColores.current) {
      hasFetchedColores.current = true;
      fetchColores(1000, 1).then((data) => {
        if (data && data.rows) {
          setColores(data.rows);
        }
      });
    }
    if (!hasFetchedTelas.current) {
      hasFetchedTelas.current = true;
      fetchTelas(1000, 1).then((data) => {
        if (data && data.rows) {
          setTelas(data.rows);
        }
      });
    }
    if (!hasFetchedTalles.current) {
      hasFetchedTalles.current = true;
      fetchTalles(1000, 1).then((data) => {
        if (data && data.rows) {
          setTalles(data.rows);
        }
      });
    }
  }, []);

  const handleSelectClient = (clientId) => {
    setValue("cliente_id", clientId);
    if (clientId) {
      setIsValidSelection(true);
      clearErrors("cliente_id"); // Limpiar error al seleccionar un cliente válido
    }
  };

  return (
    <div>
      <form
        className="flex flex-col justify-center gap-2 bg-zinc-300 rounded-xl p-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-2 items-start">
          <div className="flex flex-col justify-center items-start">
            <span className="text-zinc-600 text-xs mb-1">Fecha</span>
            <input
              id="fecha"
              type="date"
              defaultValue={today}
              {...register("fecha", { required: true })}
              className="py-[12px] px-[20px] w-full rounded-lg"
            />
            {errors.fecha && (
              <span className="text-red-500 text-xs italic">
                Este campo es obligatorio
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center items-start">
            <span className="text-zinc-600 text-xs mb-1">
              Fecha Probable de Entrega
            </span>
            <input
              id="fecha_probable_entrega"
              type="date"
              defaultValue=""
              {...register("fecha_probable_entrega", { required: true })}
              className="py-[12px] px-[20px] w-full rounded-lg"
            />
            {errors.fecha_probable_entrega && (
              <span className="text-red-500 text-xs italic">
                Este campo es obligatorio
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-start">
          <label className="text-zinc-600 text-xs mb-1">Cliente</label>
          <SearchClientes
            onSelect={handleSelectClient}
            initialId={watch("cliente_id")}
            setIsValidSelection={setIsValidSelection}
            isValidSelection={isValidSelection}
            className="w-full"
          />
          {errors.cliente_id && (
            <span className="text-red-500 text-xs italic">
              {errors.cliente_id.message}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 items-start">
          <div className="flex flex-col justify-center items-start">
            <span className="text-zinc-600 text-xs mb-1">Prioridad</span>
            <select
              id="prioridad"
              defaultValue=""
              {...register("prioridad", { required: true })}
              className="py-[12px] px-[20px] w-full rounded-lg"
            >
              <option value="" disabled>
                Seleccione una opción...
              </option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
            {errors.prioridad && (
              <span className="text-red-500 text-xs italic">
                Este campo es obligatorio
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center items-start">
            <span className="text-zinc-600 text-xs mb-1">Nro Pedido</span>
            <input
              id="nro_pedido"
              type="text"
              {...register("nro_pedido", { required: true })}
              className="py-[12px] px-[20px] w-full rounded-lg"
            />
            {errors.nro_pedido && (
              <span className="text-red-500 text-xs italic">
                Este campo es obligatorio
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-start">
          <span className="text-zinc-600 text-xs mb-1">Estado del Lote</span>
          <select
            id="estado_nombre"
            {...register("estado_nombre", { required: true })}
            className="py-[12px] px-[20px] w-full rounded-lg"
          >
            <option value="1">Iniciado</option>
            <option value="2">Parcial x falta de material</option>
            <option value="3">Finalizada</option>
            <option value="4">Cancelada</option>
          </select>
        </div>
        {watch("estado_nombre")?.toString() === "2" && (
          <div className="flex flex-col justify-center items-start">
            <span className="text-zinc-600 text-xs mb-1">
              Observaciones: Falta de Material
            </span>
            <textarea
              id="comentario_falta_material"
              {...register("comentario_falta_material")}
              className="py-[12px] px-[20px] w-full rounded-lg"
              placeholder="Especificar qué falta..."
            />
          </div>
        )}
        <div>
          {/*columnas*/}
          <div className="grid grid-cols-10 gap-2 items-center bg-zinc-200 p-2 rounded-lg">
            {/* Encabezados*/}
            <span className="text-zinc-600 text-xs font-bold">Prenda</span>
            <span className="text-zinc-600 text-xs font-bold">Cantidad</span>
            <span className="text-zinc-600 text-xs font-bold">Color</span>
            <span className="text-zinc-600 text-xs font-bold">Tela</span>
            <span className="text-zinc-600 text-xs font-bold">Talle</span>
            <span className="text-zinc-600 text-xs font-bold">
              Cinta Reflectiva
            </span>
            <span className="text-zinc-600 text-xs font-bold">Logo Frente</span>
            <span className="text-zinc-600 text-xs font-bold">
              Logo Espalda
            </span>
            <span className="text-zinc-600 text-xs font-bold">Acciones</span>
            <br />
            {/* Filas de pedidos */}
            {fields.map((field, index) => (
              <React.Fragment key={field.id}>
                <select
                  id={`pedidos[${index}].id_prenda`}
                  defaultValue={field.id_prenda || ""}
                  {...register(`pedidos[${index}].id_prenda`, {
                    required: true,
                  })}
                  className="py-[12px] px-[20px] w-full rounded-lg"
                >
                  <option value="" disabled>
                    Seleccione una opción...
                  </option>
                  {prendas.map((prenda) => (
                    <option key={prenda.prenda_id} value={prenda.prenda_id}>
                      {prenda.prenda_nombre}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  id={`pedidos[${index}].cantidad`}
                  defaultValue={field.cantidad || ""}
                  {...register(`pedidos[${index}].cantidad`, {
                    required: true,
                    min: 1,
                  })}
                  className="py-[12px] px-[20px] w-full rounded-lg"
                  placeholder="Ingrese la cantidad"
                  onChange={(e) => {
                    e.target.value = Math.max(
                      1,
                      parseInt(e.target.value)
                    ).toString();
                  }}
                />
                <select
                  id={`pedidos[${index}].id_color`}
                  defaultValue={field.id_color || ""}
                  {...register(`pedidos[${index}].id_color`, {
                    required: true,
                  })}
                  className="py-[12px] px-[20px] w-full rounded-lg"
                >
                  <option value="" disabled>
                    Seleccione una opción...
                  </option>
                  {colores.map((color) => (
                    <option key={color.color_id} value={color.color_id}>
                      {color.color_nombre}
                    </option>
                  ))}
                </select>
                <select
                  id={`pedidos[${index}].id_tela`}
                  defaultValue={field.id_tela || ""}
                  {...register(`pedidos[${index}].id_tela`, { required: true })}
                  className="py-[12px] px-[20px] w-full rounded-lg"
                >
                  <option value="" disabled>
                    Seleccione una opción...
                  </option>
                  {telas.map((tela) => (
                    <option key={tela.tela_id} value={tela.tela_id}>
                      {tela.tela_nombre}
                    </option>
                  ))}
                </select>
                <select
                  id={`pedidos[${index}].talle`}
                  defaultValue={field.talle || ""}
                  {...register(`pedidos[${index}].talle`, { required: true })}
                  className="py-[12px] px-[20px] w-full rounded-lg"
                >
                  <option value="" disabled>
                    Seleccione una opción...
                  </option>
                  {talles.map((option) => (
                    <option key={option.talle_id} value={option.talle_nombre}>
                      {option.talle_nombre}
                    </option>
                  ))}
                </select>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`pedidos[${index}].cinta_reflectiva`}
                    defaultChecked={field.cinta_reflectiva}
                    {...register(`pedidos[${index}].cinta_reflectiva`)}
                    className="mr-2"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`pedidos[${index}].logo_frente`}
                    defaultChecked={field.logo_frente}
                    {...register(`pedidos[${index}].logo_frente`)}
                    className="mr-2"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`pedidos[${index}].logo_espalda`}
                    defaultChecked={field.logo_espalda}
                    {...register(`pedidos[${index}].logo_espalda`)}
                    className="mr-2"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="border-2 border-mainColor text-black py-2 px-4 rounded-lg bg-transparent hover:border-red-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Eliminar
                </button>
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>

        {/*boton Lote*/}
        <button
          type="button"
          onClick={() => append({})}
          className="text-blue-500"
        >
          Añadir nuevo lote
        </button>

        <div className="w-full flex justify-end gap-2 mt-8">
          <Link className="border border-mainColor rounded-lg p-2" to={"/"}>
            Cancelar
          </Link>
          <button
            type="submit"
            className="bg-mainColor rounded-lg p-2 text-black hover:bg-orange-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {mode === "update"
              ? "Actualizar Orden de Trabajo"
              : "Guardar Orden de Trabajo"}
          </button>
        </div>
      </form>
    </div>
  );
}

FormOT.propTypes = {
  mode: PropTypes.string,
  otId: PropTypes.string,
};
