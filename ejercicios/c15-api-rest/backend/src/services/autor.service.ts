import type { Autor } from "../types/autor.types";

const autores: Autor[] = [
  {
    id: 1,
    nombre: "Antoine de Saint-Exupéry",
    nacionalidad: "Francia",
  },
  {
    id: 2,
    nombre: "Gabriel García Márquez",
    nacionalidad: "Colombia",
  },
  {
    id: 3,
    nombre: "Ernesto Sabato",
    nacionalidad: "Argentina",
  },
];

let proximoId = 4;

export function findAll(): Autor[] {
  return autores;
}

export function findById(id: number): Autor | undefined {
  return autores.find((autor) => autor.id === id);
}

export function create(datos: Omit<Autor, "id">): Autor {
  const nuevoAutor: Autor = {
    id: proximoId++,
    ...datos,
  };

  autores.push(nuevoAutor);

  return nuevoAutor;
}

export function update(
  id: number,
  datos: Omit<Autor, "id">,
): Autor | undefined {
  const posicion = autores.findIndex((autor) => autor.id === id);

  if (posicion === -1) {
    return undefined;
  }

  const autorActualizado: Autor = {
    id,
    ...datos,
  };

  autores[posicion] = autorActualizado;

  return autorActualizado;
}

export function remove(id: number): boolean {
  const posicion = autores.findIndex((autor) => autor.id === id);

  if (posicion === -1) {
    return false;
  }

  autores.splice(posicion, 1);

  return true;
}
