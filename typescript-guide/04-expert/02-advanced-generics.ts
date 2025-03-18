/**
 * GENÉRICOS AVANZADOS 🎭
 * ===================
 * 
 * ¡Vamos a crear cajas mágicas super poderosas!
 * Como baúles encantados que pueden transformar lo que guardan.
 */

// Restricciones avanzadas 🔒
// Como poner reglas especiales a tu magia
export type SoloNumeros<T> = T extends number 
    ? T 
    : never;

// Genéricos con múltiples parámetros 🎪
// Como mezclar diferentes tipos de magia
export class CajaMagica<T, U> {
    constructor(private valor1: T, private valor2: U) {}

    combinar<R>(fn: (a: T, b: U) => R): R {
        return fn(this.valor1, this.valor2);
    }
}

// Inferencia condicional 🔮
// Como hacer que la magia se adapte sola
export type InferirTipo<T> = T extends { tipo: infer U } 
    ? U 
    : never;

// Ejercicios mágicos 🎮
// 1. Crea un tipo que solo acepte objetos con cierta propiedad
// 2. Implementa una clase que combine tres tipos diferentes
// 3. Crea un tipo que infiera el tipo de retorno de una función

/**
 * PATRONES AVANZADOS DE GENÉRICOS
 * ============================
 * 
 * Técnicas avanzadas para el uso de genéricos en TypeScript.
 */

// Genéricos con múltiples restricciones
export interface HasId { id: number }
export interface HasName { name: string }

export class Repository<T extends HasId & HasName> {
    private items: T[] = [];

    save(item: T): void {
        const index = this.items.findIndex(i => i.id === item.id);
        if (index >= 0) {
            this.items[index] = item;
        } else {
            this.items.push(item);
        }
    }

    findById(id: number): T | undefined {
        return this.items.find(item => item.id === id);
    }
}

// Genéricos recursivos
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object 
        ? DeepPartial<T[P]> 
        : T[P];
};

// Factory genérico con inferencia de tipo
export interface Factory<T> {
    create(...args: any[]): T;
}

export class GenericFactory<T> implements Factory<T> {
    constructor(private ctor: new (...args: any[]) => T) {}

    create(...args: ConstructorParameters<new (...args: any[]) => T>): T {
        return new this.ctor(...args);
    }
}

// Genéricos con tipos dependientes
export type DependentProps<T, K extends keyof T> = {
    [P in K]: T[P];
} & {
    validate: (value: T[K]) => boolean;
};

// Sistema de validación genérico avanzado
export type ValidationRule<T> = {
    validate: (value: T) => boolean;
    message: string;
};

export class Validator<T extends object> {
    private rules: Partial<Record<keyof T, ValidationRule<T[keyof T]>[]>> = {};

    addRule<K extends keyof T>(
        property: K, 
        rule: ValidationRule<T[K]>
    ): this {
        if (!this.rules[property]) {
            this.rules[property] = [];
        }
        (this.rules[property] as ValidationRule<T[K]>[]).push(rule);
        return this;
    }

    validate(data: T): Record<keyof T, string[]> {
        const errors = {} as Record<keyof T, string[]>;

        for (const property in this.rules) {
            const propertyRules = this.rules[property] || [];
            errors[property] = propertyRules
                .filter(rule => !rule.validate(data[property]))
                .map(rule => rule.message);
        }

        return errors;
    }
}

// Ejercicios prácticos
// 1. Implementar un sistema de transformación de tipos genérico
export type Transform<T, U> = {
    transform(value: T): U;
};

// 2. Crear un builder pattern genérico con tipos encadenados
export class Builder<T extends object> {
    // Tu implementación aquí
}

// 3. Desarrollar un sistema de eventos tipado con genéricos anidados
export type EventMap<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any 
        ? Parameters<T[K]> 
        : never;
}; 