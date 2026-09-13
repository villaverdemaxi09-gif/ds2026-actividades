import { obtenerToken } from './sesion';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(
  ruta: string,
  opciones: RequestInit = {}
): Promise<T> {
  const token = obtenerToken();

  const headers = new Headers(opciones.headers);
  headers.set('Content-Type', 'application/json');

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const respuesta = await fetch(`${BASE_URL}${ruta}`, {
    ...opciones,
    headers,
  });

  const cuerpo = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    throw new Error(cuerpo?.error ?? `Error ${respuesta.status}`);
  }

  return cuerpo as T;
}
