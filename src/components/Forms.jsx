import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  fetchColores,
  fetchOrdenTrabajo,
  fetchPrendas,
  fetchTelas,
} from "../lib/data";
import { Link } from "react-router-dom";
import { guardarOrdenTrabajo, modificarOrdenTrabajo } from "../lib/actions";
import PropTypes from "prop-types";
import { showToast } from "../lib/utils";

const talles = [
  "38",
  "40",
  "42",
  "44",
  "46",
  "48",
  "50",
  "52",
  "54",
  "56",
  "58",
  "60",
  "62",
  "64",
  "66",
  "68",
  "70",
  "72",
  "74",
  "76",
  "S",
  "M",
  "L",
  "XL",
  "2XL",
  "3XL",
  "4XL",
  "5XL",
  "8",
  "10",
  "12",
];

export function FormOT({ mode, otId }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const [prendas, setPrendas] = useState([]);
  const [colores, setColores] = useState([]);
  const [telas, setTelas] = useState([]);
  const hasFetchedPrendas = useRef(false);
  const hasFetchedColores = useRef(false);
  const hasFetchedTelas = useRef(false);
  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (data) => {
    if (mode === "update") {
      await modificarOrdenTrabajo(otId, data);
    } else {
      await guardarOrdenTrabajo(data);
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

          setValue("fecha", fechaCreacionFormatted);
          setValue("fecha_probable_entrega", fechaProbableEntregaFormatted);
          setValue("cliente", ot.cliente);
          setValue("prioridad", ot.prioridad);
          setValue("id_prenda", ot.id_prenda);
          setValue("cantidad", ot.cantidad);
          setValue("id_color", ot.id_color);
          setValue("id_tela", ot.id_tela);
          setValue("talle", ot.talle);
          setValue("cinta_reflectiva", ot.cinta_reflectiva);
          setValue("logo_frente", ot.logo_frente);
          setValue("logo_espalda", ot.logo_espalda);
          setValue("cinta_reflectiva", ot.cinta_reflectiva === 1);
          setValue("logo_frente", ot.logo_frente === 1);
          setValue("logo_espalda", ot.logo_espalda === 1);
        } catch (error) {
          showToast("error", "Error al obtener la orden de trabajo");
        }
      }
    };

    fetchAndSetValues();
  }, [mode, otId, setValue]);

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
  }, []);

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
          <span className="text-zinc-600 text-xs mb-1">Cliente</span>
          <input
            id="cliente"
            type="text"
            placeholder="Nombre del cliente..."
            defaultValue=""
            {...register("cliente", { required: true })}
            className="py-[12px] px-[20px] w-full rounded-lg"
          />
          {errors.cliente && (
            <span className="text-red-500 text-xs italic">
              Este campo es obligatorio
            </span>
          )}
        </div>
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
          <span className="text-zinc-600 text-xs mb-1">Prenda</span>
          <select
            id="id_prenda"
            defaultValue=""
            {...register("id_prenda", { required: true })}
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
          {errors.id_prenda && (
            <span className="text-red-500 text-xs italic">
              Este campo es obligatorio
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center items-start">
          <span className="text-zinc-600 text-xs mb-1">Cantidad</span>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            {...register("cantidad", { required: true, min: 1 })}
            className="py-[12px] px-[20px] w-full rounded-lg"
            placeholder="Ingrese la cantidad"
            onChange={(e) => {
              e.target.value = Math.max(1, parseInt(e.target.value)).toString();
            }}
          />
          {errors.cantidad && (
            <span className="text-red-500 text-xs italic">
              Este campo es obligatorio y debe ser mayor que 0
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 items-start">
          <div className="flex flex-col justify-center items-start">
            <span className="text-zinc-600 text-xs mb-1">Color</span>
            <select
              id="id_color"
              defaultValue=""
              {...register("id_color", { required: true })}
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
            {errors.id_color && (
              <span className="text-red-500 text-xs italic">
                Este campo es obligatorio
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center items-start">
            <span className="text-zinc-600 text-xs mb-1">Tela</span>
            <select
              id="id_tela"
              defaultValue=""
              {...register("id_tela", { required: true })}
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
            {errors.id_tela && (
              <span className="text-red-500 text-xs italic">
                Este campo es obligatorio
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center items-start">
            <span className="text-zinc-600 text-xs mb-1">Talle</span>
            <select
              id="talle"
              defaultValue=""
              {...register("talle", { required: true })}
              className="py-[12px] px-[20px] w-full rounded-lg"
            >
              <option value="" disabled>
                Seleccione una opción...
              </option>
              {talles.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.talle && (
              <span className="text-red-500 text-xs italic">
                Este campo es obligatorio
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-2 items-start">
          <span className="text-zinc-600 text-xs mb-1 col-span-3">
            Opciones Adicionales
          </span>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="cinta_reflectiva"
              name="cinta_reflectiva"
              {...register("cinta_reflectiva")}
              className="mr-2"
            />
            <label htmlFor="cinta_reflectiva" className="text-black">
              Cinta reflectiva
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="logo_frente"
              name="logo_frente"
              {...register("logo_frente")}
              className="mr-2"
            />
            <label htmlFor="logo_frente" className="text-black">
              Logo frente
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="logo_espalda"
              name="logo_espalda"
              {...register("logo_espalda")}
              className="mr-2"
            />
            <label htmlFor="logo_espalda" className="text-black">
              Logo espalda
            </label>
          </div>
        </div>
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
