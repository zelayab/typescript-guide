import { QuizQuestion } from "../types";

export const advancedQuestions: QuizQuestion[] = [
  {
    id: 1,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos mapeados en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos mapeados manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos mapeados
    type Usuario = {
      nombre: string;
      edad: number;
    };
    
    // Transformación de tipos mapeados
    type UsuarioOpcional = {
      [K in keyof Usuario]?: Usuario[K];
    };
    
    type UsuarioSoloLectura = {
      readonly [K in keyof Usuario]: Usuario[K];
    };
    
    // Uso
    const usuario: UsuarioOpcional = {
      nombre: "Juan"  // edad es opcional
    };
    
    const usuarioRO: UsuarioSoloLectura = {
      nombre: "Juan",
      edad: 25
    };`,
        explanation:
          "Los tipos de utilidad para tipos mapeados permiten transformar las propiedades de un tipo manteniendo su estructura.",
      },
      {
        text: "Tipos que convierten tipos mapeados en arrays",
        example: `// ❌ No convierten tipos mapeados en arrays
    type MappedToArray<T> = T extends object ? any[] : never;  // No es el propósito
    
    // El propósito es transformar tipos mapeados manteniendo su estructura
    type TransformMapped<T> = {
      [K in keyof T]: T[K];
    };`,
        explanation:
          "Los tipos de utilidad para tipos mapeados mantienen la estructura del tipo, no la convierten en array.",
      },
      {
        text: "Tipos que solo funcionan con tipos mapeados simples",
        example: `// ❌ Funcionan con tipos mapeados complejos
    type ComplexMapped<T> = {
      [K in keyof T]: T[K] extends string ? Uppercase<T[K]> : T[K];
    };
    
    // Funciona con cualquier tipo de mapeo
    type Resultado = ComplexMapped<{
      nombre: "juan";
      edad: 25;
    }>;  // { nombre: "JUAN", edad: 25 }`,
        explanation:
          "Los tipos de utilidad para tipos mapeados funcionan con cualquier tipo de mapeo, no solo los simples.",
      },
      {
        text: "Tipos que eliminan la estructura de tipo mapeado",
        example: `// ❌ Mantienen la estructura de tipo mapeado
    type FlattenMapped<T> = T extends object ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformMapped<T> = {
      [K in keyof T]: T[K];
    };`,
        explanation:
          "Los tipos de utilidad para tipos mapeados mantienen la estructura del tipo mientras transforman sus propiedades.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para tipos mapeados en TypeScript permiten transformar las propiedades de un tipo manteniendo su estructura. Son útiles para crear tipos derivados de tipos mapeados existentes.",
    difficulty: "advanced",
  },
  {
    id: 2,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos recursivos en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos recursivos manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos recursivos
    type Arbol<T> = {
      valor: T;
      hijos?: Arbol<T>[];
    };
    
    // Transformación de tipos recursivos
    type ArbolOpcional<T> = {
      valor?: T;
      hijos?: ArbolOpcional<T>[];
    };
    
    // Uso
    const arbol: ArbolOpcional<number> = {
      valor: 1,
      hijos: [
        { valor: 2 },
        { valor: 3, hijos: [{ valor: 4 }] }
      ]
    };`,
        explanation:
          "Los tipos de utilidad para tipos recursivos permiten transformar tipos que se refieren a sí mismos manteniendo su estructura.",
      },
      {
        text: "Tipos que eliminan la recursividad",
        example: `// ❌ No eliminan la recursividad
    type RemoveRecursion<T> = T extends object ? object : never;  // No es el propósito
    
    // El propósito es transformar tipos recursivos manteniendo su estructura
    type TransformRecursive<T> = T extends { valor: infer V, hijos?: infer H }
      ? { valor: V, hijos?: TransformRecursive<H> }
      : never;`,
        explanation:
          "Los tipos de utilidad para tipos recursivos mantienen la estructura recursiva, no la eliminan.",
      },
      {
        text: "Tipos que solo funcionan con tipos recursivos simples",
        example: `// ❌ Funcionan con tipos recursivos complejos
    type ComplexRecursive<T> = {
      valor: T;
      hijos?: ComplexRecursive<T>[];
      metadata?: {
        profundidad: number;
        padre?: ComplexRecursive<T>;
      };
    };`,
        explanation:
          "Los tipos de utilidad para tipos recursivos funcionan con cualquier tipo de recursividad, no solo los simples.",
      },
      {
        text: "Tipos que convierten tipos recursivos en arrays",
        example: `// ❌ No convierten tipos recursivos en arrays
    type RecursiveToArray<T> = T extends object ? any[] : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura recursiva
    type TransformRecursive<T> = T extends { valor: infer V, hijos?: infer H }
      ? { valor: V, hijos?: TransformRecursive<H> }
      : never;`,
        explanation:
          "Los tipos de utilidad para tipos recursivos mantienen la estructura recursiva mientras transforman sus propiedades.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para tipos recursivos en TypeScript permiten transformar tipos que se refieren a sí mismos manteniendo su estructura. Son útiles para crear tipos derivados de tipos recursivos existentes.",
    difficulty: "advanced",
  },
  {
    id: 3,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de plantilla en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de plantilla manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de plantilla
    type Nombre = "Juan" | "María" | "Pedro";
    
    // Transformación de tipos de plantilla
    type Saludo<T extends string> = \`Hola \${T}\`;
    type Despedida<T extends string> = \`Adiós \${T}\`;
    
    // Uso
    const saludo: Saludo<Nombre> = "Hola Juan";
    const despedida: Despedida<Nombre> = "Adiós María";`,
        explanation:
          "Los tipos de utilidad para tipos de plantilla permiten crear tipos basados en patrones de strings manteniendo su estructura.",
      },
      {
        text: "Tipos que convierten tipos de plantilla en strings",
        example: `// ❌ No convierten tipos de plantilla en strings
    type TemplateToString<T> = T extends string ? string : never;  // No es el propósito
    
    // El propósito es transformar tipos de plantilla manteniendo su estructura
    type TransformTemplate<T extends string> = \`\${T}\`;`,
        explanation:
          "Los tipos de utilidad para tipos de plantilla mantienen la estructura del tipo, no la convierten en string simple.",
      },
      {
        text: "Tipos que solo funcionan con tipos de plantilla simples",
        example: `// ❌ Funcionan con tipos de plantilla complejos
    type ComplexTemplate<T extends string> = \`El usuario \${T} tiene \${number} años\`;
    
    // Funciona con cualquier tipo de plantilla
    type Resultado = ComplexTemplate<"Juan">;  // "El usuario Juan tiene number años"`,
        explanation:
          "Los tipos de utilidad para tipos de plantilla funcionan con cualquier tipo de plantilla, no solo las simples.",
      },
      {
        text: "Tipos que eliminan la estructura de tipo de plantilla",
        example: `// ❌ Mantienen la estructura de tipo de plantilla
    type FlattenTemplate<T> = T extends string ? string : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformTemplate<T extends string> = \`\${T}\`;`,
        explanation:
          "Los tipos de utilidad para tipos de plantilla mantienen la estructura del tipo mientras transforman sus valores.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para tipos de plantilla en TypeScript permiten crear tipos basados en patrones de strings manteniendo su estructura. Son útiles para crear tipos derivados de tipos de plantilla existentes.",
    difficulty: "advanced",
  },
  {
    id: 4,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de unión en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de unión manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de unión
    type Id = string | number;
    
    // Transformación de tipos de unión
    type IdString = Id extends string | number ? string : never;
    type IdNumber = Id extends string | number ? number : never;
    
    // Uso
    const idString: IdString = "123";
    const idNumber: IdNumber = 123;`,
        explanation:
          "Los tipos de utilidad para tipos de unión permiten transformar tipos que pueden ser uno de varios tipos manteniendo su estructura.",
      },
      {
        text: "Tipos que convierten tipos de unión en arrays",
        example: `// ❌ No convierten tipos de unión en arrays
    type UnionToArray<T> = T extends any ? any[] : never;  // No es el propósito
    
    // El propósito es transformar tipos de unión manteniendo su estructura
    type TransformUnion<T> = T extends string | number ? string : never;`,
        explanation:
          "Los tipos de utilidad para tipos de unión mantienen la estructura del tipo, no la convierten en array.",
      },
      {
        text: "Tipos que solo funcionan con tipos de unión simples",
        example: `// ❌ Funcionan con tipos de unión complejos
    type ComplexUnion = string | number | boolean | { a: number } | (() => void);
    
    // Funciona con cualquier tipo de unión
    type StringOnly = ComplexUnion extends string ? string : never;
    type NumberOnly = ComplexUnion extends number ? number : never;`,
        explanation:
          "Los tipos de utilidad para tipos de unión funcionan con cualquier tipo de unión, no solo las simples.",
      },
      {
        text: "Tipos que eliminan la estructura de tipo de unión",
        example: `// ❌ Mantienen la estructura de tipo de unión
    type FlattenUnion<T> = T extends any ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformUnion<T> = T extends string | number ? string : never;`,
        explanation:
          "Los tipos de utilidad para tipos de unión mantienen la estructura del tipo mientras transforman sus valores.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para tipos de unión en TypeScript permiten transformar tipos que pueden ser uno de varios tipos manteniendo su estructura. Son útiles para crear tipos derivados de tipos de unión existentes.",
    difficulty: "advanced",
  },
  {
    id: 5,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de intersección en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de intersección manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de intersección
    type Usuario = {
      nombre: string;
      edad: number;
    };
    
    type Empleado = {
      salario: number;
      departamento: string;
    };
    
    // Transformación de tipos de intersección
    type UsuarioEmpleado = Usuario & Empleado;
    
    // Uso
    const usuarioEmpleado: UsuarioEmpleado = {
      nombre: "Juan",
      edad: 25,
      salario: 50000,
      departamento: "TI"
    };`,
        explanation:
          "Los tipos de utilidad para tipos de intersección permiten combinar múltiples tipos en uno manteniendo su estructura.",
      },
      {
        text: "Tipos que convierten tipos de intersección en objetos",
        example: `// ❌ No convierten tipos de intersección en objetos
    type IntersectionToObject<T> = T extends object ? object : never;  // No es el propósito
    
    // El propósito es transformar tipos de intersección manteniendo su estructura
    type TransformIntersection<T, U> = T & U;`,
        explanation:
          "Los tipos de utilidad para tipos de intersección mantienen la estructura del tipo, no la convierten en objeto simple.",
      },
      {
        text: "Tipos que solo funcionan con tipos de intersección simples",
        example: `// ❌ Funcionan con tipos de intersección complejos
    type ComplexIntersection = {
      a: number;
      b: string;
    } & {
      c: boolean;
      d: (x: number) => void;
    } & {
      e: {
        f: string;
        g: number;
      };
    };`,
        explanation:
          "Los tipos de utilidad para tipos de intersección funcionan con cualquier tipo de intersección, no solo las simples.",
      },
      {
        text: "Tipos que eliminan la estructura de tipo de intersección",
        example: `// ❌ Mantienen la estructura de tipo de intersección
    type FlattenIntersection<T> = T extends any ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformIntersection<T, U> = T & U;`,
        explanation:
          "Los tipos de utilidad para tipos de intersección mantienen la estructura del tipo mientras transforman sus propiedades.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para tipos de intersección en TypeScript permiten combinar múltiples tipos en uno manteniendo su estructura. Son útiles para crear tipos derivados de tipos de intersección existentes.",
    difficulty: "advanced",
  },
  {
    id: 6,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de promesa en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de promesa manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de promesa
    type PromesaString = Promise<string>;
    type PromesaNumber = Promise<number>;
    
    // Transformación de tipos de promesa
    type AwaitedString = Awaited<PromesaString>;  // string
    type AwaitedNumber = Awaited<PromesaNumber>;  // number
    
    // Uso con promesas anidadas
    type PromesaAnidada = Promise<Promise<string>>;
    type Resultado = Awaited<PromesaAnidada>;  // string`,
        explanation:
          "Los tipos de utilidad para promesas permiten extraer el tipo resuelto de una promesa manteniendo su estructura.",
      },
      {
        text: "Tipos que convierten promesas en tipos sincrónicos",
        example: `// ❌ No convierten promesas en tipos sincrónicos
    type SyncPromise<T> = T extends Promise<any> ? any : never;  // No es el propósito
    
    // El propósito es transformar promesas manteniendo su estructura
    type TransformPromise<T> = T extends Promise<infer U> ? Promise<U> : never;`,
        explanation:
          "Los tipos de utilidad para promesas mantienen la estructura asíncrona, no la convierten en síncrona.",
      },
      {
        text: "Tipos que solo funcionan con promesas simples",
        example: `// ❌ Funcionan con promesas complejas
    type ComplexPromise = Promise<{
      data: Promise<string>;
      error?: Promise<Error>;
    }>;
    
    // Funciona con cualquier tipo de promesa
    type Resultado = Awaited<ComplexPromise>;  // { data: string, error?: Error }`,
        explanation:
          "Los tipos de utilidad para promesas funcionan con cualquier tipo de promesa, no solo las simples.",
      },
      {
        text: "Tipos que eliminan la estructura de promesa",
        example: `// ❌ Mantienen la estructura de promesa
    type FlattenPromise<T> = T extends Promise<any> ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformPromise<T> = T extends Promise<infer U> ? Promise<U> : never;`,
        explanation:
          "Los tipos de utilidad para promesas mantienen la estructura de promesa mientras transforman sus tipos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para promesas en TypeScript permiten extraer y transformar el tipo resuelto de una promesa manteniendo su estructura. Son útiles para trabajar con tipos asíncronos y promesas anidadas.",
    difficulty: "advanced",
  },
  {
    id: 7,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de función en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de función manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de función
    type Funcion = (a: number, b: string) => boolean;
    
    // Transformación de tipos de función
    type Parametros = Parameters<Funcion>;  // [number, string]
    type Retorno = ReturnType<Funcion>;     // boolean
    
    // Uso con funciones genéricas
    type FuncionGenerica = <T>(x: T) => T[];
    type ParametrosGen = Parameters<FuncionGenerica>;  // [unknown]
    type RetornoGen = ReturnType<FuncionGenerica>;     // unknown[]`,
        explanation:
          "Los tipos de utilidad para funciones permiten extraer y transformar los tipos de parámetros y retorno manteniendo la estructura de la función.",
      },
      {
        text: "Tipos que convierten funciones en objetos",
        example: `// ❌ No convierten funciones en objetos
    type FunctionToObject<T> = T extends Function ? object : never;  // No es el propósito
    
    // El propósito es transformar funciones manteniendo su estructura
    type TransformFunction<T> = T extends (...args: any) => any ? T : never;`,
        explanation:
          "Los tipos de utilidad para funciones mantienen la estructura de función, no la convierten en objeto.",
      },
      {
        text: "Tipos que solo funcionan con funciones simples",
        example: `// ❌ Funcionan con funciones complejas
    type ComplexFunction = <T, U>(
      x: T,
      y: U,
      callback: (result: T & U) => void
    ) => Promise<T | U>;
    
    // Funciona con cualquier tipo de función
    type Parametros = Parameters<ComplexFunction>;  // [unknown, unknown, (result: unknown) => void]
    type Retorno = ReturnType<ComplexFunction>;     // Promise<unknown>`,
        explanation:
          "Los tipos de utilidad para funciones funcionan con cualquier tipo de función, no solo las simples.",
      },
      {
        text: "Tipos que eliminan la estructura de función",
        example: `// ❌ Mantienen la estructura de función
    type FlattenFunction<T> = T extends Function ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformFunction<T> = T extends (...args: any) => any ? T : never;`,
        explanation:
          "Los tipos de utilidad para funciones mantienen la estructura de función mientras transforman sus tipos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para funciones en TypeScript permiten extraer y transformar los tipos de parámetros y retorno manteniendo la estructura de la función. Son útiles para trabajar con tipos de función complejos y genéricos.",
    difficulty: "advanced",
  },
  {
    id: 8,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de clase en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de clase manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de clase
    class Usuario {
      constructor(public nombre: string, public edad: number) {}
      saludar() { return \`Hola \${this.nombre}\`; }
    }
    
    // Transformación de tipos de clase
    type Instancia = InstanceType<typeof Usuario>;  // Usuario
    type Constructor = ConstructorParameters<typeof Usuario>;  // [string, number]
    type Metodo = ThisParameterType<typeof Usuario.prototype.saludar>;  // Usuario
    
    // Uso con clases genéricas
    class Contenedor<T> {
      constructor(public valor: T) {}
    }
    type InstanciaGen = InstanceType<typeof Contenedor<string>>;  // Contenedor<string>`,
        explanation:
          "Los tipos de utilidad para clases permiten extraer y transformar los tipos de instancia, constructor y métodos manteniendo la estructura de la clase.",
      },
      {
        text: "Tipos que convierten clases en interfaces",
        example: `// ❌ No convierten clases en interfaces
    type ClassToInterface<T> = T extends new (...args: any) => any ? object : never;  // No es el propósito
    
    // El propósito es transformar clases manteniendo su estructura
    type TransformClass<T> = T extends new (...args: any) => any ? T : never;`,
        explanation:
          "Los tipos de utilidad para clases mantienen la estructura de clase, no la convierten en interfaz.",
      },
      {
        text: "Tipos que solo funcionan con clases simples",
        example: `// ❌ Funcionan con clases complejas
    class ComplexClass<T, U> {
      constructor(
        public prop1: T,
        public prop2: U,
        private prop3: (x: T) => U
      ) {}
      
      metodo1(x: T): U { return this.prop3(x); }
      metodo2(y: U): T { return this.prop1; }
    }
    
    // Funciona con cualquier tipo de clase
    type Instancia = InstanceType<typeof ComplexClass<string, number>>;
    type Constructor = ConstructorParameters<typeof ComplexClass<string, number>>;`,
        explanation:
          "Los tipos de utilidad para clases funcionan con cualquier tipo de clase, no solo las simples.",
      },
      {
        text: "Tipos que eliminan la estructura de clase",
        example: `// ❌ Mantienen la estructura de clase
    type FlattenClass<T> = T extends new (...args: any) => any ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformClass<T> = T extends new (...args: any) => any ? T : never;`,
        explanation:
          "Los tipos de utilidad para clases mantienen la estructura de clase mientras transforman sus tipos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para clases en TypeScript permiten extraer y transformar los tipos de instancia, constructor y métodos manteniendo la estructura de la clase. Son útiles para trabajar con tipos de clase complejos y genéricos.",
    difficulty: "advanced",
  },
  {
    id: 9,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de objeto en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de objeto manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de objeto
    type Usuario = {
      nombre: string;
      edad: number;
      direccion?: {
        calle: string;
        ciudad: string;
      };
    };
    
    // Transformación de tipos de objeto
    type SoloLectura = Readonly<Usuario>;
    type Opcional = Partial<Usuario>;
    type Requerido = Required<Usuario>;
    type PickNombre = Pick<Usuario, 'nombre'>;
    type OmitEdad = Omit<Usuario, 'edad'>;
    
    // Uso con objetos genéricos
    type ObjetoGen<T> = {
      [K in keyof T]: T[K];
    };`,
        explanation:
          "Los tipos de utilidad para objetos permiten transformar las propiedades de un objeto manteniendo su estructura.",
      },
      {
        text: "Tipos que convierten objetos en arrays",
        example: `// ❌ No convierten objetos en arrays
    type ObjectToArray<T> = T extends object ? any[] : never;  // No es el propósito
    
    // El propósito es transformar objetos manteniendo su estructura
    type TransformObject<T> = {
      [K in keyof T]: T[K];
    };`,
        explanation:
          "Los tipos de utilidad para objetos mantienen la estructura de objeto, no la convierten en array.",
      },
      {
        text: "Tipos que solo funcionan con objetos simples",
        example: `// ❌ Funcionan con objetos complejos
    type ComplexObject = {
      a: string;
      b: {
        c: number;
        d: {
          e: boolean;
          f: (x: number) => string;
        };
      };
      g: Array<{
        h: string;
        i: number;
      }>;
    };
    
    // Funciona con cualquier tipo de objeto
    type SoloLectura = Readonly<ComplexObject>;
    type Opcional = Partial<ComplexObject>;
    type Requerido = Required<ComplexObject>;`,
        explanation:
          "Los tipos de utilidad para objetos funcionan con cualquier tipo de objeto, no solo los simples.",
      },
      {
        text: "Tipos que eliminan la estructura de objeto",
        example: `// ❌ Mantienen la estructura de objeto
    type FlattenObject<T> = T extends object ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformObject<T> = {
      [K in keyof T]: T[K];
    };`,
        explanation:
          "Los tipos de utilidad para objetos mantienen la estructura de objeto mientras transforman sus propiedades.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para objetos en TypeScript permiten transformar las propiedades de un objeto manteniendo su estructura. Son útiles para crear tipos derivados de objetos existentes.",
    difficulty: "advanced",
  },
  {
    id: 10,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de unión discriminada en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de unión discriminada manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de unión discriminada
    type Resultado<T> = 
      | { tipo: "exito"; valor: T }
      | { tipo: "error"; mensaje: string };
    
    // Transformación de tipos de unión discriminada
    type ExtraerExito<T> = T extends { tipo: "exito"; valor: infer V } ? V : never;
    type ExtraerError<T> = T extends { tipo: "error"; mensaje: infer M } ? M : never;
    
    // Uso con tipos de unión discriminada genéricos
    type UnionGen<T> = { tipo: "valor"; valor: T } | { tipo: "error"; error: string };
    type UnionTransformada = ExtraerExito<UnionGen<number>>;  // number`,
        explanation:
          "Los tipos de utilidad para uniones discriminadas permiten extraer y transformar los tipos de variantes manteniendo su estructura.",
      },
      {
        text: "Tipos que convierten uniones discriminadas en objetos",
        example: `// ❌ No convierten uniones discriminadas en objetos
    type UnionToObject<T> = T extends any ? object : never;  // No es el propósito
    
    // El propósito es transformar uniones discriminadas manteniendo su estructura
    type TransformUnion<T> = T extends { tipo: infer K } ? K : never;`,
        explanation:
          "Los tipos de utilidad para uniones discriminadas mantienen la estructura de la unión, no la convierten en objeto.",
      },
      {
        text: "Tipos que solo funcionan con uniones discriminadas simples",
        example: `// ❌ Funcionan con uniones discriminadas complejas
    type ComplexUnion<T> = 
      | { tipo: "exito"; valor: T; metadata: { timestamp: number } }
      | { tipo: "error"; mensaje: string; codigo: number };
    
    // Funciona con cualquier tipo de unión discriminada
    type ExtraerValor<T> = T extends { tipo: "exito"; valor: infer V } ? V : never;
    type ExtraerCodigo<T> = T extends { tipo: "error"; codigo: infer C } ? C : never;`,
        explanation:
          "Los tipos de utilidad para uniones discriminadas funcionan con cualquier tipo de unión, no solo las simples.",
      },
      {
        text: "Tipos que eliminan la estructura de unión discriminada",
        example: `// ❌ Mantienen la estructura de unión discriminada
    type FlattenUnion<T> = T extends any ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformUnion<T> = T extends { tipo: infer K } ? K : never;`,
        explanation:
          "Los tipos de utilidad para uniones discriminadas mantienen la estructura de la unión mientras transforman sus tipos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para uniones discriminadas en TypeScript permiten extraer y transformar los tipos de variantes manteniendo su estructura. Son útiles para trabajar con tipos de unión discriminada complejos y genéricos.",
    difficulty: "advanced",
  },
  {
    id: 11,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de array en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de array manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de array
    type Numeros = number[];
    type Strings = string[];
    
    // Transformación de tipos de array
    type ArrayToStrings<T> = T extends (infer U)[] ? string[] : never;
    type ArrayToNumbers<T> = T extends (infer U)[] ? number[] : never;
    
    // Uso con arrays genéricos
    type ArrayGen<T> = T[];
    type ArrayTransformado = ArrayToStrings<ArrayGen<number>>;  // string[]`,
        explanation:
          "Los tipos de utilidad para arrays permiten transformar el tipo de sus elementos manteniendo la estructura de array.",
      },
      {
        text: "Tipos que convierten arrays en objetos",
        example: `// ❌ No convierten arrays en objetos
    type ArrayToObject<T> = T extends any[] ? object : never;  // No es el propósito
    
    // El propósito es transformar arrays manteniendo su estructura
    type ArrayTransform<T> = T extends (infer U)[] ? U[] : never;`,
        explanation:
          "Los tipos de utilidad para arrays mantienen la estructura de array, no la convierten en objeto.",
      },
      {
        text: "Tipos que solo funcionan con arrays de números",
        example: `// ❌ Funcionan con cualquier tipo de array
    type ArrayTransform<T> = T extends (infer U)[] ? U[] : never;
    
    // Funciona con cualquier tipo
    type StringArray = string[];
    type NumberArray = number[];
    type MixedArray = (string | number)[];`,
        explanation:
          "Los tipos de utilidad para arrays funcionan con arrays de cualquier tipo, no solo números.",
      },
      {
        text: "Tipos que eliminan la estructura de array",
        example: `// ❌ Mantienen la estructura de array
    type FlattenArray<T> = T extends (infer U)[] ? U : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type ArrayTransform<T> = T extends (infer U)[] ? U[] : never;`,
        explanation:
          "Los tipos de utilidad para arrays mantienen la estructura de array mientras transforman sus elementos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para arrays en TypeScript permiten transformar el tipo de sus elementos manteniendo la estructura de array. Son útiles para crear tipos derivados de arrays existentes.",
    difficulty: "advanced",
  },
  {
    id: 12,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de tupla en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de tupla manteniendo su estructura fija",
        example: `// ✅ Ejemplo de transformación de tipos de tupla
    type Tupla = [string, number, boolean];
    
    // Transformación de tipos en tuplas
    type TuplaToStrings<T> = T extends [infer A, infer B, infer C] ? [string, string, string] : never;
    type TuplaToNumbers<T> = T extends [infer A, infer B, infer C] ? [number, number, number] : never;
    
    // Uso con tuplas genéricas
    type TuplaGen<T> = [T, T, T];
    type TuplaTransformada = TuplaToStrings<TuplaGen<number>>;  // [string, string, string]`,
        explanation:
          "Los tipos de utilidad para tuplas permiten transformar los tipos de sus elementos manteniendo la estructura fija de la tupla.",
      },
      {
        text: "Tipos que convierten tuplas en arrays",
        example: `// ❌ No convierten tuplas en arrays
    type TuplaToArray<T> = T extends any[] ? any[] : never;  // No es el propósito
    
    // El propósito es transformar tuplas manteniendo su estructura
    type TuplaTransform<T> = T extends [infer A, infer B] ? [A, B] : never;`,
        explanation:
          "Los tipos de utilidad para tuplas mantienen la estructura fija de la tupla, no la convierten en array.",
      },
      {
        text: "Tipos que solo funcionan con tuplas de dos elementos",
        example: `// ❌ Funcionan con tuplas de cualquier longitud
    type TuplaTransform<T> = T extends [infer A, infer B, infer C] ? [A, B, C] : never;
    
    // Funciona con cualquier longitud
    type Tupla2 = [string, number];
    type Tupla3 = [string, number, boolean];
    type Tupla4 = [string, number, boolean, string];`,
        explanation:
          "Los tipos de utilidad para tuplas funcionan con tuplas de cualquier longitud, no solo dos elementos.",
      },
      {
        text: "Tipos que eliminan la estructura de tupla",
        example: `// ❌ Mantienen la estructura de tupla
    type FlattenTupla<T> = T extends [infer A, infer B] ? A | B : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TuplaTransform<T> = T extends [infer A, infer B] ? [A, B] : never;`,
        explanation:
          "Los tipos de utilidad para tuplas mantienen la estructura fija de la tupla mientras transforman sus elementos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para tuplas en TypeScript permiten transformar los tipos de sus elementos manteniendo la estructura fija de la tupla. Son útiles para crear tipos derivados de tuplas existentes.",
    difficulty: "advanced",
  },
  {
    id: 13,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de enum en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de enum manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de enum
    enum Color {
      Red = "RED",
      Green = "GREEN",
      Blue = "BLUE"
    }
    
    // Transformación de valores de enum
    type ColorValues = \`\${Color}\`;  // "RED" | "GREEN" | "BLUE"
    type ColorKeys = keyof typeof Color;  // "Red" | "Green" | "Blue"
    
    // Uso con enums genéricos
    type EnumGen<T> = T[keyof T];
    type EnumTransformado = EnumGen<typeof Color>;  // "RED" | "GREEN" | "BLUE"`,
        explanation:
          "Los tipos de utilidad para enums permiten extraer y transformar sus claves y valores manteniendo la estructura del enum.",
      },
      {
        text: "Tipos que convierten enums en objetos",
        example: `// ❌ No convierten enums en objetos
    type EnumToObject<T> = T extends any ? object : never;  // No es el propósito
    
    // El propósito es transformar enums manteniendo su estructura
    type EnumValues<T> = T[keyof T];`,
        explanation:
          "Los tipos de utilidad para enums mantienen la estructura del enum, no la convierten en objeto.",
      },
      {
        text: "Tipos que solo funcionan con enums numéricos",
        example: `// ❌ Funcionan con cualquier tipo de enum
    enum StringEnum {
      A = "a",
      B = "b"
    }
    
    enum NumberEnum {
      A = 1,
      B = 2
    }
    
    // Funciona con ambos tipos
    type StringValues = StringEnum[keyof StringEnum];
    type NumberValues = NumberEnum[keyof NumberEnum];`,
        explanation:
          "Los tipos de utilidad para enums funcionan con enums de cualquier tipo, no solo numéricos.",
      },
      {
        text: "Tipos que eliminan la estructura de enum",
        example: `// ❌ Mantienen la estructura de enum
    type FlattenEnum<T> = T extends any ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type EnumValues<T> = T[keyof T];`,
        explanation:
          "Los tipos de utilidad para enums mantienen la estructura del enum mientras transforman sus valores.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para enums en TypeScript permiten extraer y transformar sus claves y valores manteniendo la estructura del enum. Son útiles para crear tipos derivados de enums existentes.",
    difficulty: "advanced",
  },
  {
    id: 14,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos literales en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos literales manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos literales
    type Direccion = "norte" | "sur" | "este" | "oeste";
    
    // Transformación de tipos literales
    type DireccionMayusculas = Uppercase<Direccion>;  // "NORTE" | "SUR" | "ESTE" | "OESTE"
    type DireccionMinusculas = Lowercase<Direccion>;  // "norte" | "sur" | "este" | "oeste"
    
    // Uso con tipos literales genéricos
    type LiteralGen<T extends string> = T | Uppercase<T>;
    type LiteralTransformado = LiteralGen<"hola">;  // "hola" | "HOLA"`,
        explanation:
          "Los tipos de utilidad para tipos literales permiten transformar sus valores manteniendo la estructura del tipo literal.",
      },
      {
        text: "Tipos que convierten tipos literales en strings",
        example: `// ❌ No convierten tipos literales en strings
    type LiteralToString<T> = T extends any ? string : never;  // No es el propósito
    
    // El propósito es transformar tipos literales manteniendo su estructura
    type TransformLiteral<T> = T extends string ? Uppercase<T> : never;`,
        explanation:
          "Los tipos de utilidad para tipos literales mantienen la estructura del tipo literal, no la convierten en string.",
      },
      {
        text: "Tipos que solo funcionan con tipos literales de string",
        example: `// ❌ Funcionan con cualquier tipo literal
    type Numero = 1 | 2 | 3;
    type Booleano = true | false;
    
    // Funciona con todos los tipos literales
    type NumerosTransformados = \`\${Numero}\`;  // "1" | "2" | "3"
    type BooleanosTransformados = \`\${Booleano}\`;  // "true" | "false"`,
        explanation:
          "Los tipos de utilidad para tipos literales funcionan con cualquier tipo de literal, no solo strings.",
      },
      {
        text: "Tipos que eliminan la estructura de tipo literal",
        example: `// ❌ Mantienen la estructura de tipo literal
    type FlattenLiteral<T> = T extends any ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformLiteral<T> = T extends string ? Uppercase<T> : never;`,
        explanation:
          "Los tipos de utilidad para tipos literales mantienen la estructura del tipo literal mientras transforman sus valores.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para tipos literales en TypeScript permiten transformar sus valores manteniendo la estructura del tipo literal. Son útiles para crear tipos derivados de tipos literales existentes.",
    difficulty: "advanced",
  },
  {
    id: 15,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de plantilla literal en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de plantilla literal manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de plantilla literal
    type Nombre = "Juan" | "María" | "Pedro";
    
    // Transformación de tipos de plantilla literal
    type Saludo<T extends string> = \`Hola \${T}\`;
    type Despedida<T extends string> = \`Adiós \${T}\`;
    
    // Uso con tipos de plantilla literal genéricos
    type TemplateGen<T extends string> = \`El usuario \${T} tiene \${number} años\`;
    type TemplateTransformado = TemplateGen<Nombre>;  // "El usuario Juan tiene number años" | "El usuario María tiene number años" | "El usuario Pedro tiene number años"`,
        explanation:
          "Los tipos de utilidad para tipos de plantilla literal permiten crear tipos basados en patrones de strings manteniendo su estructura.",
      },
      {
        text: "Tipos que convierten tipos de plantilla literal en strings",
        example: `// ❌ No convierten tipos de plantilla literal en strings
    type TemplateToString<T> = T extends string ? string : never;  // No es el propósito
    
    // El propósito es transformar tipos de plantilla literal manteniendo su estructura
    type TransformTemplate<T extends string> = \`\${T}\`;`,
        explanation:
          "Los tipos de utilidad para tipos de plantilla literal mantienen la estructura del tipo, no la convierten en string simple.",
      },
      {
        text: "Tipos que solo funcionan con tipos de plantilla literal simples",
        example: `// ❌ Funcionan con tipos de plantilla literal complejos
    type ComplexTemplate<T extends string> = \`El usuario \${T} tiene \${number} años y vive en \${string}\`;
    
    // Funciona con cualquier tipo de plantilla
    type Resultado = ComplexTemplate<"Juan">;  // "El usuario Juan tiene number años y vive en string"`,
        explanation:
          "Los tipos de utilidad para tipos de plantilla literal funcionan con cualquier tipo de plantilla, no solo las simples.",
      },
      {
        text: "Tipos que eliminan la estructura de tipo de plantilla literal",
        example: `// ❌ Mantienen la estructura de tipo de plantilla literal
    type FlattenTemplate<T> = T extends string ? string : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformTemplate<T extends string> = \`\${T}\`;`,
        explanation:
          "Los tipos de utilidad para tipos de plantilla literal mantienen la estructura del tipo mientras transforman sus valores.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para tipos de plantilla literal en TypeScript permiten crear tipos basados en patrones de strings manteniendo su estructura. Son útiles para crear tipos derivados de tipos de plantilla literal existentes.",
    difficulty: "advanced",
  },
  {
    id: 21,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de función en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de función manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de función
    type Funcion = (a: number, b: string) => boolean;
    
    // Transformación de tipos de función
    type Parametros<T> = T extends (...args: infer P) => any ? P : never;
    type Retorno<T> = T extends (...args: any[]) => infer R ? R : never;
    
    // Uso con tipos de función genéricos
    type FuncionGen<T> = (valor: T) => T;
    type ParametrosFuncion = Parametros<FuncionGen<number>>;  // [number]`,
        explanation:
          "Los tipos de utilidad para funciones permiten extraer y transformar los tipos de parámetros y retorno manteniendo su estructura.",
      },
      {
        text: "Tipos que convierten funciones en objetos",
        example: `// ❌ No convierten funciones en objetos
    type FuncionToObject<T> = T extends Function ? object : never;  // No es el propósito
    
    // El propósito es transformar funciones manteniendo su estructura
    type TransformFuncion<T> = T extends (...args: infer P) => infer R ? [P, R] : never;`,
        explanation:
          "Los tipos de utilidad para funciones mantienen la estructura de la función, no la convierten en objeto.",
      },
      {
        text: "Tipos que solo funcionan con funciones simples",
        example: `// ❌ Funcionan con funciones complejas
    type ComplexFuncion<T> = (
      a: T,
      b: (x: T) => T,
      c: { valor: T }
    ) => Promise<T>;
    
    // Funciona con cualquier tipo de función
    type Parametros<T> = T extends (...args: infer P) => any ? P : never;
    type Retorno<T> = T extends (...args: any[]) => infer R ? R : never;`,
        explanation:
          "Los tipos de utilidad para funciones funcionan con cualquier tipo de función, no solo las simples.",
      },
      {
        text: "Tipos que eliminan la estructura de función",
        example: `// ❌ Mantienen la estructura de función
    type FlattenFuncion<T> = T extends Function ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformFuncion<T> = T extends (...args: infer P) => infer R ? [P, R] : never;`,
        explanation:
          "Los tipos de utilidad para funciones mantienen la estructura de la función mientras transforman sus tipos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para funciones en TypeScript permiten extraer y transformar los tipos de parámetros y retorno manteniendo su estructura. Son útiles para trabajar con tipos de función complejos y genéricos.",
    difficulty: "advanced",
  },
  {
    id: 22,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de clase en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de clase manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de clase
    class Usuario {
      constructor(public nombre: string, public edad: number) {}
      saludar() { return \`Hola \${this.nombre}\`; }
    }
    
    // Transformación de tipos de clase
    type Constructor<T> = new (...args: any[]) => T;
    type Metodos<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
    type Propiedades<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
    
    // Uso con tipos de clase genéricos
    type ClaseGen<T> = new (valor: T) => { valor: T };
    type MetodosClase = Metodos<Usuario>;  // "saludar"`,
        explanation:
          "Los tipos de utilidad para clases permiten extraer y transformar los tipos de constructor, métodos y propiedades manteniendo su estructura.",
      },
      {
        text: "Tipos que convierten clases en interfaces",
        example: `// ❌ No convierten clases en interfaces
    type ClaseToInterface<T> = T extends new (...args: any[]) => any ? object : never;  // No es el propósito
    
    // El propósito es transformar clases manteniendo su estructura
    type TransformClase<T> = T extends new (...args: any[]) => infer I ? I : never;`,
        explanation:
          "Los tipos de utilidad para clases mantienen la estructura de la clase, no la convierten en interfaz.",
      },
      {
        text: "Tipos que solo funcionan con clases simples",
        example: `// ❌ Funcionan con clases complejas
    class ComplexClase<T> {
      constructor(private valor: T) {}
      metodo<U>(param: U): T & U { return { ...this.valor, ...param }; }
      get valor(): T { return this.valor; }
    }
    
    // Funciona con cualquier tipo de clase
    type Metodos<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
    type Propiedades<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];`,
        explanation:
          "Los tipos de utilidad para clases funcionan con cualquier tipo de clase, no solo las simples.",
      },
      {
        text: "Tipos que eliminan la estructura de clase",
        example: `// ❌ Mantienen la estructura de clase
    type FlattenClase<T> = T extends new (...args: any[]) => any ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformClase<T> = T extends new (...args: any[]) => infer I ? I : never;`,
        explanation:
          "Los tipos de utilidad para clases mantienen la estructura de la clase mientras transforman sus tipos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para clases en TypeScript permiten extraer y transformar los tipos de constructor, métodos y propiedades manteniendo su estructura. Son útiles para trabajar con tipos de clase complejos y genéricos.",
    difficulty: "advanced",
  },
  {
    id: 23,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de módulo en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de módulo manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de módulo
    declare module "mi-modulo" {
      export interface Config {
        nombre: string;
        version: string;
      }
      export function iniciar(config: Config): void;
      export const VERSION: string;
    }
    
    // Transformación de tipos de módulo
    type Exportaciones<T> = T extends { [K in keyof T]: infer E } ? E : never;
    type Importaciones<T> = T extends { [K in keyof T]: infer I } ? I : never;
    
    // Uso con tipos de módulo genéricos
    type ModuloGen<T> = {
      config: T;
      iniciar: (config: T) => void;
    };
    type ExportacionesModulo = Exportaciones<typeof import("mi-modulo")>;`,
        explanation:
          "Los tipos de utilidad para módulos permiten extraer y transformar los tipos de exportaciones e importaciones manteniendo su estructura.",
      },
      {
        text: "Tipos que convierten módulos en objetos",
        example: `// ❌ No convierten módulos en objetos
    type ModuloToObject<T> = T extends any ? object : never;  // No es el propósito
    
    // El propósito es transformar módulos manteniendo su estructura
    type TransformModulo<T> = T extends { [K in keyof T]: infer E } ? E : never;`,
        explanation:
          "Los tipos de utilidad para módulos mantienen la estructura del módulo, no la convierten en objeto.",
      },
      {
        text: "Tipos que solo funcionan con módulos simples",
        example: `// ❌ Funcionan con módulos complejos
    declare module "complex-module" {
      export interface Config<T> {
        nombre: string;
        valor: T;
      }
      export function iniciar<T>(config: Config<T>): Promise<T>;
      export const VERSION: string;
      export namespace Utilidades {
        export function validar<T>(valor: T): boolean;
      }
    }
    
    // Funciona con cualquier tipo de módulo
    type Exportaciones<T> = T extends { [K in keyof T]: infer E } ? E : never;
    type Importaciones<T> = T extends { [K in keyof T]: infer I } ? I : never;`,
        explanation:
          "Los tipos de utilidad para módulos funcionan con cualquier tipo de módulo, no solo los simples.",
      },
      {
        text: "Tipos que eliminan la estructura de módulo",
        example: `// ❌ Mantienen la estructura de módulo
    type FlattenModulo<T> = T extends any ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformModulo<T> = T extends { [K in keyof T]: infer E } ? E : never;`,
        explanation:
          "Los tipos de utilidad para módulos mantienen la estructura del módulo mientras transforman sus tipos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para módulos en TypeScript permiten extraer y transformar los tipos de exportaciones e importaciones manteniendo su estructura. Son útiles para trabajar con tipos de módulo complejos y genéricos.",
    difficulty: "advanced",
  },
  {
    id: 24,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de namespace en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de namespace manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de namespace
    namespace MiNamespace {
      export interface Config {
        nombre: string;
        version: string;
      }
      export function iniciar(config: Config): void;
      export const VERSION: string;
    }
    
    // Transformación de tipos de namespace
    type Exportaciones<T> = T extends { [K in keyof T]: infer E } ? E : never;
    type Importaciones<T> = T extends { [K in keyof T]: infer I } ? I : never;
    
    // Uso con tipos de namespace genéricos
    type NamespaceGen<T> = {
      config: T;
      iniciar: (config: T) => void;
    };
    type ExportacionesNamespace = Exportaciones<typeof MiNamespace>;`,
        explanation:
          "Los tipos de utilidad para namespaces permiten extraer y transformar los tipos de exportaciones e importaciones manteniendo su estructura.",
      },
      {
        text: "Tipos que convierten namespaces en objetos",
        example: `// ❌ No convierten namespaces en objetos
    type NamespaceToObject<T> = T extends any ? object : never;  // No es el propósito
    
    // El propósito es transformar namespaces manteniendo su estructura
    type TransformNamespace<T> = T extends { [K in keyof T]: infer E } ? E : never;`,
        explanation:
          "Los tipos de utilidad para namespaces mantienen la estructura del namespace, no la convierten en objeto.",
      },
      {
        text: "Tipos que solo funcionan con namespaces simples",
        example: `// ❌ Funcionan con namespaces complejos
    namespace ComplexNamespace {
      export interface Config<T> {
        nombre: string;
        valor: T;
      }
      export function iniciar<T>(config: Config<T>): Promise<T>;
      export const VERSION: string;
      export namespace Utilidades {
        export function validar<T>(valor: T): boolean;
      }
    }
    
    // Funciona con cualquier tipo de namespace
    type Exportaciones<T> = T extends { [K in keyof T]: infer E } ? E : never;
    type Importaciones<T> = T extends { [K in keyof T]: infer I } ? I : never;`,
        explanation:
          "Los tipos de utilidad para namespaces funcionan con cualquier tipo de namespace, no solo los simples.",
      },
      {
        text: "Tipos que eliminan la estructura de namespace",
        example: `// ❌ Mantienen la estructura de namespace
    type FlattenNamespace<T> = T extends any ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformNamespace<T> = T extends { [K in keyof T]: infer E } ? E : never;`,
        explanation:
          "Los tipos de utilidad para namespaces mantienen la estructura del namespace mientras transforman sus tipos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para namespaces en TypeScript permiten extraer y transformar los tipos de exportaciones e importaciones manteniendo su estructura. Son útiles para trabajar con tipos de namespace complejos y genéricos.",
    difficulty: "advanced",
  },
  {
    id: 25,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de decorador en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de decorador manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de decorador
    type DecoradorClase = <T extends new (...args: any[]) => any>(target: T) => T;
    type DecoradorMetodo = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
    type DecoradorPropiedad = (target: any, propertyKey: string) => void;
    
    // Transformación de tipos de decorador
    type ExtraerTipoTarget<T> = T extends (target: infer U, ...args: any[]) => any ? U : never;
    type ExtraerTipoRetorno<T> = T extends (...args: any[]) => infer R ? R : never;
    
    // Uso con tipos de decorador genéricos
    type DecoradorGen<T> = (target: T) => T;
    type TipoTarget = ExtraerTipoTarget<DecoradorGen<typeof Usuario>>;`,
        explanation:
          "Los tipos de utilidad para decoradores permiten extraer y transformar los tipos de target y retorno manteniendo su estructura.",
      },
      {
        text: "Tipos que convierten decoradores en funciones",
        example: `// ❌ No convierten decoradores en funciones
    type DecoradorToFuncion<T> = T extends Function ? Function : never;  // No es el propósito
    
    // El propósito es transformar decoradores manteniendo su estructura
    type TransformDecorador<T> = T extends (target: infer U, ...args: any[]) => infer R ? [U, R] : never;`,
        explanation:
          "Los tipos de utilidad para decoradores mantienen la estructura del decorador, no la convierten en función simple.",
      },
      {
        text: "Tipos que solo funcionan con decoradores simples",
        example: `// ❌ Funcionan con decoradores complejos
    type ComplexDecorador<T> = (
      target: T,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) => PropertyDescriptor | void;
    
    // Funciona con cualquier tipo de decorador
    type ExtraerTipoTarget<T> = T extends (target: infer U, ...args: any[]) => any ? U : never;
    type ExtraerTipoRetorno<T> = T extends (...args: any[]) => infer R ? R : never;`,
        explanation:
          "Los tipos de utilidad para decoradores funcionan con cualquier tipo de decorador, no solo los simples.",
      },
      {
        text: "Tipos que eliminan la estructura de decorador",
        example: `// ❌ Mantienen la estructura de decorador
    type FlattenDecorador<T> = T extends Function ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformDecorador<T> = T extends (target: infer U, ...args: any[]) => infer R ? [U, R] : never;`,
        explanation:
          "Los tipos de utilidad para decoradores mantienen la estructura del decorador mientras transforman sus tipos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para decoradores en TypeScript permiten extraer y transformar los tipos de target y retorno manteniendo su estructura. Son útiles para trabajar con tipos de decorador complejos y genéricos.",
    difficulty: "advanced",
  },
  {
    id: 26,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de promesa en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de promesa manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de promesa
    type PromesaString = Promise<string>;
    type PromesaNumero = Promise<number>;
    
    // Transformación de tipos de promesa
    type ExtraerTipoPromesa<T> = T extends Promise<infer U> ? U : never;
    type CrearPromesa<T> = Promise<T>;
    
    // Uso con tipos de promesa genéricos
    type PromesaGen<T> = Promise<T>;
    type TipoExtraido = ExtraerTipoPromesa<PromesaGen<number>>;  // number`,
        explanation:
          "Los tipos de utilidad para promesas permiten extraer y transformar los tipos de valor resuelto manteniendo su estructura.",
      },
      {
        text: "Tipos que convierten promesas en valores",
        example: `// ❌ No convierten promesas en valores
    type PromesaToValor<T> = T extends Promise<any> ? any : never;  // No es el propósito
    
    // El propósito es transformar promesas manteniendo su estructura
    type TransformPromesa<T> = T extends Promise<infer U> ? U : never;`,
        explanation:
          "Los tipos de utilidad para promesas mantienen la estructura de la promesa, no la convierten en valor.",
      },
      {
        text: "Tipos que solo funcionan con promesas simples",
        example: `// ❌ Funcionan con promesas complejas
    type ComplexPromesa<T> = Promise<{
      data: T;
      metadata: {
        timestamp: number;
        version: string;
      };
    }>;
    
    // Funciona con cualquier tipo de promesa
    type ExtraerTipoPromesa<T> = T extends Promise<infer U> ? U : never;
    type TipoExtraido = ExtraerTipoPromesa<ComplexPromesa<number>>;`,
        explanation:
          "Los tipos de utilidad para promesas funcionan con cualquier tipo de promesa, no solo las simples.",
      },
      {
        text: "Tipos que eliminan la estructura de promesa",
        example: `// ❌ Mantienen la estructura de promesa
    type FlattenPromesa<T> = T extends Promise<any> ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformPromesa<T> = T extends Promise<infer U> ? U : never;`,
        explanation:
          "Los tipos de utilidad para promesas mantienen la estructura de la promesa mientras transforman sus tipos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para promesas en TypeScript permiten extraer y transformar los tipos de valor resuelto manteniendo su estructura. Son útiles para trabajar con tipos de promesa complejos y genéricos.",
    difficulty: "advanced",
  },
  {
    id: 27,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de iterador en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de iterador manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de iterador
    type IteradorString = Iterator<string>;
    type IteradorNumero = Iterator<number>;
    
    // Transformación de tipos de iterador
    type ExtraerTipoIterador<T> = T extends Iterator<infer U> ? U : never;
    type CrearIterador<T> = Iterator<T>;
    
    // Uso con tipos de iterador genéricos
    type IteradorGen<T> = Iterator<T>;
    type TipoExtraido = ExtraerTipoIterador<IteradorGen<number>>;  // number`,
        explanation:
          "Los tipos de utilidad para iteradores permiten extraer y transformar los tipos de valor iterado manteniendo su estructura.",
      },
      {
        text: "Tipos que convierten iteradores en arrays",
        example: `// ❌ No convierten iteradores en arrays
    type IteradorToArray<T> = T extends Iterator<any> ? any[] : never;  // No es el propósito
    
    // El propósito es transformar iteradores manteniendo su estructura
    type TransformIterador<T> = T extends Iterator<infer U> ? U : never;`,
        explanation:
          "Los tipos de utilidad para iteradores mantienen la estructura del iterador, no la convierten en array.",
      },
      {
        text: "Tipos que solo funcionan con iteradores simples",
        example: `// ❌ Funcionan con iteradores complejos
    type ComplexIterador<T> = Iterator<{
      valor: T;
      metadata: {
        index: number;
        done: boolean;
      };
    }>;
    
    // Funciona con cualquier tipo de iterador
    type ExtraerTipoIterador<T> = T extends Iterator<infer U> ? U : never;
    type TipoExtraido = ExtraerTipoIterador<ComplexIterador<number>>;`,
        explanation:
          "Los tipos de utilidad para iteradores funcionan con cualquier tipo de iterador, no solo los simples.",
      },
      {
        text: "Tipos que eliminan la estructura de iterador",
        example: `// ❌ Mantienen la estructura de iterador
    type FlattenIterador<T> = T extends Iterator<any> ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformIterador<T> = T extends Iterator<infer U> ? U : never;`,
        explanation:
          "Los tipos de utilidad para iteradores mantienen la estructura del iterador mientras transforman sus tipos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para iteradores en TypeScript permiten extraer y transformar los tipos de valor iterado manteniendo su estructura. Son útiles para trabajar con tipos de iterador complejos y genéricos.",
    difficulty: "advanced",
  },
  {
    id: 28,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de generador en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de generador manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de generador
    type GeneradorString = Generator<string>;
    type GeneradorNumero = Generator<number>;
    
    // Transformación de tipos de generador
    type ExtraerTipoGenerador<T> = T extends Generator<infer U> ? U : never;
    type CrearGenerador<T> = Generator<T>;
    
    // Uso con tipos de generador genéricos
    type GeneradorGen<T> = Generator<T>;
    type TipoExtraido = ExtraerTipoGenerador<GeneradorGen<number>>;  // number`,
        explanation:
          "Los tipos de utilidad para generadores permiten extraer y transformar los tipos de valor generado manteniendo su estructura.",
      },
      {
        text: "Tipos que convierten generadores en arrays",
        example: `// ❌ No convierten generadores en arrays
    type GeneradorToArray<T> = T extends Generator<any> ? any[] : never;  // No es el propósito
    
    // El propósito es transformar generadores manteniendo su estructura
    type TransformGenerador<T> = T extends Generator<infer U> ? U : never;`,
        explanation:
          "Los tipos de utilidad para generadores mantienen la estructura del generador, no la convierten en array.",
      },
      {
        text: "Tipos que solo funcionan con generadores simples",
        example: `// ❌ Funcionan con generadores complejos
    type ComplexGenerador<T> = Generator<{
      valor: T;
      metadata: {
        index: number;
        done: boolean;
      };
    }>;
    
    // Funciona con cualquier tipo de generador
    type ExtraerTipoGenerador<T> = T extends Generator<infer U> ? U : never;
    type TipoExtraido = ExtraerTipoGenerador<ComplexGenerador<number>>;`,
        explanation:
          "Los tipos de utilidad para generadores funcionan con cualquier tipo de generador, no solo los simples.",
      },
      {
        text: "Tipos que eliminan la estructura de generador",
        example: `// ❌ Mantienen la estructura de generador
    type FlattenGenerador<T> = T extends Generator<any> ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformGenerador<T> = T extends Generator<infer U> ? U : never;`,
        explanation:
          "Los tipos de utilidad para generadores mantienen la estructura del generador mientras transforman sus tipos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para generadores en TypeScript permiten extraer y transformar los tipos de valor generado manteniendo su estructura. Son útiles para trabajar con tipos de generador complejos y genéricos.",
    difficulty: "advanced",
  },
  {
    id: 29,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de módulo dinámico en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de módulo dinámico manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de módulo dinámico
    type ModuloDinamico = {
      default: any;
      [key: string]: any;
    };
    
    // Transformación de tipos de módulo dinámico
    type ExtraerDefault<T> = T extends { default: infer U } ? U : never;
    type ExtraerExportaciones<T> = T extends { [K in keyof T]: infer E } ? E : never;
    
    // Uso con tipos de módulo dinámico genéricos
    type ModuloDinamicoGen<T> = {
      default: T;
      [key: string]: any;
    };
    type TipoDefault = ExtraerDefault<ModuloDinamicoGen<number>>;  // number`,
        explanation:
          "Los tipos de utilidad para módulos dinámicos permiten extraer y transformar los tipos de exportaciones manteniendo su estructura.",
      },
      {
        text: "Tipos que convierten módulos dinámicos en objetos",
        example: `// ❌ No convierten módulos dinámicos en objetos
    type ModuloDinamicoToObject<T> = T extends any ? object : never;  // No es el propósito
    
    // El propósito es transformar módulos dinámicos manteniendo su estructura
    type TransformModuloDinamico<T> = T extends { [K in keyof T]: infer E } ? E : never;`,
        explanation:
          "Los tipos de utilidad para módulos dinámicos mantienen la estructura del módulo, no la convierten en objeto.",
      },
      {
        text: "Tipos que solo funcionan con módulos dinámicos simples",
        example: `// ❌ Funcionan con módulos dinámicos complejos
    type ComplexModuloDinamico<T> = {
      default: T;
      metadata: {
        version: string;
        timestamp: number;
      };
      [key: string]: any;
    };
    
    // Funciona con cualquier tipo de módulo dinámico
    type ExtraerDefault<T> = T extends { default: infer U } ? U : never;
    type ExtraerExportaciones<T> = T extends { [K in keyof T]: infer E } ? E : never;`,
        explanation:
          "Los tipos de utilidad para módulos dinámicos funcionan con cualquier tipo de módulo, no solo los simples.",
      },
      {
        text: "Tipos que eliminan la estructura de módulo dinámico",
        example: `// ❌ Mantienen la estructura de módulo dinámico
    type FlattenModuloDinamico<T> = T extends any ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformModuloDinamico<T> = T extends { [K in keyof T]: infer E } ? E : never;`,
        explanation:
          "Los tipos de utilidad para módulos dinámicos mantienen la estructura del módulo mientras transforman sus tipos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para módulos dinámicos en TypeScript permiten extraer y transformar los tipos de exportaciones manteniendo su estructura. Son útiles para trabajar con tipos de módulo dinámico complejos y genéricos.",
    difficulty: "advanced",
  },
  {
    id: 30,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos de módulo de sistema en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos de módulo de sistema manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos de módulo de sistema
    type ModuloSistema = {
      exports: any;
      require: (id: string) => any;
      module: { exports: any };
      __filename: string;
      __dirname: string;
    };
    
    // Transformación de tipos de módulo de sistema
    type ExtraerExports<T> = T extends { exports: infer E } ? E : never;
    type ExtraerRequire<T> = T extends { require: infer R } ? R : never;
    
    // Uso con tipos de módulo de sistema genéricos
    type ModuloSistemaGen<T> = {
      exports: T;
      require: (id: string) => any;
      module: { exports: T };
      __filename: string;
      __dirname: string;
    };
    type TipoExports = ExtraerExports<ModuloSistemaGen<number>>;  // number`,
        explanation:
          "Los tipos de utilidad para módulos de sistema permiten extraer y transformar los tipos de exports y require manteniendo su estructura.",
      },
      {
        text: "Tipos que convierten módulos de sistema en objetos",
        example: `// ❌ No convierten módulos de sistema en objetos
    type ModuloSistemaToObject<T> = T extends any ? object : never;  // No es el propósito
    
    // El propósito es transformar módulos de sistema manteniendo su estructura
    type TransformModuloSistema<T> = T extends { [K in keyof T]: infer E } ? E : never;`,
        explanation:
          "Los tipos de utilidad para módulos de sistema mantienen la estructura del módulo, no la convierten en objeto.",
      },
      {
        text: "Tipos que solo funcionan con módulos de sistema simples",
        example: `// ❌ Funcionan con módulos de sistema complejos
    type ComplexModuloSistema<T> = {
      exports: T;
      require: (id: string) => Promise<any>;
      module: { exports: T; id: string };
      __filename: string;
      __dirname: string;
      metadata: {
        version: string;
        timestamp: number;
      };
    };
    
    // Funciona con cualquier tipo de módulo de sistema
    type ExtraerExports<T> = T extends { exports: infer E } ? E : never;
    type ExtraerRequire<T> = T extends { require: infer R } ? R : never;`,
        explanation:
          "Los tipos de utilidad para módulos de sistema funcionan con cualquier tipo de módulo, no solo los simples.",
      },
      {
        text: "Tipos que eliminan la estructura de módulo de sistema",
        example: `// ❌ Mantienen la estructura de módulo de sistema
    type FlattenModuloSistema<T> = T extends any ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la estructura
    type TransformModuloSistema<T> = T extends { [K in keyof T]: infer E } ? E : never;`,
        explanation:
          "Los tipos de utilidad para módulos de sistema mantienen la estructura del módulo mientras transforman sus tipos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para módulos de sistema en TypeScript permiten extraer y transformar los tipos de exports y require manteniendo su estructura. Son útiles para trabajar con tipos de módulo de sistema complejos y genéricos.",
    difficulty: "advanced",
  },
];
