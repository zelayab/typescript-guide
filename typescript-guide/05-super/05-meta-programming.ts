/**
 * METAPROGRAMACIÓN EN TYPESCRIPT
 * ==========================
 * 
 * Técnicas avanzadas de metaprogramación para generar
 * y manipular código TypeScript en tiempo de compilación.
 */

// 1. Generador de Código Dinámico
class CodeGenerator {
    private imports: Set<string> = new Set();
    private declarations: string[] = [];

    addImport(importStatement: string): this {
        this.imports.add(importStatement);
        return this;
    }

    addDeclaration(declaration: string): this {
        this.declarations.push(declaration);
        return this;
    }

    generate(): string {
        return [
            ...Array.from(this.imports),
            '',
            ...this.declarations
        ].join('\n');
    }
}

// 2. Factory de Tipos en Tiempo de Compilación
type TypeFactory<T> = {
    create<K extends keyof T>(key: K): T[K];
    modify<K extends keyof T>(key: K, modifier: (type: T[K]) => T[K]): T[K];
};

class RuntimeTypeFactory<T> implements TypeFactory<T> {
    private types: Map<keyof T, any> = new Map();

    create<K extends keyof T>(key: K): T[K] {
        if (!this.types.has(key)) {
            this.types.set(key, {});
        }
        return this.types.get(key);
    }

    modify<K extends keyof T>(key: K, modifier: (type: T[K]) => T[K]): T[K] {
        const type = this.create(key);
        const modified = modifier(type);
        this.types.set(key, modified);
        return modified;
    }
}

// 3. Sistema de Reflexión
type Reflector<T> = {
    getProperties(): (keyof T)[];
    getType<K extends keyof T>(prop: K): string;
    getMethods(): (keyof T & string)[];
};

class TypeReflector<T extends object> implements Reflector<T> {
    constructor(private target: T) {}

    getProperties(): (keyof T)[] {
        return Object.keys(this.target) as (keyof T)[];
    }

    getType<K extends keyof T>(prop: K): string {
        return typeof this.target[prop];
    }

    getMethods(): (keyof T & string)[] {
        return Object.getOwnPropertyNames(Object.getPrototypeOf(this.target))
            .filter(name => typeof this.target[name as keyof T] === 'function') as (keyof T & string)[];
    }
}

// 4. Generador de API en Tiempo de Compilación
interface APIDefinition {
    endpoints: {
        [key: string]: {
            method: 'GET' | 'POST' | 'PUT' | 'DELETE';
            path: string;
            params?: Record<string, string>;
            response: any;
        };
    };
}

class APIGenerator {
    constructor(private definition: APIDefinition) {}

    generateClient(): string {
        const generator = new CodeGenerator();
        generator.addImport('import axios from "axios";');

        const clientMethods = Object.entries(this.definition.endpoints)
            .map(([name, endpoint]) => this.generateEndpoint(name, endpoint))
            .join('\n\n');

        generator.addDeclaration(`
export class APIClient {
    constructor(private baseURL: string) {}

    ${clientMethods}
}`);

        return generator.generate();
    }

    private generateEndpoint(name: string, endpoint: APIDefinition['endpoints'][string]): string {
        const params = endpoint.params 
            ? Object.entries(endpoint.params)
                .map(([key, type]) => `${key}: ${type}`)
                .join(', ')
            : '';

        return `
    async ${name}(${params}): Promise<${this.getResponseType(endpoint.response)}> {
        const response = await axios.${endpoint.method.toLowerCase()}(
            \`\${this.baseURL}${endpoint.path}\`,
            ${endpoint.method !== 'GET' ? 'params' : ''}
        );
        return response.data;
    }`;
    }

    private getResponseType(response: any): string {
        return JSON.stringify(response)
            .replace(/"(\w+)":/g, '$1:')
            .replace(/"/g, "'");
    }
}

// 5. Sistema de Plugins en Tiempo de Compilación
interface CompilerPlugin {
    name: string;
    transform(code: string): string;
    validate?(code: string): boolean;
}

class PluginSystem {
    private plugins: CompilerPlugin[] = [];

    register(plugin: CompilerPlugin): void {
        this.plugins.push(plugin);
    }

    process(code: string): string {
        return this.plugins.reduce((processedCode, plugin) => {
            if (plugin.validate?.(processedCode) === false) {
                throw new Error(`Validation failed for plugin: ${plugin.name}`);
            }
            return plugin.transform(processedCode);
        }, code);
    }
}

// Ejercicios prácticos
// 1. Implementar un generador de DTOs
// 2. Crear un sistema de validación en tiempo de compilación
// 3. Desarrollar un generador de documentación automática 