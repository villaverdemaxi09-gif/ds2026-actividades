import type { Libro } from "../types/libro.types";

const libros: Libro[] = [
  {
    id: 1,
    titulo: "El Aleph",
    autor: "Jorge Luis Borges",
    precio: 15000,
    imagen: "https://covers.openlibrary.org/b/id/8231856-M.jpg",
    disponible: true,
  },
  {
    id: 2,
    titulo: "Rayuela",
    autor: "Julio Cortazar",
    precio: 18000,
    imagen: "https://covers.openlibrary.org/b/id/8226574-M.jpg",
    disponible: true,
  },
  {
    id: 3,
    titulo: "Ficciones",
    autor: "Jorge Luis Borges",
    precio: 14000,
    imagen: "https://covers.openlibrary.org/b/id/8294930-M.jpg",
    disponible: false,
  },
  {
    id: 4,
    titulo: "Cien anos de soledad",
    autor: "Gabriel Garcia Marquez",
    precio: 20000,
    imagen: "https://covers.openlibrary.org/b/id/8228691-M.jpg",
    disponible: true,
  },
];

let proximoId = 5;

export function findAll(disponible?: boolean): Libro[] {
  if (disponible === undefined) {
    return libros;
  }

  return libros.filter((libro) => libro.disponible === disponible);
}

export function findById(id: number): Libro | undefined {
  return libros.find((libro) => libro.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
  const nuevoLibro: Libro = {
    id: proximoId++,
    ...datos,
  };

  libros.push(nuevoLibro);

  return nuevoLibro;
}

export function update(
  id: number,
  datos: Omit<Libro, "id">,
): Libro | undefined {
  const posicion = libros.findIndex((libro) => libro.id === id);

  if (posicion === -1) {
    return undefined;
  }

  const libroActualizado: Libro = {
    id,
    ...datos,
  };

  libros[posicion] = libroActualizado;

  return libroActualizado;
}

export function remove(id: number): boolean {
  const posicion = libros.findIndex((libro) => libro.id === id);

  if (posicion === -1) {
    return false;
  }

  libros.splice(posicion, 1);

  return true;
}
