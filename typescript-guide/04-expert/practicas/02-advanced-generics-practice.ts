/**
 * PRÁCTICAS DE GENÉRICOS AVANZADOS
 */

// Ejercicio 1: Sistema de validación de formularios genérico
export interface ValidationRule<T> {
    validate: (value: T) => boolean;
    message: string;
}

export class FormValidator<T extends Record<string, any>> {
    private rules: Map<keyof T, ValidationRule<T[keyof T]>[]> = new Map();

    addRule<K extends keyof T>(field: K, rule: ValidationRule<T[K]>): this {
        const fieldRules = this.rules.get(field) || [];
        fieldRules.push(rule);
        this.rules.set(field, fieldRules);
        return this;
    }

    validate(data: T): Record<keyof T, string[]> {
        const errors = {} as Record<keyof T, string[]>;
        
        for (const [field, rules] of this.rules.entries()) {
            errors[field] = rules
                .filter(rule => !rule.validate(data[field]))
                .map(rule => rule.message);
        }

        return errors;
    }
}

// Ejercicio 2: Builder pattern con tipos inferidos
export class QueryBuilder<T extends object> {
    private conditions: Partial<T> = {};
    private orderByField?: keyof T;
    private limitValue?: number;

    where<K extends keyof T>(field: K, value: T[K]): this {
        this.conditions[field] = value;
        return this;
    }

    orderBy(field: keyof T): this {
        this.orderByField = field;
        return this;
    }

    limit(value: number): this {
        this.limitValue = value;
        return this;
    }

    build(): string {
        // Implementación real aquí
        return JSON.stringify({
            conditions: this.conditions,
            orderBy: this.orderByField,
            limit: this.limitValue
        });
    }
} 