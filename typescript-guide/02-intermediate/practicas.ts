/**
 * EJERCICIOS PRÁCTICOS - NIVEL INTERMEDIO
 * ====================================
 */

// 1. Genéricos
// Implementar una estructura de datos Stack (Pila) genérica
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

// 2. Type Guards
// Sistema de procesamiento de mensajes con diferentes tipos
type EmailMessage = {
    tipo: 'email';
    destinatario: string;
    asunto: string;
    cuerpo: string;
};

type SMSMessage = {
    tipo: 'sms';
    numeroTelefono: string;
    texto: string;
};

type Message = EmailMessage | SMSMessage;

class MessageProcessor {
    static isEmail(message: Message): message is EmailMessage {
        return message.tipo === 'email';
    }

    static procesarMensaje(message: Message): void {
        if (this.isEmail(message)) {
            console.log(`Enviando email a ${message.destinatario}: ${message.asunto}`);
        } else {
            console.log(`Enviando SMS a ${message.numeroTelefono}`);
        }
    }
}

// 3. Utility Types
// Sistema de gestión de productos con estados
interface Producto {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    categoria: string;
}

type ProductoCreacion = Omit<Producto, 'id'>;
type ProductoActualizacion = Partial<Producto>;
type ProductoLectura = Readonly<Producto>;

class CatalogoProductos {
    private productos: Map<number, Producto> = new Map();

    crear(datos: ProductoCreacion): Producto {
        const id = Date.now();
        const producto: Producto = { id, ...datos };
        this.productos.set(id, producto);
        return producto;
    }

    actualizar(id: number, datos: ProductoActualizacion): boolean {
        const producto = this.productos.get(id);
        if (producto) {
            this.productos.set(id, { ...producto, ...datos });
            return true;
        }
        return false;
    }
}

// 4. Decoradores
// Sistema de logging para métodos
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
        console.log(`Llamando a ${propertyKey} con argumentos:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`${propertyKey} retornó:`, result);
        return result;
    };

    return descriptor;
}

class Calculadora {
    @log
    sumar(a: number, b: number): number {
        return a + b;
    }

    @log
    multiplicar(a: number, b: number): number {
        return a * b;
    }
}

// Ejercicios para practicar:

// 1. Implementar un cache genérico
interface Cache<T> {
    get(key: string): T | undefined;
    set(key: string, value: T): void;
    clear(): void;
}

// 2. Crear un sistema de validación de formularios
interface FormField {
    value: string;
    validate(): boolean;
    errors: string[];
}

// 3. Implementar un sistema de eventos tipado
type EventHandler<T> = (data: T) => void;

// 4. Desarrollar un builder pattern tipado
interface QueryBuilder<T> {
    where(condition: Partial<T>): QueryBuilder<T>;
    orderBy(key: keyof T): QueryBuilder<T>;
    build(): string;
} 