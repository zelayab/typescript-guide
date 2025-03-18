/**
 * INFERENCIA DE TIPOS 🔍
 * ===================
 * 
 * ¡Vamos a ver cómo TypeScript adivina los tipos!
 * Como cuando sabes qué animal es solo por ver su sombra.
 */

// Inferencia básica 🎯
// TypeScript es muy listo y puede adivinar tipos
let mensaje = "Hola";  // TypeScript sabe que es un string
let numero = 42;       // TypeScript sabe que es un number

// Inferencia en funciones 🎪
// Como adivinar qué sale de una caja mágica
function multiplicar(a: number, b: number) {
    return a * b;  // TypeScript sabe que devolverá un number
}

// Inferencia en genéricos 🎨
// Como una caja que se adapta a lo que le pongas
function primerElemento<T>(array: T[]) {
    return array[0];  // TypeScript sabe que devolverá T
}

// Ejercicios mágicos 🎮
// 1. Crea una función que TypeScript pueda adivinar el tipo de retorno
// 2. Usa genéricos y deja que TypeScript adivine los tipos
// 3. Crea un objeto y deja que TypeScript adivine sus tipos

/**
 * INFERENCIA DE TIPOS EN TYPESCRIPT
 * ==============================
 * 
 * TypeScript tiene un poderoso sistema de inferencia de tipos
 * que puede deducir tipos en muchos contextos.
 */

// Inferencia básica
const inferidoString = "hola"; // type: string
const inferidoNumero = 42; // type: number
const inferidoArray = [1, 2, 3]; // type: number[]

// Inferencia en funciones
const map = <T, U>(array: T[], fn: (item: T) => U): U[] => {
    return array.map(fn);
};

// El tipo de retorno se infiere automáticamente
const duplicados = map([1, 2, 3], x => x * 2);
const textos = map([1, 2, 3], x => x.toString());

// Inferencia contextual
interface EventHandler2<T> {
    (event: T): void;
}

const manejadorClick: EventHandler2<MouseEvent> = (event) => {
    // event se infiere como MouseEvent
    console.log(event.clientX, event.clientY);
};

// Sistema de inferencia avanzada
class GestorEstado<S> {
    private estado: S;

    constructor(estadoInicial: S) {
        this.estado = estadoInicial;
    }

    getEstado() {
        return this.estado; // Retorno inferido como S
    }

    actualizarEstado(nuevoEstado: Partial<S>) {
        this.estado = { ...this.estado, ...nuevoEstado };
    }
}

// Ejemplo de uso con inferencia
interface EstadoApp {
    usuario: string;
    tema: 'claro' | 'oscuro';
    notificaciones: number;
}

const gestor = new GestorEstado<EstadoApp>({
    usuario: 'admin',
    tema: 'claro',
    notificaciones: 0
});

// Ejercicios prácticos
// 1. Implementar un sistema de eventos con inferencia
class EventEmitter2<Events extends Record<string, any>> {
    private listeners: Partial<Record<keyof Events, Function[]>> = {};

    on<K extends keyof Events>(
        evento: K,
        listener: (data: Events[K]) => void
    ): void {
        if (!this.listeners[evento]) {
            this.listeners[evento] = [];
        }
        this.listeners[evento]?.push(listener);
    }

    emit<K extends keyof Events>(evento: K, data: Events[K]): void {
        this.listeners[evento]?.forEach(listener => listener(data));
    }
}

// 2. Crear un builder con inferencia de tipos
class QueryBuilder2<T> {
    private query: Partial<T> = {};

    where<K extends keyof T>(key: K, value: T[K]): this {
        this.query[key] = value;
        return this;
    }

    build(): Partial<T> {
        return this.query;
    }
} 