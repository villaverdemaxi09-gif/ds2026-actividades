"use strict";
let catalogo = [
    { isbn: "1", titulo: "El principito", autor: "Saint-Exupéry", precio: 100, disponible: true },
    { isbn: "2", titulo: "1984", autor: "Orwell", precio: 200, disponible: false },
    { isbn: "3", titulo: "It", autor: "Stephen King", precio: 300, disponible: true }
];
function buscarPorAutor(autor) {
    return catalogo.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
}
function librosDisponibles() {
    return catalogo.filter(libro => libro.disponible);
}
function precioPromedio(libros) {
    let suma = 0;
    for (let libro of libros) {
        suma += libro.precio;
    }
    return libros.length ? suma / libros.length : 0;
}
const lista = document.getElementById("listado");
const stats = document.getElementById("stats");
function renderizar(libros) {
    lista.innerHTML = "";
    for (let libro of libros) {
        lista.innerHTML += `<li>${libro.titulo} - ${libro.autor} - $${libro.precio}</li>`;
    }
    stats.textContent = `Cantidad: ${libros.length} | Promedio: $${precioPromedio(libros)}`;
}
const input = document.getElementById("filtroAutor");
const btnFiltrar = document.getElementById("filtrar");
const btnDisponibles = document.getElementById("mostrarDisponibles");
const btnTodos = document.getElementById("mostrarTodos");
btnFiltrar.addEventListener("click", () => {
    renderizar(buscarPorAutor(input.value));
});
btnDisponibles.addEventListener("click", () => {
    renderizar(librosDisponibles());
});
btnTodos.addEventListener("click", () => {
    renderizar(catalogo);
});
renderizar(catalogo);
