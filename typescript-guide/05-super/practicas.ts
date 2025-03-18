/**
 * PRÁCTICAS DE TYPESCRIPT NIVEL SUPER
 * ==================================
 */

// ==============================
// 1. TIPOS RECURSIVOS
// ==============================

// Ejercicio 1.1: DeepReadonly
export type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Ejercicio 1.2: DeepPartial
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// ==============================
// 2. TIPOS CONDICIONALES AVANZADOS
// ==============================

// Ejercicio 2.1: ExcludeByType
export type ExcludeByType<T, U> = {
    [P in keyof T]: T[P] extends U ? never : P;
}[keyof T];

// Ejercicio 2.2: RequireAtLeastOne
export type RequireAtLeastOne<T> = {
    [K in keyof T]: { [P in K]: T[P] } & Partial<Omit<T, K>>;
}[keyof T];

// ==============================
// 3. INFERENCIA DE TIPOS
// ==============================

// Ejercicio 3.1: Inferencia de tipos de función
export type InferFunctionParams<T> = T extends (...args: infer P) => any ? P : never;
export type InferFunctionReturn<T> = T extends (...args: any[]) => infer R ? R : never;

// Ejercicio 3.2: Inferencia de tipos de promesa
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

// ==============================
// 4. PATRONES DE DISEÑO TIPADOS
// ==============================

// Ejercicio 4.1: Factory Method Tipado
export interface Product {
    name: string;
    price: number;
}

export interface ProductFactory<T extends Product> {
    createProduct(): T;
}

// Ejercicio 4.2: Builder Pattern con Validación de Tipos
export interface BuilderValidator<T> {
    validate(value: T): boolean;
    getErrors(): string[];
}

export class TypeSafeBuilder<T extends object> {
    private data: Partial<T> = {};
    private validators: Map<keyof T, BuilderValidator<T[keyof T]>> = new Map();

    set<K extends keyof T>(key: K, value: T[K]): this {
        const validator = this.validators.get(key);
        if (validator && !validator.validate(value)) {
            throw new Error(`Validation failed for ${String(key)}: ${validator.getErrors().join(', ')}`);
        }
        this.data[key] = value;
        return this;
    }

    build(): T {
        // Verificar que todos los campos requeridos estén presentes
        const missingKeys = Object.keys(this.validators).filter(key => !(key in this.data));
        if (missingKeys.length > 0) {
            throw new Error(`Missing required fields: ${missingKeys.join(', ')}`);
        }
        return this.data as T;
    }
}

// ==============================
// 5. DECORADORES AVANZADOS
// ==============================

// Ejercicio 5.1: Decorador de Validación
export function Validate<T>(validator: (value: T) => boolean) {
    return function (target: any, propertyKey: string) {
        let value: T;
        
        const getter = function() {
            return value;
        };
        
        const setter = function(newVal: T) {
            if (!validator(newVal)) {
                throw new Error(`Validation failed for ${propertyKey}`);
            }
            value = newVal;
        };
        
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    };
}

// Ejercicio 5.2: Decorador de Cache
export function Memoize() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;
        const cache = new Map();

        descriptor.value = function (...args: any[]) {
            const key = JSON.stringify(args);
            if (cache.has(key)) {
                return cache.get(key);
            }
            const result = originalMethod.apply(this, args);
            cache.set(key, result);
            return result;
        };

        return descriptor;
    };
}

// Ejemplos de uso:
if (import.meta.vitest) {
    const { describe, it, expect } = import.meta.vitest;

    describe('Prácticas TypeScript Super', () => {
        // Tests para DeepReadonly
        it('should create deep readonly object', () => {
            interface Test {
                a: { b: string };
                c: number;
            }
            
            const test: DeepReadonly<Test> = {
                a: { b: 'test' },
                c: 42
            };
            
            // @ts-expect-error - No se puede modificar una propiedad readonly
            test.a.b = 'new';
        });

        // Tests para TypeSafeBuilder
        it('should build object with validation', () => {
            interface User {
                name: string;
                age: number;
            }

            const builder = new TypeSafeBuilder<User>();
            const user = builder
                .set('name', 'John')
                .set('age', 30)
                .build();

            expect(user).toEqual({ name: 'John', age: 30 });
        });

        // Más tests aquí...
    });
} 