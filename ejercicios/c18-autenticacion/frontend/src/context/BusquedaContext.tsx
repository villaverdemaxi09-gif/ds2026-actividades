import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface BusquedaContextType {
  filtro: string;
  setFiltro: (valor: string) => void;
}

// 1. El contexto (arranca null: nadie lo usó todavía)
const BusquedaContext = createContext<BusquedaContextType | null>(null);

// 2. El proveedor: tiene el estado y lo reparte
export function BusquedaProvider({ children }: { children: ReactNode }) {
  const [filtro, setFiltro] = useState('');
  return (
    <BusquedaContext.Provider value={{ filtro, setFiltro }}>
      {children}
    </BusquedaContext.Provider>
  );
}

// 3. Hook propio para consumirlo (con red de seguridad)
export function useBusqueda() {
  const contexto = useContext(BusquedaContext);
  if (!contexto) {
    throw new Error('useBusqueda debe usarse dentro de <BusquedaProvider>');
  }
  return contexto;
}
