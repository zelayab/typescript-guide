import { calcularPrecioTotal, calcularPromedio } from './types/functions';
import { ejemplosObjetos } from './types/objects';
import { ejemplosPrimitivos } from './types/primitives';

// Ejecutar ejemplos
ejemplosPrimitivos();
ejemplosObjetos();

// Ejemplos de cálculos
const precioFinal = calcularPrecioTotal(100, 2, 0.1);
const promedioNotas = calcularPromedio(85, 92, 78, 95);

console.log('Resultados de cálculos:', {
  precioFinal,
  promedioNotas
});

let message: string = "Hello, world!";
message += "!";

console.log(message);

/* Tipos primitivos */

let isTrue: boolean = true;
let myNumber: number = 10;
let myString: string = "Hello, world!";

/* not defined */
let notDefined: undefined = undefined;

/* null */
let myNull: null = null;
/* pentanio */
let myPenta = Symbol("Penta");

/* biggy  es el tipo de dato mas grande que existe en javascript */
/* pero no esta disponible cuando targeteamos lower than ES2020 */
/* let biggy: bigint = 24n; */


/* tipos instanciables  */

let myArray: string[] = ["Hello", "world"];
let myRegex: RegExp = /Hello/;
let set: Set<number> = new Set([1, 2, 3]);

/*  Arrays y tuplas */

let myTuple: [string, number] = ["Hello", 10];
let myArray2: Array<string> = ["Hello", "world"];


/*  Objetos */

let myObject: { name: string, age: number } = { name: "John", age: 20 };

// PARA NO TENER QUE REPETIR EL TIPO DE DATO DE CADA PROPIEDAD, SE PUEDE USAR UN TYPE ALIASES
// El alias es una forma de nombrar un tipo de dato, es decir, una forma de referirse a un tipo de dato
type Person = { name: string, age: number };

let myPerson: Person = { name: "John", age: 20 };


/* variables constantes: las constantes son variables que no se pueden reasignar */
type MyConst = {
    name: string;
    age: number;
}
/* si quiero reasig */
const myConst: MyConst = { name: "John", age: 20 };


/* Funciones */
// Typescript nos permite definir el tipo de dato que va a retornar la funcion
function myFunction(): string {
    return "Hello, world!";
}
// si no retornamos nada, podemos usar el tipo de dato void
function myVoidFunction(): void {
    console.log("Hello, world!");
}

// Rest parameters: son parametros que pueden recibir un numero indefinido de parametros
// EJEMPLO 1:  en una funcion que recibe un numero indefinido de strings
function myRestFunction(...args: string[]): void {
    console.log(args);
}

// EJEMPLO 2:  en una funcion que recibe un numero indefinido de numeros
function myRestFunction2(...args: number[]): void {
    console.log(args);
}




/* Funciones con parametros */
function myFunctionWithParams(name: string, age: number): string {
    return `Hello, ${name}! You are ${age} years old.`;
}



/* STructural Typing: es un tipo de dato que se basa en la estructura de un objeto */
// define la estructura de un objeto
type MyStructuralType = {
    name: string;
    age: number;
}
// ahora puedo usar el tipo de dato MyStructuralType para definir el tipo de dato de una variable
let myStructuralVariable: MyStructuralType = { name: "John", age: 20 };
// puedo usar el tipo de dato MyStructuralType para definir el tipo de dato de una funcion
function myStructuralFunction(person: MyStructuralType): void {
    console.log(person);
}

/* DUCK TYPING: es un tipo de dato que se basa en la estructura de un objeto */
// si camina como un pato, nada como un pato, y suena como un pato, entonces es un pato

type Point2D = { x: number, y: number }
type Point3D = { x: number, y: number, z: number }

let point2D: Point2D = { x: 10, y: 20 };
let point3D: Point3D = { x: 10, y: 20, z: 30 };

/* Extra info:  */
point2D = point3D; // esto es valido porque point2D tiene las propiedades de point3D, de ahi viene el duck typing

function printPoint(point: Point2D | Point3D): void {
    console.log(point);
}

