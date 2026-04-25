"use strict";
let catalogo = [
    { isbn: "1", titulo: "El principito", autor: "Saint-Exupery", precio: 100, disponible: true },
    { isbn: "2", titulo: "1984", autor: "Orwell", precio: 200, disponible: false }
];
// DOM
const lista = document.getElementById("listado");
const stats = document.getElementById("stats");
const inputFiltro = document.getElementById("filtroAutor");
const btnFiltrar = document.getElementById("filtrar");
const btnDisponibles = document.getElementById("mostrarDisponibles");
const btnTodos = document.getElementById("mostrarTodos");
// FORM
const inputTitulo = document.getElementById("titulo");
const inputAutor = document.getElementById("autor");
const inputPrecio = document.getElementById("precio");
const inputDisponible = document.getElementById("disponible");
const btnAgregar = document.getElementById("agregar");
const errorForm = document.getElementById("errorForm");
// FUNCIONES EJ2 reutilizadas
function buscarPorAutor(autor) {
    return catalogo.filter(l => l.autor.toLowerCase().includes(autor.toLowerCase()));
}
function librosDisponibles() {
    return catalogo.filter(l => l.disponible);
}
function precioPromedio(libros) {
    let suma = 0;
    for (let l of libros)
        suma += l.precio;
    return libros.length ? suma / libros.length : 0;
}
// NUEVAS FUNCIONES (ABM)
function agregarLibro(libro) {
    catalogo.push(libro);
    renderizar(catalogo);
}
function eliminarLibro(isbn) {
    catalogo = catalogo.filter(l => l.isbn !== isbn);
    renderizar(catalogo);
}
function validarFormulario() {
    const titulo = inputTitulo.value.trim();
    const autor = inputAutor.value.trim();
    const precio = Number(inputPrecio.value);
    const disponible = inputDisponible.checked;
    if (!titulo || !autor || isNaN(precio) || precio <= 0) {
        return null;
    }
    const nuevoLibro = {
        isbn: "AUTO-" + Date.now(),
        titulo,
        autor,
        precio,
        disponible
    };
    return nuevoLibro;
}
// RENDER
function renderizar(libros) {
    let html = "";
    for (let l of libros) {
        html += `
        <li>
            ${l.titulo} - ${l.autor} - $${l.precio}
            <button onclick="eliminarLibro('${l.isbn}')">Eliminar</button>
        </li>`;
    }
    lista.innerHTML = html;
    stats.textContent = `Cantidad: ${libros.length} | Promedio: $${precioPromedio(libros)}`;
}
// EVENTOS
btnFiltrar.addEventListener("click", () => {
    renderizar(buscarPorAutor(inputFiltro.value));
});
btnDisponibles.addEventListener("click", () => {
    renderizar(librosDisponibles());
});
btnTodos.addEventListener("click", () => {
    renderizar(catalogo);
});
btnAgregar.addEventListener("click", () => {
    const libro = validarFormulario();
    if (!libro) {
        errorForm.textContent = "Datos inválidos. Revisá los campos.";
        return;
    }
    errorForm.textContent = "";
    agregarLibro(libro);
    // limpiar form
    inputTitulo.value = "";
    inputAutor.value = "";
    inputPrecio.value = "";
    inputDisponible.checked = false;
});
// inicial
renderizar(catalogo);
// 
window.eliminarLibro = eliminarLibro;
