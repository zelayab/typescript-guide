/**
 * ARRAYS Y TUPLAS 📦
 * -----------------
 * 
 * ¡Es hora de aprender a guardar muchas cosas juntas!
 * Como cuando guardas todos tus juguetes en una caja.
 */

// Arrays 📚
// Son como cajas donde puedes guardar muchas cosas del mismo tipo
const colores: string[] = ["rojo", "azul", "verde"];
const numeros: number[] = [1, 2, 3, 4, 5];
const activos: boolean[] = [true, false, true];

// También puedes escribirlos así:
const frutas: Array<string> = ["manzana", "banana", "naranja"];

// Tuplas 🎯
// Son como cajas con espacios específicos para cada cosa
const coordenadas: [number, number] = [10, 20];
const usuarioStatus: [string, boolean] = ["admin", true];

// EJEMPLO PRÁCTICO:
/**
 * Sistema de Inventario de una Tienda de Juguetes 🧸
 * Vamos a crear un sistema que nos ayude a manejar
 * el inventario y los precios de los juguetes
 */

// Definimos los tipos de juguetes disponibles
const juguetes: string[] = [
  "oso de peluche",
  "carro de control remoto",
  "rompecabezas",
  "muñeca",
  "pelota"
];

// Precios de cada juguete
const precios: number[] = [15.99, 29.99, 12.50, 19.99, 8.99];

// Cantidad en inventario
const inventario: number[] = [10, 5, 15, 8, 20];

// Información completa de cada juguete [nombre, precio, cantidad]
const infoJuguetes: [string, number, number][] = juguetes.map((juguete, index) => [
  juguete,
  precios[index],
  inventario[index]
]);

// Función para mostrar el inventario
function mostrarInventario() {
  console.log("=== Inventario de Juguetes ===");
  infoJuguetes.forEach(([nombre, precio, cantidad]) => {
    console.log(`${nombre}:
    Precio: $${precio}
    Cantidad: ${cantidad} unidades
    ${cantidad < 10 ? "⚠️ Stock bajo" : "✅ Stock suficiente"}
    -------------------`);
  });
}

// Para probar este código:
mostrarInventario();

// Resultado esperado:
/*
=== Inventario de Juguetes ===
oso de peluche:
    Precio: $15.99
    Cantidad: 10 unidades
    ✅ Stock suficiente
    -------------------
carro de control remoto:
    Precio: $29.99
    Cantidad: 5 unidades
    ⚠️ Stock bajo
    -------------------
...
*/

// Ejercicios divertidos 🎮
// 1. Crea un array con tus comidas favoritas
// 2. Crea una tupla con tu nombre y tu edad
// 3. Crea un array con los números del 1 al 10 