printPoint(point2D);
printPoint(point3D);


/* Clases y objetos  */

class Animal {
    protected name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

public  move(distanceInMeters: number): void {
        console.log(`${this.name} is moving ${distanceInMeters}m.`);
    }
}

let cat = new Animal("Mia", 2);
cat.move(10);

class Bird extends Animal {

        public fly(distanceInMeters: number): void {
            console.log(`${this.name} is flying ${distanceInMeters}m.`);
        }
}

let bird = new Bird("Tweety", 1);
bird.fly(10);


/* A FIFO (First In, First Out  ) collection */
// ESto es un ejemplo de una cola de numeros y se puede usar para cualquier tipo de dato
// en este caso es una cola de numeros y agregamos un tipo de dato generico <T>,
// la T significa que el tipo de dato es generico y puede ser cualquier tipo de dato
// esto lo podemos hacer para que no tengamos que repetir el codigo para cada tipo de dato y que la cola sea flexible
class Queue<T> {
    data: T[] = [];
    push(item: T) {
        this.data.push(item);
    }
    pop(): T | undefined {
        return this.data.shift();
    }
}
// aqui por ejemplo le decimos que la cola es de numeros, por lo que el tipo de dato es Number
// y si queremos que sea de strings, solo cambiamos el tipo de dato a string
let queue = new Queue<number>();
queue.push(1);
queue.push(2);
queue.push(3);

console.log(queue.pop());



/* Special Types : Any, unknown, never, void, null, undefined, never */
// any es un tipo de dato que puede ser cualquier tipo de dato
let myAny: any = "Hello, world!";
myAny = 10;
myAny = true;
// unknown es un tipo de dato que puede ser cualquier tipo de dato
let myUnknown: unknown = "Hello, world!";
myUnknown = 10;
myUnknown = true;
// el tipo never no puede ser asignado a ningun otro tipo de dato
/* let myNever: never = "Hello, world!";
myNever = 10;
myNever = true; */

// void es un tipo de dato que no retorna ningun valor
function myVoidFunction4(): void {
    console.log("Hello, world!");
}

// null es un tipo de dato que no tiene valor porque null significa que no hay valor
let myNull4: null = null;

// undefined es un tipo de dato que no tiene valor ya que undefined es sin definir
let myUndefined4: undefined = undefined;

/* pasar js a ts */

let myJsVariable = "Hello, world!";

let myJsVariable2 = 10;

let myJsVariable3 = true;

// para pasar js a ts, podemos usar el tipo de dato any
let myAnyVariable: any = "Hello, world!";
myAnyVariable = 10;
myAnyVariable = true;
// o podemos usar el tipo de dato unknown
let myUnknownVariable: unknown = "Hello, world!";
myUnknownVariable = 10;
myUnknownVariable = true;

// o directamente colocamos los tipos que queremos que tenga la variable
let myStringVariable: string = "Hello, world!";
let myNumberVariable: number = 10;
let myBooleanVariable: boolean = true;




/* Type Assertion es un tipo de dato que nos permite afirmar que un tipo de dato es de un tipo de dato especifico */

//let hello = load()

// en este caso decimos que hello es de tipo string, porque sabemos que el tipo de dato que retorna load es un string
// entonces podemos usar el type assertion para decirle a typescript que hello es de tipo string
//const trimed = (hello as string).trim();
// tambien se lo puede poner entre corchetes
//const trimed = (<string>hello).trim();

// lo apropiado es usar por ejemplo el typeof para decirle a typescript que tipo de dato es hello
//const trimed = (typeof hello === "string" ? hello : hello.toString()).trim();


/* type Casting> significa que vamos a castear un tipo de dato a otro tipo de dato */

let leet

//later 
leet = "1337";
//use as number
//

//para transformar el tipo de dato a number, podemos usar el type casting poniendole el sigmo más
const num = +leet;

console.log(num === 1337); // false si no tiene el sigmo más. true si tiene el sigmo más
console.log(num); // 1337

