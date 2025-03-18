/**
 * EJEMPLOS AVANZADOS DE MEJORES PRÁCTICAS 🚀
 * =====================================
 */

// 1. TIPOS DE UTILIDAD PERSONALIZADOS 🛠️
// =================================

// ✅ Bien: Tipos utilitarios reutilizables
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object 
        ? DeepReadonly<T[P]> 
        : T[P];
};

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object
        ? DeepPartial<T[P]>
        : T[P];
};

// 2. PATRONES DE OBSERVADOR TIPADO 👀
// ==============================

// ✅ Bien: Sistema de eventos tipado
interface Observable<T> {
    subscribe(observer: Observer<T>): () => void;
    notify(data: T): void;
}

interface Observer<T> {
    update(data: T): void;
}

class EventEmitter<T> implements Observable<T> {
    private observers: Observer<T>[] = [];

    subscribe(observer: Observer<T>): () => void {
        this.observers.push(observer);
        return () => {
            this.observers = this.observers.filter(obs => obs !== observer);
        };
    }

    notify(data: T): void {
        this.observers.forEach(observer => observer.update(data));
    }
}

// 3. FÁBRICAS INTELIGENTES 🏭
// =======================

// ✅ Bien: Factory con inferencia de tipos
interface ComponentConfig<T> {
    tipo: string;
    props: T;
}

class ComponentFactory {
    static crear<T extends ComponentConfig<any>>(
        config: T
    ): T['props'] extends { render: () => any }
        ? ReturnType<T['props']['render']>
        : never {
        // Implementación...
        throw new Error('No implementado');
    }
}

// 4. MIDDLEWARE TIPADO 🔄
// ==================

// ✅ Bien: Sistema de middleware con tipos
type Middleware<T> = (data: T) => Promise<T>;

class MiddlewareChain<T> {
    private middlewares: Middleware<T>[] = [];

    use(middleware: Middleware<T>): this {
        this.middlewares.push(middleware);
        return this;
    }

    async execute(initialData: T): Promise<T> {
        return this.middlewares.reduce(
            async (promise, middleware) => middleware(await promise),
            Promise.resolve(initialData)
        );
    }
}

// 5. GESTIÓN DE ERRORES AVANZADA 🚨
// ============================

// ✅ Bien: Jerarquía de errores tipada
abstract class AppError extends Error {
    constructor(
        message: string,
        public readonly code: string,
        public readonly context?: Record<string, unknown>
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }

    abstract get httpStatus(): number;
}

class ValidationError extends AppError {
    get httpStatus(): number {
        return 400;
    }
}

// 6. DECORADORES DE MÉTODO TIPADOS 🎭
// ==============================

// ✅ Bien: Decoradores con tipos seguros
function Validar<T>(schema: { validate: (data: unknown) => data is T }) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: unknown[]) {
            const data = args[0];
            if (!schema.validate(data)) {
                throw new ValidationError('Datos inválidos', 'INVALID_DATA');
            }
            return originalMethod.apply(this, args);
        };
    };
}

// 7. BUILDERS FLUIDOS 🌊
// ==================

// ✅ Bien: Builder pattern con tipos encadenados
interface QueryBuilder<T> {
    where(condition: Partial<T>): this;
    orderBy(key: keyof T): this;
    limit(n: number): this;
    build(): string;
}

class SQLQueryBuilder<T> implements QueryBuilder<T> {
    private query: string[] = [];

    where(condition: Partial<T>): this {
        // Implementación...
        return this;
    }

    orderBy(key: keyof T): this {
        // Implementación...
        return this;
    }

    limit(n: number): this {
        // Implementación...
        return this;
    }

    build(): string {
        return this.query.join(' ');
    }
}

// 8. SISTEMA DE PLUGINS TIPADO 🔌
// =========================

// ✅ Bien: Sistema de plugins extensible y tipado
interface Plugin<T> {
    nombre: string;
    inicializar(contexto: T): Promise<void>;
    destruir?(): Promise<void>;
}

class PluginManager<T> {
    private plugins = new Map<string, Plugin<T>>();

    async registrar(plugin: Plugin<T>): Promise<void> {
        if (this.plugins.has(plugin.nombre)) {
            throw new Error(`Plugin ${plugin.nombre} ya registrado`);
        }
        this.plugins.set(plugin.nombre, plugin);
    }

    async inicializarTodos(contexto: T): Promise<void> {
        for (const plugin of this.plugins.values()) {
            await plugin.inicializar(contexto);
        }
    }
}

// 9. CACHE INTELIGENTE 🧠
// ==================

// ✅ Bien: Sistema de cache con tipos y expiración
interface CacheOptions {
    ttl: number;
    maxItems?: number;
}

class TypedCache<K, V> {
    private cache = new Map<K, { value: V; expiry: number }>();

    constructor(private options: CacheOptions) {}

    set(key: K, value: V): void {
        this.cache.set(key, {
            value,
            expiry: Date.now() + this.options.ttl
        });
    }

    get(key: K): V | undefined {
        const item = this.cache.get(key);
        if (!item || item.expiry < Date.now()) {
            this.cache.delete(key);
            return undefined;
        }
        return item.value;
    }
}

// 10. VALIDACIÓN DE ESQUEMAS TIPADA 📋
// ==============================

// ✅ Bien: Sistema de validación con inferencia de tipos
type SchemaType<T> = {
    [K in keyof T]: {
        type: 'string' | 'number' | 'boolean';
        required?: boolean;
        validate?: (value: T[K]) => boolean;
    };
};

class SchemaValidator<T> {
    constructor(private schema: SchemaType<T>) {}

    validate(data: unknown): data is T {
        if (typeof data !== 'object' || !data) return false;

        return Object.entries(this.schema).every(([key, def]) => {
            const value = (data as any)[key];
            if (def.required && value === undefined) return false;
            if (value !== undefined && typeof value !== def.type) return false;
            if (def.validate && !def.validate(value)) return false;
            return true;
        });
    }
} 