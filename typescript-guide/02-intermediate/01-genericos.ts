/**
 * GENÉRICOS 🎁
 * ==========
 * 
 * ¡Vamos a crear cajas mágicas que pueden guardar cualquier cosa!
 * Como una caja que se adapta al tamaño del juguete que metas.
 */

// Función genérica simple 🎨
// Como una caja que se ajusta a lo que le des
function guardarEnCaja<T>(cosa: T): T {
    console.log("Guardando en la caja mágica...");
    return cosa;
}

// Clase genérica 🎪
// Como una colección de juguetes que pueden ser del mismo tipo
class ColeccionMagica<T> {
    private items: T[] = [];

    agregar(item: T): void {
        this.items.push(item);
        console.log("¡Item agregado a la colección! ✨");
    }

    obtenerTodos(): T[] {
        return this.items;
    }
}

// Interfaces genéricas 🎭
// Como una receta que funciona con diferentes ingredientes
interface Contenedor<T> {
    contenido: T;
    mostrar(): void;
}

// Ejercicios divertidos 🎮
// 1. Crea una función que intercambie dos valores
// 2. Crea una clase Mochila que guarde cualquier tipo de objeto
// 3. Crea una interface para una máquina expendedora genérica 