// Esto significa que el tipo de dato es string y no number
// por lo que no podemos hacer operaciones con el
//console.log(num + 1); // Error: 'num' is of type 'string'.


/* MODULES: es una forma de organizar el codigo en archivos separados */

/**
* @module myModule
* @returns true if the input string is a palindrome
*/
function isPalindrome(str: string): boolean {
    return str === str.split('').reverse().join('');
}

// para importar un modulo, se puede hacer de la siguiente manera:
//import { isPalindrome } from './myModule';

// para exportar un la función se le agrega export al principio de la función
/* export function isPalindrome(str: string): boolean {
    return str === str.split('').reverse().join('');
} */


    /* Type Declaration: es un tipo de dato que nos permite declarar un tipo de dato para un modulo */

    // para declarar un tipo de dato para un modulo, se puede hacer de la siguiente manera:
    //declare module 'myModule' {
    //    export function isPalindrome(str: string): boolean;
    //}
    

// una vez declarado el tipo de dato, podemos importarlo de la siguiente manera:
//import { isPalindrome } from 'myModule';

// el type declaration tiene una rchivo env.d.ts que se encuentra en el root del proyecto
// este archivo es un archivo de declaracion de tipos de datos para el proyecto
// este archivo es opcional, pero es recomendable usarlo para que typescript pueda entender los tipos de datos de los modulos
//@ejemplo:
// declare const process: {
//     env: {
//         NODE_ENV: string;
//     };
// };
// es conocido el declaration de nodes, para instalar el tipo de dato de nodes, se puede hacer de la siguiente manera:
// npm install @types/node
// Otro ejemplo es express, para instalar el tipo de dato de express, se puede hacer de la siguiente manera:
// npm install @types/express


/* creando un paquee NPM PACKAGE */

// vamos a crear un paquete que se llame isPalindrome
// para eso vamos a crear un archivo package.json
// vamos a crear un archivo index.ts
// vamos a crear un archivo tsconfig.json
// vamos a crear un archivo README.md
// vamos a crear un archivo LICENSE

// de ahi agregamos el script de build
// "build": "tsc"

// y agregamos el script de start
// "start": "node dist/index.js"

// y agregamos el script de test
// "test": "jest"

// y agregamos el script de dev
// "dev": "tsc --watch"

// despues de eso, vamos a crear el archivo index.ts
// y agregamos el codigo de la funcion isPalindrome
// export function isPalindrome(str: string): boolean {
//     return str === str.split('').reverse().join('');
// }

// despues de eso, vamos a crear el archivo tsconfig.json
// y agregamos el codigo de la funcion isPalindrome
// "include": ["src/**/*.ts"],
// "exclude": ["node_modules", "dist"]


// despues de eso, vamos a crear el archivo README.md
// y agregamos el codigo de la funcion isPalindrome
// # isPalindrome
// isPalindrome is a function that returns true if the input string is a palindrome 

// despues de eso, vamos a crear el archivo LICENSE
// y agregamos el codigo de la funcion isPalindrome
// MIT

// Una vez creado el paquete, podemos instalarlo de la siguiente manera:
// npm install is-palindrome

// y podemos usarlo de la siguiente manera:
// import { isPalindrome } from 'is-palindrome';
// console.log(isPalindrome('level'));

/* ASYNC - AWAIT */

// async es una palabra reservada que nos permite definir una funcion asincrona
// await es una palabra reservada que nos permite esperar a que una promesa se resuelva

const main = () => {
    console.log("Hello, world!");
}

main();

// para cerrar la sesión después de 1s, despues de 2s y despues de 3s, podemos usar el async await
//Creamos la función delay que recibe un tiempo y retorna una promesa
//ms es el tiempo en milisegundos
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

//Creamos la función mainAsync que usa la función delay
const mainAsync = async () => {
    await delay(1000);
    console.log("1 segundo");
    await delay(2000);
    console.log("2 segundos");
    await delay(3000);
    console.log("3 segundos");
}

mainAsync();
// el codigo tiene el mismo comportamiento que seria usando el setTimeout, pero es mas limpio y mas facil de leer
















































































