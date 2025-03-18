/**
 * PRÁCTICAS DE TYPESCRIPT NIVEL EXPERTO
 * ====================================
 */

// ==============================
// 1. TYPE LEVEL PROGRAMMING
// ==============================

// Ejercicio 1.1: Parser de URL tipado
export type ParseURL<T extends string> = T extends `${infer Protocol}://${infer Rest}`
    ? {
        protocol: Protocol;
        rest: Rest extends `${infer Host}/${infer Path}`
            ? { host: Host; path: Path }
            : { host: Rest; path: '' };
    }
    : never;

// Ejercicio 1.2: Sistema de rutas tipado
export type Route = '/users' | '/users/:id' | '/posts/:id/comments/:commentId';
export type ExtractParams<T extends string> = T extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractParams<Rest>]: string }
    : T extends `${string}:${infer Param}`
        ? { [K in Param]: string }
        : {};

// ==============================
// 2. ADVANCED GENERICS
// ==============================

// Ejercicio 2.1: Sistema de validación de formularios genérico
export interface ValidationRule<T> {
    validate: (value: T) => boolean;
    message: string;
}

export class FormValidator<T extends object> {
    private rules = new Map<keyof T, ValidationRule<T[keyof T]>[]>();

    addRule<K extends keyof T>(field: K, rule: ValidationRule<T[K]>): this {
        if (!this.rules.has(field)) {
            this.rules.set(field, []);
        }
        this.rules.get(field)!.push(rule as ValidationRule<T[keyof T]>);
        return this;
    }

    validate(data: T): { isValid: boolean; errors: Partial<Record<keyof T, string[]>> } {
        const errors: Partial<Record<keyof T, string[]>> = {};
        let isValid = true;

        Array.from(this.rules.entries()).forEach(([field, rules]) => {
            const fieldErrors = rules
                .filter(rule => !rule.validate(data[field]))
                .map(rule => rule.message);

            if (fieldErrors.length > 0) {
                errors[field] = fieldErrors;
                isValid = false;
            }
        });

        return { isValid, errors };
    }
}

// ==============================
// 3. TESTING
// ==============================

// Ejercicio 3.1: Sistema de mocking para API REST
export interface APIEndpoint<T, R> {
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: T;
    response: R;
}

export class APIMocker {
    private mocks = new Map<string, any>();

    mockEndpoint<T, R>(endpoint: APIEndpoint<T, R>, response: R): void {
        const key = `${endpoint.method}:${endpoint.path}`;
        this.mocks.set(key, response);
    }

    async request<T, R>(endpoint: APIEndpoint<T, R>, body?: T): Promise<R> {
        const key = `${endpoint.method}:${endpoint.path}`;
        const response = this.mocks.get(key);
        
        if (!response) {
            throw new Error(`No mock found for endpoint: ${key}`);
        }
        return response as R;
    }
}

// Ejercicio 3.2: Generador de datos de prueba tipado
export class TestDataGenerator<T> {
    private generators = new Map<keyof T, () => any>();

    addGenerator<K extends keyof T>(field: K, generator: () => T[K]): this {
        this.generators.set(field, generator);
        return this;
    }

    generate(overrides: Partial<T> = {}): T {
        const result = {} as T;
        Array.from(this.generators.keys()).forEach(field => {
            const generator = this.generators.get(field)!;
            result[field] = generator();
        });
        return { ...result, ...overrides };
    }

    generateMany(count: number, overrides: Partial<T> = {}): T[] {
        return Array.from({ length: count }, () => this.generate(overrides));
    }
}

// ==============================
// 4. PERFORMANCE
// ==============================

// Ejercicio 4.1: Cache con tipos
export class TypedCache<K, V> {
    private cache = new Map<K, { value: V; expiry: number }>();
    private defaultTTL: number;

    constructor(defaultTTL: number = 60000) { // 1 minuto por defecto
        this.defaultTTL = defaultTTL;
    }

    set(key: K, value: V, ttl?: number): void {
        const expiry = Date.now() + (ttl ?? this.defaultTTL);
        this.cache.set(key, { value, expiry });
    }

    get(key: K): V | undefined {
        const item = this.cache.get(key);
        if (!item) return undefined;

        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            return undefined;
        }

        return item.value;
    }

    clear(): void {
        this.cache.clear();
    }
}

// ==============================
// 5. DESIGN PATTERNS
// ==============================

// Ejercicio 5.1: Builder Pattern Tipado
export class QueryBuilder<T extends object> {
    private conditions: Partial<T> = {};
    private orderByField?: keyof T;
    private limitValue?: number;

    where<K extends keyof T>(field: K, value: T[K]): this {
        this.conditions[field] = value;
        return this;
    }

    orderBy(field: keyof T): this {
        this.orderByField = field;
        return this;
    }

    limit(value: number): this {
        this.limitValue = value;
        return this;
    }

    build(): { conditions: Partial<T>; orderBy?: keyof T; limit?: number } {
        return {
            conditions: this.conditions,
            orderBy: this.orderByField,
            limit: this.limitValue
        };
    }
}

// Ejercicio 5.2: Observer Pattern Tipado
export interface Observer<T> {
    update(data: T): void;
}

export class Observable<T> {
    private observers: Observer<T>[] = [];

    subscribe(observer: Observer<T>): void {
        this.observers.push(observer);
    }

    unsubscribe(observer: Observer<T>): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notify(data: T): void {
        this.observers.forEach(observer => observer.update(data));
    }
}

// Ejemplos de uso:
if (import.meta.vitest) {
    const { describe, it, expect } = import.meta.vitest;

    describe('Prácticas TypeScript', () => {
        // Tests para Type Level Programming
        it('should parse URL correctly', () => {
            type Result = ParseURL<'https://example.com/path'>;
            const dummy: Result = {
                protocol: 'https',
                rest: { host: 'example.com', path: 'path' }
            };
            expect(dummy).toBeDefined();
        });

        // Tests para Advanced Generics
        it('should validate form data', () => {
            interface UserForm {
                name: string;
                age: number;
            }

            const validator = new FormValidator<UserForm>()
                .addRule('name', {
                    validate: (value) => value.length >= 3,
                    message: 'Name must be at least 3 characters'
                })
                .addRule('age', {
                    validate: (value) => value >= 18,
                    message: 'Must be 18 or older'
                });

            const result = validator.validate({ name: 'Jo', age: 17 });
            expect(result.isValid).toBe(false);
        });

        // Más tests aquí...
    });
}