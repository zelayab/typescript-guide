/**
 * CLASES BÁSICAS EN TYPESCRIPT
 * ==========================
 * 
 * TypeScript implementa el concepto de clases con características
 * adicionales como modificadores de acceso y tipos.
 */

// Clase básica
class Animal {
    // Propiedades con modificadores de acceso
    private readonly id: number;
    public nombre: string;
    public edad: number;

    constructor(nombre: string, edad: number) {
        this.id = Math.random();
        this.nombre = nombre;
        this.edad = edad;
    }

    public hacerSonido(): string {
        return "Algún sonido";
    }
}

// Herencia
class Perro extends Animal {
    private raza: string;

    constructor(nombre: string, edad: number, raza: string) {
        super(nombre, edad);
        this.raza = raza;
    }

    public hacerSonido(): string {
        return "¡Guau!";
    }

    public obtenerInfo(): string {
        return `${this.nombre} es un ${this.raza} de ${this.edad} años`;
    }
}

// Implementación de interfaces
interface Mascota {
    nombre: string;
    jugar(): void;
}

class Gato extends Animal implements Mascota {
    constructor(nombre: string, edad: number) {
        super(nombre, edad);
    }

    public jugar(): void {
        console.log(`${this.nombre} está jugando`);
    }

    public hacerSonido(): string {
        return "¡Miau!";
    }
}

// Ejercicios prácticos
// 1. Crear una clase con propiedades readonly
// 2. Implementar múltiples interfaces
// 3. Usar modificadores de acceso 


/* resolucion de ejercicios */

// 1. Crear una clase con propiedades readonly

class Personita {
    readonly id: number;
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.id = Math.random();
        this.name = name;
        this.age = age;
    }
}

const personita = new Personita("Juan", 25);
console.log(personita);


// 2. Implementar múltiples interfaces

interface Mascota {
    nombre: string;
    jugar(): void;
}

class Gato3 implements Mascota {
    nombre: string;
    edad: number;

    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }

    jugar(): void {
        console.log(`${this.nombre} está jugando`);
    }
}

const gato3 = new Gato3("Miau", 3);
console.log(gato3);

// 3. Usar modificadores de acceso 

class Person {
    private namecito: string;
    public agecito: number;

    constructor(name: string, age: number) {
        this.namecito = name;
        this.agecito = age;
    }

    public getName(): string {
        return this.namecito    ;
    }

    public getAge(): number {
        return this.agecito;
    }
}

const person = new Person("Juan", 25);
console.log(person);

/**
 * CLASES BÁSICAS 🏰
 * ==============
 * 
 * ¡Vamos a crear fábricas de juguetes!
 * Como cuando tienes un molde para hacer galletas.
 */

// Clase simple 🎠
// Como una fábrica que hace peluches
class Peluche {
    nombre: string;
    color: string;

    constructor(nombre: string, color: string) {
        this.nombre = nombre;
        this.color = color;
    }

    abrazar(): string {
        return `${this.nombre} te da un abrazo suave 🤗`;
    }
}

// Clase con propiedades privadas 🔒
// Como una caja fuerte que guarda secretos
class CajaSecreta {
    private tesoro: string;
    readonly id: number;  // readonly significa que no se puede cambiar

    constructor(tesoro: string) {
        this.tesoro = tesoro;
        this.id = Math.random();
    }

    verTesoro(contraseña: string): string {
        if (contraseña === "abracadabra") {
            return this.tesoro;
        }
        return "¡No puedes ver el tesoro! 🚫";
    }
}

// Ejercicios divertidos 🎮
// 1. Crea una clase Mascota con nombre y sonido
// 2. Crea una clase Mochila que guarde cosas
// 3. Crea una clase Robot con batería y acciones

