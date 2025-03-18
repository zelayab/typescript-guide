/**
 * PATRONES DE DISEÑO 🏰
 * ==================
 * 
 * ¡Vamos a construir castillos de código!
 * Como cuando sigues instrucciones para armar un juguete.
 */

// Patrón Singleton 👑
// Como tener solo un rey en el castillo
class Rey {
    private static instancia: Rey;
    private constructor(public nombre: string) {}

    static obtenerRey(): Rey {
        if (!Rey.instancia) {
            Rey.instancia = new Rey("Arturo");
        }
        return Rey.instancia;
    }
}

// Patrón Factory 🏭
// Como una fábrica de juguetes
interface Juguete {
    nombre: string;
    color: string;
    precio: number;
    jugar(): void;
}

class Pelota implements Juguete {
    constructor(
        public nombre: string = "Pelota",
        public color: string = "rojo",
        public precio: number = 10
    ) {}

    jugar() {
        console.log("¡La pelota está rebotando!");
    }
}

class Carro implements Juguete {
    constructor(
        public nombre: string = "Carro",
        public color: string = "azul",
        public precio: number = 20
    ) {}

    jugar() {
        console.log("¡El carro está corriendo!");
    }
}

class FabricaDeJuguetes {
    crearJuguete(tipo: "pelota" | "carro"): Juguete {
        if (tipo === "pelota") {
            return new Pelota();
        } else {
            return new Carro();
        }
    }
}

// Ejercicios mágicos 🎮
// 1. Crea un patrón Observer para una fiesta de juguetes
// 2. Implementa un patrón Strategy para diferentes juegos
// 3. Usa el patrón Decorator para decorar juguetes 