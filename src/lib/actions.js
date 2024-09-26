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
      showToast(
        "success",
        `Orden de trabajo guardada con éxito, ID: ${data.id}`,
        "dark"
      );
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

export async function guardarColor(color, setUpdate, update) {
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
      setUpdate(!update);
    } else {
      const data = await response.json();
      showToast("error", data.error, "dark");
    }
  } catch (error) {
    showToast("error", error, "dark");
  }
}

export async function modificarColor(color, setUpdate, update) {
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
      setUpdate(!update);
    } else {
      const data = await response.json();
      showToast("error", data.error, "dark");
    }
  } catch (error) {
    showToast("error", "Error al modificar el color", "dark");
  }
}

export async function eliminarColor(id, setUpdate, update) {
  try {
    const response = await fetch(`${url}/colores/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      setUpdate(!update);
    } else {
      showToast("error", "Error al eliminar el color", "dark");
    }
  } catch (error) {
    showToast("error", "Error al eliminar el color", "dark");
  }
}

export async function guardarPrenda(prenda, setUpdate, update) {
  try {
    const response = await fetch(`${url}/prendas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prenda),
    });

    if (response.status === 201) {
      setUpdate(!update);
      showToast("success", "Prenda guardada con éxito", "dark");
    } else {
      showToast("error", "Error al guardar la prenda", "dark");
    }
  } catch (error) {
    showToast("error", "Error al guardar la prenda", "dark");
  }
}

export async function modificarPrenda(prenda, setUpdate, update) {
  try {
    const response = await fetch(`${url}/prendas/${prenda.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prenda),
    });

    if (response.status === 200) {
      setUpdate(!update);
      showToast("success", "Prenda modificada con éxito", "dark");
    } else {
      showToast("error", "Error al modificar la prenda", "dark");
    }
  } catch (error) {
    showToast("error", "Error al modificar la prenda", "dark");
  }
}

export async function eliminarPrenda(id, setUpdate, update) {
  try {
    const response = await fetch(`${url}/prendas/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      setUpdate(!update);
      showToast("success", "Prenda eliminada con éxito", "dark");
    } else {
      showToast("error", "Error al eliminar la prenda", "dark");
    }
  } catch (error) {
    showToast("error", "Error al eliminar la prenda", "dark");
  }
}

export async function guardarTela(tela, setUpdate, update) {
  try {
    const response = await fetch(`${url}/telas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tela),
    });

    if (response.status === 201) {
      setUpdate(!update);
      showToast("success", "Tela guardada con éxito", "dark");
    } else {
      showToast("error", "Error al guardar la tela", "dark");
    }
  } catch (error) {
    showToast("error", "Error al guardar la tela", "dark");
  }
}

export async function modificarTela(tela, setUpdate, update) {
  try {
    const response = await fetch(`${url}/telas/${tela.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tela),
    });

    if (response.status === 200) {
      setUpdate(!update);
      showToast("success", "Tela modificada con éxito", "dark");
    } else {
      showToast("error", "Error al modificar la tela", "dark");
    }
  } catch (error) {
    showToast("error", "Error al modificar la tela", "dark");
  }
}

export async function eliminarTela(id, setUpdate, update) {
  try {
    const response = await fetch(`${url}/telas/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      setUpdate(!update);
      showToast("success", "Tela eliminada con éxito", "dark");
    } else {
      showToast("error", "Error al eliminar la tela", "dark");
    }
  } catch (error) {
    showToast("error", "Error al eliminar la tela", "dark");
  }
}

export async function guardarTalle(talle, setUpdate, update) {
  try {
    const response = await fetch(`${url}/talles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(talle),
    });

    if (response.status === 201) {
      setUpdate(!update);
      showToast("success", "Talle guardado con éxito", "dark");
    } else {
      showToast("error", "Error al guardar el talle", "dark");
    }
  } catch (error) {
    showToast("error", "Error al guardar el talle", "dark");
  }
}

export async function modificarTalle(talle, setUpdate, update) {
  try {
    const response = await fetch(`${url}/talles/${talle.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(talle),
    });

    if (response.status === 200) {
      setUpdate(!update);
      showToast("success", "Talle modificado con éxito", "dark");
    } else {
      showToast("error", "Error al modificar el talle", "dark");
    }
  } catch (error) {
    showToast("error", "Error al modificar el talle", "dark");
  }
}

export async function eliminarTalle(id, setUpdate, update) {
  try {
    const response = await fetch(`${url}/talles/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      setUpdate(!update);
      showToast("success", "Talle eliminado con éxito", "dark");
    } else {
      showToast("error", "Error al eliminar el talle", "dark");
    }
  } catch (error) {
    showToast("error", "Error al eliminar el talle", "dark");
  }
}
