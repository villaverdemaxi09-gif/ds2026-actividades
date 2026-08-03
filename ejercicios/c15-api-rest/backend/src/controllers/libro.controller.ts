import type { Request, Response } from "express";
import * as libroService from "../services/libro.service";

export function getAll(req: Request, res: Response) {
  const { disponible } = req.query;

  let filtroDisponible: boolean | undefined;

  if (disponible === "true") {
    filtroDisponible = true;
  } else if (disponible === "false") {
    filtroDisponible = false;
  }

  const libros = libroService.findAll(filtroDisponible);

  return res.json(libros);
}

export function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const libro = libroService.findById(id);

  if (!libro) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }

  return res.json(libro);
}
