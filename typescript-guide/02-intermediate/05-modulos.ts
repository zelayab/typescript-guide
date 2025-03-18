/**
 * MÓDULOS 📦
 * ========
 * 
 * ¡Vamos a organizar nuestros juguetes en diferentes cajas!
 * Como cuando ordenas tu cuarto y cada cosa tiene su lugar.
 */

// Exportar cosas 📤
// Como poner etiquetas en las cajas
export interface Juguete {
    nombre: string;
    tipo: string;
}

export class CajaDeJuguetes {
    private juguetes: Juguete[] = [];

    guardar(juguete: Juguete) {
        this.juguetes.push(juguete);
        console.log(`📦 Guardando ${juguete.nombre}`);
    }
}

// Importar cosas 📥
// Como traer juguetes de otras cajas

// Exportación por defecto 🎁
// Como decir "este es el juguete más importante"
export default class JugueteFavorito {
    constructor(public nombre: string) {
        console.log(`🌟 ${nombre} es el favorito!`);
    }
}

// Ejercicios divertidos 🎮
// 1. Crea un módulo para tus superhéroes favoritos
// 2. Crea un módulo que tenga herramientas mágicas
// 3. Importa y usa juguetes de diferentes módulos 