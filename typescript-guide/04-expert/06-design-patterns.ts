/**
 * Patrones de Diseño en TypeScript
 * 
 * Este módulo presenta los patrones de diseño más comunes implementados en TypeScript,
 * con ejemplos prácticos y casos de uso.
 */

// ===============================
// 1. Patrones Creacionales
// ===============================

/**
 * Singleton: Asegura una única instancia de una clase
 * Uso común: Conexiones a base de datos, configuraciones globales
 */
export class DatabaseConnection {
    private static instance: DatabaseConnection;
    private constructor() {}

    static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }

    connect(): void {
        console.log('Conectando a la base de datos...');
    }
}

/**
 * Factory Method: Define una interfaz para crear objetos
 * Uso común: Creación de objetos relacionados sin especificar sus clases concretas
 */
export abstract class Creator {
    abstract createProduct(): Product;

    someOperation(): string {
        const product = this.createProduct();
        return `Creator: ${product.operation()}`;
    }
}

interface Product {
    operation(): string;
}

export class ConcreteCreator extends Creator {
    createProduct(): Product {
        return new ConcreteProduct();
    }
}

class ConcreteProduct implements Product {
    operation(): string {
        return 'ConcreteProduct operation';
    }
}

// ===============================
// 2. Patrones Estructurales
// ===============================

/**
 * Adapter: Permite que interfaces incompatibles trabajen juntas
 * Uso común: Integración de bibliotecas legacy, APIs externas
 */
interface ModernLibrary {
    request(): string;
}

class LegacyLibrary {
    specificRequest(): string {
        return 'Legacy specific request';
    }
}

export class LibraryAdapter implements ModernLibrary {
    constructor(private legacyLibrary: LegacyLibrary) {}

    request(): string {
        return this.legacyLibrary.specificRequest();
    }
}

/**
 * Decorator: Añade responsabilidades a objetos dinámicamente
 * Uso común: Logging, caching, autenticación
 */
export interface Component {
    operation(): string;
}

export class ConcreteComponent implements Component {
    operation(): string {
        return 'ConcreteComponent';
    }
}

export class LoggingDecorator implements Component {
    constructor(private component: Component) {}

    operation(): string {
        console.log('LoggingDecorator: Logging operation');
        return this.component.operation();
    }
}

// ===============================
// 3. Patrones de Comportamiento
// ===============================

/**
 * Observer: Define una dependencia uno-a-muchos entre objetos
 * Uso común: Eventos UI, notificaciones, actualizaciones en tiempo real
 */
export interface Observer {
    update(subject: Subject): void;
}

export interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
}

export class ConcreteSubject implements Subject {
    private observers: Observer[] = [];
    private state: number = 0;

    attach(observer: Observer): void {
        this.observers.push(observer);
    }

    detach(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    notify(): void {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    setState(state: number): void {
        this.state = state;
        this.notify();
    }

    getState(): number {
        return this.state;
    }
}

export class ConcreteObserver implements Observer {
    constructor(private name: string) {}

    update(subject: Subject): void {
        if (subject instanceof ConcreteSubject) {
            console.log(`${this.name} notified of state change: ${subject.getState()}`);
        }
    }
}

/**
 * Strategy: Define una familia de algoritmos intercambiables
 * Uso común: Diferentes algoritmos de ordenamiento, estrategias de validación
 */
export interface Strategy {
    execute(data: number[]): number;
}

export class SumStrategy implements Strategy {
    execute(data: number[]): number {
        return data.reduce((sum, current) => sum + current, 0);
    }
}

export class MultiplyStrategy implements Strategy {
    execute(data: number[]): number {
        return data.reduce((product, current) => product * current, 1);
    }
}

export class Context {
    constructor(private strategy: Strategy) {}

    setStrategy(strategy: Strategy): void {
        this.strategy = strategy;
    }

    executeStrategy(data: number[]): number {
        return this.strategy.execute(data);
    }
}

// Ejemplo de uso y documentación
function ejemploPatrones(): void {
    // Singleton
    const db1 = DatabaseConnection.getInstance();
    const db2 = DatabaseConnection.getInstance();
    console.log('¿Misma instancia?:', db1 === db2); // true

    // Factory Method
    const creator = new ConcreteCreator();
    console.log(creator.someOperation());

    // Observer
    const subject = new ConcreteSubject();
    const observer1 = new ConcreteObserver('Observer 1');
    const observer2 = new ConcreteObserver('Observer 2');

    subject.attach(observer1);
    subject.attach(observer2);
    subject.setState(123);

    // Strategy
    const context = new Context(new SumStrategy());
    console.log(context.executeStrategy([1, 2, 3])); // 6
    
    context.setStrategy(new MultiplyStrategy());
    console.log(context.executeStrategy([1, 2, 3])); // 6
}

// Export tipos
export type {
    ModernLibrary, Product
};

// Tests unitarios
if (import.meta.vitest) {
    const { describe, it, expect } = import.meta.vitest;

    describe('Patrones de Diseño', () => {
        describe('Singleton', () => {
            it('debería mantener una única instancia', () => {
                const instance1 = DatabaseConnection.getInstance();
                const instance2 = DatabaseConnection.getInstance();
                expect(instance1).toBe(instance2);
            });
        });

        describe('Factory Method', () => {
            it('debería crear productos correctamente', () => {
                const creator = new ConcreteCreator();
                expect(creator.someOperation()).toContain('Creator');
            });
        });

        describe('Observer', () => {
            it('debería notificar a todos los observadores', () => {
                const subject = new ConcreteSubject();
                const observer1 = new ConcreteObserver('Test1');
                const observer2 = new ConcreteObserver('Test2');

                subject.attach(observer1);
                subject.attach(observer2);
                subject.setState(100);

                expect(subject.getState()).toBe(100);
            });
        });

        describe('Strategy', () => {
            it('debería ejecutar diferentes estrategias', () => {
                const context = new Context(new SumStrategy());
                expect(context.executeStrategy([1, 2, 3])).toBe(6);

                context.setStrategy(new MultiplyStrategy());
                expect(context.executeStrategy([1, 2, 3])).toBe(6);
            });
        });
    });
}

