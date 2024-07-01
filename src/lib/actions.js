import { showToast } from "./utils.js";

const url = "http://localhost:8080/api";

export async function guardarOrdenTrabajo(ordenTrabajo) {
  try {
    const response = await fetch(`${url}/ots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ordenTrabajo),
    });

    if (response.status === 201) {
      const data = await response.json();
      showToast("success", `Orden de trabajo guardada con éxito, ID: ${data.id}`, "dark");
    } else {
      showToast("error", "Error al guardar la orden de trabajo", "dark");
    }
  } catch (error) {
    showToast("error", "Error al guardar la orden de trabajo", "dark");
  }
}

export async function modificarOrdenTrabajo(id, ordenTrabajo) {
  try {
    const response = await fetch(`${url}/ots/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ordenTrabajo),
    });

    if (response.status === 200) {
      showToast("success", "Orden de trabajo modificada con éxito", "dark");
    } else {
      showToast("error", "Error al modificar la orden de trabajo", "dark");
    }
  } catch (error) {
    showToast("error", "Error al modificar la orden de trabajo", "dark");
  }
}

export async function eliminarOrdenTrabajo(id, setUpdate, update) {
  try {
    const response = await fetch(`${url}/ots/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      setUpdate(!update);
    } else {
      showToast("error", "Error al eliminar la orden de trabajo", "dark");
    }
  } catch (error) {
    showToast("error", "Error al eliminar la orden de trabajo", "dark");
  }
}

export async function guardarColor(color) {
  try {
    const response = await fetch(`${url}/colores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(color),
    });

    if (response.status === 201) {
      showToast("success", "Color guardado con éxito", "dark");
    } else {
      showToast("error", "Error al guardar el color", "dark");
    }
  } catch (error) {
    showToast("error", "Error al guardar el color", "dark");
  }
}

export async function modificarColor(color) {
  try {
    const response = await fetch(`${url}/colores/${color.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(color),
    });

    if (response.status === 200) {
      showToast("success", "Color modificado con éxito", "dark");
    } else {
      showToast("error", "Error al modificar el color", "dark");
    }
  } catch (error) {
    showToast("error", "Error al modificar el color", "dark");
  }
}

export async function eliminarColor(id) {
  try {
    const response = await fetch(`${url}/colores/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      showToast("success", "Color eliminado con éxito", "dark");
    } else {
      showToast("error", "Error al eliminar el color", "dark");
    }
  } catch (error) {
    showToast("error", "Error al eliminar el color", "dark");
  }
}

export async function guardarPrenda(prenda) {
  try {
    const response = await fetch(`${url}/prendas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prenda),
    });

    if (response.status === 201) {
      showToast("success", "Prenda guardada con éxito", "dark");
    } else {
      showToast("error", "Error al guardar la prenda", "dark");
    }
  } catch (error) {
    showToast("error", "Error al guardar la prenda", "dark");
  }
}

export async function modificarPrenda(prenda) {
  try {
    const response = await fetch(`${url}/prendas/${prenda.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prenda),
    });

    if (response.status === 200) {
      showToast("success", "Prenda modificada con éxito", "dark");
    } else {
      showToast("error", "Error al modificar la prenda", "dark");
    }
  } catch (error) {
    showToast("error", "Error al modificar la prenda", "dark");
  }
}

export async function eliminarPrenda(id) {
  try {
    const response = await fetch(`${url}/prendas/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      showToast("success", "Prenda eliminada con éxito", "dark");
    } else {
      showToast("error", "Error al eliminar la prenda", "dark");
    }
  } catch (error) {
    showToast("error", "Error al eliminar la prenda", "dark");
  }
}

export async function guardarTela(tela) {
  try {
    const response = await fetch(`${url}/telas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tela),
    });

    if (response.status === 201) {
      showToast("success", "Tela guardada con éxito", "dark");
    } else {
      showToast("error", "Error al guardar la tela", "dark");
    }
  } catch (error) {
    showToast("error", "Error al guardar la tela", "dark");
  }
}

export async function modificarTela(tela) {
  try {
    const response = await fetch(`${url}/telas/${tela.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tela),
    });

    if (response.status === 200) {
      showToast("success", "Tela modificada con éxito", "dark");
    } else {
      showToast("error", "Error al modificar la tela", "dark");
    }
  } catch (error) {
    showToast("error", "Error al modificar la tela", "dark");
  }
}

export async function eliminarTela(id) {
  try {
    const response = await fetch(`${url}/telas/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      showToast("success", "Tela eliminada con éxito", "dark");
    } else {
      showToast("error", "Error al eliminar la tela", "dark");
    }
  } catch (error) {
    showToast("error", "Error al eliminar la tela", "dark");
  }
}