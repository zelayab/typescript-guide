/**
 * PRÁCTICAS DE OPTIMIZACIÓN Y PERFORMANCE
 */

// Ejercicio 1: Cache de tipos
export type Memoize<T> = {
    readonly __memoized: T;
};

// Ejercicio 2: Optimización de uniones
export type OptimizeUnion<T> = T extends any ? { [K in keyof T]: T[K] } : never;

// Ejercicio 3: Lazy evaluation
export type LazyType<T> = () => T;

// Ejemplo de uso
export type ComplexCalculation<T> = T extends number
    ? Memoize<{ value: T; squared: T extends number ? T extends 0 ? 0 : `${T}` extends `${number}` ? number : never : never }>
    : never;

/**
 * PRÁCTICAS DE PATRONES DE RENDIMIENTO
 */

// Ejercicio 1: Sistema de caché multinivel
interface CacheLevel<K, V> {
    get(key: K): Promise<V | undefined>;
    set(key: K, value: V): Promise<void>;
    clear(): Promise<void>;
}

class MultiLevelCache<K, V> {
    constructor(private levels: CacheLevel<K, V>[]) {}

    async get(key: K): Promise<V | undefined> {
        for (const level of this.levels) {
            const value = await level.get(key);
            if (value !== undefined) {
                // Propagar a niveles superiores
                for (let i = this.levels.indexOf(level) - 1; i >= 0; i--) {
                    await this.levels[i].set(key, value);
                }
                return value;
            }
        }
        return undefined;
    }

    async set(key: K, value: V): Promise<void> {
        for (const level of this.levels) {
            await level.set(key, value);
        }
    }
}

// Ejercicio 2: Pool de conexiones tipado
interface Connection {
    isConnected: boolean;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    execute<T>(query: string): Promise<T>;
}

class ConnectionPool {
    private pool: Connection[] = [];
    private inUse = new Set<Connection>();

    constructor(
        private factory: () => Connection,
        private poolSize: number
    ) {
        for (let i = 0; i < poolSize; i++) {
            this.pool.push(factory());
        }
    }

    async acquire(): Promise<Connection> {
        const conn = this.pool.pop() || this.factory();
        this.inUse.add(conn);
        if (!conn.isConnected) {
            await conn.connect();
        }
        return conn;
    }

    async release(conn: Connection): Promise<void> {
        if (this.inUse.delete(conn)) {
            this.pool.push(conn);
        }
    }
} 