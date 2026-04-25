interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string; // opcional
}
let catalogo: Libro[] = [
    { isbn: "1", titulo: "El principito", autor: "Saint-Exupéry", precio: 100, disponible: true },
    { isbn: "2", titulo: "1984", autor: "Orwell", precio: 200, disponible: false },
    { isbn: "3", titulo: "It", autor: "Stephen King", precio: 300, disponible: true }
];
function buscarPorAutor(autor: string): Libro[] {
    return catalogo.filter(libro => 
        libro.autor.toLowerCase().includes(autor.toLowerCase())
    );
}
function librosDisponibles(): Libro[] {
    return catalogo.filter(libro => libro.disponible);
}
function precioPromedio(libros: Libro[]): number {
    let suma: number = 0;

    for (let libro of libros) {
        suma += libro.precio;
    }

    return libros.length ? suma / libros.length : 0;
}
const lista = document.getElementById("listado") as HTMLElement;
const stats = document.getElementById("stats") as HTMLElement;

function renderizar(libros: Libro[]): void {
    lista.innerHTML = "";

    for (let libro of libros) {
        lista.innerHTML += `<li>${libro.titulo} - ${libro.autor} - $${libro.precio}</li>`;
    }

    stats.textContent = `Cantidad: ${libros.length} | Promedio: $${precioPromedio(libros)}`;
}
const input = document.getElementById("filtroAutor") as HTMLInputElement;
const btnFiltrar = document.getElementById("filtrar") as HTMLButtonElement;
const btnDisponibles = document.getElementById("mostrarDisponibles") as HTMLButtonElement;
const btnTodos = document.getElementById("mostrarTodos") as HTMLButtonElement;

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
