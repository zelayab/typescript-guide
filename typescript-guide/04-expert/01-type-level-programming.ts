// @ts-nocheck

/**
 * PROGRAMACIÓN A NIVEL DE TIPOS 🧙‍♂️
 * ============================
 * 
 * ¡Vamos a hacer magia con los tipos!
 * Como cuando creas hechizos nuevos en un juego.
 */

// Type-level números
export type BuildTuple<L extends number, T = unknown, A extends unknown[] = []> = 
    A['length'] extends L 
        ? A 
        : BuildTuple<L, T, [...A, T]>;

export type Tuple5 = BuildTuple<5, string>; // [string, string, string, string, string]

// Type-level strings
export type StringLength<S extends string> = S extends `${infer F}${infer R}`
    ? Add<1, StringLength<R>>
    : 0;

export type Length = StringLength<'hello'>; // 5

// Type-level operaciones
export type Add<A extends number, B extends number> = 
    [...BuildTuple<A>, ...BuildTuple<B>]['length'];

export type Sum = Add<2, 3>; // 5

// Type-level comparaciones
export type IsGreaterThan<A extends number, B extends number> = 
    BuildTuple<A> extends [...BuildTuple<B>, ...infer Rest] 
        ? Rest['length'] extends 0 
            ? false 
            : true 
        : false;

// Type-level recursión
export type Subtract<A extends number, B extends number> = 
    BuildTuple<A> extends [...BuildTuple<B>, ...infer Rest] 
        ? Rest['length'] 
        : never;

// Reemplazar el tipo Fibonacci con una versión limitada
export type FibValues = {
    0: 0;
    1: 1;
    2: 1;
    3: 2;
    4: 3;
    5: 5;
    6: 8;
    7: 13;
    8: 21;
    9: 34;
    10: 55;
};

export type Fibonacci<N extends keyof FibValues> = FibValues[N];

// Ejemplo práctico: Router type-safe
export type Route2 = 
    | '/users'
    | '/users/:id'
    | '/posts/:id/comments';

export type ExtractParams<T extends string> = 
    T extends `${infer Start}/:${infer Param}/${infer Rest}`
        ? Param | ExtractParams<`${Start}/${Rest}`>
        : T extends `${infer Start}/:${infer Param}`
            ? Param
            : never;

export type RouterParams<T extends Route2> = {
    [K in ExtractParams<T>]: string;
};

// Ejercicios prácticos
// 1. Implementar multiplicación a nivel de tipos
export type Multiply<A extends number, B extends number> =  // Tu implementación
    [...BuildTuple<A>, ...BuildTuple<B>]['length'];
// 2. Crear un parser de query strings a nivel de tipos
export type ParseQueryString<T extends string> = T extends `${infer Key}=${infer Value}`
    ? { [K in Key]: Value }
    : Record<string, string>;   

// 3. Implementar un validador de rutas a nivel de tipos
 export type ValidateRoute<T extends string> = T extends `/${string}`
    ? T
    : never;

// Tipos que hacen matemáticas 🔢
// Como contar con tipos mágicos
export type SumarUno<N extends number> = [...TuplaDeLength<N>, 1]['length'];
export type RestarUno<N extends number> = TuplaDeLength<N> extends [any, ...infer Rest] 
    ? Rest['length'] 
    : never;

// Tipos que procesan texto 📝
// Como un hechizo que transforma palabras
export type PrimeraMayuscula<T extends string> = T extends `${infer F}${infer R}`
    ? `${Uppercase<F>}${R}`
    : T;

// Tipos recursivos ��
// Como un hechizo que se repite
export type ArrayProfundo<T> = T extends Array<infer U>
    ? ArrayProfundo<U>[]
    : T;

// Ejercicios de magia 🎮
// 1. Crea un tipo que multiplique números
// 2. Crea un tipo que invierta un string
// 3. Crea un tipo que aplane un array anidado 