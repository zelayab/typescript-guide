/**
 * PATRONES AVANZADOS DE TYPESCRIPT 🎨
 * ==============================
 */

// 1. PATRÓN RESULTADO (RESULT PATTERN) ✨
// =================================

// ✅ Bien: Manejo de resultados tipado
interface Success<T> {
    tipo: 'success';
    valor: T;
}

interface Failure<E> {
    tipo: 'failure';
    error: E;
}

type Result<T, E> = Success<T> | Failure<E>;

class ResultHandler<T, E> {
    static success<T>(valor: T): Result<T, never> {
        return { tipo: 'success', valor };
    }

    static failure<E>(error: E): Result<never, E> {
        return { tipo: 'failure', error };
    }

    static match<T, E, R>(
        result: Result<T, E>,
        handlers: {
            success: (valor: T) => R;
            failure: (error: E) => R;
        }
    ): R {
        switch (result.tipo) {
            case 'success':
                return handlers.success(result.valor);
            case 'failure':
                return handlers.failure(result.error);
        }
    }
}

// 2. PATRÓN ESTADO (STATE PATTERN) 🔄
// ==============================

// ✅ Bien: Máquina de estados tipada
type Estado = 'inicial' | 'cargando' | 'completado' | 'error';

interface Transicion<T> {
    a: Estado;
    accion: (datos: T) => Promise<void>;
}

class MaquinaEstados<T> {
    private estadoActual: Estado = 'inicial';
    private transiciones = new Map<Estado, Transicion<T>[]>();

    agregarTransicion(desde: Estado, transicion: Transicion<T>): this {
        const transiciones = this.transiciones.get(desde) || [];
        this.transiciones.set(desde, [...transiciones, transicion]);
        return this;
    }

    async transicionar(datos: T, nuevoEstado: Estado): Promise<void> {
        const transicionesPermitidas = this.transiciones.get(this.estadoActual);
        const transicion = transicionesPermitidas?.find(t => t.a === nuevoEstado);

        if (!transicion) {
            throw new Error(`Transición inválida: ${this.estadoActual} -> ${nuevoEstado}`);
        }

        await transicion.accion(datos);
        this.estadoActual = nuevoEstado;
    }
}

// 3. PATRÓN COMANDO (COMMAND PATTERN) 🎮
// =================================

// ✅ Bien: Comandos tipados con histórico
interface Comando<T> {
    ejecutar(estado: T): T;
    deshacer(estado: T): T;
}

class HistorialComandos<T> {
    private comandos: Comando<T>[] = [];
    private indice = -1;

    ejecutar(comando: Comando<T>, estado: T): T {
        const nuevoEstado = comando.ejecutar(estado);
        this.comandos = [...this.comandos.slice(0, this.indice + 1), comando];
        this.indice++;
        return nuevoEstado;
    }

    deshacer(estado: T): T {
        if (this.indice < 0) return estado;
        const comando = this.comandos[this.indice];
        this.indice--;
        return comando.deshacer(estado);
    }

    rehacer(estado: T): T {
        if (this.indice >= this.comandos.length - 1) return estado;
        this.indice++;
        const comando = this.comandos[this.indice];
        return comando.ejecutar(estado);
    }
}

// 4. PATRÓN VISITANTE (VISITOR PATTERN) 👥
// =================================

// ✅ Bien: Visitante tipado
interface Visitable {
    accept<R>(visitor: Visitor<R>): R;
}

interface Visitor<R> {
    visitTexto(elemento: ElementoTexto): R;
    visitImagen(elemento: ElementoImagen): R;
    visitGrupo(elemento: ElementoGrupo): R;
}

class ElementoTexto implements Visitable {
    constructor(public texto: string) {}
    
    accept<R>(visitor: Visitor<R>): R {
        return visitor.visitTexto(this);
    }
}

class ElementoImagen implements Visitable {
    constructor(public url: string) {}
    
    accept<R>(visitor: Visitor<R>): R {
        return visitor.visitImagen(this);
    }
}

class ElementoGrupo implements Visitable {
    constructor(public elementos: Visitable[]) {}
    
    accept<R>(visitor: Visitor<R>): R {
        return visitor.visitGrupo(this);
    }
}

// 5. PATRÓN ESTRATEGIA (STRATEGY PATTERN) 🎯
// ====================================

// ✅ Bien: Estrategias tipadas
interface EstrategiaProcesamiento<T, R> {
    procesar(datos: T): R;
}

class ProcesadorContexto<T, R> {
    constructor(private estrategia: EstrategiaProcesamiento<T, R>) {}

    setEstrategia(estrategia: EstrategiaProcesamiento<T, R>): void {
        this.estrategia = estrategia;
    }

    ejecutar(datos: T): R {
        return this.estrategia.procesar(datos);
    }
}

// 6. PATRÓN DECORADOR (DECORATOR PATTERN) 🎁
// ====================================

// ✅ Bien: Decoradores de clase tipados
interface ComponenteBase {
    operacion(): string;
}

class Componente implements ComponenteBase {
    operacion(): string {
        return 'Componente Base';
    }
}

abstract class DecoradorComponente implements ComponenteBase {
    constructor(protected componente: ComponenteBase) {}

    operacion(): string {
        return this.componente.operacion();
    }
}

class DecoradorLogger extends DecoradorComponente {
    operacion(): string {
        console.log('Logging operación');
        return super.operacion();
    }
}

// 7. PATRÓN OBSERVADOR REACTIVO (REACTIVE OBSERVER) 🔄
// ============================================

// ✅ Bien: Sistema de observadores reactivo
type Subscription = () => void;

class Observable<T> {
    private observers = new Set<(value: T) => void>();

    subscribe(observer: (value: T) => void): Subscription {
        this.observers.add(observer);
        return () => this.observers.delete(observer);
    }

    notify(value: T): void {
        this.observers.forEach(observer => observer(value));
    }

    map<R>(fn: (value: T) => R): Observable<R> {
        const mapped = new Observable<R>();
        this.subscribe(value => mapped.notify(fn(value)));
        return mapped;
    }

    filter(predicate: (value: T) => boolean): Observable<T> {
        const filtered = new Observable<T>();
        this.subscribe(value => {
            if (predicate(value)) {
                filtered.notify(value);
            }
        });
        return filtered;
    }
} 