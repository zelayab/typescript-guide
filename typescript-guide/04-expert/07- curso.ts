//TYPEOF TYPE OPERATOR
// ===================
// El operador typeof se usa para obtener el tipo de un valor
// esto es util para cuando se quiere obtener el tipo de un valor
// y no se sabe que tipo de dato es
// esto se hace de la siguiente manera:
// typeof value

const center = {
    x: 0,
    y: 0,
    z: 0,
}

type Point = typeof center;
// creamos una unit
const unit: Point = {
    x: center.x + 1,
    y: center.y + 1,
    z: center.z + 1,
}

// ahora podemos usar el typeof para obtener el tipo de un valor
type Unit = typeof unit;


// LOOKUP TYPES
// =============
// Los Lookup Types nos permiten buscar tipos específicos dentro de otros tipos
// usando la sintaxis Type['property']. Es muy útil cuando queremos reutilizar
// tipos que ya están definidos en una interfaz o tipo.

// Ejemplo práctico: Sistema de gestión de usuarios

interface Usuario {
    id: number;
    nombre: string;
    email: string;
    direccion: {
        calle: string;
        ciudad: string;
        codigoPostal: string;
    };
    preferencias: {
        notificaciones: boolean;
        tema: 'claro' | 'oscuro';
    };
}

// 1. Obtener el tipo de dirección
type DireccionUsuario = Usuario['direccion'];
// Ahora DireccionUsuario es equivalente a:
// {
//     calle: string;
//     ciudad: string;
//     codigoPostal: string;
// }

// 2. Obtener el tipo de las preferencias
type PreferenciasUsuario = Usuario['preferencias'];
// Ahora PreferenciasUsuario es:
// {
//     notificaciones: boolean;
//     tema: 'claro' | 'oscuro';
// }

// 3. Función que actualiza solo la dirección
function actualizarDireccion(userId: number, nuevaDireccion: DireccionUsuario) {
    // Actualizar solo la dirección del usuario
}

// 4. Función que actualiza solo las preferencias
function actualizarPreferencias(userId: number, nuevasPreferencias: PreferenciasUsuario) {
    // Actualizar solo las preferencias del usuario
}

// 5. Obtener el tipo del tema directamente
type TemaUsuario = Usuario['preferencias']['tema']; // 'claro' | 'oscuro'

// 6. Función específica para actualizar el tema
function actualizarTema(userId: number, nuevoTema: TemaUsuario) {
    // Actualizar solo el tema del usuario
}

// EJEMPLO DE USO:
const nuevaDireccion: DireccionUsuario = {
    calle: "Calle Principal 123",
    ciudad: "Madrid",
    codigoPostal: "28001"
};

const nuevasPreferencias: PreferenciasUsuario = {
    notificaciones: true,
    tema: "oscuro"
};

// Keyof type operator
// ===================
// El operador keyof se usa para obtener el tipo de las llaves de un objeto
// esto es util para cuando se quiere obtener el tipo de un valor
// y no se sabe que tipo de dato es
// esto se hace de la siguiente manera:
// keyof type

type User = {
    id: number;
    name: string;
    email: string;
}


type UserKeys = keyof User;
// esto nos da el tipo de dato de las llaves del objeto User
// para usarlo en una funcion, se hace de la siguiente manera:
function getUserKey(key: UserKeys) {
    return key;
}

//CONDITIONAL TYPES
// =================
// Los condicionales son una forma de verificar si un tipo es igual a otro tipo
// esto es util para cuando se quiere verificar si un tipo es igual a otro tipo
// y no se sabe que tipo de dato es
// esto se hace de la siguiente manera:
// type name = type1 extends type2 ? type3 : type4


type UserType = {
    id: number;
    name: string;
    email: string;
}

type AdminType = {
    id: number;
    name: string;
    email: string;
}

type UserOrAdmin = UserType | AdminType;

function getUserOrAdmin(user: UserOrAdmin) {
    return user;
}

type isNumber<T> = T extends number ? true : false;

// CONDITIONAL TYPES WITH UNIONS AND NEVER
// ======================================
// Los condicionales con uniones y never se usan para verificar si un tipo es igual a otro tipo
// Exclude null and undefined from T

export type NoEmpty<T> = T extends null |  undefined ? never : T;
// esto significa que si T es null o undefined, entonces el tipo es never, 
// si T no es null o undefined, entonces el tipo es T
// ahora pasemos una union de dos tipos string y null al tipo de utilidad NoEmpty
type Result = NoEmpty<string | null>;

