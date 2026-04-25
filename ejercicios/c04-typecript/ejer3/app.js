"use strict";
// ARRAY EN MEMORIA
let catalogo = [
    { isbn: "1", titulo: "1984", autor: "Orwell", precio: 200, disponible: true },
    { isbn: "2", titulo: "It", autor: "Stephen King", precio: 300, disponible: false }
];
// DOM
const lista = document.getElementById("listado");
const stats = document.getElementById("stats");
const errorDiv = document.getElementById("errorForm");
// INPUTS
const inputTitulo = document.getElementById("titulo");
const inputAutor = document.getElementById("autor");
const inputPrecio = document.getElementById("precio");
const inputGenero = document.getElementById("genero");
const inputDisponible = document.getElementById("disponible");
const btnAgregar = document.getElementById("agregar");
// FUNCIONES
function agregarLibro(libro) {
    catalogo.push(libro);
    renderizar(catalogo);
}
function eliminarLibro(isbn) {
    catalogo = catalogo.filter(libro => libro.isbn !== isbn);
    renderizar(catalogo);
}
function precioPromedio(libros) {
    let suma = 0;
    for (let l of libros) {
        suma += l.precio;
    }
    return libros.length ? suma / libros.length : 0;
}
function renderizar(libros) {
    lista.innerHTML = "";
    for (let libro of libros) {
        lista.innerHTML += `
            <li>
                ${libro.titulo} - ${libro.autor} - $${libro.precio}
                (${libro.disponible ? "Disponible" : "No disponible"})
                <button onclick="eliminarLibro('${libro.isbn}')">Eliminar</button>
            </li>
        `;
    }
    stats.textContent = `Cantidad: ${libros.length} | Promedio: $${precioPromedio(libros)}`;
}
function validarFormulario() {
    let titulo = inputTitulo.value.trim();
    let autor = inputAutor.value.trim();
    let precio = Number(inputPrecio.value);
    let genero = inputGenero.value.trim();
    let disponible = inputDisponible.checked;
    if (!titulo || !autor || precio <= 0) {
        errorDiv.textContent = "Datos inválidos";
        return null;
    }
    errorDiv.textContent = "";
    return {
        isbn: "AUTO-" + Date.now(),
        titulo,
        autor,
        precio,
        disponible,
        genero: genero || undefined
    };
}
// EVENTO AGREGAR
btnAgregar.addEventListener("click", () => {
    const libro = validarFormulario();
    if (!libro)
        return;
    agregarLibro(libro);
    // limpiar form
    inputTitulo.value = "";
    inputAutor.value = "";
    inputPrecio.value = "";
    inputGenero.value = "";
    inputDisponible.checked = false;
});
// INICIAL
renderizar(catalogo);
