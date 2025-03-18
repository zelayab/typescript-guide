/**
 * ARQUITECTURA Y PATRONES AVANZADOS 🏰
 * ================================
 */

// 1. ARQUITECTURA HEXAGONAL (PORTS & ADAPTERS) 🔌
// =========================================

// ✅ Bien: Puertos y Adaptadores tipados
interface Puerto<T> {
    ejecutar(comando: T): Promise<void>;
}

interface AdaptadorRepositorio<T> {
    guardar(entidad: T): Promise<void>;
    buscarPorId(id: string): Promise<T | null>;
    listar(): Promise<T[]>;
}

class ServicioAplicacion<T> {
    constructor(
        private puerto: Puerto<T>,
        private repositorio: AdaptadorRepositorio<T>
    ) {}

    async procesar(comando: T): Promise<void> {
        await this.puerto.ejecutar(comando);
        await this.repositorio.guardar(comando);
    }
}

// 2. PATRÓN CQRS (Command Query Responsibility Segregation) 📑
// ===================================================

// ✅ Bien: Separación de comandos y consultas
interface Comando<T = void> {
    readonly tipo: string;
    readonly payload: T;
}

interface Consulta<T = void> {
    readonly tipo: string;
    readonly parametros: T;
}

class ManejadorComandos {
    private handlers = new Map<string, (payload: any) => Promise<void>>();

    registrar<T>(tipo: string, handler: (payload: T) => Promise<void>): void {
        this.handlers.set(tipo, handler);
    }

    async ejecutar<T>(comando: Comando<T>): Promise<void> {
        const handler = this.handlers.get(comando.tipo);
        if (!handler) {
            throw new Error(`No hay manejador para ${comando.tipo}`);
        }
        await handler(comando.payload);
    }
}

// 3. PATRÓN EVENT SOURCING 📊
// =======================

// ✅ Bien: Sistema de eventos tipado
interface Evento<T = unknown> {
    readonly tipo: string;
    readonly datos: T;
    readonly timestamp: number;
    readonly agregadoId: string;
}

class AlmacenEventos {
    private eventos: Evento[] = [];

    agregar<T>(evento: Evento<T>): void {
        this.eventos.push(evento);
    }

    obtenerPorAgregado(agregadoId: string): Evento[] {
        return this.eventos.filter(e => e.agregadoId === agregadoId);
    }
}

// 4. PATRÓN SAGA 🔄
// =============

// ✅ Bien: Gestión de transacciones distribuidas
interface PasoSaga<T, R> {
    ejecutar(contexto: T): Promise<R>;
    compensar(contexto: T): Promise<void>;
}

class GestorSaga<T> {
    private pasos: PasoSaga<T, any>[] = [];

    agregarPaso(paso: PasoSaga<T, any>): this {
        this.pasos.push(paso);
        return this;
    }

    async ejecutar(contextoInicial: T): Promise<void> {
        const resultados: any[] = [];
        
        for (const paso of this.pasos) {
            try {
                const resultado = await paso.ejecutar(contextoInicial);
                resultados.push(resultado);
            } catch (error) {
                // Compensación en caso de error
                for (let i = resultados.length - 1; i >= 0; i--) {
                    await this.pasos[i].compensar(contextoInicial);
                }
                throw error;
            }
        }
    }
}

// 5. PATRÓN SPECIFICATION 🔍
// =====================

// ✅ Bien: Especificaciones componibles
interface Specification<T> {
    isSatisfiedBy(candidate: T): boolean;
    and(other: Specification<T>): Specification<T>;
    or(other: Specification<T>): Specification<T>;
    not(): Specification<T>;
}

abstract class CompositeSpecification<T> implements Specification<T> {
    abstract isSatisfiedBy(candidate: T): boolean;

    and(other: Specification<T>): Specification<T> {
        return new AndSpecification(this, other);
    }

    or(other: Specification<T>): Specification<T> {
        return new OrSpecification(this, other);
    }

    not(): Specification<T> {
        return new NotSpecification(this);
    }
}

// 6. PATRÓN CIRCUIT BREAKER 🔌
// =======================

// ✅ Bien: Circuit Breaker tipado
interface CircuitBreakerConfig {
    maxFailures: number;
    resetTimeout: number;
}

class CircuitBreaker {
    private failures = 0;
    private lastFailure?: number;
    private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';

    constructor(private config: CircuitBreakerConfig) {}

    async execute<T>(operation: () => Promise<T>): Promise<T> {
        if (this.shouldReset()) {
            this.reset();
        }

        if (this.state === 'OPEN') {
            throw new Error('Circuit breaker is OPEN');
        }

        try {
            const result = await operation();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }

    private shouldReset(): boolean {
        return this.state === 'OPEN' &&
            this.lastFailure !== undefined &&
            Date.now() - this.lastFailure >= this.config.resetTimeout;
    }

    private reset(): void {
        this.state = 'HALF_OPEN';
        this.failures = 0;
    }

    private onSuccess(): void {
        this.failures = 0;
        this.state = 'CLOSED';
    }

    private onFailure(): void {
        this.failures++;
        this.lastFailure = Date.now();
        if (this.failures >= this.config.maxFailures) {
            this.state = 'OPEN';
        }
    }
} 