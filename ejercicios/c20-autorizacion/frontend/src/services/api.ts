import { obtenerToken } from './sesion';

const BASE_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

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

  if (respuesta.status === 401 && token) {
    window.dispatchEvent(new Event('sesion-expirada'));
  }

  if (!respuesta.ok) {
    throw new ApiError(
      respuesta.status,
      cuerpo?.error ?? `Error ${respuesta.status}`
    );
  }

  return cuerpo as T;
}
