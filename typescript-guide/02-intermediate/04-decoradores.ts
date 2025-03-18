/**
 * DECORADORES EN TYPESCRIPT
 * =======================
 * 
 * Los decoradores son funciones especiales que nos permiten
 * añadir metadatos y modificar clases y sus miembros.
 */

// Decorador de clase actualizado
function logger(value: typeof Empleado, context: ClassDecoratorContext) {
    return class extends value {
        constructor(nombre: string) {
            console.log(`Clase ${value.name} instanciada el: ${new Date()}`);
            super(nombre);
        }
    };
}

// Decorador de método actualizado
function deprecated(mensaje?: string) {
    return function(target: any, context: ClassMethodDecoratorContext) {
        const metodoOriginal = target;
        return function(this: any, ...args: any[]) {
            console.warn(`⚠️ Método ${context.name.toString()} está deprecado. ${mensaje || ''}`);
            return metodoOriginal.apply(this, args);
        }
    }
}

// Decorador de propiedad actualizado
function validarLongitud(min: number, max: number) {
    return function(target: any, context: ClassFieldDecoratorContext) {
        return function(this: any, value: string) {
            if (value.length < min || value.length > max) {
                throw new Error(`La longitud debe estar entre ${min} y ${max} caracteres`);
            }
            return value;
        }
    }
}

// Ejemplo de uso de decoradores
@logger
class Empleado {
    @validarLongitud(3, 50)
    nombre: string;

    constructor(nombre: string) {
        this.nombre = nombre;
    }

    @deprecated("Usar 'obtenerInformacion' en su lugar")
    getDatos() {
        return `Empleado: ${this.nombre}`;
    }

    obtenerInformacion() {
        return `Información del empleado: ${this.nombre}`;
    }
}

// Ejercicios prácticos
// 1. Crear un decorador que valide parámetros de método
// 2. Implementar un decorador de cache para métodos
// 3. Crear un decorador que mida el tiempo de ejecución 

/**
 * DECORADORES 🎀
 * ============
 * 
 * ¡Vamos a poner stickers mágicos a nuestro código!
 * Como cuando decoras tu cuaderno con calcomanías.
 */

// Decorador de clase actualizado
function brillante(value: any, context: ClassDecoratorContext) {
    console.log("✨ ¡Esta clase brilla! ✨");
    return value;
}

// Decorador de método actualizado
function haceSonido(target: any, context: ClassMethodDecoratorContext) {
    const metodoOriginal = target;
    return function(this: any, ...args: any[]) {
        console.log("🔊 ¡Ding!");
        return metodoOriginal.apply(this, args);
    }
}

// Uso de decoradores 🎨
@brillante
class JugueteMagico {
    @haceSonido
    jugar() {
        return "¡Estoy jugando!";
    }
}

// Ejercicios divertidos 🎮
// 1. Crea un decorador que cuente cuántas veces se usa un método
// 2. Crea un decorador que agregue un color a una clase
// 3. Crea un decorador que haga que un método sea más lento 
// 3. Crea un decorador que haga que un método sea más lento 