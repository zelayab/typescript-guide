/**
 * PATRONES DE RENDIMIENTO Y OPTIMIZACIÓN 🚀
 * ====================================
 */

// 1. POOL DE OBJETOS 🏊‍♂️
// ==================

// ✅ Bien: Pool de objetos reutilizables
class ObjetoPool<T> {
    private disponibles: T[] = [];
    private enUso: Set<T> = new Set();

    constructor(
        private factory: () => T,
        private reset: (item: T) => void,
        private tamanioInicial: number
    ) {
        this.inicializar();
    }

    private inicializar(): void {
        for (let i = 0; i < this.tamanioInicial; i++) {
            this.disponibles.push(this.factory());
        }
    }

    obtener(): T {
        let item: T;
        if (this.disponibles.length > 0) {
            item = this.disponibles.pop()!;
        } else {
            item = this.factory();
        }
        this.enUso.add(item);
        return item;
    }

    devolver(item: T): void {
        if (this.enUso.has(item)) {
            this.enUso.delete(item);
            this.reset(item);
            this.disponibles.push(item);
        }
    }
}

// 2. CACHÉ MULTICAPA 📦
// ================

// ✅ Bien: Sistema de caché con múltiples niveles
interface CacheProvider<T> {
    get(key: string): Promise<T | null>;
    set(key: string, value: T, ttl?: number): Promise<void>;
    delete(key: string): Promise<void>;
}

class MultiLevelCache<T> {
    constructor(
        private l1Cache: CacheProvider<T>, // Memoria
        private l2Cache: CacheProvider<T>, // Redis
        private l3Cache: CacheProvider<T>  // Base de datos
    ) {}

    async get(key: string): Promise<T | null> {
        // Intentar L1
        let value = await this.l1Cache.get(key);
        if (value) return value;

        // Intentar L2
        value = await this.l2Cache.get(key);
        if (value) {
            await this.l1Cache.set(key, value);
            return value;
        }

        // Intentar L3
        value = await this.l3Cache.get(key);
        if (value) {
            await this.l2Cache.set(key, value);
            await this.l1Cache.set(key, value);
        }

        return value;
    }
}

// 3. LAZY LOADING INTELIGENTE 🦥
// =========================

// ✅ Bien: Carga diferida con tipos
class LazyLoader<T> {
    private valor: T | undefined;
    private cargando = false;
    private callbacks: ((valor: T) => void)[] = [];

    constructor(private loader: () => Promise<T>) {}

    async get(): Promise<T> {
        if (this.valor !== undefined) {
            return this.valor;
        }

        if (this.cargando) {
            return new Promise(resolve => {
                this.callbacks.push(resolve);
            });
        }

        this.cargando = true;
        try {
            this.valor = await this.loader();
            this.callbacks.forEach(cb => cb(this.valor!));
            return this.valor;
        } finally {
            this.cargando = false;
            this.callbacks = [];
        }
    }

    invalidate(): void {
        this.valor = undefined;
    }
}

// 4. BATCH PROCESSING 📦
// ==================

// ✅ Bien: Procesamiento por lotes optimizado
class BatchProcessor<T, R> {
    private buffer: T[] = [];
    private timeoutId?: NodeJS.Timeout;

    constructor(
        private processor: (items: T[]) => Promise<R[]>,
        private maxSize: number = 100,
        private maxWait: number = 1000
    ) {}

    async add(item: T): Promise<R> {
        this.buffer.push(item);

        if (this.buffer.length >= this.maxSize) {
            return this.flush();
        }

        if (!this.timeoutId) {
            this.timeoutId = setTimeout(() => this.flush(), this.maxWait);
        }

        return new Promise((resolve, reject) => {
            const index = this.buffer.length - 1;
            this.once('processed', (results: R[]) => {
                resolve(results[index]);
            });
        });
    }

    private async flush(): Promise<R> {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }

        const items = [...this.buffer];
        this.buffer = [];

        const results = await this.processor(items);
        this.emit('processed', results);
        return results[results.length - 1];
    }

    private listeners: { [key: string]: Function[] } = {};

    private emit(event: string, data: any): void {
        const eventListeners = this.listeners[event] || [];
        eventListeners.forEach(listener => listener(data));
    }

    private once(event: string, listener: Function): void {
        const wrapper = (data: any) => {
            this.off(event, wrapper);
            listener(data);
        };
        this.on(event, wrapper);
    }

    private on(event: string, listener: Function): void {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(listener);
    }

    private off(event: string, listener: Function): void {
        this.listeners[event] = (this.listeners[event] || [])
            .filter(l => l !== listener);
    }
}

// 5. WORKER POOL 👷‍♂️
// ==============

// ✅ Bien: Pool de workers tipado
interface WorkerTask<T, R> {
    data: T;
    callback: (result: R) => void;
}

class WorkerPool<T, R> {
    private workers: Worker[] = [];
    private taskQueue: WorkerTask<T, R>[] = [];
    private availableWorkers: Worker[] = [];

    constructor(
        private workerScript: string,
        private numWorkers: number
    ) {
        this.initialize();
    }

    private initialize(): void {
        for (let i = 0; i < this.numWorkers; i++) {
            const worker = new Worker(this.workerScript);
            worker.onmessage = (e) => this.handleWorkerMessage(worker, e.data);
            this.workers.push(worker);
            this.availableWorkers.push(worker);
        }
    }

    execute(data: T): Promise<R> {
        return new Promise((resolve) => {
            const task: WorkerTask<T, R> = { data, callback: resolve };
            
            if (this.availableWorkers.length > 0) {
                this.assignTaskToWorker(this.availableWorkers.pop()!, task);
            } else {
                this.taskQueue.push(task);
            }
        });
    }

    private assignTaskToWorker(worker: Worker, task: WorkerTask<T, R>): void {
        worker.postMessage(task.data);
    }

    private handleWorkerMessage(worker: Worker, result: R): void {
        const nextTask = this.taskQueue.shift();
        if (nextTask) {
            this.assignTaskToWorker(worker, nextTask);
        } else {
            this.availableWorkers.push(worker);
        }
    }

    terminate(): void {
        this.workers.forEach(worker => worker.terminate());
        this.workers = [];
        this.availableWorkers = [];
        this.taskQueue = [];
    }
} 