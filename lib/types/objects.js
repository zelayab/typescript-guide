"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ejemplosObjetos = void 0;
// Ejemplo de uso
const ejemplosObjetos = () => {
    const usuario = {
        id: 1,
        nombre: 'Juan Pérez',
        email: 'juan@email.com',
        fechaRegistro: new Date(),
        activo: true
    };
    const ubicacionTienda = [40.4168, -3.7038];
    const preciosHistoricos = [99.99, 89.99, 79.99];
    console.log('Ejemplos de objetos:', {
        usuario,
        ubicacionTienda,
        preciosHistoricos
    });
};
exports.ejemplosObjetos = ejemplosObjetos;
