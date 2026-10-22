# C21 - Testing en la Librería

Esta actividad parte de la implementación de C20 y agrega pruebas automáticas con Vitest.

## Tests sin base de datos

No hace falta levantar Docker para estas suites. Cubren schemas Zod, los middlewares de autenticación y autorización, la matriz de permisos de libros, el formateo de precios y el Header según el rol.

```bash
cd backend
npm test

cd ../frontend
npm test
```

Para trabajar en modo observación, ejecutar `npm run test:watch` en el directorio correspondiente.

## Tests que requieren base de datos

`backend/src/routes/auth.routes.db.test.ts` está separado y señalado porque necesita PostgreSQL, migraciones y el seed. Por defecto queda omitido. Para habilitarlo:

```powershell
docker compose up -d db
docker compose run --rm api npx prisma migrate deploy
docker compose run --rm api npx prisma db seed
cd backend
$env:RUN_DB_TESTS = "true"
npm test
```

La configuración de Vitest cambia el host `db` de `DATABASE_URL` por `localhost` cuando los tests se ejecutan desde Windows.

## Verificación de TypeScript y build

```bash
cd backend
npx tsc --noEmit

cd ../frontend
npx tsc -p tsconfig.app.json --noEmit
npm run build
```
