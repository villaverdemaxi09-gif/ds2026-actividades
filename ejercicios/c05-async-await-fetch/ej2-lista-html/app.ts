interface Usuario {
  id: number;
  name: string;
  email: string;
  phone: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error(`Error al obtener usuarios: ${response.status}`);
  }

  const usuarios = (await response.json()) as Usuario[];
  return usuarios;
}

(async () => {
  const cargando = document.getElementById("cargando") as HTMLElement;
  const error = document.getElementById("error") as HTMLElement;
  const lista = document.getElementById("lista") as HTMLElement;

  try {
    const usuarios = await obtenerUsuarios();

    usuarios.forEach((usuario) => {
      const li = document.createElement("li");
      li.textContent = `${usuario.name} | ${usuario.email}`;
      lista.appendChild(li);
    });

  } catch (e) {
    error.textContent = "Error al cargar los usuarios.";
    error.style.display = "block";

  } finally {
    cargando.style.display = "none";
  }
})();
