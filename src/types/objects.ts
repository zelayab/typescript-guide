// Definición de tipos para objetos
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  fechaRegistro: Date;
  activo: boolean;
}

export type Producto = {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categorias: string[];
};

// Arrays y Tuplas
export type Coordenadas = [number, number]; // Tupla de latitud y longitud
export type ListaPrecios = number[]; // Array de precios

// Ejemplo de uso
export const ejemplosObjetos = () => {
  const usuario: Usuario = {
    id: 1,
    nombre: 'Juan Pérez',
    email: 'juan@email.com',
    fechaRegistro: new Date(),
    activo: true
  };

  const ubicacionTienda: Coordenadas = [40.4168, -3.7038];
  const preciosHistoricos: ListaPrecios = [99.99, 89.99, 79.99];

  console.log('Ejemplos de objetos:', {
    usuario,
    ubicacionTienda,
    preciosHistoricos
  });
}; 