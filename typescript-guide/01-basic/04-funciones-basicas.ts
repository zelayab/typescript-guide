/**
 * FUNCIONES BÁSICAS 🎯
 * =================
 * 
 * ¡Aprenderemos a dar instrucciones al computador!
 * Como cuando le dices a alguien cómo hacer un sándwich.
 */

// Funciones simples 🎲
// Como una receta de cocina
function saludar2(nombre: string): string {
    return `¡Hola ${nombre}! 👋`;
}

// Funciones con varios parámetros 🎪
// Como cuando das varias instrucciones
function sumarPuntos(
    jugador: string,
    puntos: number,
    bonus: boolean = false
): number {
    let total = puntos;
    if (bonus) {
        total = total * 2;
    }
    console.log(`${jugador} ganó ${total} puntos!`);
    return total;
}

// Ejercicios divertidos 🎮
// 1. Crea una función que multiplique dos números
// 2. Crea una función que diga si un número es par
// 3. Crea una función que una dos strings con un espacio

/**
 * FUNCIONES BÁSICAS EN TYPESCRIPT
 * =============================
 * 
 * TypeScript permite tipar los parámetros y el valor de retorno
 * de las funciones para mayor seguridad.
 */

// Función básica con tipos
function sumar(a: number, b: number): number {
    return a + b;
}

// Función con parámetro opcional
function saludar(nombre: string, titulo?: string): string {
    return titulo ? `¡Hola ${titulo} ${nombre}!` : `¡Hola ${nombre}!`;
}

// Función con parámetro por defecto
function crearUsuario(nombre: string, activo: boolean = true) {
    return { nombre, activo };
}

// Arrow function con tipos
const multiplicar2 = (a: number, b: number): number => a * b;

// Rest parameters
function sumarTodos(...numeros: number[]): number {
    return numeros.reduce((total, n) => total + n, 0);
}

// Type para función
type OperacionMatematica = (a: number, b: number) => number;

const dividir2: OperacionMatematica = (a, b) => a / b;

// Ejemplos de uso
console.log(sumar(5, 3)); // 8
console.log(saludar('María', 'Dra.')); // ¡Hola Dra. María!
console.log(sumarTodos(1, 2, 3, 4, 5)); // 15

// Ejercicios prácticos
// 1. Crear una función que acepte diferentes tipos (union types)
// 2. Implementar una función con callback tipado
// 3. Crear una función genérica 