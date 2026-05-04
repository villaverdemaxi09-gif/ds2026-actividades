interface LibroOL {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
}

interface RespuestaOL {
  docs: LibroOL[];
}

async function buscarLibros(query: string): Promise<LibroOL[]> {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error en la búsqueda: ${response.status}`);
  }

  const data = (await response.json()) as RespuestaOL;
  return data.docs;
}

function mostrarError(mensaje: string): void {
  const el = document.getElementById("error") as HTMLElement;
  el.textContent = mensaje;
  el.style.display = "block";
}

function ocultarError(): void {
  const el = document.getElementById("error") as HTMLElement;
  el.textContent = "";
  el.style.display = "none";
}

function mostrarCargando(visible: boolean): void {
  const el = document.getElementById("cargando") as HTMLElement;
  el.style.display = visible ? "block" : "none";
}

function renderizarLibros(libros: LibroOL[]): void {
  const contenedor = document.getElementById("resultados") as HTMLElement;
  contenedor.innerHTML = "";

  if (libros.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  libros.forEach((libro) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";

    const titulo = document.createElement("h3");
    titulo.textContent = libro.title;

    const autor = document.createElement("p");
    autor.textContent = libro.author_name
      ? `Autor: ${libro.author_name[0]}`
      : "Autor: desconocido";

    const anio = document.createElement("p");
    anio.textContent = libro.first_publish_year
      ? `Año: ${libro.first_publish_year}`
      : "Año: desconocido";

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(autor);
    tarjeta.appendChild(anio);
    contenedor.appendChild(tarjeta);
  });
}

async function manejarBusqueda(): Promise<void> {
  const input = document.getElementById("buscador") as HTMLInputElement;
  const query = input.value.trim();

  if (!query) {
    mostrarError("Por favor ingresá un término de búsqueda.");
    return;
  }

  ocultarError();
  mostrarCargando(true);

  try {
    const libros = await buscarLibros(query);
    renderizarLibros(libros);
  } catch (e) {
    mostrarError("Ocurrió un error al buscar. Revisá tu conexión.");
  } finally {
    mostrarCargando(false);
  }
}

const boton = document.getElementById("btn-buscar") as HTMLButtonElement;
boton.addEventListener("click", manejarBusqueda);

const input = document.getElementById("buscador") as HTMLInputElement;
input.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Enter") manejarBusqueda();
});
