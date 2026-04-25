interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string;
}

// ARRAY EN MEMORIA
let catalogo: Libro[] = [
    { isbn: "1", titulo: "1984", autor: "Orwell", precio: 200, disponible: true },
    { isbn: "2", titulo: "It", autor: "Stephen King", precio: 300, disponible: false }
];

// DOM
const lista = document.getElementById("listado") as HTMLElement;
const stats = document.getElementById("stats") as HTMLElement;
const errorDiv = document.getElementById("errorForm") as HTMLElement;

// INPUTS
const inputTitulo = document.getElementById("titulo") as HTMLInputElement;
const inputAutor = document.getElementById("autor") as HTMLInputElement;
const inputPrecio = document.getElementById("precio") as HTMLInputElement;
const inputGenero = document.getElementById("genero") as HTMLInputElement;
const inputDisponible = document.getElementById("disponible") as HTMLInputElement;

const btnAgregar = document.getElementById("agregar") as HTMLButtonElement;

// FUNCIONES

function agregarLibro(libro: Libro): void {
    catalogo.push(libro);
    renderizar(catalogo);
}

function eliminarLibro(isbn: string): void {
    catalogo = catalogo.filter(libro => libro.isbn !== isbn);
    renderizar(catalogo);
}

function precioPromedio(libros: Libro[]): number {
    let suma = 0;
    for (let l of libros) {
        suma += l.precio;
    }
    return libros.length ? suma / libros.length : 0;
}

function renderizar(libros: Libro[]): void {
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

function validarFormulario(): Libro | null {
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

    if (!libro) return;

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
