/**
 * SISTEMA DE TIPOS INTERNO 🧬
 * =======================
 * 
 * ¡Vamos a explorar cómo funciona TypeScript por dentro!
 * Como estudiar la anatomía de un dragón mágico.
 */

// Sistema de Tipos Estructural 🏗️
// Como reconocer objetos por su forma
type EstructuraMagica = {
    poder: number;
    elemento: string;
};

function usarMagia(objeto: EstructuraMagica) {
    console.log(`✨ Usando ${objeto.elemento} con poder ${objeto.poder}`);
}

// Sistema de Unión Discriminada 🎭
// Como tener diferentes tipos de magia en uno
type Hechizo = 
    | { tipo: 'fuego'; temperatura: number }
    | { tipo: 'hielo'; radio: number }
    | { tipo: 'viento'; velocidad: number };

function lanzarHechizo(hechizo: Hechizo) {
    switch (hechizo.tipo) {
        case 'fuego':
            return `🔥 Fuego a ${hechizo.temperatura}°`;
        case 'hielo':
            return `❄️ Hielo con radio ${hechizo.radio}`;
        case 'viento':
            return `🌪️ Viento a ${hechizo.velocidad} km/h`;
    }
}

// Sistema de Tipos Avanzado 🌟
// Como combinar diferentes tipos de magia
type MagiaAvanzada<T> = T extends any[]
    ? { tipo: 'secuencia'; hechizos: T }
    : T extends Function
        ? { tipo: 'ritual'; invocacion: T }
        : { tipo: 'simple'; poder: T };

// Ejercicios legendarios 🎮
// 1. Implementa un sistema de tipos que valide hechizos complejos
// 2. Crea un sistema que combine diferentes tipos de magia
// 3. Desarrolla un validador de rituales mágicos 