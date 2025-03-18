/**
 * PRÁCTICAS DE TYPESCRIPT NIVEL ADVANCED
 * ====================================
 */

// ==============================
// 1. GENÉRICOS
// ==============================

// Ejercicio 1.1: Cola genérica
export class Queue<T> {
    private items: T[] = [];

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    peek(): T | undefined {
        return this.items[0];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

// Ejercicio 1.2: Función map tipada
export function mapValues<T, U>(obj: Record<string, T>, fn: (value: T) => U): Record<string, U> {
    const result: Record<string, U> = {};
    for (const key in obj) {
        result[key] = fn(obj[key]);
    }
    return result;
}

// ==============================
// 2. TIPOS UTILITARIOS
// ==============================

// Ejercicio 2.1: Pick personalizado
export type CustomPick<T, K extends keyof T> = {
    [P in K]: T[P];
};

// Ejercicio 2.2: Exclude personalizado
export type CustomExclude<T, U> = T extends U ? never : T;

// ==============================
// 3. TIPOS CONDICIONALES
// ==============================

// Ejercicio 3.1: IsArray
export type IsArray<T> = T extends Array<any> ? true : false;

// Ejercicio 3.2: NonNullable personalizado
export type CustomNonNullable<T> = T extends null | undefined ? never : T;

// ==============================
// 4. CLASES ABSTRACTAS Y GENÉRICAS
// ==============================

// Ejercicio 4.1: Repositorio genérico
export interface Entity {
    id: number | string;
}

export abstract class Repository<T extends Entity> {
    protected items: T[] = [];

    abstract validate(item: T): boolean;

    save(item: T): void {
        if (!this.validate(item)) {
            throw new Error('Item validation failed');
        }
        this.items.push(item);
    }

    findById(id: T['id']): T | undefined {
        return this.items.find(item => item.id === id);
    }

    getAll(): T[] {
        return [...this.items];
    }
}

// Ejercicio 4.2: Estado genérico
export class State<T> {
    private listeners: ((state: T) => void)[] = [];
    
    constructor(private currentState: T) {}

    getState(): T {
        return this.currentState;
    }

    setState(newState: T): void {
        this.currentState = newState;
        this.notify();
    }

    subscribe(listener: (state: T) => void): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notify(): void {
        this.listeners.forEach(listener => listener(this.currentState));
    }
}

// ==============================
// 5. MIXINS
// ==============================

// Ejercicio 5.1: Mixin de Logger
export type Constructor = new (...args: any[]) => {};

export function WithLogger<T extends Constructor>(Base: T) {
    return class extends Base {
        log(message: string) {
            console.log(`[${new Date().toISOString()}] ${message}`);
        }
    };
}

// Ejercicio 5.2: Mixin de Validación
export function WithValidation<T extends Constructor>(Base: T) {
    return class extends Base {
        private errors: string[] = [];

        addError(error: string) {
            this.errors.push(error);
        }

        hasErrors(): boolean {
            return this.errors.length > 0;
        }

        getErrors(): string[] {
            return [...this.errors];
        }

        clearErrors() {
            this.errors = [];
        }
    };
}

// Ejemplos de uso:
if (import.meta.vitest) {
    const { describe, it, expect } = import.meta.vitest;

    describe('Prácticas TypeScript Advanced', () => {
        // Tests para Queue
        it('should handle queue operations', () => {
            const queue = new Queue<number>();
            queue.enqueue(1);
            queue.enqueue(2);
            expect(queue.peek()).toBe(1);
            expect(queue.dequeue()).toBe(1);
            expect(queue.peek()).toBe(2);
        });

        // Tests para mapValues
        it('should map object values', () => {
            const obj = { a: 1, b: 2 };
            const result = mapValues(obj, x => x * 2);
            expect(result).toEqual({ a: 2, b: 4 });
        });

        // Tests para Repository
        it('should handle repository operations', () => {
            class UserRepository extends Repository<{ id: number; name: string }> {
                validate(item: { id: number; name: string }): boolean {
                    return item.name.length > 0;
                }
            }

            const repo = new UserRepository();
            repo.save({ id: 1, name: 'Test' });
            expect(repo.findById(1)).toEqual({ id: 1, name: 'Test' });
        });

        // Tests para State
        it('should handle state changes', () => {
            const state = new State<number>(0);
            let lastValue = 0;
            state.subscribe(value => { lastValue = value; });
            state.setState(42);
            expect(lastValue).toBe(42);
        });

        // Más tests aquí...
    });
} 