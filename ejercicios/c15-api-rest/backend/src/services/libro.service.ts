import type { Libro } from "../types/libro.types";

const libros: Libro[] = [
  {
    id: 1,
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 4500,
    imagen: "https://...",
    disponible: false,
  },
  {
    id: 2,
    titulo: "100 años de soledad",
    autor: "Gabriel García Márquez",
    precio: 6000,
    imagen: "https://...",
    disponible: true,
  },
  {
    id: 3,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    precio: 6000,
    imagen: "https://...",
    disponible: false,
  },
  {
    id: 4,
    titulo: "El túnel",
    autor: "Ernesto Sabato",
    precio: 5000,
    imagen: "https://...",
    disponible: true,
  },
];

export function findAll(disponible?: boolean): Libro[] {
  if (disponible === undefined) {
    return libros;
  }

  return libros.filter((libro) => libro.disponible === disponible);
}

export function findById(id: number): Libro | undefined {
  return libros.find((libro) => libro.id === id);
}
