import { QuizQuestion } from "../types";

export const basicQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "¿Qué es TypeScript?",
    options: [
      {
        text: "Un superset de JavaScript que añade tipos estáticos",
        example: `// JavaScript
    function suma(a, b) {
      return a + b;  // Podría causar errores en runtime
    }
    
    // TypeScript ✨
    function suma(a: number, b: number): number {
      return a + b;  // Error en compilación si no son números
    }`,
        explanation:
          "TypeScript extiende JavaScript añadiendo un sistema de tipos que ayuda a prevenir errores antes de ejecutar el código.",
      },
      {
        text: "Un nuevo lenguaje que reemplaza a JavaScript",
        example: `// ❌ Incorrecto: TypeScript no reemplaza JavaScript
    // Todo código JavaScript válido es TypeScript válido
    let nombre = "Juan";     // ✅ Válido en ambos
    const edad = 25;         // ✅ Válido en ambos
    const activo = true;     // ✅ Válido en ambos`,
        explanation:
          "TypeScript no reemplaza a JavaScript, es una extensión que añade características manteniendo compatibilidad.",
      },
      {
        text: "Una librería de JavaScript para manejo de tipos",
        example: `// ❌ No es una librería que se importe
    import typescript from 'typescript';  // ❌ Esto no existe
    
    // Es un lenguaje que se compila a JavaScript
    interface Usuario {
      nombre: string;
      edad: number;
    }`,
        explanation:
          "TypeScript es un lenguaje que se compila a JavaScript, no una librería que se importa en tiempo de ejecución.",
      },
      {
        text: "Un framework web como React o Angular",
        example: `// ❌ TypeScript es un lenguaje, no un framework
    // Puede usarse CON cualquier framework
    import React from 'react';
    
    // Añadiendo tipos a componentes React
    interface Props {
      nombre: string;
      edad: number;
    }`,
        explanation:
          "TypeScript es un lenguaje que puede usarse con cualquier framework, no es un framework en sí mismo.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "TypeScript es un superset de JavaScript desarrollado por Microsoft que añade un sistema de tipos estático opcional. Esto ayuda a detectar errores durante el desarrollo y mejora la mantenibilidad del código.",
    difficulty: "basic",
  },
  {
    id: 2,
    question:
      "¿Cuál es la sintaxis correcta para declarar una variable con tipo en TypeScript?",
    options: [
      {
        text: 'let nombre: string = "Juan"',
        example: `// ✅ Declaraciones con tipo explícito
    let nombre: string = "Juan";
    let edad: number = 25;
    let activo: boolean = true;
    
    // También válido con const
    const PI: number = 3.14159;
    
    // Y con tipos más complejos
    let numeros: number[] = [1, 2, 3];
    let punto: { x: number; y: number } = { x: 0, y: 0 };`,
        explanation:
          "Esta es la sintaxis estándar en TypeScript: primero el nombre de la variable, luego el tipo, y finalmente el valor.",
      },
      {
        text: 'let string nombre = "Juan"',
        example: `// ❌ Sintaxis incorrecta
    let string nombre = "Juan";    // Error
    
    // La sintaxis correcta es:
    let nombre: string = "Juan";   // ✅ Correcto
    
    // O usar inferencia de tipos:
    let nombre = "Juan";          // ✅ También correcto`,
        explanation:
          "El tipo debe ir después del nombre de la variable, no antes. La sintaxis es: let/const nombreVariable: tipo = valor.",
      },
      {
        text: 'let nombre = string("Juan")',
        example: `// ❌ Esto no es TypeScript
    let nombre = string("Juan");   // Error
    
    // En TypeScript:
    let nombre: string = "Juan";   // ✅ Declaración explícita
    let nombre = "Juan";          // ✅ Inferencia de tipos`,
        explanation:
          "TypeScript no usa funciones constructoras para tipos. Los tipos se declaran con : o se infieren automáticamente.",
      },
      {
        text: 'string let nombre = "Juan"',
        example: `// ❌ Sintaxis incorrecta
    string let nombre = "Juan";    // Error
    
    // Formas correctas:
    let nombre: string = "Juan";   // ✅ Tipo explícito
    let nombre = "Juan";          // ✅ Tipo inferido
    const nombre = "Juan";        // ✅ Tipo inferido literal`,
        explanation:
          "La declaración siempre comienza con let o const, seguido del nombre, tipo opcional y valor.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "En TypeScript, la sintaxis correcta para declarar variables con tipo es usando los dos puntos (:) después del nombre de la variable. También se puede omitir el tipo y dejar que TypeScript lo infiera automáticamente.",
    difficulty: "basic",
  },
  {
    id: 3,
    question: "¿Qué son los tipos primitivos en TypeScript?",
    options: [
      {
        text: "Los tipos básicos como string, number, boolean",
        example: `// ✅ Tipos primitivos en TypeScript
    let texto: string = "Hola";          // Cadenas de texto
    let numero: number = 42;             // Números
    let decimal: number = 3.14;          // Decimales
    let booleano: boolean = true;        // Booleanos
    let nulo: null = null;              // Null
    let indefinido: undefined = undefined; // Undefined
    let simbolo: symbol = Symbol("id");  // Símbolos
    let bigInt: bigint = 9007199254740991n; // Números grandes`,
        explanation:
          "Los tipos primitivos son los bloques básicos de construcción en TypeScript, heredados de JavaScript.",
      },
      {
        text: "Solo los tipos object y array",
        example: `// ❌ Estos NO son tipos primitivos
    let objeto: object = { nombre: "Juan" };  // Tipo compuesto
    let array: number[] = [1, 2, 3];         // Tipo compuesto
    
    // Los primitivos son más básicos:
    let nombre: string = "Juan";    // ✅ Primitivo
    let edad: number = 25;         // ✅ Primitivo
    let activo: boolean = true;    // ✅ Primitivo`,
        explanation:
          "Los objetos y arrays son tipos compuestos que se construyen a partir de tipos primitivos.",
      },
      {
        text: "Interfaces y tipos personalizados",
        example: `// ❌ Estos son tipos definidos por el usuario
    interface Usuario {
      nombre: string;    // Usa primitivo
      edad: number;      // Usa primitivo
    }
    
    type Color = "rojo" | "verde" | "azul";  // Union type
    
    // Primitivos reales:
    let nombre: string = "Juan";     // ✅ Primitivo
    let edad: number = 25;          // ✅ Primitivo`,
        explanation:
          "Las interfaces y tipos personalizados son construcciones que usan tipos primitivos como base.",
      },
      {
        text: "Funciones y clases",
        example: `// ❌ Estos son tipos complejos
    class Persona {
      nombre: string;    // Usa primitivo
      edad: number;      // Usa primitivo
    }
    
    type Funcion = () => void;
    
    // Primitivos reales:
    let texto: string = "abc";     // ✅ Primitivo
    let numero: number = 123;      // ✅ Primitivo
    let activo: boolean = true;    // ✅ Primitivo`,
        explanation:
          "Las funciones y clases son tipos complejos que pueden contener o usar tipos primitivos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos primitivos en TypeScript son los tipos más básicos heredados de JavaScript: string, number, boolean, null, undefined, symbol y bigint. Son los bloques fundamentales para construir tipos más complejos.",
    difficulty: "basic",
  },
  {
    id: 4,
    question: "¿Cómo se define un array en TypeScript?",
    options: [
      {
        text: "Using Type[] or Array<Type>",
        example: `// ✅ Dos formas equivalentes de definir arrays
    // 1. Usando corchetes (más común)
    let numeros: number[] = [1, 2, 3];
    let nombres: string[] = ["Ana", "Juan"];
    
    // 2. Usando sintaxis genérica
    let edades: Array<number> = [25, 30, 35];
    let frutas: Array<string> = ["manzana", "pera"];
    
    // Arrays multidimensionales
    let matriz: number[][] = [
      [1, 2],
      [3, 4]
    ];
    
    // Arrays mixtos (unión de tipos)
    let mixto: (number | string)[] = [1, "dos", 3];`,
        explanation:
          "TypeScript ofrece dos sintaxis equivalentes para arrays: Type[] y Array<Type>. La primera es más común y concisa.",
      },
      {
        text: "Using [Type]",
        example: `// ❌ Sintaxis incorrecta
    let numeros: [number] = [1, 2, 3];  // Error
    
    // Esto define una tupla de un elemento:
    let tupla: [number] = [1];  // Solo puede tener UN número
    
    // Formas correctas de definir arrays:
    let numeros: number[] = [1, 2, 3];        // ✅
    let numeros2: Array<number> = [1, 2, 3];  // ✅`,
        explanation:
          "Los corchetes [Type] definen una tupla de un elemento, no un array. Para arrays se usa Type[] o Array<Type>.",
      },
      {
        text: "Using array<Type>",
        example: `// ❌ Sintaxis incorrecta (array en minúscula)
    let nombres: array<string> = ["Ana"];  // Error
    
    // Forma correcta (Array con mayúscula):
    let nombres: Array<string> = ["Ana"];  // ✅
    
    // O mejor aún, usando la sintaxis de corchetes:
    let nombres: string[] = ["Ana"];       // ✅`,
        explanation:
          "Array debe escribirse con A mayúscula en TypeScript. La sintaxis correcta es Array<Type> o Type[].",
      },
      {
        text: "Using new Array()",
        example: `// ❌ No es la forma recomendada
    let numeros = new Array(1, 2, 3);  // Funciona pero no es idiomático
    
    // Formas preferidas en TypeScript:
    let numeros: number[] = [1, 2, 3];        // ✅
    let numeros2: Array<number> = [1, 2, 3];  // ✅`,
        explanation:
          "Aunque new Array() funciona, no es la forma idiomática en TypeScript. Se prefiere usar Type[] o Array<Type>.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "En TypeScript, los arrays se pueden definir de dos formas equivalentes: Type[] o Array<Type>. La primera forma es más común y concisa. Ambas formas permiten definir arrays de cualquier tipo, incluyendo tipos primitivos, objetos y uniones de tipos.",
    difficulty: "basic",
  },
  {
    id: 5,
    question: "¿Qué es una interfaz en TypeScript?",
    options: [
      {
        text: "Un contrato que define la estructura de un objeto",
        example: `// ✅ Definición de interfaz
    interface Usuario {
      nombre: string;
      edad: number;
      activo?: boolean;  // Propiedad opcional
    }
    
    // Uso de la interfaz
    const usuario: Usuario = {
      nombre: "Juan",
      edad: 25
    };
    
    // También se puede usar en funciones
    function saludar(usuario: Usuario): string {
      return \`Hola \${usuario.nombre}\`;
    }`,
        explanation:
          "Las interfaces definen la forma que debe tener un objeto, incluyendo sus propiedades y tipos.",
      },
      {
        text: "Una clase abstracta",
        example: `// ❌ Las interfaces no son clases abstractas
    interface Animal {
      nombre: string;
      hacerSonido(): void;
    }
    
    // Una clase abstracta es diferente:
    abstract class Animal {
      abstract nombre: string;
      abstract hacerSonido(): void;
    }`,
        explanation:
          "Las interfaces son diferentes de las clases abstractas. Las interfaces solo definen la estructura, mientras que las clases abstractas pueden contener implementación.",
      },
      {
        text: "Un tipo que solo puede ser usado una vez",
        example: `// ❌ Las interfaces son reutilizables
    interface Punto {
      x: number;
      y: number;
    }
    
    // Se puede usar múltiples veces
    const punto1: Punto = { x: 0, y: 0 };
    const punto2: Punto = { x: 1, y: 1 };
    const punto3: Punto = { x: 2, y: 2 };`,
        explanation:
          "Las interfaces son definiciones reutilizables que pueden ser implementadas por múltiples objetos.",
      },
      {
        text: "Un tipo que solo funciona en tiempo de compilación",
        example: `// ❌ Las interfaces afectan el runtime
    interface Persona {
      nombre: string;
      edad: number;
    }
    
    const juan: Persona = {
      nombre: "Juan",
      edad: 25
    };
    
    // TypeScript verifica la estructura en runtime
    console.log(juan.nombre);  // "Juan"
    console.log(juan.edad);    // 25`,
        explanation:
          "Las interfaces afectan tanto al tiempo de compilación como al runtime, ayudando a garantizar que los objetos tengan la estructura correcta.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Una interfaz en TypeScript es un contrato que define la estructura que debe tener un objeto. Especifica qué propiedades debe tener el objeto y qué tipos deben tener esas propiedades. Las interfaces son fundamentales para el sistema de tipos de TypeScript y ayudan a garantizar que los objetos tengan la forma correcta.",
    difficulty: "basic",
  },
  {
    id: 6,
    question: "¿Qué es el tipo any en TypeScript?",
    options: [
      {
        text: "Un tipo que puede representar cualquier valor",
        example: `// ✅ Uso de any
    let variable: any = "texto";
    variable = 42;        // ✅ Válido
    variable = true;      // ✅ Válido
    variable = [1, 2, 3]; // ✅ Válido
    
    // Útil para migración gradual
    function procesarDatos(datos: any) {
      // Aquí podemos hacer cualquier cosa con datos
      return datos;
    }`,
        explanation:
          "El tipo any permite asignar cualquier valor a una variable, desactivando la verificación de tipos.",
      },
      {
        text: "Un tipo que solo acepta números",
        example: `// ❌ any no es solo para números
    let numero: any = 42;    // ✅ Válido
    let texto: any = "Hola"; // ✅ También válido
    let booleano: any = true; // ✅ También válido
    
    // any acepta cualquier tipo
    let variable: any = {
      nombre: "Juan",
      edad: 25
    };`,
        explanation:
          "El tipo any puede representar cualquier tipo de valor, no solo números.",
      },
      {
        text: "Un tipo que convierte valores a string",
        example: `// ❌ any no convierte valores
    let numero: any = 42;
    console.log(typeof numero);  // "number"
    
    let texto: any = "Hola";
    console.log(typeof texto);   // "string"
    
    // any mantiene el tipo original
    let booleano: any = true;
    console.log(typeof booleano); // "boolean"`,
        explanation:
          "El tipo any no convierte valores, simplemente permite asignar cualquier tipo de valor.",
      },
      {
        text: "Un tipo que solo funciona en tiempo de compilación",
        example: `// ❌ any afecta el runtime
    let variable: any = "texto";
    console.log(variable.length);  // 5
    
    variable = 42;
    console.log(variable.toFixed(2));  // "42.00"
    
    // any permite cualquier operación en runtime
    let datos: any = { nombre: "Juan" };
    console.log(datos.nombre);  // "Juan"`,
        explanation:
          "El tipo any afecta tanto al tiempo de compilación como al runtime, permitiendo cualquier operación.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "El tipo any en TypeScript es un tipo especial que puede representar cualquier valor. Es útil para migración gradual de JavaScript a TypeScript, pero su uso excesivo puede reducir los beneficios del sistema de tipos.",
    difficulty: "basic",
  },
  {
    id: 7,
    question: "¿Qué es el tipo void en TypeScript?",
    options: [
      {
        text: "Un tipo que representa la ausencia de valor",
        example: `// ✅ Uso de void
    function saludar(): void {
      console.log("Hola");
      // No hay return
    }
    
    // También con arrow functions
    const despedir = (): void => {
      console.log("Adiós");
    };
    
    // En callbacks
    function ejecutar(callback: () => void) {
      callback();
    }`,
        explanation:
          "El tipo void se usa principalmente para funciones que no devuelven ningún valor.",
      },
      {
        text: "Un tipo que representa null",
        example: `// ❌ void no es lo mismo que null
    function funcionVoid(): void {
      console.log("Hola");
      // No devuelve nada
    }
    
    function funcionNull(): null {
      return null;  // Debe devolver null explícitamente
    }
    
    // void no puede asignarse a null
    let variable: void = null;  // Error`,
        explanation:
          "void representa la ausencia de valor, mientras que null es un valor específico.",
      },
      {
        text: "Un tipo que representa undefined",
        example: `// ❌ void no es lo mismo que undefined
    function funcionVoid(): void {
      console.log("Hola");
      // No devuelve nada
    }
    
    function funcionUndefined(): undefined {
      return undefined;  // Debe devolver undefined explícitamente
    }
    
    // void no puede asignarse a undefined
    let variable: void = undefined;  // Error`,
        explanation:
          "void representa la ausencia de valor, mientras que undefined es un valor específico.",
      },
      {
        text: "Un tipo que solo puede usarse con funciones",
        example: `// ❌ void puede usarse con variables
    let variable: void;  // ✅ Válido
    
    // Aunque no es muy útil
    variable = undefined;  // Solo puede ser undefined
    
    // Más común en funciones
    function noRetorna(): void {
      console.log("No retorna nada");
    }`,
        explanation:
          "void puede usarse tanto con funciones como con variables, aunque es más común en funciones.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "El tipo void en TypeScript representa la ausencia de valor. Se usa principalmente para indicar que una función no devuelve ningún valor. A diferencia de null o undefined, void representa específicamente la ausencia de un valor de retorno en funciones.",
    difficulty: "basic",
  },
  {
    id: 8,
    question: "¿Qué son los tipos de unión en TypeScript?",
    options: [
      {
        text: "Tipos que pueden ser uno de varios tipos posibles",
        example: `// ✅ Tipos de unión
    let id: string | number;
    id = "abc123";  // ✅ Válido
    id = 42;        // ✅ Válido
    
    // Con funciones
    function imprimirId(id: string | number) {
      console.log(\`ID: \${id}\`);
    }
    
    // Con arrays
    let datos: (string | number)[] = ["texto", 42, "otro", 123];`,
        explanation:
          "Los tipos de unión permiten que una variable pueda ser de uno de varios tipos posibles.",
      },
      {
        text: "Tipos que combinan múltiples tipos en uno",
        example: `// ❌ Esto es una intersección, no una unión
    type Usuario = {
      nombre: string;
      edad: number;
    };
    
    type Empleado = {
      salario: number;
      departamento: string;
    };
    
    // Intersección (combina tipos)
    type UsuarioEmpleado = Usuario & Empleado;
    
    // Unión (permite uno u otro)
    type Id = string | number;`,
        explanation:
          "Las uniones permiten que un valor sea de uno de varios tipos, no que combine múltiples tipos.",
      },
      {
        text: "Tipos que solo pueden ser strings o numbers",
        example: `// ❌ Las uniones pueden ser de cualquier tipo
    type Resultado = string | number | boolean | null;
    
    let valor: Resultado;
    valor = "éxito";  // ✅ Válido
    valor = 42;       // ✅ Válido
    valor = true;     // ✅ Válido
    valor = null;     // ✅ Válido
    
    // También con objetos
    type Forma = Circulo | Cuadrado | Triangulo;`,
        explanation:
          "Los tipos de unión pueden incluir cualquier tipo, no solo strings y numbers.",
      },
      {
        text: "Tipos que solo funcionan en tiempo de compilación",
        example: `// ❌ Las uniones afectan el runtime
    function procesar(valor: string | number) {
      if (typeof valor === "string") {
        return valor.toUpperCase();  // ✅ Funciona en runtime
      } else {
        return valor.toFixed(2);     // ✅ Funciona en runtime
      }
    }
    
    // Type narrowing en runtime
    let id: string | number = "abc123";
    if (typeof id === "string") {
      console.log(id.length);  // ✅ Funciona en runtime
    }`,
        explanation:
          "Las uniones afectan tanto al tiempo de compilación como al runtime, permitiendo type narrowing.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los tipos de unión en TypeScript permiten que una variable pueda ser de uno de varios tipos posibles. Se definen usando el operador | entre los tipos posibles. Son útiles para representar valores que pueden tener diferentes formas, como IDs que pueden ser strings o numbers.",
    difficulty: "basic",
  },
  {
    id: 9,
    question: "¿Qué es el tipo never en TypeScript?",
    options: [
      {
        text: "Un tipo que representa valores que nunca ocurrirán",
        example: `// ✅ Uso de never
    function error(mensaje: string): never {
      throw new Error(mensaje);
    }
    
    function bucleInfinito(): never {
      while (true) {
        // Código que nunca termina
      }
    }
    
    // En uniones discriminadas
    type Forma = Circulo | Cuadrado;
    
    function area(forma: Forma): number {
      switch (forma.tipo) {
        case "circulo":
          return Math.PI * forma.radio ** 2;
        case "cuadrado":
          return forma.lado ** 2;
        default:
          const _exhaustiveCheck: never = forma;
          return _exhaustiveCheck;
      }
    }`,
        explanation:
          "El tipo never se usa para funciones que nunca retornan o para exhaustividad en uniones discriminadas.",
      },
      {
        text: "Un tipo que representa null",
        example: `// ❌ never no es lo mismo que null
    function funcionNever(): never {
      throw new Error("Error");  // Nunca retorna
    }
    
    function funcionNull(): null {
      return null;  // Retorna null explícitamente
    }
    
    // never no puede asignarse a null
    let variable: never = null;  // Error`,
        explanation:
          "never representa la ausencia total de valor, mientras que null es un valor específico.",
      },
      {
        text: "Un tipo que representa undefined",
        example: `// ❌ never no es lo mismo que undefined
    function funcionNever(): never {
      throw new Error("Error");  // Nunca retorna
    }
    
    function funcionUndefined(): undefined {
      return undefined;  // Retorna undefined explícitamente
    }
    
    // never no puede asignarse a undefined
    let variable: never = undefined;  // Error`,
        explanation:
          "never representa la ausencia total de valor, mientras que undefined es un valor específico.",
      },
      {
        text: "Un tipo que solo puede usarse con funciones",
        example: `// ❌ never puede usarse con variables
    let variable: never;  // ✅ Válido (aunque no muy útil)
    
    // Más común en funciones
    function error(mensaje: string): never {
      throw new Error(mensaje);
    }
    
    // Y en uniones discriminadas
    type Resultado = Exito | Error;
    function procesar(resultado: Resultado): string {
      if (resultado.tipo === "exito") {
        return resultado.valor;
      } else if (resultado.tipo === "error") {
        return resultado.mensaje;
      }
      const _exhaustiveCheck: never = resultado;
      return _exhaustiveCheck;
    }`,
        explanation:
          "never puede usarse tanto con funciones como con variables, aunque es más común en funciones y uniones discriminadas.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "El tipo never en TypeScript representa valores que nunca ocurrirán. Se usa principalmente para funciones que nunca retornan (como las que lanzan errores o entran en bucles infinitos) y para garantizar la exhaustividad en uniones discriminadas.",
    difficulty: "basic",
  },
  {
    id: 10,
    question: "¿Qué es el tipo unknown en TypeScript?",
    options: [
      {
        text: "Un tipo seguro que requiere verificación antes de su uso",
        example: `// ✅ Uso de unknown
    function procesar(valor: unknown) {
      if (typeof valor === "string") {
        return valor.toUpperCase();  // ✅ Seguro
      }
      if (typeof valor === "number") {
        return valor.toFixed(2);     // ✅ Seguro
      }
      throw new Error("Tipo no soportado");
    }
    
    // Más seguro que any
    let dato: unknown = "texto";
    // dato.toUpperCase();  // ❌ Error: necesita verificación
    if (typeof dato === "string") {
      dato.toUpperCase();  // ✅ Seguro
    }`,
        explanation:
          "unknown es un tipo seguro que requiere verificación de tipo antes de su uso.",
      },
      {
        text: "Un tipo que es igual a any",
        example: `// ❌ unknown no es igual a any
    let valorAny: any = "texto";
    valorAny.toUpperCase();  // ✅ Funciona (peligroso)
    
    let valorUnknown: unknown = "texto";
    // valorUnknown.toUpperCase();  // ❌ Error: necesita verificación
    if (typeof valorUnknown === "string") {
      valorUnknown.toUpperCase();  // ✅ Seguro
    }`,
        explanation:
          "unknown es más seguro que any porque requiere verificación de tipo antes de su uso.",
      },
      {
        text: "Un tipo que solo puede ser string o number",
        example: `// ❌ unknown puede ser cualquier tipo
    let valor: unknown;
    valor = "texto";     // ✅ Válido
    valor = 42;          // ✅ Válido
    valor = true;        // ✅ Válido
    valor = [1, 2, 3];   // ✅ Válido
    valor = { a: 1 };    // ✅ Válido
    
    // Pero necesita verificación
    if (typeof valor === "string") {
      valor.length;  // ✅ Seguro
    }`,
        explanation:
          "unknown puede contener cualquier tipo de valor, pero requiere verificación antes de su uso.",
      },
      {
        text: "Un tipo que solo funciona en tiempo de compilación",
        example: `// ❌ unknown afecta el runtime
    function procesar(valor: unknown) {
      if (typeof valor === "string") {
        return valor.toUpperCase();  // ✅ Funciona en runtime
      }
      if (typeof valor === "number") {
        return valor.toFixed(2);     // ✅ Funciona en runtime
      }
      throw new Error("Tipo no soportado");
    }
    
    // Type narrowing en runtime
    let dato: unknown = "texto";
    if (typeof dato === "string") {
      console.log(dato.length);  // ✅ Funciona en runtime
    }`,
        explanation:
          "unknown afecta tanto al tiempo de compilación como al runtime, permitiendo type narrowing.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "El tipo unknown en TypeScript es un tipo seguro que puede contener cualquier valor, pero requiere verificación de tipo antes de su uso. Es una alternativa más segura a any, ya que fuerza al desarrollador a verificar el tipo antes de realizar operaciones con el valor.",
    difficulty: "basic",
  },
  {
    id: 11,
    question: "¿Qué es una tupla en TypeScript?",
    options: [
      {
        text: "Un array con un número fijo de elementos y tipos específicos",
        example: `// ✅ Definición de tuplas
    let punto: [number, number] = [0, 0];
    let usuario: [string, number, boolean] = ["Juan", 25, true];
    
    // Acceso a elementos
    let x = punto[0];  // number
    let y = punto[1];  // number
    
    // Error si se excede el tamaño
    punto[2] = 3;  // ❌ Error
    
    // Error si el tipo no coincide
    punto[0] = "texto";  // ❌ Error`,
        explanation:
          "Las tuplas son arrays con un número fijo de elementos donde cada posición tiene un tipo específico.",
      },
      {
        text: "Un array que solo puede contener números",
        example: `// ❌ Las tuplas pueden contener cualquier tipo
    let numeros: [number, number] = [1, 2];  // ✅ Válido
    let mixto: [string, number] = ["texto", 42];  // ✅ Válido
    let complejo: [string, number, boolean] = ["Juan", 25, true];  // ✅ Válido
    
    // No son solo para números
    let punto3D: [number, number, number] = [1, 2, 3];  // ✅ Válido`,
        explanation:
          "Las tuplas pueden contener cualquier tipo de valor, no solo números.",
      },
      {
        text: "Un objeto con propiedades fijas",
        example: `// ❌ Las tuplas son arrays, no objetos
    interface Punto {
      x: number;
      y: number;
    }
    
    let puntoObj: Punto = { x: 0, y: 0 };  // Objeto
    let puntoTpl: [number, number] = [0, 0];  // Tupla
    
    // Acceso diferente
    puntoObj.x;  // Propiedad
    puntoTpl[0]; // Índice`,
        explanation:
          "Las tuplas son arrays con tipos específicos por posición, no objetos con propiedades.",
      },
      {
        text: "Un tipo que solo funciona en tiempo de compilación",
        example: `// ❌ Las tuplas afectan el runtime
    function distancia(p1: [number, number], p2: [number, number]): number {
      const dx = p2[0] - p1[0];  // ✅ Funciona en runtime
      const dy = p2[1] - p1[1];  // ✅ Funciona en runtime
      return Math.sqrt(dx * dx + dy * dy);
    }
    
    // Las tuplas mantienen su estructura en runtime
    let punto: [number, number] = [3, 4];
    console.log(punto[0]);  // 3
    console.log(punto[1]);  // 4`,
        explanation:
          "Las tuplas afectan tanto al tiempo de compilación como al runtime, manteniendo su estructura y tipos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Una tupla en TypeScript es un array con un número fijo de elementos donde cada posición tiene un tipo específico. Son útiles para representar datos estructurados donde el orden y tipo de cada elemento es importante, como coordenadas (x, y) o datos de usuario (nombre, edad, activo).",
    difficulty: "basic",
  },
  {
    id: 12,
    question: "¿Qué es una intersección de tipos en TypeScript?",
    options: [
      {
        text: "Un tipo que combina múltiples tipos en uno",
        example: `// ✅ Intersección de tipos
    type Usuario = {
      nombre: string;
      edad: number;
    };
    
    type Empleado = {
      salario: number;
      departamento: string;
    };
    
    // Intersección
    type UsuarioEmpleado = Usuario & Empleado;
    
    // Uso
    const juan: UsuarioEmpleado = {
      nombre: "Juan",
      edad: 25,
      salario: 50000,
      departamento: "TI"
    };`,
        explanation:
          "Las intersecciones combinan múltiples tipos en uno, requiriendo que el valor cumpla con todos los tipos combinados.",
      },
      {
        text: "Un tipo que solo puede ser uno de varios tipos",
        example: `// ❌ Esto es una unión, no una intersección
    type Id = string | number;  // Unión
    
    // Intersección correcta
    type Usuario = { nombre: string } & { edad: number };
    
    // El valor debe tener ambas propiedades
    const juan: Usuario = {
      nombre: "Juan",
      edad: 25
    };`,
        explanation:
          "Las intersecciones requieren que el valor cumpla con todos los tipos, no que sea uno de varios.",
      },
      {
        text: "Un tipo que solo funciona con interfaces",
        example: `// ❌ Las intersecciones funcionan con cualquier tipo
    type Nombre = string;
    type Edad = number;
    
    // Intersección con tipos primitivos
    type Usuario = Nombre & Edad;  // ❌ Error: no tiene sentido
    
    // Intersección con objetos
    type Punto = { x: number } & { y: number };  // ✅ Válido`,
        explanation:
          "Las intersecciones funcionan mejor con tipos de objeto, no con tipos primitivos.",
      },
      {
        text: "Un tipo que solo funciona en tiempo de compilación",
        example: `// ❌ Las intersecciones afectan el runtime
    type Usuario = { nombre: string } & { edad: number };
    
    const juan: Usuario = {
      nombre: "Juan",
      edad: 25
    };
    
    // Las propiedades están disponibles en runtime
    console.log(juan.nombre);  // "Juan"
    console.log(juan.edad);    // 25`,
        explanation:
          "Las intersecciones afectan tanto al tiempo de compilación como al runtime, combinando las propiedades de los tipos.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Una intersección de tipos en TypeScript combina múltiples tipos en uno, requiriendo que el valor cumpla con todos los tipos combinados. Se crea usando el operador & entre los tipos. Es útil para combinar interfaces o tipos de objeto.",
    difficulty: "basic",
  },
  {
    id: 13,
    question: "¿Qué es una clase abstracta en TypeScript?",
    options: [
      {
        text: "Una clase que no puede ser instanciada directamente",
        example: `// ✅ Clase abstracta
    abstract class Animal {
      abstract hacerSonido(): void;
      
      mover(): void {
        console.log("El animal se mueve");
      }
    }
    
    // Subclase
    class Perro extends Animal {
      hacerSonido(): void {
        console.log("Guau!");
      }
    }
    
    // Uso
    const perro = new Perro();
    perro.hacerSonido();  // "Guau!"
    perro.mover();        // "El animal se mueve"`,
        explanation:
          "Las clases abstractas son plantillas para otras clases y no pueden ser instanciadas directamente.",
      },
      {
        text: "Una clase que no puede tener métodos",
        example: `// ❌ Las clases abstractas pueden tener métodos
    abstract class Figura {
      abstract area(): number;  // Método abstracto
      
      // Método concreto
      describir(): string {
        return "Esta es una figura";
      }
    }
    
    class Circulo extends Figura {
      radio: number;
      
      area(): number {
        return Math.PI * this.radio ** 2;
      }
    }`,
        explanation:
          "Las clases abstractas pueden tener tanto métodos abstractos como métodos concretos.",
      },
      {
        text: "Una clase que no puede ser extendida",
        example: `// ❌ Las clases abstractas están diseñadas para ser extendidas
    abstract class Animal {
      abstract hacerSonido(): void;
    }
    
    class Perro extends Animal {
      hacerSonido(): void {
        console.log("Guau!");
      }
    }
    
    class Gato extends Animal {
      hacerSonido(): void {
        console.log("Miau!");
      }
    }`,
        explanation:
          "Las clases abstractas están diseñadas específicamente para ser extendidas por otras clases.",
      },
      {
        text: "Una clase que solo funciona en tiempo de compilación",
        example: `// ❌ Las clases abstractas afectan el runtime
    abstract class Animal {
      abstract hacerSonido(): void;
    }
    
    class Perro extends Animal {
      hacerSonido(): void {
        console.log("Guau!");
      }
    }
    
    const perro = new Perro();
    perro.hacerSonido();  // "Guau!" (funciona en runtime)`,
        explanation:
          "Las clases abstractas afectan tanto al tiempo de compilación como al runtime, proporcionando una estructura base para las subclases.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Una clase abstracta en TypeScript es una clase que no puede ser instanciada directamente y está diseñada para ser extendida por otras clases. Puede contener métodos abstractos (sin implementación) y métodos concretos (con implementación).",
    difficulty: "basic",
  },
  {
    id: 14,
    question: "¿Qué son los modificadores de acceso en TypeScript?",
    options: [
      {
        text: "Palabras clave que controlan la visibilidad de miembros de clase",
        example: `// ✅ Modificadores de acceso
    class Usuario {
      public nombre: string;      // Accesible desde cualquier lugar
      private edad: number;       // Solo accesible dentro de la clase
      protected salario: number;  // Accesible en la clase y subclases
      
      constructor(nombre: string, edad: number, salario: number) {
        this.nombre = nombre;
        this.edad = edad;
        this.salario = salario;
      }
    }
    
    class Empleado extends Usuario {
      mostrarSalario() {
        console.log(this.salario);  // ✅ Accesible en subclase
        // console.log(this.edad);  // ❌ Error: private
      }
    }`,
        explanation:
          "Los modificadores de acceso controlan desde dónde se puede acceder a los miembros de una clase.",
      },
      {
        text: "Palabras clave que controlan el rendimiento",
        example: `// ❌ Los modificadores no afectan el rendimiento
    class Ejemplo {
      public metodo1() { /* ... */ }  // No es más rápido
      private metodo2() { /* ... */ } // No es más lento
      
      // El rendimiento depende de la implementación
      // no de los modificadores
    }`,
        explanation:
          "Los modificadores de acceso controlan la visibilidad, no el rendimiento.",
      },
      {
        text: "Palabras clave que solo funcionan con interfaces",
        example: `// ❌ Los modificadores funcionan con clases
    interface Usuario {
      nombre: string;    // No se pueden usar modificadores
      edad: number;
    }
    
    class UsuarioImpl {
      private nombre: string;  // ✅ Válido en clases
      protected edad: number;
    }`,
        explanation:
          "Los modificadores de acceso solo se pueden usar en clases, no en interfaces.",
      },
      {
        text: "Palabras clave que solo funcionan en tiempo de compilación",
        example: `// ❌ Los modificadores afectan el runtime
    class Usuario {
      private nombre: string;
      
      constructor(nombre: string) {
        this.nombre = nombre;
      }
      
      mostrarNombre() {
        console.log(this.nombre);  // ✅ Funciona en runtime
      }
    }
    
    const usuario = new Usuario("Juan");
    // usuario.nombre = "Pedro";  // ❌ Error en runtime`,
        explanation:
          "Los modificadores de acceso afectan tanto al tiempo de compilación como al runtime, controlando el acceso a los miembros.",
      },
    ],
    correctAnswer: 0,
    explanation:
      "Los modificadores de acceso en TypeScript son palabras clave que controlan la visibilidad de los miembros de una clase. Los principales son: public (accesible desde cualquier lugar), private (solo accesible dentro de la clase) y protected (accesible en la clase y sus subclases).",
    difficulty: "basic",
  },
  {
    id: 15,
    question: "¿Qué es un tipo literal en TypeScript?",
    options: [
      {
        text: "Un tipo que representa un valor específico",
        example: `// ✅ Tipos literales
    type Direccion = "norte" | "sur" | "este" | "oeste";
    type Estado = "activo" | "inactivo" | "pendiente";
    type NumeroUno = 1;
    
    // Uso
    let direccion: Direccion = "norte";  // ✅ Válido
    // direccion = "centro";  // ❌ Error
    
    let estado: Estado = "activo";  // ✅ Válido
    // estado = "desconocido";  // ❌ Error
    
    let uno: NumeroUno = 1;  // ✅ Válido
    // uno = 2;  // ❌ Error`,
        explanation:
          "Los tipos literales permiten especificar valores exactos que una variable puede tener.",
      },
      {
        text: "Un tipo que solo puede ser string",
        example: `// ❌ Los tipos literales pueden ser de varios tipos
    type Direccion = "norte" | "sur";  // ✅ String literal
    type Numero = 1 | 2 | 3;          // ✅ Number literal
    type Booleano = true | false;     // ✅ Boolean literal
    
    // También se pueden combinar
    type Mixto = "texto" | 42 | true;`,
        explanation:
          "Los tipos literales pueden ser strings, numbers, booleans o combinaciones de estos.",
      },
      {
        text: "Un tipo que solo funciona con constantes",
        example: `// ❌ Los tipos literales funcionan con variables
    let direccion: "norte" | "sur" = "norte";  // ✅ Válido
    direccion = "sur";  // ✅ Válido
    
    const PI: 3.14159 = 3.14159;  // ✅ Válido
    // PI = 3.14;  // ❌ Error`,
        explanation:
          "Los tipos literales funcionan tanto con variables como con constantes.",
      },
      {
        text: "Un tipo que solo funciona en tiempo de compilación",
        example: `// ❌ Los tipos literales afectan el runtime
    type Estado = "activo" | "inactivo";
    
    function cambiarEstado(estado: Estado) {
      console.log(estado);  // ✅ Funciona en runtime
    }
    
    cambiarEstado("activo");  // "activo"`,
        explanation:
          "Los tipos literales afectan tanto al tiempo de compilación como al runtime, restringiendo los valores posibles.",
      },
    ],
    correctAnswer: 0,
    explanation:
      'Un tipo literal en TypeScript es un tipo que representa un valor específico. Puede ser un string literal (como "norte" | "sur"), un number literal (como 1 | 2 | 3) o un boolean literal (true | false). Son útiles para restringir los valores posibles de una variable.',
    difficulty: "basic",
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
