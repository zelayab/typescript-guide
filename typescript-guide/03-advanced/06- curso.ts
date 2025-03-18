// IMPLEMENTS KEYWORD
// ===================
// El implements keyword se utiliza para implementar una interfaz en una clase.
// Esto significa que la clase debe cumplir con todos los requisitos definidos en la interfaz.

interface Pet {
    id: number;
    name: string;
    type: string;
    edad: number;
    hacerSonido(): string;
}
// arriba definimos la interfaz Animal, que tiene dos propiedades: name y type.
// Con la keyword implements, indicamos que la clase Dog debe implementar la interfaz Animal.

class Dog implements Pet {
    constructor(
        public id: number,
        public name: string,
        public type: string,
        public edad: number
    ) {}

    hacerSonido(): string {
        return 'Guau!';
    }
}

// en este caso, la clase Dog debe tener las propiedades name y type, que son definidas en la interfaz Animal.



// DEFINITE ASSIGNMENT ASSERTION
// =============================
// El definite assignment assertion es una forma de indicar que una variable es definida.
// Esto es útil para evitar errores de compilación.

let dice!: number; // al poner el signo de exclamacion, indicamos que la variable dice es definida.
function rollDice() {
    dice = Math.floor(Math.random() * 6) + 1;
}

rollDice();
console.log(dice);


// USER DEFINED TYPE GUARDS
// =======================
// Los user defined type guards son funciones que devuelven un booleano.
// Esto es útil para verificar si una variable es de un tipo específico.

function isDog(pet: Pet): pet is Dog {
    return pet.type === 'dog';
}

// en el ejemplo de type square, type rectangle

type Square = {
    size: number;
}

type Rectangle = {
    width: number;
    height: number;
}

type Shape = Square | Rectangle;

function isSquare(shape: Shape): shape is Square {
    return 'size' in shape;
}

function isRectangle(shape: Shape): shape is Rectangle {
    return 'width' in shape;
}

// esto funcione igual que el IN operator

function getArea(shape: Shape) {
    if('size' in shape) {
        return shape.size * shape.size;
    }
    if('width' in shape) {
        return shape.width * shape.height;
    }
    const _exhaustiveCheck: never = shape;
    return _exhaustiveCheck;
}

// en este caso, el tipo de shape es Square | Rectangle, y el tipo de shape es Shape.
// el tipo de shape es Square | Rectangle, y el tipo de shape es Shape.
// el tipo de shape es Square | Rectangle, y el tipo de shape es Shape.
// el tipo de shape es Square | Rectangle, y el tipo de shape es Shape.


// ASSERTION FUNCTIONS
// ===================
// Las assertion functions son funciones que devuelven un tipo específico.
// Esto es útil para verificar si una variable es de un tipo específico.

type Usuario3 = {
    nombre: string;
    email: string;
}

// En este caso, la función assert es una función que devuelve un tipo específico.
// al poner el asserts, indicamos que la función devuelve un tipo específico
// el flag asserts es una keyword que indica que la función devuelve un tipo específico
// en este caso el asserts es hacia el condition, que significa que si la condición no se cumple, se lanza un error
function assert(condition: boolean, message: string): asserts condition {
    if (!condition) {
        throw new Error(message);
    }
}

function assertString(value: unknown): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('Value is not a string');
    }
}

// en este caso, la función assertString es una función que devuelve un tipo específico.
// si el valor no es un string, la función lanza un error.

// ESTO SIRVE para los Application Tests que se hacen en el frontend


// FUNCTION OVERLOADING
// ===================
// La sobrecarga de funciones es una forma de tener múltiples funciones con el mismo nombre.
// Esto es útil para tener múltiples funciones con el mismo nombre.

function greet(name: string): string;
function greet(name: string, age: number): string;

function greet(name: string, age?: number) {
    if (age) {
        return `Hello ${name}, you are ${age} years old`;
    }
    return `Hello ${name}`;
}

// en este caso, la función greet es una función que devuelve un tipo específico.
// en los distintos casos

