interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string;
}

let catalogo: Libro[] = [
    { isbn: "1", titulo: "El principito", autor: "Saint-Exupery", precio: 100, disponible: true },
    { isbn: "2", titulo: "1984", autor: "Orwell", precio: 200, disponible: false }
];

// DOM
const lista = document.getElementById("listado") as HTMLUListElement;
const stats = document.getElementById("stats") as HTMLElement;
const inputFiltro = document.getElementById("filtroAutor") as HTMLInputElement;

const btnFiltrar = document.getElementById("filtrar") as HTMLButtonElement;
const btnDisponibles = document.getElementById("mostrarDisponibles") as HTMLButtonElement;
const btnTodos = document.getElementById("mostrarTodos") as HTMLButtonElement;

// FORM
const inputTitulo = document.getElementById("titulo") as HTMLInputElement;
const inputAutor = document.getElementById("autor") as HTMLInputElement;
const inputPrecio = document.getElementById("precio") as HTMLInputElement;
const inputDisponible = document.getElementById("disponible") as HTMLInputElement;
const btnAgregar = document.getElementById("agregar") as HTMLButtonElement;
const errorForm = document.getElementById("errorForm") as HTMLElement;

// FUNCIONES EJ2 reutilizadas
function buscarPorAutor(autor: string): Libro[] {
    return catalogo.filter(l =>
        l.autor.toLowerCase().includes(autor.toLowerCase())
    );
}

function librosDisponibles(): Libro[] {
    return catalogo.filter(l => l.disponible);
}

function precioPromedio(libros: Libro[]): number {
    let suma = 0;
    for (let l of libros) suma += l.precio;
    return libros.length ? suma / libros.length : 0;
}

// NUEVAS FUNCIONES (ABM)

function agregarLibro(libro: Libro): void {
    catalogo.push(libro);
    renderizar(catalogo);
}

function eliminarLibro(isbn: string): void {
    catalogo = catalogo.filter(l => l.isbn !== isbn);
    renderizar(catalogo);
}

function validarFormulario(): Libro | null {
    const titulo = inputTitulo.value.trim();
    const autor = inputAutor.value.trim();
    const precio = Number(inputPrecio.value);
    const disponible = inputDisponible.checked;

    if (!titulo || !autor || isNaN(precio) || precio <= 0) {
        return null;
    }

    const nuevoLibro: Libro = {
        isbn: "AUTO-" + Date.now(),
        titulo,
        autor,
        precio,
        disponible
    };

    return nuevoLibro;
}

// RENDER
function renderizar(libros: Libro[]): void {
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
(window as any).eliminarLibro = eliminarLibro;
