// Esta suite requiere PostgreSQL levantado, migraciones aplicadas y el seed cargado.
// Se habilita explícitamente con RUN_DB_TESTS=true para mantener separados
// los tests rápidos que no necesitan base de datos.
import { afterAll, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../app";
import { prisma } from "../config/prisma";

const describeConDb =
  process.env.RUN_DB_TESTS === "true" ? describe : describe.skip;

describeConDb("rutas de autenticación con base de datos", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("las credenciales del seed devuelven token y nunca passwordHash", async () => {
    const respuesta = await request(app).post("/api/auth/login").send({
      email: "cliente@libreria.test",
      password: "Cliente1234",
    });

    expect(respuesta.status).toBe(200);
    expect(respuesta.body.token).toEqual(expect.any(String));
    expect(respuesta.body.usuario).toMatchObject({
      email: "cliente@libreria.test",
      rol: "CLIENTE",
    });
    expect(respuesta.body.usuario).not.toHaveProperty("passwordHash");
  });

  it("un email inexistente devuelve el mismo 401 que una contraseña incorrecta", async () => {
    const [emailInexistente, passwordIncorrecta] = await Promise.all([
      request(app).post("/api/auth/login").send({
        email: "nadie@libreria.test",
        password: "Cliente1234",
      }),
      request(app).post("/api/auth/login").send({
        email: "cliente@libreria.test",
        password: "Incorrecta1",
      }),
    ]);

    expect(emailInexistente.status).toBe(401);
    expect(passwordIncorrecta.status).toBe(401);
    expect(emailInexistente.body).toEqual({
      error: "Credenciales inválidas",
    });
    expect(passwordIncorrecta.body).toEqual(emailInexistente.body);
  });
});
