import type { Request, Response } from "express";
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
    return res.status(404).json({
      error: "Libro no encontrado",
    });
  }

  return res.json(libro);
}

export async function create(req: Request, res: Response) {
  const nuevo = await libroService.create(req.body);

  return res.status(201).json(nuevo);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);

  const actualizado = await libroService.update(id, req.body);

  return res.json(actualizado);
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);

  await libroService.remove(id);

  return res.status(204).send();
}
