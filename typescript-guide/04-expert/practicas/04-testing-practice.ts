/**
 * PRÁCTICAS DE TESTING AVANZADO
 */

// Ejercicio 1: Sistema de mocking para API REST
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

// Ejercicio 2: Generador de datos de prueba tipado
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

// Ejercicio 3: Framework de testing E2E tipado
export interface TestStep<T> {
    name: string;
    execute: () => Promise<T>;
    validate: (result: T) => Promise<boolean>;
}

export class E2ETestRunner<T> {
    private steps: TestStep<T>[] = [];
    private beforeEachHooks: (() => Promise<void>)[] = [];
    private afterEachHooks: (() => Promise<void>)[] = [];

    addStep(step: TestStep<T>): this {
        this.steps.push(step);
        return this;
    }

    beforeEach(hook: () => Promise<void>): this {
        this.beforeEachHooks.push(hook);
        return this;
    }

    afterEach(hook: () => Promise<void>): this {
        this.afterEachHooks.push(hook);
        return this;
    }

    async run(): Promise<boolean> {
        let lastResult: T | undefined;

        for (const step of this.steps) {
            console.log(`Ejecutando paso: ${step.name}`);
            
            try {
                // Ejecutar hooks beforeEach
                for (const hook of this.beforeEachHooks) {
                    await hook();
                }

                const result = await step.execute();
                const isValid = await step.validate(result);
                
                if (!isValid) {
                    console.error(`Falló la validación en: ${step.name}`);
                    return false;
                }

                lastResult = result;

                // Ejecutar hooks afterEach
                for (const hook of this.afterEachHooks) {
                    await hook();
                }
            } catch (error) {
                console.error(`Error en paso ${step.name}:`, error);
                return false;
            }
        }

        return true;
    }
}

// Ejemplo de uso (comentado hasta que se configure vitest correctamente):
/*
import { describe, it, expect } from 'vitest';

describe('Testing Framework', () => {
    // Test del API Mocker
    it('should mock API endpoints', async () => {
        interface User {
            id: number;
            name: string;
        }

        const mocker = new APIMocker();
        const endpoint: APIEndpoint<void, User> = {
            path: '/users/1',
            method: 'GET',
            response: {} as User
        };

        const mockResponse: User = { id: 1, name: 'Test User' };
        mocker.mockEndpoint(endpoint, mockResponse);

        const response = await mocker.request(endpoint);
        expect(response).toEqual(mockResponse);
    });

    // Test del Generador de Datos
    it('should generate test data', () => {
        interface User {
            id: number;
            name: string;
            email: string;
        }

        const generator = new TestDataGenerator<User>()
            .addGenerator('id', () => Math.floor(Math.random() * 1000))
            .addGenerator('name', () => 'Test User')
            .addGenerator('email', () => 'test@example.com');

        const user = generator.generate();
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name', 'Test User');
        expect(user).toHaveProperty('email', 'test@example.com');
    });

    // Test del E2E Runner
    it('should run E2E tests', async () => {
        interface TestState {
            counter: number;
        }

        const runner = new E2ETestRunner<TestState>()
            .beforeEach(async () => {
                console.log('Before step');
            })
            .afterEach(async () => {
                console.log('After step');
            })
            .addStep({
                name: 'Increment counter',
                execute: async () => ({ counter: 1 }),
                validate: async (result) => result.counter === 1
            });

        const success = await runner.run();
        expect(success).toBe(true);
    });
});
*/ 