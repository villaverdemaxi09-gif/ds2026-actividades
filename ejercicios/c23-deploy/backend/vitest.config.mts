import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

const env = loadEnv("test", process.cwd(), "");
const databaseUrl = (
  env.DATABASE_URL ??
  "postgresql://postgres:postgres@localhost:5432/libreria_db"
).replace("@db:", "@localhost:");

export default defineConfig({
  test: {
    env: {
      JWT_SECRET: "secreto-solo-para-tests",
      DATABASE_URL: databaseUrl,
    },
  },
});
