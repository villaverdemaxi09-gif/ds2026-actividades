import type { Request, Response } from "express";
import type { Libro } from "../types/libro.types";
import * as libroService from "../services/libro.service";

export async function getAll(req: Request, res: Response) {
  const { disponible } = req.query;

  let filtroDisponible: boolean | undefined;

  if (disponible === "true") {
    filtroDisponible = true;
  } else if (disponible === "false") {
    filtroDisponible = false;
  }

  const libros = await libroService.findAll(filtroDisponible);

  return res.json(libros);
}

export async function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const libro = await libroService.findById(id);

  if (!libro) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }

  return res.json(libro);
}

export async function create(req: Request, res: Response) {
  const datos = req.body as Omit<Libro, "id">;

  const nuevoLibro = await libroService.create(datos);

  return res.status(201).json(nuevoLibro);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const datos = req.body as Omit<Libro, "id">;

  const libroActualizado = await libroService.update(id, datos);

  if (!libroActualizado) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }

  return res.json(libroActualizado);
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);

  const eliminado = await libroService.remove(id);

  if (!eliminado) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }

  return res.status(204).send();
}
