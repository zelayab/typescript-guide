/**
 * PATRONES DE RENDIMIENTO 🏃‍♂️
 * =======================
 * 
 * ¡Vamos a hacer que nuestro código sea súper rápido!
 * Como darle alas mágicas a nuestros juguetes.
 */

// Memoización 🧠
// Como recordar resultados para no calcularlos otra vez
export function memoizar<T, R>(fn: (arg: T) => R): (arg: T) => R {
    const cache = new Map<T, R>();
    
    return (arg: T) => {
        if (cache.has(arg)) {
            return cache.get(arg)!;
        }
        const resultado = fn(arg);
        cache.set(arg, resultado);
        return resultado;
    };
}

// Lazy Loading 🦥
// Como no cargar algo hasta que lo necesites
export class CargaPerezosa<T> {
    private valor?: T;
    private cargado = false;

    constructor(private obtenerValor: () => T) {}

    get(): T {
        if (!this.cargado) {
            this.valor = this.obtenerValor();
            this.cargado = true;
        }
        return this.valor!;
    }
}

// Pool de objetos reutilizables
export class ObjectPool<T> {
    private available: T[] = [];
    private inUse: Set<T> = new Set();

    constructor(
        private factory: () => T,
        private reset?: (obj: T) => void,
        private initialSize = 0
    ) {
        for (let i = 0; i < initialSize; i++) {
            this.available.push(factory());
        }
    }

    acquire(): T {
        const obj = this.available.pop() || this.factory();
        this.inUse.add(obj);
        return obj;
    }

    release(obj: T): void {
        if (this.inUse.delete(obj)) {
            if (this.reset) {
                this.reset(obj);
            }
            this.available.push(obj);
        }
    }
}

// Cache con expiración
export class ExpiringCache<K, V> {
    private cache = new Map<K, { value: V; expiry: number }>();

    constructor(private defaultTTL: number = 1000 * 60) {} // 1 minuto por defecto

    set(key: K, value: V, ttl: number = this.defaultTTL): void {
        const expiry = Date.now() + ttl;
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

    cleanup(): void {
        const now = Date.now();
        for (const [key, item] of this.cache.entries()) {
            if (now > item.expiry) {
                this.cache.delete(key);
            }
        }
    }
}

// Ejercicios mágicos 🎮
// 1. Implementa un pool de objetos reutilizables
// 2. Crea un sistema de caché con tiempo de expiración
// 3. Implementa un cargador de recursos bajo demanda 