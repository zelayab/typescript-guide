"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ejemplosPrimitivos = void 0;
// Ejemplos de tipos primitivos en TypeScript
const ejemplosPrimitivos = () => {
    // Booleanos
    const isUserActive = true;
    const isLoggedIn = false;
    // Números
    const precio = 99.99;
    const cantidad = 42;
    // Strings
    const userName = 'María';
    const greeting = `¡Hola ${userName}!`;
    // Undefined y Null
    const datosNoDisponibles = undefined;
    const sinDatos = null;
    // Symbol
    const userRole = Symbol('ADMIN');
    console.log('Ejemplos de tipos primitivos:', {
        isUserActive,
        precio,
        greeting,
        userRole: userRole.toString()
    });
};
exports.ejemplosPrimitivos = ejemplosPrimitivos;
