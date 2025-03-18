//sacamos la validación de los errores para que al compilar el build no salga ningún error
//tsc --noEmit
//tsc --noEmit false


// Lexical this : se usa para referirse al objeto que está fuera de la función

const user = {
    name: 'John',
    sayHello: function() { // this se refiere al objeto user
        console.log(`Hello, ${this.name}!`);
    }
}

user.sayHello(); // Hello, John!


// readonly modifier: se usa para indicar que una propiedad no puede ser modificada

type Point = {
    readonly x: number;
    readonly y: number;
}

const point: Point = { x: 10, y: 20 };

//Variable assignment
// oint = { x: 30, y: 40 }; // Error: Cannot assign to 'point' because it is a constant.


//Property assignment
//point.x = 30; // Error: Cannot assign to 'x' because it is a constant.

// con el readonly modifier, no se puede asignar un nuevo valor a la variable point

// UNION TYPES: se usa para indicar que una variable puede tener más de un tipo

type StringOrNumber = string | number;

const value: StringOrNumber = "Hello";

//LITERAL TYPES: se usa para indicar que una variable tiene un valor específico
// es decir que la variable solo puede tener ese valor

type Direction = "up" | "down" | "left" | "right";

const direction: Direction = "up";

// Type Narrowing: se usa para indicar que una variable puede tener un tipo específico
// esto quiere decir que si la variable es de un tipo, entonces se puede usar como ese tipo
 class Cat {
    meow() {
        console.log("Meow");
    }
 }
 
 class Dog {
    bark() {
        console.log("Woof");
    }
 }

 type Animal4 = Cat | Dog;

 function makeSound(animal: Animal4) {
    // usamos el instanceof para verificar si la variable es de un tipo específico
    // el instanceof es una palabra reservada que se usa para verificar si una variable es de un tipo específico
    // es decir que si la variable es de un tipo, entonces se puede usar como ese tipo
    if (animal instanceof Cat) {
        animal.meow();
    } else {
        animal.bark();
    }
 }
 


// Discriminated Unions: se usa para indicar que una variable puede tener más de un tipo
// pero que cada tipo tiene una propiedad específica

// esto se usa generalmente en combinación con el type narrowing para que el compilador pueda saber que tipo de dato es la variable
// y que propiedades tiene

type Shape = {
    kind: "circle";
    radius: number;
} | {
    kind: "rectangle";
    width: number;
    height: number;
}

function printArea(shape: Shape) {
    if (shape.kind === "circle") {
        console.log(Math.PI * shape.radius * shape.radius);
    } else {
        console.log(shape.width * shape.height);
    }
}

// Class Parameters Properties: se usa para indicar que una clase tiene una propiedad específica 
// y que se puede acceder a ella desde el constructor

class Person2 {
    name2: string;
    age2: number;
    // aqui en el constructor, se puede usar el public modifier para indicar que la propiedad es pública
    // si no se usa el public modifier, la propiedad es privada y no se puede acceder a ella desde el exterior de la clase
    constructor(name2: string, age2: number) {
        this.name2 = name2;
        this.age2 = age2;
    }
    
    
}


// Strict Compiler Options: se usa para indicar que el compilador debe ser más estricto
// es decir que el compilador debe verificar que el código sea más seguro

// para activar las opciones estrictas, se puede usar el siguiente comando:
// se lo usa en el tsconfig.json en la parte "strict": true
// tsc --strict

// Null vs Undefined: se usa para indicar que una variable puede ser nula o indefinid
// NUll significa que la variable no tiene valor
let notPresent: null = null;
// Undefined significa que la variable no tiene valor y que no está definida
let notDefined: undefined = undefined;

let x: number | null = null;

x = 10;

// una buena idea es que null === undefined es true, por lo que se puede usar para verificar si una variable es nula o indefinida

if (x === null) {
    console.log("x is null");
} else {
    console.log("x is not null");
}

// INTERSECTION TYPES: se usa para indicar que una variable puede tener más de un tipo
// es decir que la variable puede ser de uno o más tipos

type Admin2 = {
    role: "admin";
}

type User2 = {
    name: string;
}

type AdminUser = Admin2 & User2;

const adminUser: AdminUser = {
    role: "admin",
    name: "John"
}

// OPTIONAL MODIFIER: se usa para indicar que una propiedad es opcional
// es decir que la propiedad puede estar presente o no

type User3 = {
    name: string;
    age?: number;
}

// NON-NULL ASSERTION OPERATOR: se usa para indicar que una propiedad no es nula
// es decir que la propiedad es obligatoria
// al usar un signo de exclamación (!) se indica que la propiedad es obligatoria

type User4 = {
    name: string;
    age: number;
}   

const user4: User4 = {
    name: "John",
    age: 30
}

// INTERFACES: se usa para definir un tipo de dato que puede ser usado en cualquier lugar
// es decir que se puede usar para definir un tipo de dato que puede ser usado en cualquier lugar

interface User5 {
    name: string;
    age: number;
}
// el extends es una palabra reservada que se usa para indicar que la interfaz User5 hereda de la interfaz User4
interface User5 extends User4 {
    email: string;
}

// INTERFACE DECLARATION MERGING: se usa para combinar dos interfaces
// es decir que se puede usar para combinar dos interfaces

// Express base
export interface Request {
    userId: string;
}

// Express JSON
export interface Request {
    body: any;
}

// OUR APP
function handleRequest(req: Request) {
    console.log(req.userId)
    console.log(req.body);
}

// TYPES VS INTERFACES
// los types son más flexibles que las interfaces porque no tienen que ser declarados con la palabra interface 
// las interfaces son más estrictas que los types porque  las interfaces pueden ser extendidas y combinadas con otras interfaces
// los types no pueden ser extendidos y no pueden ser combinados con otras interfaces

type User6 = {
    name: string;
    age: number;
}

interface User7 {
    name: string;
    age: number;
}

//En los TYPES se aceptan los unions types, intersections type (&), primitive types,shorthand functions, advanced type functions.
// En las interfaces se usan más los declaration merging, y el tema de familiarity, que es extendiendo interfaces.

// NEVER TYPE: se usa para indicar que una función no devuelve nada
// es decir que la función no devuelve un valor

// en casos reales se usa para indicar que una función no devuelve nada o que una función lanza un error

function throwError(message: string): never {
    throw new Error(message);
}




