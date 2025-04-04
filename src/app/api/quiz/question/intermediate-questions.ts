import { QuizQuestion } from "../types";

export const intermediateQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "¿Qué es un tipo de utilidad inferido en TypeScript?",
    options: [
      {
        text: "Un tipo que se deriva automáticamente de otro tipo",
        example: `// ✅ Tipos inferidos
    type Usuario = {
      nombre: string;
      edad: number;
    };
    
    // Inferir el tipo de retorno
    type RetornoSaludar = ReturnType<typeof saludar>;
    function saludar(usuario: Usuario): string {
      return \`Hola \${usuario.nombre}\`;
    }
    
    // Inferir el tipo de parámetros
    type ParametrosSaludar = Parameters<typeof saludar>;
    
    // Inferir el tipo de instancia
    class Persona {
      nombre: string;
      constructor(nombre: string) {
        this.nombre = nombre;
      }
    }
    type InstanciaPersona = InstanceType<typeof Persona>;`,
        explanation:
          "Los tipos inferidos permiten derivar tipos de funciones, clases y otros constructores.",
      },
      {
        text: "Un tipo que solo funciona con funciones",
        example: `// ❌ Los tipos inferidos funcionan con varios constructores
    // Con funciones
    type Retorno = ReturnType<typeof funcion>;
    
    // Con clases
    type Instancia = InstanceType<typeof Clase>;
    
    // Con constructores
    type Parametros = ConstructorParameters<typeof Clase>;
    
    // Con métodos
    type Metodo = ThisParameterType<typeof metodo>;`,
        explanation:
          "Los tipos inferidos pueden usarse con funciones, clases, constructores y métodos.",
      },
      {
        text: "Un tipo que solo funciona en tiempo de compilación",
        example: `// ❌ Los tipos inferidos afectan el runtime
    type Retorno = ReturnType<typeof funcion>;
    
    function funcion(): string {
      return "Hola";
    }
    
    const resultado: Retorno = funcion();  // ✅ Funciona en runtime
    console.log(resultado);  // "Hola"`,
        explanation:
          "Los tipos inferidos afectan tanto al tiempo de compilación como al runtime.",
      },
      {
        text: "Un tipo que solo puede inferir tipos primitivos",
        example: `// ❌ Los tipos inferidos pueden inferir cualquier tipo
    // Tipos primitivos
    type RetornoString = ReturnType<() => string>;
    
    // Tipos de objeto
    type RetornoObjeto = ReturnType<() => { a: number }>;
    
    // Tipos complejos
    type RetornoUnion = ReturnType<() => string | number>;
    
    // Tipos genéricos
    type RetornoGenerico = ReturnType<<T>(x: T) => T>;`,
        explanation:
          "Los tipos inferidos pueden inferir cualquier tipo, no solo tipos primitivos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Un tipo de utilidad inferido en TypeScript es un tipo que se deriva automáticamente de otro tipo. Incluye tipos como ReturnType, Parameters, InstanceType, y otros que permiten extraer información de tipos de funciones, clases y constructores.",
    difficulty: "intermediate",
  },
  {
    id: 16,
    question:
      "¿Qué son los tipos de utilidad para manipular arrays en TypeScript?",
    options: [
      {
        text: "Tipos que transforman arrays manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de arrays
    type Numeros = number[];
    type Strings = string[];
    
    // Transformación de tipo de elementos
    type ArrayToStrings<T> = T extends (infer U)[] ? string[] : never;
    type ArrayToNumbers<T> = T extends (infer U)[] ? number[] : never;
    
    // Uso
    const numeros: ArrayToStrings<Numeros> = ["1", "2", "3"];
    const strings: ArrayToNumbers<Strings> = [1, 2, 3];`,
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
    difficulty: "intermediate",
  },
  {
    id: 17,
    question:
      "¿Qué son los tipos de utilidad para manipular tuplas en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tuplas manteniendo su estructura fija",
        example: `// ✅ Ejemplo de transformación de tuplas
    type Tupla = [string, number, boolean];
    
    // Transformación de tipos en tuplas
    type TuplaToStrings<T> = T extends [infer A, infer B, infer C] ? [string, string, string] : never;
    type TuplaToNumbers<T> = T extends [infer A, infer B, infer C] ? [number, number, number] : never;
    
    // Uso
    const strings: TuplaToStrings<Tupla> = ["1", "2", "3"];
    const numeros: TuplaToNumbers<Tupla> = [1, 2, 3];`,
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
    difficulty: "intermediate",
  },
  {
    id: 18,
    question:
      "¿Qué son los tipos de utilidad para manipular enums en TypeScript?",
    options: [
      {
        text: "Tipos que transforman enums manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de enums
    enum Color {
      Red = "RED",
      Green = "GREEN",
      Blue = "BLUE"
    }
    
    // Transformación de valores de enum
    type ColorValues = \`\${Color}\`;  // "RED" | "GREEN" | "BLUE"
    type ColorKeys = keyof typeof Color;  // "Red" | "Green" | "Blue"
    
    // Uso
    const valor: ColorValues = "RED";
    const clave: ColorKeys = "Red";`,
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
    difficulty: "intermediate",
  },
  {
    id: 19,
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
    
    // Uso
    const dir1: DireccionMayusculas = "NORTE";
    const dir2: DireccionMinusculas = "norte";`,
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
    difficulty: "intermediate",
  },
  {
    id: 20,
    question:
      "¿Qué son los tipos de utilidad para manipular tipos condicionales en TypeScript?",
    options: [
      {
        text: "Tipos que transforman tipos condicionales manteniendo su estructura",
        example: `// ✅ Ejemplo de transformación de tipos condicionales
    type TransformCondicional<T> = T extends string ? Uppercase<T> : T extends number ? T : never;
    
    // Uso con diferentes tipos
    type StringTransformado = TransformCondicional<"hola">;  // "HOLA"
    type NumberTransformado = TransformCondicional<42>;      // 42
    type BooleanTransformado = TransformCondicional<true>;   // never`,
        explanation:
          "Los tipos de utilidad para tipos condicionales permiten transformar sus tipos manteniendo la estructura condicional.",
      },
      {
        text: "Tipos que eliminan la condición del tipo condicional",
        example: `// ❌ No eliminan la condición
    type RemoveCondition<T> = T extends any ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la condición
    type TransformCondicional<T> = T extends string ? Uppercase<T> : never;`,
        explanation:
          "Los tipos de utilidad para tipos condicionales mantienen la estructura condicional, no la eliminan.",
      },
      {
        text: "Tipos que solo funcionan con condiciones simples",
        example: `// ❌ Funcionan con condiciones complejas
    type ComplexCondition<T> = T extends { a: infer A, b: infer B } 
      ? { a: Uppercase<A>, b: Lowercase<B> }
      : never;
    
    // Funciona con cualquier tipo de condición
    type Resultado = ComplexCondition<{ a: "hola", b: "MUNDO" }>;  // { a: "HOLA", b: "mundo" }`,
        explanation:
          "Los tipos de utilidad para tipos condicionales funcionan con cualquier tipo de condición, no solo las simples.",
      },
      {
        text: "Tipos que convierten tipos condicionales en uniones",
        example: `// ❌ No convierten en uniones
    type ToUnion<T> = T extends any ? any : never;  // No es el propósito
    
    // El propósito es transformar manteniendo la condición
    type TransformCondicional<T> = T extends string ? Uppercase<T> : never;`,
        explanation:
          "Los tipos de utilidad para tipos condicionales mantienen la estructura condicional mientras transforman sus tipos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de utilidad para tipos condicionales en TypeScript permiten transformar sus tipos manteniendo la estructura condicional. Son útiles para crear tipos derivados de tipos condicionales existentes.",
    difficulty: "intermediate",
  },
];
