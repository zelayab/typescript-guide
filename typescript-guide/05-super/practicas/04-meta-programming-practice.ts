/**
 * PRÁCTICAS DE METAPROGRAMACIÓN
 */

// Ejercicio 1: Generador de DTOs
class DTOGenerator {
    private types: Map<string, Record<string, string>> = new Map();

    addType(name: string, properties: Record<string, string>): this {
        this.types.set(name, properties);
        return this;
    }

    generateTypeScript(): string {
        let output = '';

        for (const [typeName, properties] of this.types) {
            output += `export interface ${typeName} {\n`;
            for (const [prop, type] of Object.entries(properties)) {
                output += `  ${prop}: ${type};\n`;
            }
            output += '}\n\n';
        }

        return output;
    }

    generateValidators(): string {
        let output = '';

        for (const [typeName, properties] of this.types) {
            output += `export class ${typeName}Validator {\n`;
            output += `  validate(data: ${typeName}): boolean {\n`;
            output += `    return (\n`;
            
            const validations = Object.entries(properties).map(([prop, type]) => {
                return `      typeof data.${prop} === '${this.getJSType(type)}'`;
            });

            output += validations.join(' &&\n');
            output += '\n    );\n';
            output += '  }\n}\n\n';
        }

        return output;
    }

    private getJSType(tsType: string): string {
        const typeMap: Record<string, string> = {
            'string': 'string',
            'number': 'number',
            'boolean': 'boolean',
            'object': 'object'
        };
        return typeMap[tsType] || 'object';
    }
}

// Ejercicio 2: Sistema de validación en tiempo de compilación
type ValidationSchema<T> = {
    [P in keyof T]: {
        type: 'string' | 'number' | 'boolean' | 'object';
        required?: boolean;
        validate?: (value: T[P]) => boolean;
    };
};

class SchemaValidator<T extends object> {
    constructor(private schema: ValidationSchema<T>) {}

    generateValidationCode(): string {
        let code = `
export function validate(data: any): data is ${this.getTypeName()} {
    return (
        data != null &&
        typeof data === 'object' &&\n`;

        const checks = Object.entries(this.schema).map(([prop, rules]) => {
            const checks = [];
            
            if (rules.required) {
                checks.push(`'${prop}' in data`);
            }
            
            checks.push(`(data.${prop} === undefined || typeof data.${prop} === '${rules.type}')`);
            
            return `        (${checks.join(' && ')})`;
        });

        code += checks.join(' &&\n');
        code += '\n    );\n}';

        return code;
    }

    private getTypeName(): string {
        return Object.entries(this.schema)
            .map(([prop, rules]) => {
                const optional = !rules.required ? '?' : '';
                return `    ${prop}${optional}: ${rules.type};`;
            })
            .join('\n');
    }
}

// Ejercicio 3: Generador de documentación automática
class APIDocumentationGenerator {
    private endpoints: Map<string, {
        method: string;
        path: string;
        params?: Record<string, string>;
        response: string;
        description?: string;
    }> = new Map();

    addEndpoint(
        name: string,
        method: string,
        path: string,
        response: string,
        params?: Record<string, string>,
        description?: string
    ): this {
        this.endpoints.set(name, { method, path, params, response, description });
        return this;
    }

    generateMarkdown(): string {
        let docs = '# API Documentation\n\n';

        for (const [name, endpoint] of this.endpoints) {
            docs += `## ${name}\n\n`;
            docs += `**${endpoint.method}** \`${endpoint.path}\`\n\n`;

            if (endpoint.description) {
                docs += `${endpoint.description}\n\n`;
            }

            if (endpoint.params) {
                docs += '### Parameters\n\n';
                docs += '| Name | Type | Description |\n';
                docs += '|------|------|-------------|\n';
                
                for (const [param, type] of Object.entries(endpoint.params)) {
                    docs += `| ${param} | ${type} | - |\n`;
                }
                docs += '\n';
            }

            docs += '### Response\n\n';
            docs += '```typescript\n';
            docs += endpoint.response;
            docs += '\n```\n\n';
        }

        return docs;
    }
} 