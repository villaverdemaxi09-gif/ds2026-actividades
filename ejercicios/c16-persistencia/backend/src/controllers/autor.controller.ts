import type { Request, Response } from "express";
import type { Autor } from "../types/autor.types";
import * as autorService from "../services/autor.service";

export async function getAll(_req: Request, res: Response) {
  const autores = await autorService.findAll();

  return res.json(autores);
}

export async function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const autor = await autorService.findById(id);

  if (!autor) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  return res.json(autor);
}

export async function create(req: Request, res: Response) {
  const datos = req.body as Omit<Autor, "id">;

  const nuevoAutor = await autorService.create(datos);

  return res.status(201).json(nuevoAutor);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const datos = req.body as Omit<Autor, "id">;

  const autorActualizado = await autorService.update(id, datos);

  if (!autorActualizado) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  return res.json(autorActualizado);
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);

  const eliminado = await autorService.remove(id);

  if (!eliminado) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  return res.status(204).send();
}
