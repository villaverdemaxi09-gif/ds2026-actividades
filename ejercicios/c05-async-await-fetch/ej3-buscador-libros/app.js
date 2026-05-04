"use strict";
async function buscarLibros(query) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error en la búsqueda: ${response.status}`);
    }
    const data = (await response.json());
    return data.docs;
}
function mostrarError(mensaje) {
    const el = document.getElementById("error");
    el.textContent = mensaje;
    el.style.display = "block";
}
function ocultarError() {
    const el = document.getElementById("error");
    el.textContent = "";
    el.style.display = "none";
}
function mostrarCargando(visible) {
    const el = document.getElementById("cargando");
    el.style.display = visible ? "block" : "none";
}
function renderizarLibros(libros) {
    const contenedor = document.getElementById("resultados");
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
async function manejarBusqueda() {
    const input = document.getElementById("buscador");
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
    }
    catch (e) {
        mostrarError("Ocurrió un error al buscar. Revisá tu conexión.");
    }
    finally {
        mostrarCargando(false);
    }
}
const boton = document.getElementById("btn-buscar");
boton.addEventListener("click", manejarBusqueda);
const input = document.getElementById("buscador");
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter")
        manejarBusqueda();
});
