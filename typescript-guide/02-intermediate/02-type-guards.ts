/**
 * TYPE GUARDS EN TYPESCRIPT
 * ======================
 * 
 * Los type guards nos permiten acotar el tipo de una variable
 * en un bloque específico de código.
 * esto sirve para evitar errores de tipo en el codigo, 
 * y para que el compilador pueda entender el tipo de dato que tiene la variable
 */

/**
 * TYPE GUARDS 🛡️
 * ============
 * 
 * ¡Aprenderemos a proteger nuestro código!
 * Como un guardia que revisa que todo esté en orden.
 */

// Tipos básicos para ejemplos
type Pez = { nadar: () => void };
type Pajaro = { volar: () => void };
type Animal2 = Pez | Pajaro;

// Type guard usando typeof
function esString(valor: unknown): valor is string {
    return typeof valor === "string";
}

// Type guard usando instanceof
class Coche {
    conducir() { console.log("Conduciendo coche"); }
}

class Moto {
    conducir() { console.log("Conduciendo moto"); }
}

function esCoche(vehiculo: Coche | Moto): vehiculo is Coche {
    return vehiculo instanceof Coche;
}

// Type guard usando in
function moverAnimal(animal: Animal2) {
    if ("nadar" in animal) {
        animal.nadar();
    } else {
        animal.volar();
    }
}

// Type guard personalizado
interface UsuarioSistema {
    tipo: "usuario";
    nombre: string;
}

interface Admin {
    tipo: "admin";
    nombre: string;
    permisos: string[];
}

type PersonaSistema = UsuarioSistema | Admin;

function esAdmin(persona: PersonaSistema): persona is Admin {
    return persona.tipo === "admin";
}

// Ejemplos de uso
function procesarPersona(persona: PersonaSistema) {
    if (esAdmin(persona)) {
        console.log(`Admin ${persona.nombre} tiene ${persona.permisos.length} permisos`);
    } else {
        console.log(`Usuario ${persona.nombre}`);
    }
}

// Ejercicios prácticos
// 1. Crear un type guard para validar objetos
// 2. Implementar múltiples type guards en una función
// 3. Usar type guards con genéricos 

// Type Guard simple 🔍
// Como preguntar "¿Eres un número?"
function esNumero(valor: any): valor is number {
    return typeof valor === "number";
}

// Type Guard con clases 🎭
// Como preguntar "¿Eres un superhéroe?"
class Superheroe {
    nombre: string;
    poder: string;
    constructor(nombre: string, poder: string) {
        this.nombre = nombre;
        this.poder = poder;
    }
}

function esSuperheroe(personaje: any): personaje is Superheroe {
    return personaje instanceof Superheroe;
}

// Uso práctico 🎯
function procesarValor(valor: string | number) {
    if (esNumero(valor)) {
        console.log(valor * 2);  // TypeScript sabe que es un número
    } else {
        console.log(valor.toUpperCase());  // TypeScript sabe que es un string
    }
}

// Ejercicios divertidos 🎮
// 1. Crea un type guard para verificar si algo es un array
// 2. Crea un type guard para una clase Animal
// 3. Usa type guards para procesar diferentes tipos de juguetes 