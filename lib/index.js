"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_management_1 = require("./examples/user-management");
const functions_1 = require("./types/functions");
const objects_1 = require("./types/objects");
const primitives_1 = require("./types/primitives");
// Ejecutar ejemplos
(0, primitives_1.ejemplosPrimitivos)();
(0, objects_1.ejemplosObjetos)();
// Ejemplo de uso del sistema de usuarios
const sistema = new user_management_1.SistemaUsuarios();
sistema.agregarUsuario({
    id: 1,
    nombre: 'Ana García',
    email: 'ana@email.com',
    fechaRegistro: new Date(),
    activo: true
});
// Ejemplos de cálculos
const precioFinal = (0, functions_1.calcularPrecioTotal)(100, 2, 0.1);
const promedioNotas = (0, functions_1.calcularPromedio)(85, 92, 78, 95);
console.log('Resultados de cálculos:', {
    precioFinal,
    promedioNotas
});
let message = "Hello, world!";
message += "!";
console.log(message);
/* Tipos primitivos */
let isTrue = true;
let myNumber = 10;
let myString = "Hello, world!";
/* not defined */
let notDefined = undefined;
/* null */
let myNull = null;
/* pentanio */
let myPenta = Symbol("Penta");
/* biggy  es el tipo de dato mas grande que existe en javascript */
/* pero no esta disponible cuando targeteamos lower than ES2020 */
/* let biggy: bigint = 24n; */
/* tipos instanciables  */
let myArray = ["Hello", "world"];
let myRegex = /Hello/;
let set = new Set([1, 2, 3]);
/*  Arrays y tuplas */
let myTuple = ["Hello", 10];
let myArray2 = ["Hello", "world"];
/*  Objetos */
let myObject = { name: "John", age: 20 };
let myPerson = { name: "John", age: 20 };
/* si quiero reasig */
const myConst = { name: "John", age: 20 };
/* Funciones */
// Typescript nos permite definir el tipo de dato que va a retornar la funcion
function myFunction() {
    return "Hello, world!";
}
// si no retornamos nada, podemos usar el tipo de dato void
function myVoidFunction() {
    console.log("Hello, world!");
}
// Rest parameters: son parametros que pueden recibir un numero indefinido de parametros
// EJEMPLO 1:  en una funcion que recibe un numero indefinido de strings
function myRestFunction(...args) {
    console.log(args);
}
// EJEMPLO 2:  en una funcion que recibe un numero indefinido de numeros
function myRestFunction2(...args) {
    console.log(args);
}
/* Funciones con parametros */
function myFunctionWithParams(name, age) {
    return `Hello, ${name}! You are ${age} years old.`;
}
// ahora puedo usar el tipo de dato MyStructuralType para definir el tipo de dato de una variable
let myStructuralVariable = { name: "John", age: 20 };
// puedo usar el tipo de dato MyStructuralType para definir el tipo de dato de una funcion
function myStructuralFunction(person) {
    console.log(person);
}
