import { prisma } from "../src/config/prisma";

const autores = [
  {
    nombre: "Jorge Luis Borges",
    nacionalidad: "Argentina",
  },
  {
    nombre: "Julio Cortázar",
    nacionalidad: "Argentina",
  },
  {
    nombre: "Gabriel García Márquez",
    nacionalidad: "Colombia",
  },
];

const categorias = [
  { nombre: "Cuento" },
  { nombre: "Novela" },
  { nombre: "Ficción" },
];

const libros = [
  {
    titulo: "El Aleph",
    autor: "Jorge Luis Borges",
    precio: 15000,
    imagen: "https://covers.openlibrary.org/b/id/8231856-M.jpg",
    disponible: true,
    cats: ["Cuento", "Ficción"],
  },
  {
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    precio: 18000,
    imagen: "https://covers.openlibrary.org/b/id/8226574-M.jpg",
    disponible: true,
    cats: ["Novela", "Ficción"],
  },
  {
    titulo: "Ficciones",
    autor: "Jorge Luis Borges",
    precio: 14000,
    imagen: "https://covers.openlibrary.org/b/id/8294930-M.jpg",
    disponible: false,
    cats: ["Cuento", "Ficción"],
  },
  {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    precio: 20000,
    imagen: "https://covers.openlibrary.org/b/id/8228691-M.jpg",
    disponible: true,
    cats: ["Novela", "Ficción"],
  },
];

async function main() {
  await prisma.autor.createMany({
    data: autores,
  });

  await prisma.categoria.createMany({
    data: categorias,
  });

  for (const { autor, cats, ...datos } of libros) {
    await prisma.libro.create({
      data: {
        ...datos,
        autor: {
          connect: { nombre: autor },
        },
        categorias: {
          connect: cats.map((nombre) => ({ nombre })),
        },
      },
    });
  }
}

main();