// Imagina que tienes una caja de juguetes 🧸

// 1. Ejemplo con juguetes
type Juguete = "🚗 carro" | "🧸 peluche" | null | undefined;

// NoVacio es como un filtro mágico que:
// - Si encuentra un juguete real (carro o peluche), lo deja pasar
// - Si encuentra algo vacío (null o undefined), lo hace desaparecer
type NoVacio<T> = T extends null | undefined ? never : T;

// Aplicamos nuestro filtro mágico
type JuguetesReales = NoVacio<Juguete>;
// Resultado: solo "🚗 carro" | "🧸 peluche"

// 2. Ejemplo con helados 🍦
type Helado = {
    sabor: string;
    precio: number;
} | null;

// Aplicamos el mismo filtro
type HeladoSeguro = NoVacio<Helado>;
// Resultado: solo el helado con sus propiedades, sin posibilidad de null

// Ejemplo práctico:
function darJuguete(juguete: NoVacio<Juguete>) {
    console.log(`¡Aquí tienes tu ${juguete}!`);
}

// ✅ Esto funciona
darJuguete("🚗 carro");     // ¡Aquí tienes tu 🚗 carro!
darJuguete("🧸 peluche");   // ¡Aquí tienes tu 🧸 peluche!

// ❌ Esto no compilará
// darJuguete(null);        // Error: No puedes dar un juguete que no existe
// darJuguete(undefined);   // Error: No puedes dar un juguete indefinido

// Es como tener un detector de juguetes mágico que solo
// deja pasar juguetes reales y rechaza los que no existen 🪄

//Infer keyword and 'ReturnType<T>'
// ==============================
// 1. 🎮 Detector de Arrays (¿Es una colección?)
type EsColeccion<T> = T extends Array<any> ? '📦 Es una colección' : '🎲 Es un elemento único';

// Ejemplos:
type Juguetes = EsColeccion<string[]>;     // 📦 Es una colección
type UnJuguete = EsColeccion<string>;      // 🎲 Es un elemento único

// 2. 🔍 Adivina el Contenido (infer)
// Imagina que infer es como un detective que descubre qué hay dentro de algo

// Detective de Cajas 📦
type ContenidoCaja<T> = T extends Array<infer Contenido> ? `📦 Caja con ${Contenido & string}` : '❌ No es una caja';

// Ejemplos:
type CajaDeCarritos = ContenidoCaja<number[]>;    // "📦 Caja con number"
type CajaDePerritos = ContenidoCaja<string[]>;    // "📦 Caja con string"
type NoEsCaja = ContenidoCaja<string>;            // "❌ No es una caja"

// 3. 🎁 Detective de Regalos
type Regalo<T> = T extends { sorpresa: infer Contenido } ? `🎁 ¡Es un ${Contenido & string}!` : '❓ No es un regalo';

// Ejemplos:
type Sorpresa1 = Regalo<{ sorpresa: "🚗 carro" }>;        // "🎁 ¡Es un 🚗 carro!"
type Sorpresa2 = Regalo<{ sorpresa: "🧸 peluche" }>;      // "🎁 ¡Es un 🧸 peluche!"
type NoEsSorpresa = Regalo<{ otra: "cosa" }>;             // "❓ No es un regalo"

// 4. 🎯 Ejemplo Práctico: Detector de Tipos de Funciones
type ObtenerTipoRetorno<T> = T extends (...args: any[]) => infer R ? R : never;

// Ejemplos:
function sumarNumeros(a: number, b: number): number {
    return a + b;
}

function saludar(nombre: string): string {
    return `¡Hola ${nombre}!`;
}

type TipoRetornoSuma = ObtenerTipoRetorno<typeof sumarNumeros>;    // number
type TipoRetornoSaludo = ObtenerTipoRetorno<typeof saludar>;       // string

// Es como si el infer fuera un detective 🔍 que:
// 1. Mira dentro de las cajas (arrays)
// 2. Descubre sorpresas en los regalos (objetos)
// 3. Averigua qué devuelven las funciones
// ¡Y todo esto en tiempo de compilación! 🎉

//MAPPED TYPES
// =============
// Imagina que los Mapped Types son como una fábrica de juguetes 🏭
// que puede transformar juguetes existentes en nuevos juguetes

