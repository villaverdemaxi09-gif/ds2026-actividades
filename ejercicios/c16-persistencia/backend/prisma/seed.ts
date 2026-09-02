import { prisma } from "../src/config/prisma";

const libros = [
  {
    titulo: "El Aleph",
    autor: "Jorge Luis Borges",
    precio: 15000,
    imagen: "https://covers.openlibrary.org/b/id/8231856-M.jpg",
    disponible: true,
  },
  {
    titulo: "Rayuela",
    autor: "Julio Cortazar",
    precio: 18000,
    imagen: "https://covers.openlibrary.org/b/id/8226574-M.jpg",
    disponible: true,
  },
  {
    titulo: "Ficciones",
    autor: "Jorge Luis Borges",
    precio: 14000,
    imagen: "https://covers.openlibrary.org/b/id/8294930-M.jpg",
    disponible: false,
  },
  {
    titulo: "Cien anos de soledad",
    autor: "Gabriel Garcia Marquez",
    precio: 20000,
    imagen: "https://covers.openlibrary.org/b/id/8228691-M.jpg",
    disponible: true,
  },
];

const autores = [
  {
    nombre: "Antoine de Saint-Exupéry",
    nacionalidad: "Francia",
  },
  {
    nombre: "Gabriel García Márquez",
    nacionalidad: "Colombia",
  },
  {
    nombre: "Ernesto Sabato",
    nacionalidad: "Argentina",
  },
];

async function main() {
  await prisma.libro.createMany({
    data: libros,
  });

  await prisma.autor.createMany({
    data: autores,
  });
}

main();
