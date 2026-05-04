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
  try {
    console.log("Obteniendo usuarios...\n");

    const usuarios = await obtenerUsuarios();

    usuarios.forEach((usuario) => {
      console.log(`Nombre: ${usuario.name} | Email: ${usuario.email}`);
    });

    console.log(`\nTotal: ${usuarios.length} usuarios`);
  } catch (error) {
    console.error("Ocurrió un error:", error);
  }
})();