// 1. 🎨 Fábrica de Colores
type Juguete2 = {
    pelota: string;
    carro: string;
    muñeca: string;
};

// Convertimos todos los juguetes a colores disponibles
type JuguetesColores = {
    [K in keyof Juguete2]: 'rojo' | 'azul' | 'verde';
};

// Resultado:
const juguetesDisponibles: JuguetesColores = {
    pelota: 'rojo',
    carro: 'azul',
    muñeca: 'verde'
};

// 2. 🔒 Fábrica de Juguetes Seguros (todo readonly)
type JuguetesSeguro = {
    readonly [K in keyof Juguete2]: string;
};

// 3. 🎁 Fábrica de Juguetes Opcionales
type JuguetesOpcionales = {
    [K in keyof Juguete2]?: string;
};

// 4. 🏪 Tienda de Juguetes (ejemplo más completo)
interface Producto {
    nombre: string;
    precio: number;
    stock: number;
}

// Creamos diferentes versiones de nuestros productos:

// 4.1 📝 Productos Solo Lectura
type ProductoSeguro = {
    readonly [K in keyof Producto]: Producto[K];
};

// 4.2 ❓ Productos Opcionales (para lista de deseos)
type ProductoOpcional = {
    [K in keyof Producto]?: Producto[K];
};

// 4.3 🏷️ Productos con Etiquetas
type ProductoConEtiqueta = {
    [K in keyof Producto as `etiqueta_${string & K}`]: string;
};

// Ejemplos de uso:
const productoSeguro: ProductoSeguro = {
    nombre: "Osito de Peluche",
    precio: 29.99,
    stock: 10
    // No se puede modificar después ❌
};

const listaDeseosProducto: ProductoOpcional = {
    nombre: "Robot",
    // precio y stock son opcionales ✨
};

const etiquetas: ProductoConEtiqueta = {
    etiqueta_nombre: "Juguete Premium",
    etiqueta_precio: "Precio Especial",
    etiqueta_stock: "Últimas Unidades"
};

// 5. 🎯 Ejemplo Práctico: Sistema de Validación
type Validaciones = {
    [K in keyof Producto]: (valor: Producto[K]) => boolean;
};

// Implementación de validaciones
const validarProducto: Validaciones = {
    nombre: (nombre) => nombre.length > 0,
    precio: (precio) => precio > 0,
    stock: (stock) => stock >= 0
};

// Es como tener una fábrica mágica que puede:
// 1. 🔄 Transformar todos los tipos de una vez
// 2. 🔒 Hacer las propiedades readonly
// 3. ❓ Hacer las propiedades opcionales
// 4. 🏷️ Agregar prefijos o sufijos a las propiedades
// 5. ✨ ¡Y mucho más!



// MAPPED TYPES WITH MODIFIERS
// ============================
// Imagina que tenemos una tienda de juguetes mágica donde podemos
// modificar las propiedades de los juguetes de diferentes maneras 🪄

// 1. 🎯 Nuestro Juguete Base
interface JugueteTienda {
    nombre: string;
    precio: number;
    enStock: boolean;
    descripcion?: string;
    readonly id: number;
}

// 2. 🔓 Quitar el readonly (como desbloquear juguetes)
type DesbloquearJuguete = {
    -readonly [K in keyof JugueteTienda]: JugueteTienda[K];
};

// 3. 🔒 Hacer todo readonly (como poner todo en vitrina)
type JugueteVitrina = {
    +readonly [K in keyof JugueteTienda]: JugueteTienda[K];
};

// 4. ❌ Quitar opcionales (todos los campos son requeridos)
type JugueteCompleto = {
    [K in keyof JugueteTienda]-?: JugueteTienda[K];
};

// 5. ✨ Hacer todo opcional (como una lista de deseos)
type ListaDeseosJuguete = {
    [K in keyof JugueteTienda]+?: JugueteTienda[K];
};

// Ejemplos de uso:

// Juguete normal
const jugueteNormal: JugueteTienda = {
    nombre: "Robot",
    precio: 29.99,
    enStock: true,
    id: 1
    // descripcion es opcional
};

// Juguete en vitrina (todo readonly)
const jugueteVitrina: JugueteVitrina = {
    nombre: "Peluche Exclusivo",
    precio: 49.99,
    enStock: true,
    id: 2
    // No se puede modificar después
};

