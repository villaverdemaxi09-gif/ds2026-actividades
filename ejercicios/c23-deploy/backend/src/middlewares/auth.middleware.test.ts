import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { describe, expect, it, vi } from "vitest";
import { JWT_SECRET } from "../config/env";
import { authenticate, authorize } from "./auth.middleware";

function crearMocks(req: Partial<Request> = {}) {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  } as unknown as Response;
  const next = vi.fn() as unknown as NextFunction;

  return { req: req as Request, res, next };
}

describe("authorize", () => {
  it("responde 403 a un CLIENTE cuando la ruta requiere ADMIN", () => {
    const { req, res, next } = crearMocks({
      usuario: { id: 2, rol: "CLIENTE" },
    });

    authorize("ADMIN")(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "No tenés permiso para esta operación",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("llama a next cuando el rol está autorizado", () => {
    const { req, res, next } = crearMocks({
      usuario: { id: 1, rol: "ADMIN" },
    });

    authorize("ADMIN")(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it("responde 401 cuando todavía no hay un usuario autenticado", () => {
    const { req, res, next } = crearMocks();

    authorize("ADMIN")(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});

describe("authenticate", () => {
  it("responde 401 cuando falta el token", () => {
    const { req, res, next } = crearMocks({ headers: {} });

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Falta el token" });
    expect(next).not.toHaveBeenCalled();
  });

  it("con un token válido completa req.usuario y llama a next", () => {
    const token = jwt.sign({ id: 7, rol: "CLIENTE" }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const { req, res, next } = crearMocks({
      headers: { authorization: `Bearer ${token}` },
    });

    authenticate(req, res, next);

    expect(req.usuario).toEqual({ id: 7, rol: "CLIENTE" });
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it("responde 401 con Token expirado para un token vencido", () => {
    const token = jwt.sign({ id: 7, rol: "CLIENTE" }, JWT_SECRET, {
      expiresIn: "-1s",
    });
    const { req, res, next } = crearMocks({
      headers: { authorization: `Bearer ${token}` },
    });

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token expirado" });
    expect(next).not.toHaveBeenCalled();
  });

  it("responde 401 con Token inválido para una firma diferente", () => {
    const token = jwt.sign({ id: 7, rol: "CLIENTE" }, "otro-secret");
    const { req, res, next } = crearMocks({
      headers: { authorization: `Bearer ${token}` },
    });

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token inválido" });
    expect(next).not.toHaveBeenCalled();
  });
});
