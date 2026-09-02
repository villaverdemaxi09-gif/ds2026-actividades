import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import {
  JWT_EXPIRES_IN,
  JWT_SECRET,
  SALT_ROUNDS,
} from "../config/env";
import type {
  LoginInput,
  RegistroInput,
} from "../validations/auth.validation";

export async function registrar(datos: RegistroInput) {
  const passwordHash = await bcrypt.hash(
    datos.password,
    SALT_ROUNDS,
  );

  return prisma.usuario.create({
    data: {
      email: datos.email,
      nombre: datos.nombre,
      passwordHash,
    },
    select: {
      id: true,
      email: true,
      nombre: true,
      rol: true,
      creadoEn: true,
    },
  });
}

export async function login(datos: LoginInput) {
  const usuario = await prisma.usuario.findUnique({
    where: {
      email: datos.email,
    },
  });

  if (!usuario) {
    return null;
  }

  const passwordCorrecta = await bcrypt.compare(
    datos.password,
    usuario.passwordHash,
  );

  if (!passwordCorrecta) {
    return null;
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      rol: usuario.rol,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    },
  );

  return { token };
}