// vamos a ver un ejemplo de como se soluciona algo con overload
// USAMOS EL OVERLOAD PARA QUE EL COMPILADOR SEPA QUE TIPO DE DATO DEVUELVE LA FUNCION
function reverse(stringOrStringArray: string): string;
function reverse(stringOrStringArray: string[]): string[];
// ES solo del compilador, no se ejecuta en runtime, por lo que no forman parte del JS de salida
function reverse(stringOrStringArray: string | string[]): string | string[] {
    if (typeof stringOrStringArray === 'string') {
        return stringOrStringArray.split('').reverse().join('');
    }else{
        return stringOrStringArray.reverse();
    }
}

const hello = reverse('hello'); // 'olleh'
const helloArray = reverse(['hello', 'world']); // ['dlrow', 'olleh']


// CALL SIGNATURES
// ===============
// Las call signatures son funciones que devuelven un tipo específico.
// Esto es útil para tener múltiples funciones con el mismo nombre.
// al decir call , es la sintaxis para indicar que es una funcion que se puede llamar
// esto se hace de la siguiente manera:
// function name(params: type) => returnType
// 


type GreetFunction = (name: string) => string;

const greeting: GreetFunction = (name) => {
    return `Hello ${name}`;
}

// en este caso, la función greet es una función que devuelve un tipo específico.
// en los distintos casos
//otro ejemplo

type Add = {
    // en vez de usar (a: number, b: number) => number, usamos el call signature
    (a: number, b: number): number, // aqui con los : indicamos que es una funcion que devuelve un numero
    //tambien podemos usar el overload para sumar mas parametros
    (a: number, b: number, c: number): number;
}

const add: Add = (a, b, c?: number) => {
   return a + b + (c ?? 0);
}

const result1 = add(1, 2); // 3
const result2 = add(1, 2, 3); // 6



// ABSTRACT CLASSES
// =================
// Las clases abstractas son clases que no se pueden instanciar.
// Esto es útil para tener clases que no se pueden instanciar o que tienen métodos abstractos.

abstract class Animalito {
    abstract makeSound(): string;
}

//ahora podemos crear una clase que herede de Animalito
class Dogito extends Animalito {
    makeSound() {
        return 'Woof!';
    }
}
// la idea de esto es que la clase Dogito debe implementar el metodo makeSound
// y que la clase Animalito no se pueda instanciar

const dogito = new Dogito();
dogito.makeSound(); // 'Woof!'


//INDEX SIGNATURES
// ===============
// Las index signatures son una forma de tener múltiples funciones con el mismo nombre.
// Esto es útil para tener múltiples funciones con el mismo nombre.
// Typescript permite acceder a las propiedades de un objeto usando una cadena de caracteres.
// esto se hace de la siguiente manera:
// objeto[key]
// key es una cadena de caracteres que representa el nombre de la propiedad.
// el tipo de key es string.
// el tipo de value es string.


type Indexable = {
    [key: string]: string;
}

const obj: Indexable = {
    name: 'John',
    age: '20',
}

obj['name']; // 'John'
obj['age']; // '20'


//INDEX SIGNATURES CON NUMBERS
// ==========================
// Typescript permite acceder a las propiedades de un objeto usando un número.
// esto se hace de la siguiente manera:
// objeto[index]
// index es un número que representa el nombre de la propiedad.
// el tipo de index es number.  

type IndexableNumber = {
    [index: number]: string;
}

const objNumber: IndexableNumber = {
    0: 'zero',
    1: 'one',
}   

objNumber[0]; // 'zero'
objNumber[1]; // 'one'


// READONLY ARRAYS AND TUPLES
// ==========================
// Las readonly arrays y las tuplas son una forma de tener arrays y tuplas que no se pueden modificar.
// esto se hace de la siguiente manera:
// readonly array = [1, 2, 3]
// readonly tuple = [1, 2, 3]

// al tener el readonly, no se puede modificar el array o la tupla

const readonlyArray: readonly string[] = ['Alice', 'Bob'];
const readonlyTuple: readonly [string, number] = ['Alice', 25];

readonlyArray[0] = 'Charlie'; // Error: Cannot assign to '0' because it is a read-only property.
readonlyTuple[1] = 30; // Error: Cannot assign to '1' because it is a read-only property.


