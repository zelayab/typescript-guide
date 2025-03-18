/**
 * TIPOS PRIMITIVOS EN TYPESCRIPT 🚀
 * --------------------------------
 * 
 * ¡Hola! Aquí aprenderás sobre los tipos más básicos,
 * como cuando aprendes los colores por primera vez.
 * 
 */

// Números 🔢
// Los números pueden ser enteros o decimales
const edad: number = 4;      // Un número entero
const altura: number = 1.1;  // Un número con decimales

// Texto (strings) 📝
// Como escribir el nombre de tu mascota
const nombre: string = "Luna";
const saludo: string = `¡Hola ${nombre}!`; // Podemos combinar texto

// Verdadero o Falso (boolean) ✅❌
// Como cuando dices "sí" o "no"
const tieneHambre: boolean = true;
const estaCansado: boolean = false;

// Ejercicios divertidos 🎯
// 1. Crea una variable con tu edad
// 2. Crea una variable con tu nombre
// 3. Crea una variable que diga si te gusta el helado

/* resolución de ejercicios */
const miEdad: number = 25;
const miNombre: string = "Ana";
const meGustaElHelado: boolean = true;

// EJEMPLO PRÁCTICO:
/**
 * Vamos a crear un pequeño sistema para una heladería 🍦
 * que nos ayude a calcular precios y mostrar información
 */

// Definimos los precios base
const precioBase: number = 2.5;        // Precio base del helado
const precioTopping: number = 0.5;     // Precio por cada topping

// Información del cliente
const nombreCliente: string = "María";
const quiereTopping: boolean = true;
const cantidadToppings: number = 3;

// Calculamos el precio final
const precioFinal: number = precioBase + (quiereTopping ? precioTopping * cantidadToppings : 0);

// Creamos el mensaje para el cliente
const mensajeTicket: string = `
¡Hola ${nombreCliente}!
Tu helado cuesta $${precioFinal}
${quiereTopping ? `Incluye ${cantidadToppings} toppings` : 'Sin toppings adicionales'}
¡Gracias por tu compra! 🍦
`;

// Para probar este código, puedes usar:
console.log(mensajeTicket);

// Resultado esperado:
/*
¡Hola María!
Tu helado cuesta $4
Incluye 3 toppings
¡Gracias por tu compra! 🍦
*/

