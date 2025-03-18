/**
 * INFERENCIA PERSONALIZADA 🔮
 * =======================
 * 
 * ¡Vamos a enseñarle nuevos trucos a TypeScript!
 * Como entrenar a un dragón para que haga trucos nuevos.
 */

// Inferencia con funciones 🎯
// Como enseñarle a TypeScript a adivinar mejor
export type ObtenerRetorno<T> = T extends (...args: any[]) => infer R ? R : never;

// Inferencia con promesas 🌟
// Como ver el futuro en una bola de cristal
export type DesenvuelvePromesa<T> = T extends Promise<infer U> ? U : T;

// Inferencia con arrays 📦
// Como saber qué hay dentro de una caja mágica
export type ElementoArray<T> = T extends (infer U)[] ? U : never;

// Ejercicios mágicos 🎮
// 1. Crea un tipo que infiera el tipo de error de una promesa
// 2. Crea un tipo que infiera los parámetros de una función
// 3. Crea un tipo que infiera el tipo de un evento

/**
 * INFERENCIA DE TIPOS PERSONALIZADA
 * ==============================
 * 
 * Técnicas avanzadas para controlar y personalizar
 * cómo TypeScript infiere los tipos.
 */

// Inferencia condicional
export type InferArrayType<T> = T extends (infer U)[] ? U : never;
export type InferPromiseType<T> = T extends Promise<infer U> ? U : T;
export type InferFunctionReturn<T> = T extends (...args: any[]) => infer R ? R : never;

// Sistema de inferencia personalizado
export type PropType<T, Path extends string> = 
    Path extends keyof T 
        ? T[Path] 
        : Path extends `${infer K}.${infer R}`
            ? K extends keyof T 
                ? PropType<T[K], R>
                : never
            : never;

// Inferencia con genéricos anidados
export class QueryBuilder<T> {
    private query: Partial<T> = {};

    where<K extends keyof T>(key: K, value: T[K]): QueryBuilder<T> {
        this.query[key] = value;
        return this;
    }

    select<K extends keyof T>(...keys: K[]): Pick<T, K> {
        const result = {} as Pick<T, K>;
        for (const key of keys) {
            if (key in this.query) {
                result[key] = this.query[key] as T[K];
            }
        }
        return result;
    }
}

// Sistema de tipos para API REST
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type APIEndpoint<T extends HTTPMethod, P, R> = {
    method: T;
    path: string;
    params: P;
    response: R;
};

export type InferAPIResponse<T> = T extends APIEndpoint<any, any, infer R> ? R : never;
export type InferAPIParams<T> = T extends APIEndpoint<any, infer P, any> ? P : never;

// Ejercicios prácticos
// 1. Implementar un sistema de inferencia para rutas
export type RouteParams<T extends string> = string extends T 
    ? Record<string, string>
    : T extends `${string}:${infer Param}/${infer Rest}`
        ? { [K in Param | keyof RouteParams<Rest>]: string }
        : T extends `${string}:${infer Param}`
            ? { [K in Param]: string }
            : {};

// 2. Crear un sistema de inferencia para eventos
export type EventMap = {
    click: { x: number; y: number };
    change: { value: string };
    submit: { data: unknown };
};

export type InferEventType<K extends keyof EventMap> = EventMap[K];

// 3. Desarrollar un sistema de inferencia para validación de formularios
export type FormValues<T> = {
    [K in keyof T]: {
        value: T[K];
        validate: (value: T[K]) => boolean;
        error?: string;
    };
}; 