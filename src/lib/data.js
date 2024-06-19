const url = "http://localhost:8080/api";

export async function fetchOrdenesTrabajo(limit, page) {
  const params = { limit, page };
  const query = new URLSearchParams(params).toString();

  const urlFetch = `${url}/ots?${query}`;
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