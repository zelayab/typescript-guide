// Ejemplos de tipos primitivos en TypeScript
export const ejemplosPrimitivos = () => {
  // Booleanos
  const isUserActive: boolean = true;
  const isLoggedIn: boolean = false;

  // Números
  const precio: number = 99.99;
  const cantidad: number = 42;
  
  // Strings
  const userName: string = 'María';
  const greeting: string = `¡Hola ${userName}!`;

  // Undefined y Null
  const datosNoDisponibles: undefined = undefined;
  const sinDatos: null = null;

  // Symbol
  const userRole = Symbol('ADMIN');

  console.log('Ejemplos de tipos primitivos:', {
    isUserActive,
    precio,
    greeting,
    userRole: userRole.toString()
  });
}; 