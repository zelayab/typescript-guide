/**
 * OBJETOS Y TIPOS 🎨
 * ================
 * 
 * ¡Vamos a aprender a describir nuestros juguetes!
 * Como cuando dices que tu peluche es suave y azul.
 */

// Objetos simples 🧸
// Como describir tu juguete favorito
const miJuguete = {
    nombre: "Osito",
    color: "marrón",
    tamaño: "pequeño",
    esSuave: true
};

// Interfaces 📝
// Como hacer una lista de lo que debe tener un juguete
interface Juguete {
    nombre: string;
    color: string;
    readonly precio2?: number;  // Añadimos readonly si existe en otra declaración
}

// Type Aliases 🎭
// Otra forma de describir cosas
type Animal3 = {
    nombre: string;
    sonido: string;
    patas: number;
};

// Ejercicios divertidos 🎮
// 1. Crea un objeto que describa tu mascota
// 2. Crea una interface para una pizza
// 3. Crea un type para un superhéroe

/**
 * OBJETOS Y TIPOS EN TYPESCRIPT
 * ===========================
 * 
 * TypeScript nos permite definir la estructura de objetos
 * usando interfaces y tipos personalizados.
 */

// Definición básica de objeto
let persona: { nombre: string, edad: number } = {
    nombre: "Juan",
    edad: 30
};

// Type Alias - Definición de tipo personalizado
type Persona = {
    nombre: string;
    edad: number;
    email?: string; // Propiedad opcional
};

// Interface - Otra forma de definir tipos
interface Usuario2 {
    id: number;
    nombre: string;
    activo: boolean;
    roles: string[];
}

// Ejemplo de uso de tipos
const usuario3: Usuario2 = {
    id: 1,
    nombre: "María",
    activo: true,
    roles: ["admin", "user"]
};

// Duck Typing - Tipado estructural
type Punto2D = { x: number, y: number };
type Punto3D = { x: number, y: number, z: number };

let punto2D: Punto2D = { x: 10, y: 20 };
let punto3D: Punto3D = { x: 10, y: 20, z: 30 };

// El tipado estructural permite esta asignación
punto2D = punto3D; // Válido porque punto3D tiene todas las propiedades de punto2D

// Ejercicios prácticos
// 1. Crear una interface con métodos
// 2. Extender una interface existente
// 3. Combinar múltiples tipos usando intersection types 