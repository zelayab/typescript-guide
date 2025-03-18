/**
 * TIPOS CONDICIONALES 🤔
 * ===================
 * 
 * ¡Vamos a hacer que los tipos tomen decisiones!
 * Como cuando juegas "Si esto, entonces aquello"
 */

// Tipos condicionales simples 🎯
// Como preguntar: "¿Es un número? Si sí, dame un texto"
type SiEsNumero<T> = T extends number 
    ? "¡Es un número!" 
    : "No es un número";

// Tipos condicionales con uniones 🎨
// Como preguntar: "¿Qué tipo de juguete eres?"
type TipoDeJuguete<T> = T extends { ruedas: number }
    ? "Es un carrito" 
    : T extends { alas: number }
    ? "Es un avión"
    : "Es otro juguete";

// Inferencia en tipos condicionales 🔍
// Como adivinar qué hay dentro de una caja
type QuéHayEnLaCaja<T> = T extends Array<infer U>
    ? U
    : T;

// Ejercicios mágicos 🎮
// 1. Crea un tipo que diga si algo es grande o pequeño
// 2. Crea un tipo que detecte si es una mascota
// 3. Crea un tipo que extraiga el contenido de un regalo

/**
 * TIPOS CONDICIONALES EN TYPESCRIPT
 * ==============================
 * 
 * Los tipos condicionales permiten crear tipos que dependen
 * de condiciones, similar a un operador ternario.
 */

// Tipos condicionales básicos
type EsString<T> = T extends string ? true : false;

// Ejemplo de uso
type ResultadoString = EsString<"hola">; // true
type ResultadoNumero = EsString<42>; // false

// Tipos condicionales con uniones
type ExtraerArray<T> = T extends Array<infer U> ? U : never;

type ElementosString = ExtraerArray<string[]>; // string
type ElementosNumero = ExtraerArray<number[]>; // number

// Tipos condicionales con genéricos
interface Respuesta<T> {
    datos: T;
    error?: string;
}

type ExitoOError<T> = T extends { error: string }
    ? { exito: false; error: string }
    : { exito: true; datos: T };

// Ejemplo práctico: Sistema de validación
type Validador<T> = {
    [K in keyof T]: (valor: T[K]) => boolean;
};

type ResultadoValidacion<T> = {
    [K in keyof T]: T[K] extends Function ? never : boolean;
};

// Implementación práctica
class ValidadorForm<T extends object> {
    private validadores: Partial<Validador<T>> = {};

    agregarValidador<K extends keyof T>(
        campo: K,
        validador: (valor: T[K]) => boolean
    ) {
        this.validadores[campo] = validador as any;
    }

    validar(datos: T): ResultadoValidacion<T> {
        const resultado = {} as ResultadoValidacion<T>;

        for (const campo in this.validadores) {
            const validador = this.validadores[campo];
            if (validador) {
                const valor = validador(datos[campo] as any);
                (resultado[campo] as boolean) = valor;
            }
        }

        return resultado;
    }
}

// Ejemplo de uso
interface Usuario {
    nombre: string;
    edad: number;
    email: string;
}

const validadorUsuario = new ValidadorForm<Usuario>();

validadorUsuario.agregarValidador('nombre', 
    (nombre) => nombre.length >= 2);
validadorUsuario.agregarValidador('edad', 
    (edad) => edad >= 18);
validadorUsuario.agregarValidador('email', 
    (email) => email.includes('@'));

// Ejercicios prácticos
// 1. Implementar un tipo condicional para rutas API
type APIRoute<T extends string> = T extends `/${infer Path}`
    ? Path
    : never;

// 2. Crear un sistema de permisos basado en roles
type Permission = 'read' | 'write' | 'admin';
type Role = 'user' | 'editor' | 'administrator';

type RolePermissions<T extends Role> = T extends 'administrator'
    ? Permission
    : T extends 'editor'
    ? Exclude<Permission, 'admin'>
    : 'read'; 