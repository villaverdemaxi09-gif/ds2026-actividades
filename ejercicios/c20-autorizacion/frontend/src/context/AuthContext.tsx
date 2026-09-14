import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { apiFetch } from '../services/api';
import {
  borrarToken,
  guardarToken,
  obtenerToken,
} from '../services/sesion';
import type {
  Credenciales,
  Rol,
  Sesion,
  Usuario,
} from '../types/sesionType';

interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
  estaAutenticado: boolean;
  tieneRol: (rol: Rol) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const manejarSesionExpirada = () => {
      borrarToken();
      setUsuario(null);
    };

    window.addEventListener('sesion-expirada', manejarSesionExpirada);

    return () => {
      window.removeEventListener('sesion-expirada', manejarSesionExpirada);
    };
  }, []);

  useEffect(() => {
    if (!obtenerToken()) {
      setCargando(false);
      return;
    }

    apiFetch<Usuario>('/auth/yo')
      .then(setUsuario)
      .catch(() => {
        borrarToken();
        setUsuario(null);
      })
      .finally(() => setCargando(false));
  }, []);

  const login = async (credenciales: Credenciales) => {
    const sesion = await apiFetch<Sesion>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credenciales),
    });

    guardarToken(sesion.token);
    setUsuario(sesion.usuario);
  };

  const logout = () => {
    borrarToken();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        login,
        logout,
        estaAutenticado: usuario !== null,
        tieneRol: (rol) => usuario?.rol === rol,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }

  return contexto;
}
