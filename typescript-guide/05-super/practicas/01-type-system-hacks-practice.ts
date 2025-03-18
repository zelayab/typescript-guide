/**
 * PRÁCTICAS DE TYPE SYSTEM HACKS
 */

// Ejercicio 1: Sistema de tipos para SQL Builder
type SQLQuery<T extends object> = {
    SELECT: (keyof T)[];
    FROM: string;
    WHERE?: Partial<{
        [K in keyof T]: {
            operator: '=' | '>' | '<' | 'LIKE';
            value: T[K];
        };
    }>;
    ORDER_BY?: {
        field: keyof T;
        direction: 'ASC' | 'DESC';
    };
};

class SQLBuilder<T extends object> {
    private query: Partial<SQLQuery<T>> = {};

    select(...fields: (keyof T)[]): this {
        this.query.SELECT = fields;
        return this;
    }

    from(table: string): this {
        this.query.FROM = table;
        return this;
    }

    where<K extends keyof T>(
        field: K,
        operator: '=' | '>' | '<' | 'LIKE',
        value: T[K]
    ): this {
        if (!this.query.WHERE) this.query.WHERE = {};
        this.query.WHERE[field] = { operator, value };
        return this;
    }

    build(): string {
        // Implementación real aquí
        return JSON.stringify(this.query);
    }
}

// Ejercicio 2: Parser de tipos recursivo
type JSONValue = 
    | string 
    | number 
    | boolean 
    | null 
    | JSONValue[] 
    | { [key: string]: JSONValue };

type ParseJSON<T extends string> = T extends `{${infer Content}}`
    ? ParseJSONObject<Content>
    : T extends `[${infer Content}]`
    ? ParseJSONArray<Content>
    : T extends `"${infer Content}"`
    ? Content
    : T extends `${infer N extends number}`
    ? N
    : never;

type ParseJSONObject<T extends string> = {
    [K in ExtractKeys<T>]: ParseJSON<ExtractValue<T, K>>;
};

// Ejercicio 3: Sistema de validación de tipos en tiempo de compilación
type Validator<T> = {
    [P in keyof T]: {
        type: 'string' | 'number' | 'boolean';
        required?: boolean;
        validate?: (value: T[P]) => boolean;
    };
}; 