import { Prisma } from "../generated/prisma/client";
import { prisma } from "../config/prisma";
import type {
  LibroCreate,
  LibroUpdate,
} from "../validations/libro.validation";

export type LibroConAutor = Prisma.LibroGetPayload<{
  include: { autor: true };
}>;

export type LibroDetalle = Prisma.LibroGetPayload<{
  include: { autor: true; categorias: true };
}>;

export async function findAll(
  disponible?: boolean,
): Promise<LibroConAutor[]> {
  return prisma.libro.findMany({
    where: { disponible },
    include: { autor: true },
  });
}

export async function findById(
  id: number,
): Promise<LibroDetalle | null> {
  return prisma.libro.findUnique({
    where: { id },
    include: {
      autor: true,
      categorias: true,
    },
  });
}

export async function create(
  datos: LibroCreate,
): Promise<LibroDetalle> {
  const { autorId, ...datosLibro } = datos;

  return prisma.libro.create({
    data: {
      ...datosLibro,
      autor: {
        connect: { id: autorId },
      },
    },
    include: {
      autor: true,
      categorias: true,
    },
  });
}

export async function update(
  id: number,
  datos: LibroUpdate,
): Promise<LibroDetalle> {
  const { autorId, ...datosLibro } = datos;

  return prisma.libro.update({
    where: { id },
    data: {
      ...datosLibro,
      ...(autorId !== undefined
        ? {
            autor: {
              connect: { id: autorId },
            },
          }
        : {}),
    },
    include: {
      autor: true,
      categorias: true,
    },
  });
}

export async function remove(id: number): Promise<void> {
  await prisma.libro.delete({
    where: { id },
  });
}
