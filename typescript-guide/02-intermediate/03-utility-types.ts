/**
 * UTILITY TYPES EN TYPESCRIPT
 * ========================
 * 
 * TypeScript proporciona varios tipos utilitarios
 * para transformar tipos existentes.
 */

// Interface base para ejemplos
interface Usuario {
    id: number;
    nombre: string;
    email: string;
    edad: number;
    activo: boolean;
}

// Partial<T> - Hace todas las propiedades opcionales
type UsuarioParcial = Partial<Usuario>;

// Required<T> - Hace todas las propiedades requeridas
type UsuarioRequerido = Required<Usuario>;

// Readonly<T> - Hace todas las propiedades de solo lectura
type UsuarioSoloLectura = Readonly<Usuario>;

// Pick<T, K> - Selecciona un subconjunto de propiedades
type CredencialesUsuario = Pick<Usuario, "email" | "id">;

// Omit<T, K> - Omite un subconjunto de propiedades
type UsuarioSinID = Omit<Usuario, "id">;

// Record<K, T> - Crea un tipo con un conjunto de propiedades
type UsuariosPorID = Record<number, Usuario>;

// Exclude<T, U> - Excluye tipos que son asignables a U
type TiposDato = "string" | "number" | "boolean";
type TiposSinBoolean = Exclude<TiposDato, "boolean">;

// Extract<T, U> - Extrae tipos que son asignables a U
type SoloString = Extract<TiposDato, "string">;

// NonNullable<T> - Elimina null y undefined del tipo
type TipoNoNulo = NonNullable<string | number | null | undefined>;

// Ejemplos de uso
const actualizarUsuario = (id: number, cambios: Partial<Usuario>) => {
    // Actualiza solo las propiedades proporcionadas
};

const usuarioSoloLectura: Readonly<Usuario> = {
    id: 1,
    nombre: "Juan",
    email: "juan@email.com",
    edad: 30,
    activo: true,
    rol: "admin",
    roles: ["admin", "usuario"]
};

// Ejercicios prácticos
// 1. Crear un tipo que combine múltiples utility types
// 2. Implementar una función que use Partial y Required
// 3. Crear un tipo que use Pick y Omit juntos 

/**
 * UTILITY TYPES 🛠️
 * ==============
 * 
 * ¡Vamos a usar herramientas mágicas de TypeScript!
 * Como tener una caja de herramientas llena de trucos.
 */

// Partial<T> 🎨
// Hace que todas las propiedades sean opcionales
// Como cuando dices "puede tener esto, o no"
interface Juguete {
    nombre: string;
    color: string;
    precio: number;
}

type JugueteIncompleto = Partial<Juguete>;  // Todos los campos son opcionales

// Pick<T, K> 📝
// Elige solo algunas propiedades
// Como cuando solo quieres algunas piezas del rompecabezas
type JugueteBasico = Pick<Juguete, 'nombre' | 'color'>;

// Readonly<T> 🔒
// Hace que nada se pueda cambiar
// Como cuando mamá dice "no toques"
type JugueteSeguro = Readonly<Juguete>;

// Ejercicios divertidos 🎮
// 1. Usa Partial para crear un actualizador de juguetes
// 2. Usa Pick para crear una versión simple de una mascota
// 3. Usa Readonly para crear un objeto que no se pueda modificar 