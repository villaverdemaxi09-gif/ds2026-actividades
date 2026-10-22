import jwt from "jsonwebtoken";
import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app";
import { JWT_SECRET } from "../config/env";

const tokenCliente = jwt.sign(
  { id: 2, rol: "CLIENTE" },
  JWT_SECRET,
  { expiresIn: "1h" },
);
const tokenAdmin = jwt.sign(
  { id: 1, rol: "ADMIN" },
  JWT_SECRET,
  { expiresIn: "1h" },
);

const libroNuevo = {
  titulo: "Rayuela",
  precio: 7000,
  imagen: "https://img/rayuela.jpg",
  autorId: 1,
};

describe("matriz de permisos de /api/libros sin base de datos", () => {
  it("POST sin token responde 401", async () => {
    const respuesta = await request(app)
      .post("/api/libros")
      .send(libroNuevo);

    expect(respuesta.status).toBe(401);
    expect(respuesta.body).toEqual({ error: "Falta el token" });
  });

  it("POST con token de CLIENTE responde 403", async () => {
    const respuesta = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenCliente}`)
      .send(libroNuevo);

    expect(respuesta.status).toBe(403);
  });

  it("POST de ADMIN con body inválido responde 400 y no 403", async () => {
    const respuesta = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ precio: -5 });

    expect(respuesta.status).toBe(400);
    expect(respuesta.body.detalles).toContainEqual({
      campo: "precio",
      mensaje: "El precio debe ser mayor a 0",
    });
  });

  it("POST con un token adulterado responde 401", async () => {
    const respuesta = await request(app)
      .post("/api/libros")
      .set("Authorization", "Bearer token-adulterado")
      .send(libroNuevo);

    expect(respuesta.status).toBe(401);
    expect(respuesta.body).toEqual({ error: "Token inválido" });
  });

  it("DELETE con token de CLIENTE responde 403", async () => {
    const respuesta = await request(app)
      .delete("/api/libros/1")
      .set("Authorization", `Bearer ${tokenCliente}`);

    expect(respuesta.status).toBe(403);
  });

  it("una ruta inexistente responde 404", async () => {
    const respuesta = await request(app).get("/api/no-existe");

    expect(respuesta.status).toBe(404);
    expect(respuesta.body).toEqual({ error: "Ruta no encontrada" });
  });
});