// un ejemplo pasa con los metodos de js
function reverseSorted(input: number[]): number[]{
    return input.sort().reverse();
}

const start  = [1,2,3,4,5]
const result = reverseSorted(start)

console.log(result) // [5,4,3,2,1]
// el problema es que el metodo sort() puede ordenar los numeros de manera ascendente o descendente
// por lo que el resultado puede ser [1,2,3,4,5] o [5,4,3,2,1]




//DOUBLE ASSERTION
// ===============
// Las double assertion son una forma de tener múltiples funciones con el mismo nombre.
// Esto es útil para tener múltiples funciones con el mismo nombre.
// esto se hace de la siguiente manera:
// assert(condition, message)
// assert(condition, message)
// al ser double, significa que el compilador no sabe que tipo de dato es, por lo que se debe usar el double assertion
// para indicarle al compilador que tipo de dato es

// la diferencia entre el assert y el double assertion es que el assert es una función que devuelve un tipo específico
// y el double assertion es una forma de indicarle al compilador que tipo de dato es

const value: unknown = 'Hello';
const stringValue = value as string;

const stringValue2 = value as unknown as string;
// al definir el unknown,le estamos diciendo que el valor es de cualquier tipo
// pero el as string le estamos diciendoq ue unknown puede ser un string o un numero
// el unknown puede definirse como cualquier tipo de dato
// esto hay que evitarlo, ya que puede ser confuso para el compilador

// esto es util para cuando el compilador no sabe que tipo de dato es, pero sabemos que tipo de dato es

// CONST ASSERTIONS
// ===============
// Las const assertions son una forma de tener múltiples funciones con el mismo nombre.
// Esto es útil para tener múltiples funciones con el mismo nombre.
// esto se hace de la siguiente manera:
// const value = value as const
// esto es util para cuando el compilador no sabe que tipo de dato es, pero sabemos que tipo de dato es

const constantValue = 'Hello';
const constantValue2 = constantValue as const;
// al definir el const, le estamos diciendo que el valor es una constante




 // THIS PARAMETER
 // ==============
 // El this parameter sirve para indicarle al compilador que tipo de dato es el this, 
 // es decir, que tipo de dato es el objeto que esta siendo utilizado
 // esto se hace de la siguiente manera:
 // this.name
 // this.age

 class Counter {
    private count = 0;

    increment() {
        this.count++;
    }

    decrement() {
        this.count--;
    }

    getCount() {
        return this.count;
    }
 }

 const counter = new Counter();
 counter.increment();
 counter.decrement();
 counter.getCount();

 // esto es util para cuando el compilador no sabe que tipo de dato es el this, 
 // pero sabemos que tipo de dato es

 // tambien se puede usar en las funciones

 function greets(this: {name: string}) {
    return `Hello ${this.name}`;
 }

 const personw = {
    name: 'John',
    greets: greets,
 }

 personw.greets(); // 'Hello John'

 // esto es util para cuando el compilador no sabe que tipo de dato es el this, 
 // pero sabemos que tipo de dato es
 
 // GENERIC CONSTRAINTS
 // ===================
 // Las generic constraints son una forma de tener múltiples funciones con el mismo nombre.
 // Se usan cuando se quiere restringir el tipo de dato que se puede usar en una funcion,
 // haciendo que el tipo de dato sea mas especifico y no pueda ser cualquier tipo de dato
 // esto se hace de la siguiente manera:
 // function name<T extends type>(params: type) => returnType

 function printLength<T extends {length: number}>(value: T) {
    console.log(value.length);
 }

 printLength('Hello'); // 5 // aqui no da error, ya que el string tiene length
 printLength([1, 2, 3]); // 3
 printLength({length: 10}); // 10
 // UN error seria
 printLength(123); // Error: Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
 
 
 //DEALING WITH TEMPORAL UNCERTAINTY
 // ==============================
 // Cuando se quiere hacer un cambio en el codigo, pero no se sabe que tipo de dato es,
 // se puede usar el temporal uncertainty
 // esto se hace de la siguiente manera:
 // const value = value as type
 // esto se hace para que el compilador no se queje

const value2 = 'Hello';
 
 
 
 
 
 










