"use strict";
async function obtenerUsuarios() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
        throw new Error(`Error al obtener usuarios: ${response.status}`);
    }
    const usuarios = (await response.json());
    return usuarios;
}
(async () => {
    const cargando = document.getElementById("cargando");
    const error = document.getElementById("error");
    const lista = document.getElementById("lista");
    try {
        const usuarios = await obtenerUsuarios();
        usuarios.forEach((usuario) => {
            const li = document.createElement("li");
            li.textContent = `${usuario.name} | ${usuario.email}`;
            lista.appendChild(li);
        });
    }
    catch (e) {
        error.textContent = "Error al cargar los usuarios.";
        error.style.display = "block";
    }
    finally {
        cargando.style.display = "none";
    }
})();
