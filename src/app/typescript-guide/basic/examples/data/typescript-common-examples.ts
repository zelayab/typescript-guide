import { Example } from './types';

export const typescriptCommonExamples: Example[] = [
  {
    id: 'ts-basic-1',
    title: 'Tipos Utilitarios Avanzados',
    description: 'Implementación de tipos utilitarios avanzados en TypeScript',
    code: `// Tipo para extraer las claves que son de un tipo específico
type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T];

// Tipo para hacer todas las propiedades anidadas opcionales
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

// Tipo para hacer todas las propiedades anidadas requeridas
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object
    ? DeepRequired<T[P]>
    : T[P];
};

// Tipo para hacer todas las propiedades anidadas de solo lectura
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

// Ejemplo de uso
interface User {
  id: number;
  name: string;
  settings?: {
    theme: {
      mode: 'light' | 'dark';
      colors?: {
        primary?: string;
        secondary?: string;
      };
    };
    notifications: {
      email: boolean;
      push: boolean;
    };
  };
}

// Extraer claves que son números
type NumericKeys = KeysOfType<User, number>; // 'id'

// Hacer todas las propiedades opcionales
type PartialUser = DeepPartial<User>;
const partialUser: PartialUser = {
  name: 'John',
  settings: {
    theme: {
      mode: 'dark'
    }
  }
};

// Hacer todas las propiedades requeridas
type RequiredUser = DeepRequired<User>;
const requiredUser: RequiredUser = {
  id: 1,
  name: 'John',
  settings: {
    theme: {
      mode: 'light',
      colors: {
        primary: '#000',
        secondary: '#fff'
      }
    },
    notifications: {
      email: true,
      push: true
    }
  }
};

// Hacer todas las propiedades de solo lectura
type ReadonlyUser = DeepReadonly<User>;
const readonlyUser: ReadonlyUser = {
  id: 1,
  name: 'John',
  settings: {
    theme: {
      mode: 'light'
    },
    notifications: {
      email: true,
      push: false
    }
  }
};

// readonlyUser.id = 2; // Error: Cannot assign to 'id' because it is a read-only property
// readonlyUser.settings.theme.mode = 'dark'; // Error: Cannot assign to 'mode' because it is a read-only property`,
    explanation: 'Este ejemplo muestra cómo implementar tipos utilitarios avanzados en TypeScript para manejar propiedades anidadas y transformaciones de tipos complejas.',
    realWorldUsage: 'Útil en aplicaciones que manejan estructuras de datos complejas y requieren transformaciones de tipos seguras.',
    category: 'basic',
    tags: ['typescript', 'types', 'utilities'],
    framework: 'typescript-common'
  },
  {
    id: 'ts-intermediate-1',
    title: 'Patrón Builder Tipado',
    description: 'Implementación del patrón Builder con tipos seguros en TypeScript',
    code: `// Definición de tipos para la configuración
interface RequestConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
  auth?: {
    username: string;
    password: string;
  };
  params?: Record<string, string>;
}

// Tipo para validar campos requeridos
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T];

// Builder tipado
class RequestBuilder {
  private config: Partial<RequestConfig> = {};

  setBaseURL(url: string): this {
    this.config.baseURL = url;
    return this;
  }

  setTimeout(timeout: number): this {
    this.config.timeout = timeout;
    return this;
  }

  setHeaders(headers: Record<string, string>): this {
    this.config.headers = headers;
    return this;
  }

  setAuth(username: string, password: string): this {
    this.config.auth = { username, password };
    return this;
  }

  setParams(params: Record<string, string>): this {
    this.config.params = params;
    return this;
  }

  build(): RequestConfig {
    // Validar campos requeridos
    const requiredFields: RequiredKeys<RequestConfig>[] = ['baseURL'];
    for (const field of requiredFields) {
      if (!(field in this.config)) {
        throw new Error(\`Missing required field: \${field}\`);
      }
    }

    return this.config as RequestConfig;
  }
}

// Función de ayuda para crear el builder
function createRequest(): RequestBuilder {
  return new RequestBuilder();
}

// Ejemplo de uso
const config = createRequest()
  .setBaseURL('https://api.example.com')
  .setTimeout(5000)
  .setHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
  .setAuth('usuario', 'contraseña')
  .setParams({
    version: '1.0'
  })
  .build();

// Uso con validación de tipos
async function makeRequest<T>(config: RequestConfig): Promise<T> {
  // Implementación de la petición...
  return {} as T;
}

interface User {
  id: number;
  name: string;
}

// El tipo de retorno está inferido correctamente
const user = await makeRequest<User>(config);
console.log(user.id, user.name);`,
    explanation: 'Este ejemplo muestra cómo implementar el patrón Builder con tipos seguros en TypeScript, incluyendo validación de campos requeridos y encadenamiento de métodos.',
    realWorldUsage: 'Ideal para construir objetos complejos de configuración de forma segura y mantenible.',
    category: 'intermediate',
    tags: ['typescript', 'patterns', 'builder'],
    framework: 'typescript-common'
  },
  {
    id: 'ts-advanced-1',
    title: 'Patrón Chain of Responsibility',
    description: 'Implementación del patrón Chain of Responsibility con tipos seguros en TypeScript',
    code: `// Definición de tipos para el patrón Chain of Responsibility
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): string | null;   
}

class ConcreteHandler1 implements Handler {
  private nextHandler: Handler | null = null;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: string): string | null {
    if (request === 'A') {
      return \`Handler 1 maneja la solicitud \${request}\`;
    }
    return this.nextHandler?.handle(request);
  }
}

class ConcreteHandler2 implements Handler {
  private nextHandler: Handler | null = null;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: string): string | null {
    if (request === 'B') {
      return \`Handler 2 maneja la solicitud \${request}\`;
    }
    return this.nextHandler?.handle(request);
  }
}

class ConcreteHandler3 implements Handler {
  private nextHandler: Handler | null = null;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: string): string | null {
    if (request === 'C') {
      return \`Handler 3 maneja la solicitud \${request}\`;
    }
    return this.nextHandler?.handle(request);
  }
}

// Crear la cadena de responsabilidad
const handler1 = new ConcreteHandler1();
const handler2 = new ConcreteHandler2();
const handler3 = new ConcreteHandler3();

handler1.setNext(handler2).setNext(handler3);

const result = handler1.handle('A');
console.log(result); // Output: Handler 1 maneja la solicitud A

// Ejemplo de uso
const result2 = handler1.handle('B');
console.log(result2); // Output: Handler 2 maneja la solicitud B

const result3 = handler1.handle('C');
console.log(result3); // Output: Handler 3 maneja la solicitud C`,
    explanation: 'Este ejemplo muestra cómo implementar el patrón Chain of Responsibility con tipos seguros en TypeScript, incluyendo encadenamiento de métodos y validación de tipos.',
    realWorldUsage: 'Ideal para procesar y manejar solicitudes secuenciales con múltiples manejadores.',
    category: 'advanced',
    tags: ['typescript', 'patterns', 'chain-of-responsibility'],
    framework: 'typescript-common'
  }
]; 