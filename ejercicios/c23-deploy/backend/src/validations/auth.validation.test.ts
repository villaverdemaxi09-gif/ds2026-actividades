import { describe, expect, it } from "vitest";
import { loginSchema, registroSchema } from "./auth.validation";

describe("loginSchema", () => {
  it("normaliza el email: quita espacios y lo pasa a minúsculas", () => {
    const resultado = loginSchema.safeParse({
      email: "  Admin@Libreria.TEST  ",
      password: "x",
    });

    expect(resultado.success).toBe(true);
    if (resultado.success) {
      expect(resultado.data.email).toBe("admin@libreria.test");
    }
  });
});

describe("registroSchema", () => {
  it("acumula los tres errores de una contraseña débil", () => {
    const resultado = registroSchema.safeParse({
      nombre: "Ana",
      email: "ana@libreria.test",
      password: "corta",
    });

    expect(resultado.success).toBe(false);
    if (!resultado.success) {
      const erroresPassword = resultado.error.issues.filter(
        (issue) => issue.path[0] === "password",
      );
      expect(erroresPassword).toHaveLength(3);
    }
  });
});
