// Tipos para funciones
export interface CalculadoraPrecio {
  (precio: number, cantidad: number, descuento?: number): number;
}

export type ValidadorEmail = (email: string) => boolean;

// Ejemplos de implementación
export const calcularPrecioTotal: CalculadoraPrecio = (
  precio: number,
  cantidad: number,
  descuento: number = 0
): number => {
  const subtotal = precio * cantidad;
  return subtotal - (subtotal * descuento);
};

export const validarEmail: ValidadorEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Ejemplo con rest parameters
export const calcularPromedio = (...numeros: number[]): number => {
  const suma = numeros.reduce((acc, curr) => acc + curr, 0);
  return suma / numeros.length;
}; 