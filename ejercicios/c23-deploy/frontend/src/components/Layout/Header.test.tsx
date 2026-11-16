import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import {
  AuthContext,
  type AuthContextType,
} from '../../context/AuthContext';
import { BusquedaProvider } from '../../context/BusquedaContext';
import type { Rol, Usuario } from '../../types/sesionType';
import Header from './Header';

function renderHeader(usuario: Usuario | null) {
  const auth: AuthContextType = {
    usuario,
    cargando: false,
    estaAutenticado: usuario !== null,
    tieneRol: (rol: Rol) => usuario?.rol === rol,
    login: vi.fn(async () => undefined),
    logout: vi.fn(),
  };

  return render(
    <MemoryRouter>
      <BusquedaProvider>
        <AuthContext.Provider value={auth}>
          <Header />
        </AuthContext.Provider>
      </BusquedaProvider>
    </MemoryRouter>,
  );
}

describe('Header según el rol', () => {
  it('sin sesión muestra Ingresar y oculta Nuevo libro', () => {
    renderHeader(null);

    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Nuevo libro' })).not.toBeInTheDocument();
  });

  it('un CLIENTE ve su nombre pero no ve Nuevo libro', () => {
    renderHeader({
      id: 2,
      email: 'cliente@libreria.test',
      nombre: 'Cliente',
      rol: 'CLIENTE',
    });

    expect(screen.getByText('Hola, Cliente')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Nuevo libro' })).not.toBeInTheDocument();
  });

  it('un ADMIN ve el enlace Nuevo libro', () => {
    renderHeader({
      id: 1,
      email: 'admin@libreria.test',
      nombre: 'Admin',
      rol: 'ADMIN',
    });

    expect(screen.getByRole('link', { name: 'Nuevo libro' })).toBeInTheDocument();
    expect(screen.getByText('Hola, Admin')).toBeInTheDocument();
  });
});
