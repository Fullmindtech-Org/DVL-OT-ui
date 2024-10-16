export const url = "http://localhost:8080/api";

export async function fetchOrdenesTrabajo(limit, page, query) {
  const params = { limit, page, ...(query && { query }) };
  const queryString = new URLSearchParams(params).toString();

  const urlFetch = `${url}/ots?${queryString}`;
  try {
    const response = await fetch(urlFetch);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

export async function fetchOrdenTrabajo(id) {
  const urlFetch = `${url}/ots/${id}`;
  try {
    const response = await fetch(urlFetch);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

export async function fetchColores(limit, page) {
  const params = { limit, page };
  const query = new URLSearchParams(params).toString();

  const urlFetch = `${url}/colores?${query}`;
  try {
    const response = await fetch(urlFetch);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

export async function fetchColor(id) {
  const urlFetch = `${url}/colores/${id}`;
  try {
    const response = await fetch(urlFetch);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

export async function fetchPrendas(limit, page) {
  const params = { limit, page };
  const query = new URLSearchParams(params).toString();

  const urlFetch = `${url}/prendas?${query}`;
  try {
    const response = await fetch(urlFetch);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

export async function fetchPrenda(id) {
  const urlFetch = `${url}/prendas/${id}`;
  try {
    const response = await fetch(urlFetch);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

export async function fetchTelas(limit, page) {
  const params = { limit, page };
  const query = new URLSearchParams(params).toString();

  const urlFetch = `${url}/telas?${query}`;
  try {
    const response = await fetch(urlFetch);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

export async function fetchTela(id) {
  const urlFetch = `${url}/telas/${id}`;
  try {
    const response = await fetch(urlFetch);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

export async function fetchTalles(limit, page) {
  const params = { limit, page };
  const query = new URLSearchParams(params).toString();

  const urlFetch = `${url}/talles?${query}`;
  try {
    const response = await fetch(urlFetch);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

export async function fetchTalle(id) {
  const urlFetch = `${url}/talles/${id}`;
  try {
    const response = await fetch(urlFetch);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

export async function fetchClientes(limit, page) {
  const params = { limit, page };
  const query = new URLSearchParams(params).toString();

  const urlFetch = `${url}/clientes?${query}`;
  try {
    const response = await fetch(urlFetch);
    if (!response.ok) {
      throw new Error("Error al obtener los datos de los clientes");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

export async function fetchCliente(id) {
  const urlFetch = `${url}/clientes/${id}`;
  try {
    const response = await fetch(urlFetch);
    if (!response.ok) {
      throw new Error("Error al obtener los datos del cliente");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
}
