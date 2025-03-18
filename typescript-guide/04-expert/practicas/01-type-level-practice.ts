/**
 * PRÁCTICAS DE TYPE-LEVEL PROGRAMMING
 */

// Ejercicio 1: Implementar un parser de URL tipado
export type ParseURL<T extends string> = T extends `${infer Protocol}://${infer Rest}`
    ? {
        protocol: Protocol;
        rest: Rest extends `${infer Host}/${infer Path}`
            ? { host: Host; path: Path }
            : { host: Rest; path: '' };
    }
    : never;

// Ejercicio 2: Sistema de rutas tipado
export type Route = '/users' | '/users/:id' | '/posts/:id/comments/:commentId';
export type ExtractRouteParams<T extends string> = {
    [K in T extends `${string}:${infer Param}/${infer Rest}`
        ? Param | keyof ExtractRouteParams<Rest>
        : T extends `${string}:${infer Param}`
            ? Param
            : never]: string;
};

// Ejercicio 3: Validador de tipos recursivo
export type ValidateNested<T> = {
    [K in keyof T]: T[K] extends object
        ? ValidateNested<T[K]>
        : T[K] extends string
            ? { minLength?: number; maxLength?: number }
            : T[K] extends number
                ? { min?: number; max?: number }
                : never;
}; 