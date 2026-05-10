const input = document.getElementById("input-busqueda");
const boton = document.getElementById("btn-buscar");
const resultados = document.getElementById("resultados");

async function buscarLibros() {
  const query = input.value.trim();

  if (!query) {
    resultados.innerHTML = "<p>Por favor ingresá un término de búsqueda.</p>";
    return;
  }

  resultados.innerHTML = "<p>Cargando...</p>";

  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=6`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    if (datos.docs.length === 0) {
      resultados.innerHTML = "<p>No se encontraron libros.</p>";
      return;
    }

    resultados.innerHTML = "";

    datos.docs.forEach((libro) => {
      const autor = libro.author_name ? libro.author_name[0] : "Autor desconocido";
      const imagen = libro.cover_i
        ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`
        : "https://via.placeholder.com/150x200?text=Sin+imagen";

      const card = `
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <img src="${imagen}" class="card-img-top" alt="${libro.title}">
            <div class="card-body">
              <h5 class="card-title">${libro.title}</h5>
              <p class="card-text">${autor}</p>
              <a href="libro.html" class="btn btn-primary">Ver más</a>
            </div>
          </div>
        </div>
      `;
      resultados.innerHTML += card;
    });

  } catch (error) {
    resultados.innerHTML = "<p>Hubo un error al buscar. Intentá de nuevo.</p>";
  }
}

boton.addEventListener("click", buscarLibros);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") buscarLibros();
});
