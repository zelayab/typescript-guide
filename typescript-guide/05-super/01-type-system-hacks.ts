/**
 * TRUCOS DEL SISTEMA DE TIPOS 🎩
 * =========================
 * 
 * ¡Vamos a doblar las reglas de la realidad!
 * Como cuando un mago hace lo imposible.
 */

// Tipos Numéricos Mágicos 🔢
// Como contar con los dedos de un fantasma
type BuildTuple2<N extends number, T = unknown> = N extends N 
    ? number extends N 
        ? T[]
        : _BuildTuple<N, T, []>
    : never;

type _BuildTuple<N extends number, T, R extends unknown[]> = R['length'] extends N 
    ? R 
    : _BuildTuple<N, T, [T, ...R]>;

// Tipos String Mágicos 📝
// Como escribir palabras que se transforman solas
type StringToUnion<S extends string> = S extends `${infer C}${infer R}`
    ? C | StringToUnion<R>
    : never;

// Tipos que Viajan en el Tiempo ⏰
// Como predecir el futuro de los tipos
type DeepPromiseValue<T> = T extends Promise<infer U>
    ? DeepPromiseValue<U>
    : T;

// Ejercicios legendarios 🎮
// 1. Crea un tipo que sume dos números en tiempo de compilación
// 2. Crea un tipo que invierta un string en tiempo de compilación
// 3. Crea un tipo que calcule el factorial de un número 