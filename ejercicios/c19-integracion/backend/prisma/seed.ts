import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma";

const autores = [
  { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
  { nombre: "Julio Cortázar", nacionalidad: "Argentina" },
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
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

const usuarios = [
  {
    email: "admin@libreria.test",
    nombre: "Admin",
    rol: "ADMIN" as const,
    password: "Admin1234",
  },
  {
    email: "cliente@libreria.test",
    nombre: "Cliente",
    rol: "CLIENTE" as const,
    password: "Cliente1234",
  },
];

async function main() {
  for (const autor of autores) {
    await prisma.autor.upsert({
      where: { nombre: autor.nombre },
      update: {},
      create: autor,
    });
  }

  for (const categoria of categorias) {
    await prisma.categoria.upsert({
      where: { nombre: categoria.nombre },
      update: {},
      create: categoria,
    });
  }

  for (const { autor, cats, ...datos } of libros) {
    const existe = await prisma.libro.findFirst({
      where: { titulo: datos.titulo },
    });

    if (!existe) {
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

  for (const { password, ...datos } of usuarios) {
    await prisma.usuario.upsert({
      where: { email: datos.email },
      update: {},
      create: {
        ...datos,
        passwordHash: await bcrypt.hash(password, 10),
      },
    });
  }
}

main();
