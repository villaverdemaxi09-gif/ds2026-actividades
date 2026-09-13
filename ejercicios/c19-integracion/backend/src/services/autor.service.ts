import { prisma } from "../config/prisma";
import type {
  AutorCreate,
  AutorUpdate,
} from "../validations/autor.validation";

export async function findAll() {
  return prisma.autor.findMany();
}

export async function findById(id: number) {
  return prisma.autor.findUnique({
    where: { id },
    include: { libros: true },
  });
}

export async function create(datos: AutorCreate) {
  return prisma.autor.create({
    data: datos,
  });
}

export async function update(id: number, datos: AutorUpdate) {
  return prisma.autor.update({
    where: { id },
    data: datos,
  });
}

export async function remove(id: number): Promise<void> {
  await prisma.autor.delete({
    where: { id },
  });
}