// Juguete completo (nada opcional)
const jugueteCompleto: JugueteCompleto = {
    nombre: "Super Auto",
    precio: 39.99,
    enStock: true,
    descripcion: "El mejor auto de juguete", // ¡Ahora es obligatorio!
    id: 3
};

// Lista de deseos (todo opcional)
const miListaDeseos: ListaDeseosJuguete = {
    nombre: "Tren Mágico"
    // ¡Todo lo demás es opcional! ✨
};

// 6. 🎨 Combinando Modificadores
type JugueteEspecial = {
    +readonly [K in keyof JugueteTienda]-?: JugueteTienda[K];
    // Hace todas las propiedades readonly Y requeridas
};

// Los modificadores son como varitas mágicas 🪄 que pueden:
// + readonly: 🔒 Bloquear propiedades
// - readonly: 🔓 Desbloquear propiedades
// +?: ✨ Hacer propiedades opcionales
// -?: ❗ Hacer propiedades requeridas


// TEMPLATE LITERALS TYPE
// ======================
// Los Template Literals Types son como una máquina de crear palabras mágicas 🎨
// que nos permite combinar tipos de texto de forma segura y flexible

// 1. 📝 Tipos Literales Básicos
let mensajeSimple: 'hola mundo';
mensajeSimple = 'hola mundo';           // ✅ Correcto
// mensajeSimple = 'adiós mundo';       // ❌ Error: Solo permite 'hola mundo'

// 2. 🎨 Template Literals con Variables
type Saludo = 'Hola' | 'Adiós';
type Persona = 'Juan' | 'María';
type MensajeSaludo = `${Saludo} ${Persona}!`;
// Resultado: 'Hola Juan!' | 'Hola María!' | 'Adiós Juan!' | 'Adiós María!'

const saludo: MensajeSaludo = 'Hola Juan!';    // ✅ Correcto
// const invalido: MensajeSaludo = 'Hola Pedro!'; // ❌ Error

// 3. 🎮 Eventos de Juguetes
type AccionJuguete = 'saltar' | 'correr' | 'girar';
type EventoJuguete = `on${Capitalize<AccionJuguete>}`;
// Resultado: 'onSaltar' | 'onCorrer' | 'onGirar'

// 4. 🏷️ Sistema de Etiquetas
type Categoria = 'juguete' | 'ropa' | 'libro';
type ID = `${Categoria}_${number}`;

const producto1: ID = 'juguete_123';    // ✅ Correcto
const producto2: ID = 'ropa_456';       // ✅ Correcto
// const invalido: ID = 'comida_789';   // ❌ Error: 'comida' no es una categoría válida

// 5. 📱 URLs Tipadas
type Dominio = 'jugueteria.com' | 'tienda.es';
type Ruta = 'productos' | 'contacto';
type URL = `https://${Dominio}/${Ruta}`;
// Resultado: 
// 'https://jugueteria.com/productos' | 
// 'https://jugueteria.com/contacto' |
// 'https://tienda.es/productos' |
// 'https://tienda.es/contacto'

// 6. 🎯 Ejemplo Práctico: Sistema de Notificaciones
type TipoNotificacion = 'error' | 'exito' | 'info';
type Accion = 'crear' | 'actualizar' | 'eliminar';
type Mensaje = `${Capitalize<TipoNotificacion>}: ${Capitalize<Accion>} producto`;

const notificacion1: Mensaje = 'Error: Crear producto';      // ✅ Correcto
const notificacion2: Mensaje = 'Exito: Eliminar producto';   // ✅ Correcto
// const invalido: Mensaje = 'Error: Cancelar producto';     // ❌ Error

// 7. 🔍 Utilidades con Template Literals
interface Producto {
    nombre: string;
    precio: number;
}

// Crear getters tipados
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

// Resultado:
type ProductoGetters = Getters<Producto>;
// {
//     getNombre: () => string;
//     getPrecio: () => number;
// }

// Los Template Literal Types son como una varita mágica 🪄 que:
// 1. 🎨 Crea tipos de texto personalizados
// 2. 📏 Combina tipos existentes de forma segura
// 3. 🔠 Permite manipular mayúsculas/minúsculas
// 4. 🎯 Garantiza que los textos cumplan un formato específico
// 5. ✨ ¡Todo verificado en tiempo de compilación!

