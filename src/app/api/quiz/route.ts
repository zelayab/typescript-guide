import { NextResponse } from 'next/server'

interface QuizQuestion {
  id: number
  question: string
  options: Array<{
    text: string
    example: string
    explanation: string
  }>
  correctAnswer: number
  explanation: string
  difficulty: 'basic' | 'intermediate' | 'advanced' | 'expert' | 'super'
}

// Base de preguntas por dificultad
const quizQuestions: Record<string, QuizQuestion[]> = {
  basic: [
    {
      id: 1,
      question: '¿Cuál es el tipo de dato más básico en TypeScript?',
      options: [
        {
          text: 'string',
          example: 'let nombre: string = "TypeScript";',
          explanation: 'string es un tipo básico que representa texto'
        },
        {
          text: 'number',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'boolean',
          example: 'let activo: boolean = true;',
          explanation: 'boolean es un tipo básico para valores verdadero/falso'
        },
        {
          text: 'any',
          example: 'let cualquiera: any = "esto puede ser cualquier cosa";',
          explanation: 'any no es un tipo básico, deshabilita el sistema de tipos'
        }
      ],
      correctAnswer: 0,
      explanation: 'El tipo string es uno de los tipos más básicos en TypeScript, usado para representar datos textuales.',
      difficulty: 'basic'
    },
    {
      id: 2,
      question: '¿Qué significa la palabra clave "type" en TypeScript?',
      options: [
        {
          text: 'Es solo una palabra reservada sin uso',
          example: '// Esto no hace nada\ntype;',
          explanation: 'La palabra type no puede usarse sola, necesita definir un tipo'
        },
        {
          text: 'Define un nuevo tipo de dato',
          example: 'type Punto = {\n  x: number;\n  y: number;\n};',
          explanation: 'type se usa para crear alias de tipos personalizados'
        },
        {
          text: 'Es un alias para "interface"',
          example: 'interface Punto {\n  x: number;\n  y: number;\n}',
          explanation: 'interface es diferente de type, aunque pueden tener usos similares'
        },
        {
          text: 'Declara una variable',
          example: 'let tipo = "string";',
          explanation: 'Para declarar variables se usan let, const o var, no type'
        }
      ],
      correctAnswer: 1,
      explanation: 'La palabra clave "type" se usa para definir un nuevo tipo de dato o un alias de tipo en TypeScript.',
      difficulty: 'basic'
    },
    {
      id: 3,
      question: '¿Cómo se declara una variable con tipo explícito en TypeScript?',
      options: [
        {
          text: 'var nombre: string',
          example: 'var nombre: string = "TypeScript";',
          explanation: 'var es una palabra clave para declarar variables'
        },
        {
          text: 'let nombre = string',
          example: 'let nombre = "TypeScript";',
          explanation: 'let es una palabra clave para declarar variables'
        },
        {
          text: 'const nombre as string',
          example: 'const nombre: string = "TypeScript";',
          explanation: 'const es una palabra clave para declarar variables'
        },
        {
          text: 'string nombre = ""',
          example: 'let nombre: string = "";',
          explanation: 'string es un tipo básico para texto'
        }
      ],
      correctAnswer: 0,
      explanation: 'En TypeScript, se declara una variable con tipo explícito usando los dos puntos (:) seguido del tipo.',
      difficulty: 'basic'
    },
    {
      id: 4,
      question: '¿Qué es el tipo "any" en TypeScript?',
      options: [
        {
          text: 'Un tipo que solo acepta números',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Un tipo que deshabilita la verificación de tipos',
          example: 'let cualquiera: any = "esto puede ser cualquier cosa";',
          explanation: 'any no es un tipo básico, deshabilita el sistema de tipos'
        },
        {
          text: 'Un tipo que solo acepta strings',
          example: 'let nombre: string = "TypeScript";',
          explanation: 'string es un tipo básico para texto'
        },
        {
          text: 'Un tipo que no permite null',
          example: 'let cualquiera: any = "esto puede ser cualquier cosa";',
          explanation: 'any no es un tipo básico, deshabilita el sistema de tipos'
        }
      ],
      correctAnswer: 1,
      explanation: 'El tipo "any" deshabilita la verificación de tipos, permitiendo que la variable acepte cualquier tipo de valor.',
      difficulty: 'basic'
    },
    {
      id: 5,
      question: '¿Cuál es la diferencia entre "interface" y "type"?',
      options: [
        {
          text: 'No hay diferencia, son exactamente lo mismo',
          example: 'interface Punto {\n  x: number;\n  y: number;\n}',
          explanation: 'interface es diferente de type, aunque pueden tener usos similares'
        },
        {
          text: 'Interface solo funciona con clases',
          example: 'interface Punto {\n  x: number;\n  y: number;\n}',
          explanation: 'interface es diferente de type, aunque pueden tener usos similares'
        },
        {
          text: 'Type puede unir o intersecar tipos, interface no',
          example: 'type Union = number | string;\ninterface Interseccion = number & string;',
          explanation: 'type puede crear uniones e intersecciones de tipos, mientras que interface está diseñado principalmente para definir formas de objetos.'
        },
        {
          text: 'Interface se puede extender, type no',
          example: 'interface Punto {\n  x: number;\n  y: number;\n}\ninterface Derivada extends Punto {}\n// Esto es válido',
          explanation: 'Una interface puede extender otra interface para heredar sus propiedades y métodos usando la palabra clave extends.'
        }
      ],
      correctAnswer: 2,
      explanation: 'Aunque similares, type puede crear uniones e intersecciones de tipos, mientras que interface está diseñado principalmente para definir formas de objetos.',
      difficulty: 'basic'
    },
    {
      id: 6,
      question: '¿Qué es la inferencia de tipos en TypeScript?',
      options: [
        {
          text: 'Cuando TypeScript adivina el tipo de una variable',
          example: 'let nombre = "TypeScript";',
          explanation: 'TypeScript puede inferir el tipo de una variable basándose en su valor inicial'
        },
        {
          text: 'Cuando el programador especifica el tipo',
          example: 'let nombre: string = "TypeScript";',
          explanation: 'El programador puede especificar el tipo de una variable'
        },
        {
          text: 'Cuando se usa el tipo any',
          example: 'let cualquiera: any = "esto puede ser cualquier cosa";',
          explanation: 'any no es un tipo básico, deshabilita el sistema de tipos'
        },
        {
          text: 'Cuando se usa una interface',
          example: 'interface Punto {\n  x: number;\n  y: number;\n}',
          explanation: 'Una interface puede definir un tipo para acceder a sus propiedades usando índices'
        }
      ],
      correctAnswer: 0,
      explanation: 'La inferencia de tipos es cuando TypeScript determina automáticamente el tipo de una variable basándose en su valor inicial.',
      difficulty: 'basic'
    },
    {
      id: 7,
      question: '¿Cómo se define un array de números en TypeScript?',
      options: [
        {
          text: 'array<number>',
          example: 'let numeros: number[] = [1, 2, 3];',
          explanation: 'array<number> es una sintaxis para definir un array de números'
        },
        {
          text: 'number[]',
          example: 'let numeros: number[] = [1, 2, 3];',
          explanation: 'number[] es una sintaxis para definir un array de números'
        },
        {
          text: 'Array[number]',
          example: 'let numeros: Array<number> = [1, 2, 3];',
          explanation: 'Array<number> es una sintaxis para definir un array de números'
        },
        {
          text: 'numbers[]',
          example: 'let numeros: number[] = [1, 2, 3];',
          explanation: 'number[] es una sintaxis para definir un array de números'
        }
      ],
      correctAnswer: 1,
      explanation: 'Un array de números se puede definir usando la sintaxis number[] o Array<number>.',
      difficulty: 'basic'
    },
    {
      id: 8,
      question: '¿Qué es una tupla en TypeScript?',
      options: [
        {
          text: 'Un array de longitud fija con tipos específicos para cada posición',
          example: 'let punto: [number, number] = [3, 4];',
          explanation: 'Una tupla es un array con un número fijo de elementos donde cada elemento puede tener un tipo específico'
        },
        {
          text: 'Un objeto con propiedades fijas',
          example: 'let punto = { x: 3, y: 4 };',
          explanation: 'Un objeto con propiedades fijas no es una tupla'
        },
        {
          text: 'Un tipo de dato numérico',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Un array de longitud variable',
          example: 'let numeros: number[] = [1, 2, 3];',
          explanation: 'Un array de longitud variable no es una tupla'
        }
      ],
      correctAnswer: 0,
      explanation: 'Una tupla es un array con un número fijo de elementos donde cada elemento puede tener un tipo específico.',
      difficulty: 'basic'
    },
    {
      id: 9,
      question: '¿Qué significa el tipo "void" en TypeScript?',
      options: [
        {
          text: 'Una función que retorna null',
          example: 'function saludar(): void {\n  console.log("Hola");\n}',
          explanation: 'void se usa para indicar que una función no retorna ningún valor'
        },
        {
          text: 'Una función que no retorna valor',
          example: 'function saludar(): void {\n  console.log("Hola");\n}',
          explanation: 'void se usa para indicar que una función no retorna ningún valor'
        },
        {
          text: 'Una función que retorna undefined',
          example: 'function saludar(): void {\n  console.log("Hola");\n}',
          explanation: 'void se usa para indicar que una función no retorna ningún valor'
        },
        {
          text: 'Una función que retorna cualquier valor',
          example: 'function saludar(): void {\n  console.log("Hola");\n}',
          explanation: 'void se usa para indicar que una función no retorna ningún valor'
        }
      ],
      correctAnswer: 0,
      explanation: 'void se usa para indicar que una función no retorna ningún valor.',
      difficulty: 'basic'
    },
    {
      id: 10,
      question: '¿Cómo se define un objeto literal en TypeScript?',
      options: [
        {
          text: '{ nombre: string; edad: number }',
          example: 'let persona = { nombre: "Juan", edad: 25 };',
          explanation: 'Los objetos literales en TypeScript se definen usando llaves y especificando los tipos de sus propiedades'
        },
        {
          text: 'object{ nombre, edad }',
          example: 'let persona = { nombre: "Juan", edad: 25 };',
          explanation: 'object{ nombre, edad } no es una sintaxis válida para definir objetos literales'
        },
        {
          text: 'Object<nombre, edad>',
          example: 'let persona = { nombre: "Juan", edad: 25 };',
          explanation: 'Object<nombre, edad> no es una sintaxis válida para definir objetos literales'
        },
        {
          text: 'type{ nombre: string, edad: number }',
          example: 'let persona = { nombre: "Juan", edad: 25 };',
          explanation: 'type{ nombre: string, edad: number } no es una sintaxis válida para definir objetos literales'
        }
      ],
      correctAnswer: 0,
      explanation: 'Los objetos literales en TypeScript se definen usando llaves y especificando los tipos de sus propiedades.',
      difficulty: 'basic'
    }
  ],
  intermediate: [
    {
      id: 11,
      question: '¿Qué es una unión de tipos en TypeScript?',
      options: [
        {
          text: 'Una suma de tipos',
          example: 'let union: number | string = 42;',
          explanation: 'number | string es una unión de tipos'
        },
        {
          text: 'Un tipo que puede ser uno de varios tipos especificados',
          example: 'let union: number | string = 42;',
          explanation: 'number | string es una unión de tipos'
        },
        {
          text: 'Una multiplicación de tipos',
          example: 'let producto: number = 42;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Un tipo que debe cumplir todos los tipos especificados',
          example: 'let interseccion: number & string = "TypeScript";',
          explanation: 'number & string es una intersección de tipos'
        }
      ],
      correctAnswer: 1,
      explanation: 'Una unión de tipos (usando el operador |) permite que un valor sea de uno de varios tipos especificados.',
      difficulty: 'intermediate'
    },
    {
      id: 12,
      question: '¿Qué es una intersección de tipos?',
      options: [
        {
          text: 'Un tipo que combina múltiples tipos en uno',
          example: 'let persona: { nombre: string; edad: number } = { nombre: "Juan", edad: 25 };',
          explanation: 'El tipo persona es una intersección de tipos'
        },
        {
          text: 'Un tipo que excluye otros tipos',
          example: 'let persona: { nombre: string; edad: number } = { nombre: "Juan", edad: 25 };',
          explanation: 'El tipo persona no excluye otros tipos'
        },
        {
          text: 'Un tipo que divide otros tipos',
          example: 'let persona: { nombre: string; edad: number } = { nombre: "Juan", edad: 25 };',
          explanation: 'El tipo persona no divide otros tipos'
        },
        {
          text: 'Un tipo que resta propiedades de otros tipos',
          example: 'let persona: { nombre: string; edad: number } = { nombre: "Juan", edad: 25 };',
          explanation: 'El tipo persona no resta propiedades de otros tipos'
        }
      ],
      correctAnswer: 0,
      explanation: 'Una intersección de tipos (usando el operador &) combina múltiples tipos en uno solo que tiene todas las propiedades de los tipos combinados.',
      difficulty: 'intermediate'
    },
    {
      id: 13,
      question: '¿Qué es un tipo genérico en TypeScript?',
      options: [
        {
          text: 'Un tipo que solo acepta números',
          example: 'let numeros: number[] = [1, 2, 3];',
          explanation: 'number[] es una sintaxis para definir un array de números'
        },
        {
          text: 'Un tipo que puede trabajar con diferentes tipos de datos',
          example: 'let cualquiera: any = "esto puede ser cualquier cosa";',
          explanation: 'any no es un tipo básico, deshabilita el sistema de tipos'
        },
        {
          text: 'Un tipo específico para strings',
          example: 'let nombre: string = "TypeScript";',
          explanation: 'string es un tipo básico para texto'
        },
        {
          text: 'Un tipo que solo funciona con arrays',
          example: 'let numeros: number[] = [1, 2, 3];',
          explanation: 'number[] es una sintaxis para definir un array de números'
        }
      ],
      correctAnswer: 1,
      explanation: 'Los tipos genéricos permiten escribir código que puede trabajar con múltiples tipos de datos mientras mantiene la seguridad de tipos.',
      difficulty: 'intermediate'
    },
    {
      id: 14,
      question: '¿Qué es un type guard en TypeScript?',
      options: [
        {
          text: 'Una función que previene errores',
          example: 'function esNumero(valor: any): valor is number {\n  return typeof valor === "number";\n}',
          explanation: 'Un type guard es una función que realiza una comprobación de tipo en tiempo de ejecución'
        },
        {
          text: 'Una función que verifica tipos en tiempo de ejecución',
          example: 'function esNumero(valor: any): valor is number {\n  return typeof valor === "number";\n}',
          explanation: 'Un type guard es una función que realiza una comprobación de tipo en tiempo de ejecución'
        },
        {
          text: 'Una función que convierte tipos',
          example: 'function esNumero(valor: any): valor is number {\n  return typeof valor === "number";\n}',
          explanation: 'Un type guard no convierte tipos'
        },
        {
          text: 'Una función que valida datos',
          example: 'function esNumero(valor: any): valor is number {\n  return typeof valor === "number";\n}',
          explanation: 'Un type guard no valida datos'
        }
      ],
      correctAnswer: 1,
      explanation: 'Un type guard es una función que realiza una comprobación de tipo en tiempo de ejecución y garantiza el tipo dentro de un bloque de código.',
      difficulty: 'intermediate'
    },
    {
      id: 15,
      question: '¿Qué es un tipo literal en TypeScript?',
      options: [
        {
          text: 'Un tipo que solo puede tener un valor específico',
          example: 'let edad: 25 = 25;',
          explanation: 'Un tipo literal representa un valor específico y exacto'
        },
        {
          text: 'Un tipo que acepta cualquier string',
          example: 'let nombre: string = "TypeScript";',
          explanation: 'string es un tipo básico para texto'
        },
        {
          text: 'Un tipo que solo acepta números',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Un tipo que representa objetos',
          example: 'let persona = { nombre: "Juan", edad: 25 };',
          explanation: 'Un objeto literal es un tipo que representa un objeto'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un tipo literal es un tipo que representa un valor específico y exacto, como "success" o 42.',
      difficulty: 'intermediate'
    },
    {
      id: 26,
      question: '¿Qué es una función genérica en TypeScript?',
      options: [
        {
          text: 'Una función que solo acepta números',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Una función que puede trabajar con diferentes tipos de datos',
          example: 'let cualquiera: any = "esto puede ser cualquier cosa";',
          explanation: 'any no es un tipo básico, deshabilita el sistema de tipos'
        },
        {
          text: 'Una función que no tiene parámetros',
          example: 'function saludar() {\n  console.log("Hola");\n}',
          explanation: 'Una función genérica puede tener parámetros'
        },
        {
          text: 'Una función que solo retorna void',
          example: 'function saludar(): void {\n  console.log("Hola");\n}',
          explanation: 'Una función genérica puede retornar cualquier tipo de dato'
        }
      ],
      correctAnswer: 1,
      explanation: 'Una función genérica permite trabajar con diferentes tipos de datos mientras mantiene la seguridad de tipos en tiempo de compilación.',
      difficulty: 'intermediate'
    },
    {
      id: 27,
      question: '¿Qué es el operador keyof en TypeScript?',
      options: [
        {
          text: 'Un operador que retorna las claves de un objeto como tipo',
          example: 'let persona: { nombre: string; edad: number } = { nombre: "Juan", edad: 25 };\nlet claves: keyof typeof persona;',
          explanation: 'keyof es un operador que toma un tipo de objeto y produce un tipo unión de sus claves'
        },
        {
          text: 'Un operador que crea nuevas claves',
          example: 'let persona: { nombre: string; edad: number } = { nombre: "Juan", edad: 25 };\nlet claves: keyof typeof persona;',
          explanation: 'keyof no crea nuevas claves'
        },
        {
          text: 'Un operador que elimina claves de un objeto',
          example: 'let persona: { nombre: string; edad: number } = { nombre: "Juan", edad: 25 };\nlet claves: keyof typeof persona;',
          explanation: 'keyof no elimina claves'
        },
        {
          text: 'Un operador que compara claves',
          example: 'let persona: { nombre: string; edad: number } = { nombre: "Juan", edad: 25 };\nlet claves: keyof typeof persona;',
          explanation: 'keyof no compara claves'
        }
      ],
      correctAnswer: 0,
      explanation: 'keyof es un operador que toma un tipo de objeto y produce un tipo unión de sus claves.',
      difficulty: 'intermediate'
    },
    {
      id: 28,
      question: '¿Qué es una clase abstracta en TypeScript?',
      options: [
        {
          text: 'Una clase que no puede ser instanciada directamente',
          example: 'abstract class Animal {}\nlet animal = new Animal(); // Error: no se puede instanciar una clase abstracta',
          explanation: 'Una clase abstracta no puede ser instanciada directamente'
        },
        {
          text: 'Una clase sin métodos',
          example: 'abstract class Animal {}\nlet animal = new Animal(); // Error: no se puede instanciar una clase abstracta',
          explanation: 'Una clase abstracta puede tener métodos'
        },
        {
          text: 'Una clase sin propiedades',
          example: 'abstract class Animal {}\nlet animal = new Animal(); // Error: no se puede instanciar una clase abstracta',
          explanation: 'Una clase abstracta puede tener propiedades'
        },
        {
          text: 'Una clase que solo tiene constructores',
          example: 'abstract class Animal {}\nlet animal = new Animal(); // Error: no se puede instanciar una clase abstracta',
          explanation: 'Una clase abstracta puede tener constructores'
        }
      ],
      correctAnswer: 0,
      explanation: 'Una clase abstracta es una clase base que no puede ser instanciada directamente y puede contener métodos abstractos que deben ser implementados por las clases derivadas.',
      difficulty: 'intermediate'
    },
    {
      id: 29,
      question: '¿Qué es el modificador readonly en TypeScript?',
      options: [
        {
          text: 'Una propiedad que solo puede ser leída',
          example: 'let persona: { readonly nombre: string; edad: number } = { nombre: "Juan", edad: 25 };',
          explanation: 'readonly hace que una propiedad solo pueda ser asignada cuando se inicializa el objeto'
        },
        {
          text: 'Una propiedad que no existe',
          example: 'let persona: { readonly nombre: string; edad: number } = { nombre: "Juan", edad: 25 };',
          explanation: 'readonly es una palabra clave que existe'
        },
        {
          text: 'Una propiedad que puede cambiar',
          example: 'let persona: { readonly nombre: string; edad: number } = { nombre: "Juan", edad: 25 };',
          explanation: 'readonly hace que una propiedad no se puede cambiar'
        },
        {
          text: 'Una propiedad privada',
          example: 'let persona: { readonly nombre: string; edad: number } = { nombre: "Juan", edad: 25 };',
          explanation: 'readonly no es una palabra clave para definir una propiedad privada'
        }
      ],
      correctAnswer: 0,
      explanation: 'readonly es un modificador que hace que una propiedad solo pueda ser asignada cuando se inicializa el objeto.',
      difficulty: 'intermediate'
    },
    {
      id: 30,
      question: '¿Qué son los parámetros opcionales en TypeScript?',
      options: [
        {
          text: 'Parámetros que pueden ser omitidos al llamar una función',
          example: 'function saludar(nombre?: string) {\n  console.log("Hola", nombre);\n}',
          explanation: 'Los parámetros opcionales se marcan con ? y pueden ser omitidos al llamar a una función'
        },
        {
          text: 'Parámetros que deben ser siempre null',
          example: 'function saludar(nombre: string | null) {\n  console.log("Hola", nombre);\n}',
          explanation: 'null no es un tipo válido para parámetros opcionales'
        },
        {
          text: 'Parámetros que no tienen tipo',
          example: 'function saludar(nombre?: string) {\n  console.log("Hola", nombre);\n}',
          explanation: 'Los parámetros opcionales deben tener un tipo'
        },
        {
          text: 'Parámetros que son siempre string',
          example: 'function saludar(nombre?: string) {\n  console.log("Hola", nombre);\n}',
          explanation: 'Los parámetros opcionales no necesitan ser string'
        }
      ],
      correctAnswer: 0,
      explanation: 'Los parámetros opcionales se marcan con ? y pueden ser omitidos al llamar a una función.',
      difficulty: 'intermediate'
    },
    {
      id: 31,
      question: '¿Qué es una interface indexable en TypeScript?',
      options: [
        {
          text: 'Una interface que permite acceder a sus propiedades usando índices',
          example: 'let persona: { [key: string]: string } = { nombre: "Juan", edad: "25" };',
          explanation: 'Una interface indexable define un tipo para acceder a sus propiedades usando índices'
        },
        {
          text: 'Una interface que solo funciona con números',
          example: 'let edad: number = 25;',
          explanation: 'Una interface no puede ser indexada con números'
        },
        {
          text: 'Una interface sin propiedades',
          example: 'let persona: { [key: string]: string } = { nombre: "Juan", edad: "25" };',
          explanation: 'Una interface indexable puede tener propiedades'
        },
        {
          text: 'Una interface que no se puede implementar',
          example: 'let persona: { [key: string]: string } = { nombre: "Juan", edad: "25" };',
          explanation: 'Una interface indexable se puede implementar'
        }
      ],
      correctAnswer: 0,
      explanation: 'Una interface indexable define un tipo para acceder a sus propiedades usando índices, como [key: string]: string.',
      difficulty: 'intermediate'
    },
    {
      id: 32,
      question: '¿Qué es el modificador protected en TypeScript?',
      options: [
        {
          text: 'Un modificador que permite acceso desde la clase y sus derivadas',
          example: 'class Animal {\n  protected nombre: string;\n}\nlet animal = new Animal();\nconsole.log(animal.nombre);',
          explanation: 'protected permite acceder a una propiedad o método desde la clase que lo define y sus clases derivadas'
        },
        {
          text: 'Un modificador que hace la propiedad pública',
          example: 'class Animal {\n  protected nombre: string;\n}\nlet animal = new Animal();\nconsole.log(animal.nombre);',
          explanation: 'protected no hace la propiedad pública'
        },
        {
          text: 'Un modificador que hace la propiedad privada',
          example: 'class Animal {\n  protected nombre: string;\n}\nlet animal = new Animal();\nconsole.log(animal.nombre);',
          explanation: 'protected no hace la propiedad privada'
        },
        {
          text: 'Un modificador que elimina la propiedad',
          example: 'class Animal {\n  protected nombre: string;\n}\nlet animal = new Animal();\nconsole.log(animal.nombre);',
          explanation: 'protected no elimina la propiedad'
        }
      ],
      correctAnswer: 0,
      explanation: 'protected permite acceder a una propiedad o método desde la clase que lo define y sus clases derivadas.',
      difficulty: 'intermediate'
    },
    {
      id: 33,
      question: '¿Qué es un tipo de unión discriminada?',
      options: [
        {
          text: 'Una unión de tipos con una propiedad común que identifica el tipo',
          example: 'let union: number | string = 42;',
          explanation: 'number | string es una unión de tipos'
        },
        {
          text: 'Una unión simple de tipos',
          example: 'let union: number | string = 42;',
          explanation: 'number | string es una unión de tipos'
        },
        {
          text: 'Una intersección de tipos',
          example: 'let interseccion: number & string = "TypeScript";',
          explanation: 'number & string es una intersección de tipos'
        },
        {
          text: 'Un tipo que no puede ser unido',
          example: 'let union: number | string = 42;',
          explanation: 'number | string es una unión de tipos'
        }
      ],
      correctAnswer: 0,
      explanation: 'Una unión discriminada es una unión de tipos donde cada miembro tiene una propiedad común que ayuda a TypeScript a identificar el tipo específico.',
      difficulty: 'intermediate'
    },
    {
      id: 34,
      question: '¿Qué es el operador typeof en TypeScript?',
      options: [
        {
          text: 'Un operador que obtiene el tipo de una variable o propiedad',
          example: 'let edad: number = 25;\ntypeof edad;',
          explanation: 'typeof en TypeScript puede usarse para obtener el tipo de una variable o propiedad en tiempo de compilación'
        },
        {
          text: 'Un operador que cambia el tipo',
          example: 'let edad: number = 25;\ntypeof edad;',
          explanation: 'typeof no cambia el tipo'
        },
        {
          text: 'Un operador que compara valores',
          example: 'let edad: number = 25;\ntypeof edad;',
          explanation: 'typeof no compara valores'
        },
        {
          text: 'Un operador que crea nuevos tipos',
          example: 'let edad: number = 25;\ntypeof edad;',
          explanation: 'typeof no crea nuevos tipos'
        }
      ],
      correctAnswer: 0,
      explanation: 'typeof en TypeScript puede usarse para obtener el tipo de una variable o propiedad en tiempo de compilación.',
      difficulty: 'intermediate'
    },
    {
      id: 35,
      question: '¿Qué es una función sobrecargada en TypeScript?',
      options: [
        {
          text: 'Una función con múltiples firmas de tipo',
          example: 'function saludar(nombre: string): void;\nfunction saludar(edad: number): void;\nfunction saludar(nombre: string | number): void;',
          explanation: 'Una función sobrecargada tiene múltiples firmas de tipo que permiten llamarla con diferentes tipos o números de argumentos'
        },
        {
          text: 'Una función que no retorna nada',
          example: 'function saludar(nombre: string): void;\nfunction saludar(edad: number): void;\nfunction saludar(nombre: string | number): void;',
          explanation: 'Una función sobrecargada puede retornar cualquier tipo de dato'
        },
        {
          text: 'Una función que solo acepta números',
          example: 'function saludar(nombre: string): void;\nfunction saludar(edad: number): void;\nfunction saludar(nombre: string | number): void;',
          explanation: 'Una función sobrecargada puede aceptar diferentes tipos de argumentos'
        },
        {
          text: 'Una función que causa errores',
          example: 'function saludar(nombre: string): void;\nfunction saludar(edad: number): void;\nfunction saludar(nombre: string | number): void;',
          explanation: 'Una función sobrecargada no causa errores'
        }
      ],
      correctAnswer: 0,
      explanation: 'Una función sobrecargada tiene múltiples firmas de tipo que permiten llamarla con diferentes tipos o números de argumentos.',
      difficulty: 'intermediate'
    },
    {
      id: 36,
      question: '¿Qué es el modificador abstract en TypeScript?',
      options: [
        {
          text: 'Un modificador para métodos que deben ser implementados en clases derivadas',
          example: 'abstract class Animal {}\nlet animal = new Animal(); // Error: no se puede instanciar una clase abstracta',
          explanation: 'abstract se usa para declarar métodos en una clase abstracta que deben ser implementados por las clases que la extienden'
        },
        {
          text: 'Un modificador que hace el método privado',
          example: 'abstract class Animal {}\nlet animal = new Animal(); // Error: no se puede instanciar una clase abstracta',
          explanation: 'abstract no hace el método privado'
        },
        {
          text: 'Un modificador que elimina el método',
          example: 'abstract class Animal {}\nlet animal = new Animal(); // Error: no se puede instanciar una clase abstracta',
          explanation: 'abstract no elimina el método'
        },
        {
          text: 'Un modificador que hace el método público',
          example: 'abstract class Animal {}\nlet animal = new Animal(); // Error: no se puede instanciar una clase abstracta',
          explanation: 'abstract no hace el método público'
        }
      ],
      correctAnswer: 0,
      explanation: 'abstract se usa para declarar métodos en una clase abstracta que deben ser implementados por las clases que la extienden.',
      difficulty: 'intermediate'
    },
    {
      id: 37,
      question: '¿Qué es una interface extendida en TypeScript?',
      options: [
        {
          text: 'Una interface que hereda propiedades de otra interface',
          example: 'interface Animal {\n  nombre: string;\n}\ninterface Perro extends Animal {\n  raza: string;\n}',
          explanation: 'Una interface puede extender otra interface para heredar sus propiedades y métodos usando la palabra clave extends'
        },
        {
          text: 'Una interface sin propiedades',
          example: 'interface Animal {\n  nombre: string;\n}\ninterface Perro extends Animal {\n  raza: string;\n}',
          explanation: 'Una interface sin propiedades no puede extender otra interface'
        },
        {
          text: 'Una interface que no se puede implementar',
          example: 'interface Animal {\n  nombre: string;\n}\ninterface Perro extends Animal {\n  raza: string;\n}',
          explanation: 'Una interface que no se puede implementar no puede extender otra interface'
        },
        {
          text: 'Una interface que solo tiene métodos',
          example: 'interface Animal {\n  nombre: string;\n}\ninterface Perro extends Animal {\n  raza: string;\n}',
          explanation: 'Una interface que solo tiene métodos no puede extender otra interface'
        }
      ],
      correctAnswer: 0,
      explanation: 'Una interface puede extender otra interface para heredar sus propiedades y métodos usando la palabra clave extends.',
      difficulty: 'intermediate'
    },
    {
      id: 38,
      question: '¿Qué es un tipo de utilidad Pick en TypeScript?',
      options: [
        {
          text: 'Un tipo que selecciona ciertas propiedades de un tipo',
          example: 'let persona: { nombre: string; edad: number } = { nombre: "Juan", edad: 25 };\nlet nombreYedad: Pick<typeof persona, "nombre" | "edad"> = persona;',
          explanation: 'Pick es un tipo de utilidad que permite crear un nuevo tipo seleccionando un subconjunto de propiedades de un tipo existente'
        },
        {
          text: 'Un tipo que elimina propiedades',
          example: 'let persona: { nombre: string; edad: number } = { nombre: "Juan", edad: 25 };\nlet nombreYedad: Pick<typeof persona, "nombre" | "edad"> = persona;',
          explanation: 'Pick no elimina propiedades'
        },
        {
          text: 'Un tipo que agrega propiedades',
          example: 'let persona: { nombre: string; edad: number } = { nombre: "Juan", edad: 25 };\nlet nombreYedad: Pick<typeof persona, "nombre" | "edad"> = persona;',
          explanation: 'Pick no agrega propiedades'
        },
        {
          text: 'Un tipo que modifica propiedades',
          example: 'let persona: { nombre: string; edad: number } = { nombre: "Juan", edad: 25 };\nlet nombreYedad: Pick<typeof persona, "nombre" | "edad"> = persona;',
          explanation: 'Pick no modifica propiedades'
        }
      ],
      correctAnswer: 0,
      explanation: 'Pick es un tipo de utilidad que permite crear un nuevo tipo seleccionando un subconjunto de propiedades de un tipo existente.',
      difficulty: 'intermediate'
    },
    {
      id: 39,
      question: '¿Qué es un tipo de utilidad Partial en TypeScript?',
      options: [
        {
          text: 'Un tipo que hace todas las propiedades opcionales',
          example: 'let persona: Partial<{ nombre: string; edad: number }> = { nombre: "Juan" };',
          explanation: 'Partial hace que todas las propiedades de un tipo sean opcionales'
        },
        {
          text: 'Un tipo que elimina propiedades',
          example: 'let persona: Partial<{ nombre: string; edad: number }> = { nombre: "Juan" };',
          explanation: 'Partial no elimina propiedades'
        },
        {
          text: 'Un tipo que hace las propiedades requeridas',
          example: 'let persona: Partial<{ nombre: string; edad: number }> = { nombre: "Juan" };',
          explanation: 'Partial no hace las propiedades requeridas'
        },
        {
          text: 'Un tipo que agrega propiedades',
          example: 'let persona: Partial<{ nombre: string; edad: number }> = { nombre: "Juan" };',
          explanation: 'Partial no agrega propiedades'
        }
      ],
      correctAnswer: 0,
      explanation: 'Partial es un tipo de utilidad que hace que todas las propiedades de un tipo sean opcionales.',
      difficulty: 'intermediate'
    },
    {
      id: 40,
      question: '¿Qué es un tipo de utilidad Record en TypeScript?',
      options: [
        {
          text: 'Un tipo que crea un objeto con claves y valores específicos',
          example: 'let persona: Record<string, string> = { nombre: "Juan", edad: "25" };',
          explanation: 'Record es un tipo de utilidad que crea un tipo objeto con claves de un tipo y valores de otro tipo'
        },
        {
          text: 'Un tipo que solo almacena números',
          example: 'let edad: number = 25;',
          explanation: 'Record no almacena solo números'
        },
        {
          text: 'Un tipo que solo almacena strings',
          example: 'let nombre: string = "TypeScript";',
          explanation: 'Record no almacena solo strings'
        },
        {
          text: 'Un tipo que elimina propiedades',
          example: 'let persona: Record<string, string> = { nombre: "Juan", edad: "25" };',
          explanation: 'Record no elimina propiedades'
        }
      ],
      correctAnswer: 0,
      explanation: 'Record es un tipo de utilidad que crea un tipo objeto con claves de un tipo y valores de otro tipo.',
      difficulty: 'intermediate'
    }
  ],
  advanced: [
    {
      id: 16,
      question: '¿Qué es un tipo condicional en TypeScript?',
      options: [
        {
          text: 'Un tipo que siempre es verdadero',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Un tipo que depende de una condición if/else',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Los tipos condicionales permiten definir un tipo basado en una condición que se evalúa en tiempo de compilación'
        },
        {
          text: 'Un tipo que se evalúa en tiempo de compilación basado en otros tipos',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Los tipos condicionales permiten definir un tipo basado en una condición que se evalúa en tiempo de compilación'
        },
        {
          text: 'Un tipo que solo funciona con booleanos',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Los tipos condicionales no solo funcionan con booleanos'
        }
      ],
      correctAnswer: 2,
      explanation: 'Los tipos condicionales permiten definir un tipo basado en una condición que se evalúa en tiempo de compilación, similar a un operador ternario.',
      difficulty: 'advanced'
    },
    {
      id: 17,
      question: '¿Qué hace el modificador "infer" en TypeScript?',
      options: [
        {
          text: 'Infiere automáticamente todos los tipos',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'El modificador "infer" se usa dentro de tipos condicionales para inferir y capturar tipos que coinciden con un patrón'
        },
        {
          text: 'Permite inferir un tipo dentro de un tipo condicional',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'El modificador "infer" se usa dentro de tipos condicionales para inferir y capturar tipos que coinciden con un patrón'
        },
        {
          text: 'Es un alias para "any"',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'El modificador "infer" no es un alias para "any"'
        },
        {
          text: 'Previene la inferencia de tipos',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'El modificador "infer" no previene la inferencia de tipos'
        }
      ],
      correctAnswer: 1,
      explanation: 'El modificador "infer" se usa dentro de tipos condicionales para inferir y capturar tipos que coinciden con un patrón.',
      difficulty: 'advanced'
    },
    {
      id: 18,
      question: '¿Qué es un tipo recursivo en TypeScript?',
      options: [
        {
          text: 'Un tipo que se repite infinitamente',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Los tipos recursivos no se repiten infinitamente'
        },
        {
          text: 'Un tipo que se referencia a sí mismo en su definición',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Los tipos recursivos se refieren a sí mismos en su definición'
        },
        {
          text: 'Un tipo que solo funciona con bucles',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Los tipos recursivos no solo funcionan con bucles'
        },
        {
          text: 'Un tipo que causa errores de compilación',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Los tipos recursivos no causan errores de compilación'
        }
      ],
      correctAnswer: 1,
      explanation: 'Un tipo recursivo es aquel que se utiliza a sí mismo en su propia definición, útil para estructuras de datos como árboles o listas enlazadas.',
      difficulty: 'advanced'
    },
    {
      id: 19,
      question: '¿Qué es un tipo "unknown" en TypeScript?',
      options: [
        {
          text: 'Similar a any pero más seguro',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'unknown es similar a any pero más seguro'
        },
        {
          text: 'Un tipo que no existe',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'unknown es un tipo válido'
        },
        {
          text: 'Un tipo que causa errores',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'unknown no causa errores'
        },
        {
          text: 'Un tipo sin restricciones',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'unknown no tiene restricciones'
        }
      ],
      correctAnswer: 0,
      explanation: 'unknown es similar a any pero más seguro, ya que requiere verificación de tipo antes de realizar operaciones con el valor.',
      difficulty: 'advanced'
    },
    {
      id: 20,
      question: '¿Qué son los tipos indexados en TypeScript?',
      options: [
        {
          text: 'Tipos que solo funcionan con arrays',
          example: 'let numeros: number[] = [1, 2, 3];',
          explanation: 'number[] es una sintaxis para definir un array de números'
        },
        {
          text: 'Tipos que permiten acceder a tipos anidados usando índices',
          example: 'let persona: { [key: string]: string } = { nombre: "Juan", edad: "25" };',
          explanation: 'Los tipos indexados permiten acceder a tipos anidados dentro de otros tipos usando la sintaxis T["propiedad"]'
        },
        {
          text: 'Tipos que representan números',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Tipos que solo funcionan con objetos',
          example: 'let persona: { [key: string]: string } = { nombre: "Juan", edad: "25" };',
          explanation: 'Los tipos indexados no solo funcionan con objetos'
        }
      ],
      correctAnswer: 1,
      explanation: 'Los tipos indexados permiten acceder a tipos anidados dentro de otros tipos usando la sintaxis T["propiedad"].',
      difficulty: 'advanced'
    },
    {
      id: 41,
      question: '¿Qué es un tipo condicional distributivo en TypeScript?',
      options: [
        {
          text: 'Un tipo que distribuye una condición sobre una unión',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo condicional distributivo aplica una condición a cada miembro de una unión de tipos automáticamente'
        },
        {
          text: 'Un tipo que solo funciona con números',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo condicional distributivo no solo funciona con números'
        },
        {
          text: 'Un tipo que no puede ser distribuido',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo condicional distributivo puede ser distribuido'
        },
        {
          text: 'Un tipo que causa errores',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo condicional distributivo no causa errores'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un tipo condicional distributivo aplica una condición a cada miembro de una unión de tipos automáticamente.',
      difficulty: 'advanced'
    },
    {
      id: 42,
      question: '¿Qué es un tipo de utilidad Exclude en TypeScript?',
      options: [
        {
          text: 'Un tipo que excluye tipos de una unión',
          example: 'let union: number | string = 42;\nlet soloNumeros: Exclude<typeof union, string> = union as Exclude<typeof union, string>;',
          explanation: 'Exclude es un tipo de utilidad que crea un tipo excluyendo de una unión los tipos que son asignables a otro tipo'
        },
        {
          text: 'Un tipo que incluye tipos',
          example: 'let union: number | string = 42;\nlet soloNumeros: Exclude<typeof union, string> = union as Exclude<typeof union, string>;',
          explanation: 'Exclude no incluye tipos'
        },
        {
          text: 'Un tipo que modifica tipos',
          example: 'let union: number | string = 42;\nlet soloNumeros: Exclude<typeof union, string> = union as Exclude<typeof union, string>;',
          explanation: 'Exclude no modifica tipos'
        },
        {
          text: 'Un tipo que combina tipos',
          example: 'let union: number | string = 42;\nlet soloNumeros: Exclude<typeof union, string> = union as Exclude<typeof union, string>;',
          explanation: 'Exclude no combina tipos'
        }
      ],
      correctAnswer: 0,
      explanation: 'Exclude es un tipo de utilidad que crea un tipo excluyendo de una unión los tipos que son asignables a otro tipo.',
      difficulty: 'advanced'
    },
    {
      id: 43,
      question: '¿Qué es un tipo de utilidad Extract en TypeScript?',
      options: [
        {
          text: 'Un tipo que extrae tipos asignables de una unión',
          example: 'let union: number | string = 42;\nlet soloNumeros: Extract<typeof union, number> = union as Extract<typeof union, number>;',
          explanation: 'Extract es un tipo de utilidad que crea un tipo extrayendo de una unión los tipos que son asignables a otro tipo'
        },
        {
          text: 'Un tipo que elimina tipos',
          example: 'let union: number | string = 42;\nlet soloNumeros: Extract<typeof union, number> = union as Extract<typeof union, number>;',
          explanation: 'Extract no elimina tipos'
        },
        {
          text: 'Un tipo que modifica tipos',
          example: 'let union: number | string = 42;\nlet soloNumeros: Extract<typeof union, number> = union as Extract<typeof union, number>;',
          explanation: 'Extract no modifica tipos'
        },
        {
          text: 'Un tipo que combina tipos',
          example: 'let union: number | string = 42;\nlet soloNumeros: Extract<typeof union, number> = union as Extract<typeof union, number>;',
          explanation: 'Extract no combina tipos'
        }
      ],
      correctAnswer: 0,
      explanation: 'Extract es un tipo de utilidad que crea un tipo extrayendo de una unión los tipos que son asignables a otro tipo.',
      difficulty: 'advanced'
    },
    {
      id: 44,
      question: '¿Qué es un tipo de utilidad NonNullable en TypeScript?',
      options: [
        {
          text: 'Un tipo que excluye null y undefined de un tipo',
          example: 'let edad: number | null = 25;\nlet edadNoNull: NonNullable<typeof edad> = edad as NonNullable<typeof edad>;',
          explanation: 'NonNullable crea un tipo excluyendo null y undefined del tipo original'
        },
        {
          text: 'Un tipo que solo acepta null',
          example: 'let edad: number | null = 25;\nlet edadNoNull: NonNullable<typeof edad> = edad as NonNullable<typeof edad>;',
          explanation: 'NonNullable no solo acepta null'
        },
        {
          text: 'Un tipo que solo acepta undefined',
          example: 'let edad: number | undefined = 25;\nlet edadNoNull: NonNullable<typeof edad> = edad as NonNullable<typeof edad>;',
          explanation: 'NonNullable no solo acepta undefined'
        },
        {
          text: 'Un tipo que acepta cualquier valor',
          example: 'let edad: number | null = 25;\nlet edadNoNull: NonNullable<typeof edad> = edad as NonNullable<typeof edad>;',
          explanation: 'NonNullable no acepta cualquier valor'
        }
      ],
      correctAnswer: 0,
      explanation: 'NonNullable es un tipo de utilidad que crea un tipo excluyendo null y undefined del tipo original.',
      difficulty: 'advanced'
    },
    {
      id: 45,
      question: '¿Qué es un tipo de utilidad Parameters en TypeScript?',
      options: [
        {
          text: 'Un tipo que extrae los tipos de parámetros de una función',
          example: 'function saludar(nombre: string, edad: number): void;\nlet parametros: Parameters<typeof saludar> = ["Juan", 25];',
          explanation: 'Parameters es un tipo de utilidad que extrae los tipos de los parámetros de un tipo función como una tupla'
        },
        {
          text: 'Un tipo que modifica parámetros',
          example: 'function saludar(nombre: string, edad: number): void;\nlet parametros: Parameters<typeof saludar> = ["Juan", 25];',
          explanation: 'Parameters no modifica parámetros'
        },
        {
          text: 'Un tipo que elimina parámetros',
          example: 'function saludar(nombre: string, edad: number): void;\nlet parametros: Parameters<typeof saludar> = ["Juan", 25];',
          explanation: 'Parameters no elimina parámetros'
        },
        {
          text: 'Un tipo que agrega parámetros',
          example: 'function saludar(nombre: string, edad: number): void;\nlet parametros: Parameters<typeof saludar> = ["Juan", 25];',
          explanation: 'Parameters no agrega parámetros'
        }
      ],
      correctAnswer: 0,
      explanation: 'Parameters es un tipo de utilidad que extrae los tipos de los parámetros de un tipo función como una tupla.',
      difficulty: 'advanced'
    },
    {
      id: 46,
      question: '¿Qué es un tipo de utilidad ConstructorParameters en TypeScript?',
      options: [
        {
          text: 'Un tipo que extrae los tipos de parámetros del constructor',
          example: 'class Persona {\n  constructor(public nombre: string, public edad: number) {}\nlet parametros: ConstructorParameters<typeof Persona> = ["Juan", 25];',
          explanation: 'ConstructorParameters es un tipo de utilidad que extrae los tipos de los parámetros del constructor de un tipo clase'
        },
        {
          text: 'Un tipo que modifica constructores',
          example: 'class Persona {\n  constructor(public nombre: string, public edad: number) {}\nlet parametros: ConstructorParameters<typeof Persona> = ["Juan", 25];',
          explanation: 'ConstructorParameters no modifica constructores'
        },
        {
          text: 'Un tipo que elimina constructores',
          example: 'class Persona {\n  constructor(public nombre: string, public edad: number) {}\nlet parametros: ConstructorParameters<typeof Persona> = ["Juan", 25];',
          explanation: 'ConstructorParameters no elimina constructores'
        },
        {
          text: 'Un tipo que agrega constructores',
          example: 'class Persona {\n  constructor(public nombre: string, public edad: number) {}\nlet parametros: ConstructorParameters<typeof Persona> = ["Juan", 25];',
          explanation: 'ConstructorParameters no agrega constructores'
        }
      ],
      correctAnswer: 0,
      explanation: 'ConstructorParameters es un tipo de utilidad que extrae los tipos de los parámetros del constructor de un tipo clase.',
      difficulty: 'advanced'
    },
    {
      id: 47,
      question: '¿Qué es un tipo de utilidad ReturnType en TypeScript?',
      options: [
        {
          text: 'Un tipo que extrae el tipo de retorno de una función',
          example: 'function saludar(): string {\n  return "Hola";\n}\ntypeof saludar;',
          explanation: 'ReturnType es un tipo de utilidad que extrae el tipo de retorno de un tipo función'
        },
        {
          text: 'Un tipo que modifica el retorno',
          example: 'function saludar(): string {\n  return "Hola";\n}\ntypeof saludar;',
          explanation: 'ReturnType no modifica el retorno'
        },
        {
          text: 'Un tipo que elimina el retorno',
          example: 'function saludar(): string {\n  return "Hola";\n}\ntypeof saludar;',
          explanation: 'ReturnType no elimina el retorno'
        },
        {
          text: 'Un tipo que agrega retorno',
          example: 'function saludar(): string {\n  return "Hola";\n}\ntypeof saludar;',
          explanation: 'ReturnType no agrega retorno'
        }
      ],
      correctAnswer: 0,
      explanation: 'ReturnType es un tipo de utilidad que extrae el tipo de retorno de un tipo función.',
      difficulty: 'advanced'
    },
    {
      id: 48,
      question: '¿Qué es un tipo de utilidad InstanceType en TypeScript?',
      options: [
        {
          text: 'Un tipo que extrae el tipo de instancia de un constructor',
          example: 'class Persona {\n  constructor(public nombre: string, public edad: number) {}\nlet instancia: InstanceType<typeof Persona> = new Persona("Juan", 25);',
          explanation: 'InstanceType es un tipo de utilidad que extrae el tipo de instancia de un tipo constructor'
        },
        {
          text: 'Un tipo que modifica instancias',
          example: 'class Persona {\n  constructor(public nombre: string, public edad: number) {}\nlet instancia: InstanceType<typeof Persona> = new Persona("Juan", 25);',
          explanation: 'InstanceType no modifica instancias'
        },
        {
          text: 'Un tipo que elimina instancias',
          example: 'class Persona {\n  constructor(public nombre: string, public edad: number) {}\nlet instancia: InstanceType<typeof Persona> = new Persona("Juan", 25);',
          explanation: 'InstanceType no elimina instancias'
        },
        {
          text: 'Un tipo que agrega instancias',
          example: 'class Persona {\n  constructor(public nombre: string, public edad: number) {}\nlet instancia: InstanceType<typeof Persona> = new Persona("Juan", 25);',
          explanation: 'InstanceType no agrega instancias'
        }
      ],
      correctAnswer: 0,
      explanation: 'InstanceType es un tipo de utilidad que extrae el tipo de instancia de un tipo constructor.',
      difficulty: 'advanced'
    },
    {
      id: 49,
      question: '¿Qué es un tipo de utilidad ThisType en TypeScript?',
      options: [
        {
          text: 'Un tipo que marca el tipo de this en un objeto',
          example: 'let persona = { nombre: "Juan", edad: 25, saludar() { console.log(`Hola, mi nombre es ${this.nombre}`); } };',
          explanation: 'ThisType es un tipo de utilidad que marca el tipo de this en un objeto'
        },
        {
          text: 'Un tipo que modifica this',
          example: 'let persona = { nombre: "Juan", edad: 25, saludar() { console.log(`Hola, mi nombre es ${this.nombre}`); } };',
          explanation: 'ThisType no modifica this'
        },
        {
          text: 'Un tipo que elimina this',
          example: 'let persona = { nombre: "Juan", edad: 25, saludar() { console.log(`Hola, mi nombre es ${this.nombre}`); } };',
          explanation: 'ThisType no elimina this'
        },
        {
          text: 'Un tipo que agrega this',
          example: 'let persona = { nombre: "Juan", edad: 25, saludar() { console.log(`Hola, mi nombre es ${this.nombre}`); } };',
          explanation: 'ThisType no agrega this'
        }
      ],
      correctAnswer: 0,
      explanation: 'ThisType es un tipo de utilidad que marca el tipo de this en un objeto.',
      difficulty: 'advanced'
    },
    {
      id: 50,
      question: '¿Qué es un tipo de utilidad Omit en TypeScript?',
      options: [
        {
          text: 'Un tipo que construye un tipo excluyendo propiedades',
          example: 'let persona: Omit<{ nombre: string; edad: number }, "nombre"> = { edad: 25 };',
          explanation: 'Omit es un tipo de utilidad que construye un tipo omitiendo las propiedades especificadas de un tipo'
        },
        {
          text: 'Un tipo que incluye propiedades',
          example: 'let persona: Omit<{ nombre: string; edad: number }, "nombre"> = { edad: 25 };',
          explanation: 'Omit no incluye propiedades'
        },
        {
          text: 'Un tipo que modifica propiedades',
          example: 'let persona: Omit<{ nombre: string; edad: number }, "nombre"> = { edad: 25 };',
          explanation: 'Omit no modifica propiedades'
        },
        {
          text: 'Un tipo que agrega propiedades',
          example: 'let persona: Omit<{ nombre: string; edad: number }, "nombre"> = { edad: 25 };',
          explanation: 'Omit no agrega propiedades'
        }
      ],
      correctAnswer: 0,
      explanation: 'Omit es un tipo de utilidad que construye un tipo omitiendo las propiedades especificadas de un tipo.',
      difficulty: 'advanced'
    },
    {
      id: 51,
      question: '¿Qué es un mixin en TypeScript?',
      options: [
        {
          text: 'Una forma de agregar funcionalidad a una clase',
          example: 'class Persona {\n  saludar() { console.log("Hola"); } }\nlet persona = new Persona();\npersona.saludar();',
          explanation: 'Un mixin es una forma de agregar funcionalidad a una clase usando herencia múltiple simulada'
        },
        {
          text: 'Una forma de eliminar funcionalidad',
          example: 'class Persona {\n  saludar() { console.log("Hola"); } }\nlet persona = new Persona();\npersona.saludar();',
          explanation: 'Un mixin no elimina funcionalidad'
        },
        {
          text: 'Una forma de modificar tipos',
          example: 'class Persona {\n  saludar() { console.log("Hola"); } }\nlet persona = new Persona();\npersona.saludar();',
          explanation: 'Un mixin no modifica tipos'
        },
        {
          text: 'Una forma de crear interfaces',
          example: 'class Persona {\n  saludar() { console.log("Hola"); } }\nlet persona = new Persona();\npersona.saludar();',
          explanation: 'Un mixin no crea interfaces'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un mixin es una forma de agregar funcionalidad a una clase usando herencia múltiple simulada.',
      difficulty: 'advanced'
    },
    {
      id: 52,
      question: '¿Qué es un decorador de clase en TypeScript?',
      options: [
        {
          text: 'Una función que modifica o aumenta una clase',
          example: 'class Persona {\n  @decorador\n  saludar() { console.log("Hola"); } }\nlet persona = new Persona();\npersona.saludar();',
          explanation: 'Un decorador de clase es una función que puede modificar o aumentar una definición de clase'
        },
        {
          text: 'Una función que elimina una clase',
          example: 'class Persona {\n  @decorador\n  saludar() { console.log("Hola"); } }\nlet persona = new Persona();\npersona.saludar();',
          explanation: 'Un decorador de clase no elimina una clase'
        },
        {
          text: 'Una función que crea una clase',
          example: 'class Persona {\n  @decorador\n  saludar() { console.log("Hola"); } }\nlet persona = new Persona();\npersona.saludar();',
          explanation: 'Un decorador de clase no crea una clase'
        },
        {
          text: 'Una función que convierte una clase',
          example: 'class Persona {\n  @decorador\n  saludar() { console.log("Hola"); } }\nlet persona = new Persona();\npersona.saludar();',
          explanation: 'Un decorador de clase no convierte una clase'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un decorador de clase es una función que puede modificar o aumentar una definición de clase.',
      difficulty: 'advanced'
    },
    {
      id: 53,
      question: '¿Qué es un decorador de método en TypeScript?',
      options: [
        {
          text: 'Una función que modifica o aumenta un método',
          example: 'class Persona {\n  @decorador\n  saludar() { console.log("Hola"); } }\nlet persona = new Persona();\npersona.saludar();',
          explanation: 'Un decorador de método es una función que puede modificar o aumentar un método de una clase'
        },
        {
          text: 'Una función que elimina un método',
          example: 'class Persona {\n  @decorador\n  saludar() { console.log("Hola"); } }\nlet persona = new Persona();\npersona.saludar();',
          explanation: 'Un decorador de método no elimina un método'
        },
        {
          text: 'Una función que crea un método',
          example: 'class Persona {\n  @decorador\n  saludar() { console.log("Hola"); } }\nlet persona = new Persona();\npersona.saludar();',
          explanation: 'Un decorador de método no crea un método'
        },
        {
          text: 'Una función que convierte un método',
          example: 'class Persona {\n  @decorador\n  saludar() { console.log("Hola"); } }\nlet persona = new Persona();\npersona.saludar();',
          explanation: 'Un decorador de método no convierte un método'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un decorador de método es una función que puede modificar o aumentar un método de una clase.',
      difficulty: 'advanced'
    },
    {
      id: 54,
      question: '¿Qué es un decorador de propiedad en TypeScript?',
      options: [
        {
          text: 'Una función que modifica o aumenta una propiedad',
          example: 'class Persona {\n  @decorador\n  nombre: string;\n  edad: number;\n}\nlet persona = new Persona();\nconsole.log(persona.nombre);',
          explanation: 'Un decorador de propiedad es una función que puede modificar o aumentar una propiedad de una clase'
        },
        {
          text: 'Una función que elimina una propiedad',
          example: 'class Persona {\n  @decorador\n  nombre: string;\n  edad: number;\n}\nlet persona = new Persona();\nconsole.log(persona.nombre);',
          explanation: 'Un decorador de propiedad no elimina una propiedad'
        },
        {
          text: 'Una función que crea una propiedad',
          example: 'class Persona {\n  @decorador\n  nombre: string;\n  edad: number;\n}\nlet persona = new Persona();\nconsole.log(persona.nombre);',
          explanation: 'Un decorador de propiedad no crea una propiedad'
        },
        {
          text: 'Una función que convierte una propiedad',
          example: 'class Persona {\n  @decorador\n  nombre: string;\n  edad: number;\n}\nlet persona = new Persona();\nconsole.log(persona.nombre);',
          explanation: 'Un decorador de propiedad no convierte una propiedad'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un decorador de propiedad es una función que puede modificar o aumentar una propiedad de una clase.',
      difficulty: 'advanced'
    },
    {
      id: 55,
      question: '¿Qué es un decorador de parámetro en TypeScript?',
      options: [
        {
          text: 'Una función que modifica o aumenta un parámetro',
          example: 'function saludar(nombre: string, edad: number): void;\nlet parametros: Parameters<typeof saludar> = ["Juan", 25];',
          explanation: 'Un decorador de parámetro es una función que puede modificar o aumentar un parámetro de un método'
        },
        {
          text: 'Una función que elimina un parámetro',
          example: 'function saludar(nombre: string, edad: number): void;\nlet parametros: Parameters<typeof saludar> = ["Juan", 25];',
          explanation: 'Un decorador de parámetro no elimina un parámetro'
        },
        {
          text: 'Una función que crea un parámetro',
          example: 'function saludar(nombre: string, edad: number): void;\nlet parametros: Parameters<typeof saludar> = ["Juan", 25];',
          explanation: 'Un decorador de parámetro no crea un parámetro'
        },
        {
          text: 'Una función que convierte un parámetro',
          example: 'function saludar(nombre: string, edad: number): void;\nlet parametros: Parameters<typeof saludar> = ["Juan", 25];',
          explanation: 'Un decorador de parámetro no convierte un parámetro'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un decorador de parámetro es una función que puede modificar o aumentar un parámetro de un método.',
      difficulty: 'advanced'
    }
  ],
  expert: [
    {
      id: 21,
      question: '¿Qué es un tipo "never" en TypeScript?',
      options: [
        {
          text: 'Un tipo que puede ser cualquier valor',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Un tipo que representa valores que nunca ocurren',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'El tipo "never" representa valores que nunca pueden ocurrir'
        },
        {
          text: 'Un tipo que siempre es null',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Un tipo que representa undefined',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'El tipo "never" no representa undefined'
        }
      ],
      correctAnswer: 1,
      explanation: 'El tipo "never" representa valores que nunca pueden ocurrir, como una función que siempre lanza una excepción o un loop infinito.',
      difficulty: 'expert'
    },
    {
      id: 22,
      question: '¿Qué son los tipos "mapped" en TypeScript?',
      options: [
        {
          text: 'Tipos que mapean un objeto a otro objeto',
          example: 'let persona: { nombre: string; edad: number } = { nombre: "Juan", edad: 25 };\nlet personaMapeada: { [key in keyof typeof persona]: string } = persona as { [key in keyof typeof persona]: string };',
          explanation: 'Los tipos "mapped" permiten transformar cada propiedad de un tipo existente de una manera consistente, creando un nuevo tipo'
        },
        {
          text: 'Tipos que transforman cada propiedad de un tipo de una manera consistente',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Los tipos condicionales no transforman propiedades'
        },
        {
          text: 'Tipos que convierten strings a números',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Tipos que solo funcionan con arrays',
          example: 'let numeros: number[] = [1, 2, 3];',
          explanation: 'number[] es una sintaxis para definir un array de números'
        }
      ],
      correctAnswer: 0,
      explanation: 'Los tipos "mapped" permiten transformar cada propiedad de un tipo existente de una manera consistente, creando un nuevo tipo.',
      difficulty: 'expert'
    },
    {
      id: 23,
      question: '¿Qué es un tipo "template literal" en TypeScript?',
      options: [
        {
          text: 'Un tipo que representa strings literales',
          example: 'let nombre: string = "TypeScript";',
          explanation: 'string es un tipo básico para texto'
        },
        {
          text: 'Un tipo que combina tipos literales y strings',
          example: 'let nombre: string = "TypeScript";',
          explanation: 'string es un tipo básico para texto'
        },
        {
          text: 'Un tipo que solo acepta templates',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Los tipos condicionales no son templates'
        },
        {
          text: 'Un tipo que formatea strings',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Los tipos condicionales no formatean strings'
        }
      ],
      correctAnswer: 0,
      explanation: 'Los tipos template literal permiten crear nuevos tipos de string combinando tipos literales y strings usando la sintaxis de template literals.',
      difficulty: 'expert'
    },
    {
      id: 24,
      question: '¿Qué es la utilidad "ReturnType" en TypeScript?',
      options: [
        {
          text: 'Una función que retorna tipos',
          example: 'function saludar(): string {\n  return "Hola";\n}\ntypeof saludar;',
          explanation: 'ReturnType es una utilidad que extrae el tipo de retorno de un tipo función'
        },
        {
          text: 'Un tipo que extrae el tipo de retorno de una función',
          example: 'function saludar(): string {\n  return "Hola";\n}\ntypeof saludar;',
          explanation: 'ReturnType es una utilidad que extrae el tipo de retorno de un tipo función'
        },
        {
          text: 'Una interface para tipos de retorno',
          example: 'function saludar(): string;\ntypeof saludar;',
          explanation: 'ReturnType no es una interface para tipos de retorno'
        },
        {
          text: 'Un decorador para funciones',
          example: 'function saludar(): string {\n  return "Hola";\n}\ntypeof saludar;',
          explanation: 'ReturnType no es un decorador para funciones'
        }
      ],
      correctAnswer: 1,
      explanation: 'ReturnType es una utilidad que extrae el tipo de retorno de un tipo función.',
      difficulty: 'expert'
    },
    {
      id: 25,
      question: '¿Qué es un "discriminated union" en TypeScript?',
      options: [
        {
          text: 'Una unión de tipos sin relación',
          example: 'let union: number | string = 42;',
          explanation: 'number | string es una unión de tipos'
        },
        {
          text: 'Una unión de tipos con una propiedad común que discrimina entre ellos',
          example: 'let union: number | string = 42;',
          explanation: 'number | string es una unión de tipos'
        },
        {
          text: 'Una intersección de tipos',
          example: 'let interseccion: number & string = "TypeScript";',
          explanation: 'number & string es una intersección de tipos'
        },
        {
          text: 'Un tipo que discrimina valores',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'El tipo condicional es un tipo que discrimina valores'
        }
      ],
      correctAnswer: 1,
      explanation: 'Un discriminated union es una unión de tipos donde cada miembro tiene una propiedad común (el discriminador) que permite a TypeScript determinar el tipo específico.',
      difficulty: 'expert'
    },
    {
      id: 56,
      question: '¿Qué es un tipo "branded" en TypeScript?',
      options: [
        {
          text: 'Un tipo que usa una propiedad única para diferenciarse',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo branded es un tipo que usa una propiedad única para crear tipos nominales y evitar asignaciones incorrectas'
        },
        {
          text: 'Un tipo que usa una marca registrada',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo branded no usa una marca registrada'
        },
        {
          text: 'Un tipo que no se puede modificar',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo branded se puede modificar'
        },
        {
          text: 'Un tipo que solo acepta strings',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo branded no solo acepta strings'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un tipo branded es un tipo que usa una propiedad única para crear tipos nominales y evitar asignaciones incorrectas.',
      difficulty: 'expert'
    },
    {
      id: 57,
      question: '¿Qué es un tipo "higher-kinded" en TypeScript?',
      options: [
        {
          text: 'Un tipo que toma otros tipos como parámetros',
          example: 'function saludar(nombre: string): string;\ntypeof saludar;',
          explanation: 'Un tipo higher-kinded es un tipo que puede tomar otros tipos como parámetros'
        },
        {
          text: 'Un tipo que solo acepta números',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Un tipo que no se puede modificar',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded se puede modificar'
        },
        {
          text: 'Un tipo que causa errores',
          example: 'function saludar(nombre: string): string;\ntypeof saludar;',
          explanation: 'Un tipo higher-kinded no causa errores'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un tipo higher-kinded es un tipo que puede tomar otros tipos como parámetros, similar a cómo las funciones de orden superior toman otras funciones.',
      difficulty: 'expert'
    },
    {
      id: 58,
      question: '¿Qué es un tipo "variadic tuple" en TypeScript?',
      options: [
        {
          text: 'Una tupla que puede tener un número variable de elementos',
          example: 'let numeros: number[] = [1, 2, 3];',
          explanation: 'number[] es una sintaxis para definir un array de números'
        },
        {
          text: 'Una tupla que solo acepta números',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Una tupla que no se puede modificar',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no se puede modificar'
        },
        {
          text: 'Una tupla que causa errores',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no causa errores'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un tipo variadic tuple permite crear tuplas con un número variable de elementos usando el operador spread.',
      difficulty: 'expert'
    },
    {
      id: 59,
      question: '¿Qué es un tipo "recursive conditional" en TypeScript?',
      options: [
        {
          text: 'Un tipo condicional que se refiere a sí mismo',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo condicional que se refiere a sí mismo en su definición'
        },
        {
          text: 'Un tipo que solo acepta números',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Un tipo que no se puede modificar',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no se puede modificar'
        },
        {
          text: 'Un tipo que causa errores',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no causa errores'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un tipo recursive conditional es un tipo condicional que se refiere a sí mismo en su definición.',
      difficulty: 'expert'
    },
    {
      id: 60,
      question: '¿Qué es un tipo "template literal" en TypeScript?',
      options: [
        {
          text: 'Un tipo que permite crear nuevos tipos string usando template literals',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo template literal permite crear nuevos tipos string usando la sintaxis de template literals'
        },
        {
          text: 'Un tipo que solo acepta números',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Un tipo que no se puede modificar',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no se puede modificar'
        },
        {
          text: 'Un tipo que causa errores',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no causa errores'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un tipo template literal permite crear nuevos tipos string usando la sintaxis de template literals.',
      difficulty: 'expert'
    },
    {
      id: 61,
      question: '¿Qué es un tipo "distributive conditional" en TypeScript?',
      options: [
        {
          text: 'Un tipo condicional que se distribuye sobre una unión',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo condicional que se distribuye sobre una unión'
        },
        {
          text: 'Un tipo que solo acepta números',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Un tipo que no se puede modificar',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no se puede modificar'
        },
        {
          text: 'Un tipo que causa errores',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no causa errores'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un tipo distributive conditional es un tipo condicional que se aplica a cada miembro de una unión de tipos.',
      difficulty: 'expert'
    },
    {
      id: 62,
      question: '¿Qué es un tipo "mapped tuple" en TypeScript?',
      options: [
        {
          text: 'Un tipo que mapea cada elemento de una tupla',
          example: 'let numeros: number[] = [1, 2, 3];\nlet numerosMapeada: { [key in keyof typeof numeros]: number } = numeros as { [key in keyof typeof numeros]: number };',
          explanation: 'Un tipo mapped tuple permite transformar cada elemento de una tupla de manera consistente'
        },
        {
          text: 'Un tipo que solo acepta números',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Un tipo que no se puede modificar',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no se puede modificar'
        },
        {
          text: 'Un tipo que causa errores',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no causa errores'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un tipo mapped tuple permite transformar cada elemento de una tupla de manera consistente.',
      difficulty: 'expert'
    },
    {
      id: 63,
      question: '¿Qué es un tipo "variadic union" en TypeScript?',
      options: [
        {
          text: 'Una unión que puede tener un número variable de miembros',
          example: 'let union: number | string = 42;',
          explanation: 'number | string es una unión de tipos'
        },
        {
          text: 'Una unión que solo acepta números',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Una unión que no se puede modificar',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no se puede modificar'
        },
        {
          text: 'Una unión que causa errores',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no causa errores'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un tipo variadic union permite crear uniones con un número variable de miembros usando el operador spread.',
      difficulty: 'expert'
    },
    {
      id: 64,
      question: '¿Qué es un tipo "recursive mapped" en TypeScript?',
      options: [
        {
          text: 'Un tipo mapped que se aplica recursivamente',
          example: 'let persona: { nombre: string; edad: number } = { nombre: "Juan", edad: 25 };\nlet personaMapeada: { [key in keyof typeof persona]: string } = persona as { [key in keyof typeof persona]: string };',
          explanation: 'Un tipo recursive mapped es un tipo mapped que se aplica recursivamente a todas las propiedades anidadas'
        },
        {
          text: 'Un tipo que solo acepta números',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Un tipo que no se puede modificar',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no se puede modificar'
        },
        {
          text: 'Un tipo que causa errores',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no causa errores'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un tipo recursive mapped es un tipo mapped que se aplica recursivamente a todas las propiedades anidadas.',
      difficulty: 'expert'
    },
    {
      id: 65,
      question: '¿Qué es un tipo "template literal union" en TypeScript?',
      options: [
        {
          text: 'Una unión de tipos template literal',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo template literal union es una unión de tipos que se crea usando template literals'
        },
        {
          text: 'Un tipo que solo acepta números',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Un tipo que no se puede modificar',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no se puede modificar'
        },
        {
          text: 'Un tipo que causa errores',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no causa errores'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un tipo template literal union es una unión de tipos que se crea usando template literals.',
      difficulty: 'expert'
    },
    {
      id: 66,
      question: '¿Qué es un tipo "conditional exclusion" en TypeScript?',
      options: [
        {
          text: 'Un tipo que excluye tipos basado en una condición',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo conditional exclusion permite excluir tipos de una unión basado en una condición'
        },
        {
          text: 'Un tipo que solo acepta números',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Un tipo que no se puede modificar',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no se puede modificar'
        },
        {
          text: 'Un tipo que causa errores',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no causa errores'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un tipo conditional exclusion permite excluir tipos de una unión basado en una condición.',
      difficulty: 'expert'
    },
    {
      id: 67,
      question: '¿Qué es un tipo "recursive template literal" en TypeScript?',
      options: [
        {
          text: 'Un tipo template literal que se refiere a sí mismo',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo recursive template literal es un tipo template literal que se refiere a sí mismo en su definición'
        },
        {
          text: 'Un tipo que solo acepta números',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Un tipo que no se puede modificar',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no se puede modificar'
        },
        {
          text: 'Un tipo que causa errores',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no causa errores'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un tipo recursive template literal es un tipo template literal que se refiere a sí mismo en su definición.',
      difficulty: 'expert'
    },
    {
      id: 68,
      question: '¿Qué es un tipo "higher-order type" en TypeScript?',
      options: [
        {
          text: 'Un tipo que opera sobre otros tipos',
          example: 'function saludar(nombre: string): string;\ntypeof saludar;',
          explanation: 'Un tipo higher-order es un tipo que puede operar sobre otros tipos'
        },
        {
          text: 'Un tipo que solo acepta números',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Un tipo que no se puede modificar',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded se puede modificar'
        },
        {
          text: 'Un tipo que causa errores',
          example: 'function saludar(nombre: string): string;\ntypeof saludar;',
          explanation: 'Un tipo higher-kinded no causa errores'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un tipo higher-order es un tipo que puede operar sobre otros tipos, similar a las funciones de orden superior.',
      difficulty: 'expert'
    },
    {
      id: 69,
      question: '¿Qué es un tipo "type-level computation" en TypeScript?',
      options: [
        {
          text: 'Un cálculo realizado con tipos en tiempo de compilación',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un type-level computation es un cálculo que se realiza con tipos en tiempo de compilación'
        },
        {
          text: 'Un tipo que solo acepta números',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Un tipo que no se puede modificar',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no se puede modificar'
        },
        {
          text: 'Un tipo que causa errores',
          example: 'function saludar(nombre: string): string;\ntypeof saludar;',
          explanation: 'Un tipo higher-kinded no causa errores'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un type-level computation es un cálculo que se realiza con tipos en tiempo de compilación.',
      difficulty: 'expert'
    },
    {
      id: 70,
      question: '¿Qué es un tipo "type-level recursion" en TypeScript?',
      options: [
        {
          text: 'Una recursión que opera sobre tipos',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un type-level recursion es una forma de recursión que opera sobre tipos en tiempo de compilación'
        },
        {
          text: 'Un tipo que solo acepta números',
          example: 'let edad: number = 25;',
          explanation: 'number es un tipo básico para números'
        },
        {
          text: 'Un tipo que no se puede modificar',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un tipo higher-kinded no se puede modificar'
        },
        {
          text: 'Un tipo que causa errores',
          example: 'function saludar(nombre: string): string;\ntypeof saludar;',
          explanation: 'Un tipo higher-kinded no causa errores'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un type-level recursion es una forma de recursión que opera sobre tipos en tiempo de compilación.',
      difficulty: 'expert'
    }
  ],
  super: [
    {
      id: 71,
      question: '¿Qué es un tipo "Covariant" en TypeScript?',
      options: [
        {
          text: 'Un tipo que preserva la relación de subtipo en la misma dirección',
          example: 'interface Animal { nombre: string }\ninterface Perro extends Animal { raza: string }\n// Covarianza en arrays\nlet animales: Animal[] = [];\nlet perros: Perro[] = [];\nanimales = perros; // Válido porque Perro es subtipo de Animal',
          explanation: 'La covarianza preserva la dirección de la relación de subtipo, permitiendo que un tipo más específico sea asignado a uno más general'
        },
        {
          text: 'Un tipo que invierte la relación de subtipo',
          example: 'interface Animal { nombre: string }\ninterface Perro extends Animal { raza: string }\nlet animales: Animal[] = [];\nlet perros: Perro[] = [];\nperros = animales; // Error: no todos los animales son perros',
          explanation: 'Esto sería contravarianza, no covarianza'
        },
        {
          text: 'Un tipo que no permite herencia',
          example: 'type TipoFinal = { readonly prop: string };\n// No se puede extender un type literal',
          explanation: 'Esto es un tipo sellado, no tiene que ver con covarianza'
        },
        {
          text: 'Un tipo que solo funciona con interfaces',
          example: 'interface Base {}\ninterface Derivada extends Base {}\n// La covarianza no está limitada a interfaces',
          explanation: 'La covarianza funciona con cualquier tipo que tenga una relación de subtipo'
        }
      ],
      correctAnswer: 0,
      explanation: 'La covarianza preserva la dirección de la relación de subtipo, permitiendo que un tipo más específico sea asignado a uno más general.',
      difficulty: 'super'
    },
    {
      id: 72,
      question: '¿Qué es un tipo "Contravariant" en TypeScript?',
      options: [
        {
          text: 'Un tipo que invierte la relación de subtipo',
          example: 'interface Animal { nombre: string }\ninterface Perro extends Animal { raza: string }\nlet animales: Animal[] = [];\nlet perros: Perro[] = [];\nperros = animales; // Error: no todos los animales son perros',
          explanation: 'La contravarianza invierte la dirección de la relación de subtipo, permitiendo asignar un tipo más general a uno más específico'
        },
        {
          text: 'Un tipo que preserva la relación de subtipo',
          example: 'interface Animal { nombre: string }\ninterface Perro extends Animal { raza: string }\nlet animales: Animal[] = [];\nlet perros: Perro[] = [];\nperros = animales; // Error: no todos los animales son perros',
          explanation: 'Esto sería covarianza, no contravarianza'
        },
        {
          text: 'Un tipo que elimina la herencia',
          example: 'interface Animal { nombre: string }\ninterface Perro extends Animal { raza: string }\nlet animales: Animal[] = [];\nlet perros: Perro[] = [];\nperros = animales; // Error: no todos los animales son perros',
          explanation: 'La contravarianza no elimina la herencia'
        },
        {
          text: 'Un tipo que solo funciona con clases',
          example: 'interface Animal { nombre: string }\ninterface Perro extends Animal { raza: string }\nlet animales: Animal[] = [];\nlet perros: Perro[] = [];\nperros = animales; // Error: no todos los animales son perros',
          explanation: 'La contravarianza no funciona solo con clases'
        }
      ],
      correctAnswer: 0,
      explanation: 'La contravarianza invierte la dirección de la relación de subtipo, permitiendo asignar un tipo más general a uno más específico.',
      difficulty: 'super'
    },
    {
      id: 73,
      question: '¿Qué es un "Type-Level Programming" en TypeScript?',
      options: [
        {
          text: 'Programación que opera exclusivamente con tipos en tiempo de compilación',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Type-Level Programming permite realizar operaciones y cálculos complejos usando el sistema de tipos de TypeScript durante la compilación'
        },
        {
          text: 'Programación orientada a objetos',
          example: 'class Persona {\n  saludar() { console.log("Hola"); } }\nlet persona = new Persona();\npersona.saludar();',
          explanation: 'Type-Level Programming no es programación orientada a objetos'
        },
        {
          text: 'Programación funcional',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Type-Level Programming no es programación funcional'
        },
        {
          text: 'Programación asíncrona',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Type-Level Programming no es programación asíncrona'
        }
      ],
      correctAnswer: 0,
      explanation: 'Type-Level Programming permite realizar operaciones y cálculos complejos usando el sistema de tipos de TypeScript durante la compilación.',
      difficulty: 'super'
    },
    {
      id: 74,
      question: '¿Qué es un "Phantom Type" en TypeScript?',
      options: [
        {
          text: 'Un tipo que no aparece en el valor en tiempo de ejecución',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un Phantom Type es un parámetro de tipo que no aparece en el lado derecho de la definición del tipo, usado para codificar información en el sistema de tipos'
        },
        {
          text: 'Un tipo que causa errores',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un Phantom Type no causa errores'
        },
        {
          text: 'Un tipo que solo existe en runtime',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un Phantom Type no solo existe en runtime'
        },
        {
          text: 'Un tipo que no se puede compilar',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Un Phantom Type se puede compilar'
        }
      ],
      correctAnswer: 0,
      explanation: 'Un Phantom Type es un parámetro de tipo que no aparece en el lado derecho de la definición del tipo, usado para codificar información en el sistema de tipos.',
      difficulty: 'super'
    },
    {
      id: 75,
      question: '¿Qué es "Type Narrowing" avanzado en TypeScript?',
      options: [
        {
          text: 'Técnicas para reducir el tipo de una variable usando predicados de tipo personalizados',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Type Narrowing avanzado implica crear predicados de tipo personalizados y guardias de tipo complejas para refinar tipos en situaciones específicas'
        },
        {
          text: 'Reducir el tamaño del código',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Type Narrowing avanzado no reduce el tamaño del código'
        },
        {
          text: 'Optimizar el rendimiento',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Type Narrowing avanzado no optimiza el rendimiento'
        },
        {
          text: 'Simplificar tipos complejos',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Type Narrowing avanzado no simplifica tipos complejos'
        }
      ],
      correctAnswer: 0,
      explanation: 'Type Narrowing avanzado implica crear predicados de tipo personalizados y guardias de tipo complejas para refinar tipos en situaciones específicas.',
      difficulty: 'super'
    },
    {
      id: 76,
      question: '¿Qué es un "Higher-Kinded Type Pattern" en TypeScript?',
      options: [
        {
          text: 'Un patrón para simular tipos de orden superior',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Es un patrón que simula tipos de orden superior en TypeScript, permitiendo abstracciones más poderosas a nivel de tipo'
        },
        {
          text: 'Un patrón de diseño común',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Es un patrón que simula tipos de orden superior en TypeScript, permitiendo abstracciones más poderosas a nivel de tipo'
        },
        {
          text: 'Un tipo de dato primitivo',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Es un patrón que simula tipos de orden superior en TypeScript, permitiendo abstracciones más poderosas a nivel de tipo'
        },
        {
          text: 'Una técnica de optimización',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Es un patrón que simula tipos de orden superior en TypeScript, permitiendo abstracciones más poderosas a nivel de tipo'
        }
      ],
      correctAnswer: 0,
      explanation: 'Es un patrón que simula tipos de orden superior en TypeScript, permitiendo abstracciones más poderosas a nivel de tipo.',
      difficulty: 'super'
    },
    {
      id: 77,
      question: '¿Qué es "Type-Level Arithmetic" en TypeScript?',
      options: [
        {
          text: 'Realizar operaciones matemáticas con tipos en tiempo de compilación',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Type-Level Arithmetic permite realizar operaciones matemáticas usando el sistema de tipos durante la compilación'
        },
        {
          text: 'Cálculos en runtime',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Type-Level Arithmetic no realiza cálculos en runtime'
        },
        {
          text: 'Operaciones con números',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Type-Level Arithmetic no realiza operaciones con números'
        },
        {
          text: 'Manipulación de strings',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Type-Level Arithmetic no manipula strings'
        }
      ],
      correctAnswer: 0,
      explanation: 'Type-Level Arithmetic permite realizar operaciones matemáticas usando el sistema de tipos durante la compilación.',
      difficulty: 'super'
    },
    {
      id: 78,
      question: '¿Qué es un "Dependent Type Pattern" en TypeScript?',
      options: [
        {
          text: 'Un patrón que simula tipos que dependen de valores',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Es un patrón que intenta simular tipos dependientes, donde el tipo depende de un valor, aunque TypeScript no soporte directamente tipos dependientes'
        },
        {
          text: 'Un patrón de diseño estructural',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Es un patrón que intenta simular tipos dependientes, donde el tipo depende de un valor, aunque TypeScript no soporte directamente tipos dependientes'
        },
        {
          text: 'Un tipo de dato simple',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Es un patrón que intenta simular tipos dependientes, donde el tipo depende de un valor, aunque TypeScript no soporte directamente tipos dependientes'
        },
        {
          text: 'Una técnica de optimización',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Es un patrón que intenta simular tipos dependientes, donde el tipo depende de un valor, aunque TypeScript no soporte directamente tipos dependientes'
        }
      ],
      correctAnswer: 0,
      explanation: 'Es un patrón que intenta simular tipos dependientes, donde el tipo depende de un valor, aunque TypeScript no soporte directamente tipos dependientes.',
      difficulty: 'super'
    },
    {
      id: 79,
      question: '¿Qué es "Type-Level Control Flow" en TypeScript?',
      options: [
        {
          text: 'Control de flujo a nivel de tipos durante la compilación',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Type-Level Control Flow permite implementar lógica condicional y bucles a nivel de tipos durante la compilación'
        },
        {
          text: 'Control de flujo en runtime',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Type-Level Control Flow no realiza control de flujo en runtime'
        },
        {
          text: 'Manejo de errores',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Type-Level Control Flow no maneja errores'
        },
        {
          text: 'Optimización de código',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Type-Level Control Flow no optimiza el código'
        }
      ],
      correctAnswer: 0,
      explanation: 'Type-Level Control Flow permite implementar lógica condicional y bucles a nivel de tipos durante la compilación.',
      difficulty: 'super'
    },
    {
      id: 80,
      question: '¿Qué es un "Type-Level State Machine" en TypeScript?',
      options: [
        {
          text: 'Una máquina de estados implementada a nivel de tipos',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Es una implementación de una máquina de estados finitos usando el sistema de tipos de TypeScript durante la compilación'
        },
        {
          text: 'Un patrón de diseño común',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Es una implementación de una máquina de estados finitos usando el sistema de tipos de TypeScript durante la compilación'
        },
        {
          text: 'Una estructura de datos',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Es una implementación de una máquina de estados finitos usando el sistema de tipos de TypeScript durante la compilación'
        },
        {
          text: 'Un sistema de caché',
          example: 'let edad: number = 25;\nlet tipo: string;\nif (edad > 18) {\n  tipo = "mayor de edad";\n} else {\n  tipo = "menor de edad";\n}',
          explanation: 'Es una implementación de una máquina de estados finitos usando el sistema de tipos de TypeScript durante la compilación'
        }
      ],
      correctAnswer: 0,
      explanation: 'Es una implementación de una máquina de estados finitos usando el sistema de tipos de TypeScript durante la compilación.',
      difficulty: 'super'
    }
  ]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const difficulty = searchParams.get('difficulty') as keyof typeof quizQuestions

  if (!difficulty || !quizQuestions[difficulty]) {
    return NextResponse.json(
      { error: 'Dificultad no válida' },
      { status: 400 }
    )
  }

  const questions = quizQuestions[difficulty]
  const randomIndex = Math.floor(Math.random() * questions.length)
  const question = questions[randomIndex]

  return NextResponse.json(question)
} 