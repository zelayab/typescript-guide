"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularPromedio = exports.validarEmail = exports.calcularPrecioTotal = void 0;
// Ejemplos de implementación
const calcularPrecioTotal = (precio, cantidad, descuento = 0) => {
    const subtotal = precio * cantidad;
    return subtotal - (subtotal * descuento);
};
exports.calcularPrecioTotal = calcularPrecioTotal;
const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
exports.validarEmail = validarEmail;
// Ejemplo con rest parameters
const calcularPromedio = (...numeros) => {
    const suma = numeros.reduce((acc, curr) => acc + curr, 0);
    return suma / numeros.length;
};
exports.calcularPromedio = calcularPromedio;
