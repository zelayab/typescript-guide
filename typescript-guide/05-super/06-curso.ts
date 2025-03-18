// UTILITY TYPES EN TYPESCRIPT
// ============================
// Los Utility Types son como herramientas mágicas 🛠️ que nos ayudan a transformar tipos

// PARTIAL<T>
// ==========
// Partial<T> es como una varita mágica ✨ que hace que todas las propiedades sean opcionales

// 1. 🎮 Ejemplo Base: Juguete
interface Juguete {
    nombre: string;
    precio: number;
    categoria: string;
    enStock: boolean;
}

// 2. 🎨 Actualización Parcial
type JugueteActualizable = Partial<Juguete>;
// Resultado:
// {
//     nombre?: string;
//     precio?: number;
//     categoria?: string;
//     enStock?: boolean;
// }

// Ejemplo práctico:
function actualizarJuguete(id: number, cambios: Partial<Juguete>) {
    // Podemos actualizar solo algunas propiedades
    const actualizacion = {
        nombre: "Nuevo Nombre",      // ✅ Opcional
        precio: 29.99               // ✅ Opcional
        // No necesitamos incluir categoria ni enStock
    };
}

// REQUIRED<T>
// ===========
// Required<T> es como un hechizo ⚡ que hace todas las propiedades obligatorias

// 1. 🎁 Lista de Deseos
interface ListaDeseos {
    nombre?: string;
    precio?: number;
    prioridad?: 'alta' | 'media' | 'baja';
}

// 2. 🎯 Convertir en Compra
type CompraDefinitiva = Required<ListaDeseos>;
// Ahora todas las propiedades son obligatorias

// READONLY<T>
// ===========
// Readonly<T> es como un candado mágico 🔒 que protege todas las propiedades
// de un objeto para que no puedan ser modificadas después de su creación

// 1. 🎮 Configuración de Juego
interface ConfiguracionJuego {
    dificultad: 'fácil' | 'medio' | 'difícil';
    puntuacionMaxima: number;
    vidas: number;
    nombreJugador: string;
}

// Hacemos la configuración inmutable
type ConfiguracionSegura = Readonly<ConfiguracionJuego>;

const config: ConfiguracionSegura = {
    dificultad: 'medio',
    puntuacionMaxima: 1000,
    vidas: 3,
    nombreJugador: 'Jugador1'
};

// ❌ Esto causará un error
// config.vidas = 5;                // Error: Cannot assign to 'vidas' because it is a read-only property
// config.dificultad = 'fácil';     // Error: Cannot assign to 'dificultad' because it is a read-only property

// 2. 🎨 Array Inmutable de Colores
const coloresPaleta: Readonly<string[]> = ['rojo', 'azul', 'verde'];
// ❌ Estos métodos no están permitidos:
// coloresPaleta.push('amarillo');  // Error: Property 'push' does not exist on type 'readonly string[]'
// coloresPaleta[0] = 'negro';      // Error: Index signature in type 'readonly string[]' only permits reading

// 3. 🎯 Objeto Anidado
interface JugadorEstadisticas {
    nombre: string;
    puntuaciones: {
        nivel1: number;
        nivel2: number;
    };
}

// Readonly superficial (shallow)
type JugadorReadonly = Readonly<JugadorEstadisticas>;

const jugador: JugadorReadonly = {
    nombre: "Mario",
    puntuaciones: {
        nivel1: 100,
        nivel2: 200
    }
};

// ❌ No podemos modificar propiedades de primer nivel
// jugador.nombre = "Luigi";        // Error: Cannot assign to 'nombre' because it is a read-only property

// ✅ Pero sí podemos modificar objetos anidados
jugador.puntuaciones.nivel1 = 150;  // Esto funciona

// 4. 🔒 Readonly Profundo (Deep Readonly)
type RecursivoReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? RecursivoReadonly<T[K]> : T[K];
};

type JugadorTotalmenteInmutable = RecursivoReadonly<JugadorEstadisticas>;

const jugadorSeguro: JugadorTotalmenteInmutable = {
    nombre: "Mario",
    puntuaciones: {
        nivel1: 100,
        nivel2: 200
    }
};

// ❌ Ahora nada se puede modificar
// jugadorSeguro.nombre = "Luigi";                  // Error
// jugadorSeguro.puntuaciones.nivel1 = 150;        // Error

// 5. 🎁 Ejemplo Práctico: Sistema de Logros
interface Logro {
    id: number;
    nombre: string;
    descripcion: string;
    desbloqueado: boolean;
    fecha?: Date;
}

// Creamos un registro inmutable de logros
const logrosJuego: Readonly<Record<string, Logro>> = {
    "primerNivel": {
        id: 1,
        nombre: "Primer Paso",
        descripcion: "Completar el primer nivel",
        desbloqueado: false
    },
    "maestro": {
        id: 2,
        nombre: "Maestro del Juego",
        descripcion: "Completar todos los niveles",
        desbloqueado: false
    }
};

// 6. 🎯 Función que Usa Readonly
function mostrarEstadisticas(stats: Readonly<JugadorEstadisticas>): void {
    console.log(`Jugador: ${stats.nombre}`);
    console.log(`Nivel 1: ${stats.puntuaciones.nivel1}`);
    console.log(`Nivel 2: ${stats.puntuaciones.nivel2}`);
    // Garantizamos que la función no modificará los datos
}

// Readonly<T> es como un guardián mágico 🛡️ que:
// 1. 🔒 Protege los datos de modificaciones accidentales
// 2. 📝 Hace el código más predecible
// 3. 🎯 Mejora la seguridad del tipo
// 4. ⚡ Funciona bien con otros utility types
// 5. 🎮 Es perfecto para configuraciones y datos constantes

// RECORD<K, T>
// ============
// Record<K, T> es como una fábrica de objetos 🏭

// 1. 🏷️ Categorías de Juguetes
type Categoria = 'electrónico' | 'educativo' | 'deportivo';
type Descuento = {
    porcentaje: number;
    fechaFin: Date;
};

// 2. 📊 Registro de Descuentos
type DescuentosPorCategoria = Record<Categoria, Descuento>;

const descuentos: DescuentosPorCategoria = {
    electrónico: { porcentaje: 20, fechaFin: new Date() },
    educativo: { porcentaje: 15, fechaFin: new Date() },
    deportivo: { porcentaje: 10, fechaFin: new Date() }
};

// PICK<T, K>
// ==========
// Pick<T, K> es como un selector mágico 🎯 que elige solo algunas propiedades

// 1. 🛍️ Producto Completo
interface ProductoCompleto {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    imagen: string;
    stock: number;
}

// 2. 🎪 Vista Previa
type VistaPrevia = Pick<ProductoCompleto, 'nombre' | 'imagen' | 'precio'>;

// OMIT<T, K>
// ==========
// Omit<T, K> es como una goma de borrar ✨ que elimina propiedades

// 1. 🎭 Producto Sin Datos Sensibles
type ProductoPublico = Omit<ProductoCompleto, 'id' | 'stock'>;

// EXCLUDE<T, U>
// ============
// Exclude<T, U> es como un filtro mágico 🪄 que remueve tipos

type Colores = 'rojo' | 'azul' | 'verde' | 'amarillo';
type ColoresPrimarios = 'rojo' | 'azul' | 'amarillo';
type ColoresSecundarios = Exclude<Colores, ColoresPrimarios>;
// Resultado: 'verde'

// EXTRACT<T, U>
// ============
// Extract<T, U> es como un imán 🧲 que atrae solo ciertos tipos

type SoloColoresPrimarios = Extract<Colores, ColoresPrimarios>;
// Resultado: 'rojo' | 'azul' | 'amarillo'

// NONNULLABLE<T>
// =============
// NonNullable<T> es como un escudo ⚔️ contra null y undefined

type PosiblesValores = string | number | null | undefined;
type ValoresSegutos = NonNullable<PosiblesValores>;
// Resultado: string | number

// Ejemplo Práctico Combinado
// =========================

// 1. 🎪 Sistema de Inventario
interface Inventario {
    id: number;
    producto: string;
    cantidad: number;
    ubicacion?: string;
    ultimaActualizacion: Date;
}

// 2. 🎯 Diferentes Vistas del Inventario
type InventarioBasico = Pick<Inventario, 'producto' | 'cantidad'>;
type InventarioActualizable = Partial<Omit<Inventario, 'id'>>;
type InventarioRequerido = Required<Inventario>;
type InventarioSoloLectura = Readonly<Inventario>;

// 3. 🏭 Gestión de Múltiples Inventarios
type GestionInventarios = Record<string, Readonly<Inventario>>;

// Los Utility Types son como una caja de herramientas mágica que:
// 1. 🎨 Transforman tipos existentes
// 2. 🛠️ Facilitan el manejo de datos
// 3. 🔒 Mejoran la seguridad del código
// 4. ✨ Hacen el código más mantenible
// 5. 📦 Permiten reutilizar tipos de forma flexible

// AUTOCOMPLETE LITERAL UNIONS WITH PRIMITIVES
// =========================================
// Las uniones literales con autocompletado son como una varita mágica 🪄
// que nos permite combinar valores específicos con tipos primitivos

// 1. 🎨 Tamaños Predefinidos con Flexibilidad
type TamañoJuguete = 'pequeño' | 'mediano' | 'grande' | (string & {});
// El (string & {}) permite cualquier string además de los predefinidos

// Función auxiliar para calcular precios personalizados
function calcularPrecioPersonalizado(tamaño: string): number {
    // Convertimos el tamaño a centímetros para el cálculo
    const tamañoNumerico = parseInt(tamaño);
    if (!isNaN(tamañoNumerico)) {
        return Math.max(10, tamañoNumerico * 0.5); // 0.5 por centímetro
    }
    return 15; // precio por defecto
}

function calcularPrecio(tamaño: TamañoJuguete): number {
    switch(tamaño) {
        case 'pequeño': return 10;
        case 'mediano': return 20;
        case 'grande': return 30;
        default: 
            // Para tamaños personalizados
            return calcularPrecioPersonalizado(tamaño);
    }
}

// 2. 🎮 Niveles de Dificultad
type Dificultad = 'fácil' | 'normal' | 'difícil' | (string & {});

const configurarJuego = (dificultad: Dificultad) => {
    if (dificultad === 'fácil') return { vidas: 5, tiempo: 300 };
    if (dificultad === 'normal') return { vidas: 3, tiempo: 200 };
    if (dificultad === 'difícil') return { vidas: 1, tiempo: 100 };
    // Para dificultades personalizadas
    return { vidas: 2, tiempo: 150 };
};

// 3. 🎯 Estilos de Margen
type Margen = 'sm' | 'md' | 'lg' | (string & {});

const obtenerMargen = (tamaño: Margen): string => {
    const margenes = {
        sm: '8px',
        md: '16px',
        lg: '24px'
    };
    // Si es un valor predefinido, lo usamos
    if (tamaño in margenes) {
        return margenes[tamaño as keyof typeof margenes];
    }
    // Si no, asumimos que es un valor válido de CSS
    return tamaño;
};

// 4. 🎨 Sistema de Colores
type ColorBase = 'primario' | 'secundario' | 'acento' | (string & {});

interface EstilosBoton {
    color: ColorBase;
    tamaño: TamañoJuguete;
}

// Ejemplo de uso combinado:
const crearBoton = (estilos: EstilosBoton) => {
    const color = estilos.color === 'primario' ? '#007bff' :
                 estilos.color === 'secundario' ? '#6c757d' :
                 estilos.color === 'acento' ? '#28a745' :
                 estilos.color; // Valor personalizado

    return {
        backgroundColor: color,
        padding: obtenerMargen(estilos.tamaño as Margen)
    };
};

// 5. 🎁 Ejemplo Práctico: Sistema de Animaciones
type AnimacionPredefinida = 'fadeIn' | 'slideUp' | 'bounce' | (string & {});

interface ConfiguracionAnimacion {
    tipo: AnimacionPredefinida;
    duracion?: number;
}

function animar(elemento: string, config: ConfiguracionAnimacion) {
    const duracionBase = {
        fadeIn: 300,
        slideUp: 500,
        bounce: 800
    };

    const duracion = config.duracion ?? 
        (config.tipo in duracionBase ? 
            duracionBase[config.tipo as keyof typeof duracionBase] : 
            400);

    console.log(`Animando ${elemento} con ${config.tipo} durante ${duracion}ms`);
}

// Ejemplos de uso:
animar("botón", { tipo: 'fadeIn' });                    // ✅ Usa preset
animar("modal", { tipo: 'slideUp', duracion: 1000 });   // ✅ Usa preset con duración personalizada
animar("menú", { tipo: 'customSlide' });                // ✅ Usa animación personalizada

// Las uniones literales con autocompletado nos permiten:
// 1. 🎯 Tener valores predefinidos con autocompletado
// 2. 🎨 Permitir valores personalizados cuando sea necesario
// 3. 📝 Mantener la seguridad de tipos
// 4. ✨ Combinar flexibilidad con estructura
// 5. 🔍 Facilitar el desarrollo con sugerencias del IDE

//UNDEFINED VS OPTIONAL
// ===================
// Undefined vs Optional son como dos hechizos diferentes 🪄 para manejar valores que podrían no existir

// 1. 🎯 Undefined: El valor existe pero no está definido
interface JugadorPerfil {
    nombre: string;
    puntaje: number;
    ultimaPartida: undefined | Date;  // Debe existir la propiedad, pero puede ser undefined
}

// Ejemplo de uso:
const jugadorNuevo: JugadorPerfil = {
    nombre: "Mario",
    puntaje: 0,
    ultimaPartida: undefined        // ✅ Debemos especificar undefined
};

// 2. 🎨 Optional: La propiedad puede o no existir
interface JugadorConfig {
    nombre: string;
    puntaje: number;
    ultimaPartida?: Date;          // La propiedad es completamente opcional
}

// Ejemplo de uso:
const jugadorOptional: JugadorConfig = {
    nombre: "Luigi",
    puntaje: 100                   // ✅ No necesitamos incluir ultimaPartida
};

// 3. 🎮 Comparación Práctica
interface PowerUp {
    nombre: string;
    duracion: number;
    efecto?: string;              // Optional: Puede no existir
    cooldown: undefined | number;  // Undefined: Debe existir, pero puede ser undefined
}

// Ejemplos de uso:
const estrella: PowerUp = {
    nombre: "Estrella",
    duracion: 10,
    efecto: "Invencibilidad",     // ✅ Opcional, podemos incluirlo
    cooldown: 30                   // ✅ Debe existir, tiene un valor
};

const hongo: PowerUp = {
    nombre: "Hongo",
    duracion: 5,
    // efecto: no incluido        // ✅ OK: es opcional
    cooldown: undefined           // ✅ Debe incluirse aunque sea undefined
};

// 4. 🎯 Funciones con Parámetros Opcionales vs Undefined
// Con parámetro opcional
function activarPowerUp(nombre: string, duracion?: number) {
    console.log(`Activando ${nombre} por ${duracion ?? 5} segundos`);
}

// Con parámetro undefined
function desactivarPowerUp(nombre: string, cooldown: number | undefined) {
    console.log(`Desactivando ${nombre}${cooldown ? ` por ${cooldown} segundos` : ''}`);
}

// Uso:
activarPowerUp("Estrella");           // ✅ OK: duracion es opcional
activarPowerUp("Hongo", 10);          // ✅ OK: podemos pasar duracion

desactivarPowerUp("Estrella", 30);    // ✅ OK: pasamos cooldown
desactivarPowerUp("Hongo", undefined); // ✅ OK: debemos pasar undefined explícitamente

// 5. 🎨 Ejemplo Práctico: Sistema de Inventario
interface ItemInventario {
    id: number;
    nombre: string;
    descripcion?: string;         // Optional: Algunos items no necesitan descripción
    equipado: boolean | undefined; // Undefined: Debe existir la propiedad
}

// Función que maneja items
function procesarItem(item: ItemInventario) {
    console.log(`Procesando ${item.nombre}`);
    
    // Con opcional usamos '?'
    if (item.descripcion?.includes('raro')) {
        console.log('¡Item raro encontrado!');
    }

    // Con undefined usamos comparación directa
    if (item.equipado === undefined) {
        console.log('Estado de equipo no determinado');
    }
}

// Diferencias Clave entre Optional y Undefined:
// 1. 🎯 Optional (?):
//    - La propiedad puede no existir en el objeto
//    - No necesitas declarar la propiedad
//    - Perfecto para datos opcionales realmente no necesarios

// 2. 🎨 Undefined:
//    - La propiedad debe existir en el objeto
//    - Debes declarar explícitamente undefined
//    - Útil cuando necesitas rastrear si un valor fue establecido

// 3. 📝 Cuándo usar cada uno:
//    - Optional (?): Para propiedades verdaderamente opcionales
//    - Undefined: Cuando necesitas distinguir entre "no establecido" y "no existe"

// 4. ⚡ Beneficios:
//    - Mejor control de flujo de datos
//    - Código más seguro y predecible
//    - Mejor manejo de casos edge

// SATISFIES OPËRATOR   
// ===================
// El operador satisfies es como un detector mágico 🔍 que verifica si un tipo cumple con un patrón específico

// 1. 🎮 Catálogo de Juguetes
type TipoJuguete = 'peluche' | 'construccion' | 'educativo';

interface InfoJuguete {
    nombre: string;
    precio: number;
    edad: number[];
}

const catalogoJuguetes = {
    osito: {
        nombre: 'Osito Feliz',
        precio: 29.99,
        edad: [3, 8],
        tipo: 'peluche' as const
    },
    legos: {
        nombre: 'Set Constructor',
        precio: 49.99,
        edad: [6, 12],
        tipo: 'construccion' as const
    }
} satisfies Record<string, InfoJuguete & { tipo: TipoJuguete }>;

// ✅ TypeScript infiere correctamente los tipos
const precioOsito = catalogoJuguetes.osito.precio;  // number
const tipoLegos = catalogoJuguetes.legos.tipo;      // 'construccion'

// 2. 🎨 Sistema de Temas
type TemaColor = {
    primario: string;
    secundario: string;
    acento?: string;
};

const temas = {
    claro: {
        primario: '#ffffff',
        secundario: '#f0f0f0',
        acento: '#007bff'
    },
    oscuro: {
        primario: '#000000',
        secundario: '#1a1a1a',
        acento: '#00ff00'
    }
} satisfies Record<string, TemaColor>;

// 3. 🎲 Sistema de Logros con Validación
type LogroTipo = 'facil' | 'medio' | 'dificil';
type LogroEstado = 'bloqueado' | 'desbloqueado' | 'en_progreso';

const sistemaDeLoros = {
    primerNivel: {
        nombre: 'Primera Victoria',
        tipo: 'facil',
        estado: 'desbloqueado',
        puntos: 100
    },
    maestro: {
        nombre: 'Maestro del Juego',
        tipo: 'dificil',
        estado: 'bloqueado',
        puntos: 1000
    }
} satisfies Record<string, {
    nombre: string;
    tipo: LogroTipo;
    estado: LogroEstado;
    puntos: number;
}>;

// 4. 🎯 Configuración de Animaciones
const animaciones = {
    entrada: {
        duracion: 300,
        tipo: 'fade' as const,
        easingFn: (t: number) => t * t
    },
    salida: {
        duracion: 200,
        tipo: 'slide' as const,
        easingFn: (t: number) => 1 - Math.pow(1 - t, 2)
    }
} satisfies Record<string, {
    duracion: number;
    tipo: 'fade' | 'slide';
    easingFn: (t: number) => number;
}>;

// 5. 🎁 Sistema de Inventario con Validación de Tipos
interface ItemBase {
    id: number;
    nombre: string;
    cantidad: number;
}

const inventarioJuego = {
    pociones: {
        id: 1,
        nombre: 'Poción de Vida',
        cantidad: 5,
        efecto: 'curación',
        duracion: 10
    },
    llaves: {
        id: 2,
        nombre: 'Llave Maestra',
        cantidad: 1,
        tipo: 'oro'
    }
} satisfies Record<string, ItemBase & Record<string, unknown>>;

// Beneficios del operador satisfies:
// 1. 🔍 Validación de tipos en tiempo de compilación
// 2. 🎯 Inferencia precisa de tipos
// 3. 🔒 Seguridad de tipos sin perder flexibilidad
// 4. ✨ Mejor autocompletado en el IDE
// 5. 🛡️ Detección temprana de errores

// Casos de uso comunes:
// 1. 📝 Validación de objetos literales
// 2. 🎨 Sistemas de configuración
// 3. 🎮 Gestión de estados
// 4. 🎯 Validación de datos estructurados
// 5. 🔍 Tipado de objetos complejos

// PROPERTYKEY
// ============
// PropertyKey es como un selector mágico 🔍 que nos permite acceder a las propiedades de un objeto
// Es la unión de string | number | symbol

// 1. 🎮 Sistema de Juguetes
interface Juguete {
    nombre: string;
    [precio: number]: number;     // índice numérico
    [detalle: string]: any;       // índice string
    [Symbol.iterator]: () => Iterator<string>; // símbolo
}

// Ejemplo de uso con PropertyKey
function accederPropiedad(juguete: Juguete, clave: PropertyKey) {
    return juguete[clave as keyof Juguete];
}

// 2. 🎨 Mapa de Colores con Diferentes Tipos de Claves
const coloresJuguete = {
    1: 'rojo',                    // clave numérica
    'primario': 'azul',           // clave string
    [Symbol.for('especial')]: 'dorado'  // clave symbol
};

type ClaveColor = keyof typeof coloresJuguete;  // number | string | symbol

// 3. 🎲 Sistema de Puntuación
class SistemaPuntos {
    private puntos: Record<PropertyKey, number> = {};

    asignarPuntos(identificador: PropertyKey, cantidad: number) {
        this.puntos[identificador] = cantidad;
    }

    obtenerPuntos(identificador: PropertyKey): number {
        return this.puntos[identificador] || 0;
    }
}

// 4. 🎯 Registro de Eventos
const registroJuego = new Map<PropertyKey, string>();

// Podemos usar diferentes tipos de claves
registroJuego.set('inicio', 'Juego iniciado');           // string
registroJuego.set(1, 'Primer nivel completado');         // number
registroJuego.set(Symbol.for('secreto'), 'Bonus encontrado');  // symbol

// 5. 🎁 Inventario Flexible
class InventarioAvanzado {
    private items = new Map<PropertyKey, unknown>();

    guardar(clave: PropertyKey, valor: unknown) {
        this.items.set(clave, valor);
    }

    obtener<T>(clave: PropertyKey): T | undefined {
        return this.items.get(clave) as T;
    }
}

// Ejemplo de uso:
const inventarioMagico = new InventarioAvanzado();
inventarioMagico.guardar('pocion', { tipo: 'vida', poder: 50 });
inventarioMagico.guardar(1, 'espada mágica');
inventarioMagico.guardar(Symbol.for('secreto'), 'item legendario');

// 6. 🎮 Sistema de Logros con Claves Dinámicas
interface LogroJuego {
    titulo: string;
    puntos: number;
}

class GestorLogros {
    private logros: Partial<Record<PropertyKey, LogroJuego>> = {};

    agregarLogro(clave: PropertyKey, logro: LogroJuego) {
        this.logros[clave] = logro;
    }

    obtenerLogro(clave: PropertyKey): LogroJuego | undefined {
        return this.logros[clave];
    }
}

// Beneficios de PropertyKey:
// 1. 🔍 Flexibilidad en tipos de claves
// 2. 🎯 Seguridad de tipos
// 3. 🔒 Compatibilidad con diferentes estructuras de datos
// 4. ✨ Soporte para símbolos únicos
// 5. 📝 Mejor interoperabilidad

// Casos de uso comunes:
// 1. 📊 Mapas y diccionarios flexibles
// 2. 🎨 Sistemas de configuración
// 3. 🎮 Gestión de estados
// 4. 🎯 Sistemas de eventos
// 5. 🔍 Acceso dinámico a propiedades

// THISTYPE<T> UTILITY TYPE
// =========================
// ThisType<T> es como un guía mágico 🧭 que nos permite especificar el tipo de 'this' en funciones

// 1. 🎮 Personaje de Juego
interface EstadoPersonaje {
    vida: number;
    energia: number;
    nivel: number;
}

interface AccionesPersonaje {
    atacar(): void;
    curar(): void;
    subirNivel(): void;
}

// Implementación del personaje usando ThisType
const personajeMixin: AccionesPersonaje & ThisType<EstadoPersonaje & AccionesPersonaje> = {
    atacar() {
        this.energia -= 10;
        console.log(`Ataque realizado! Energía restante: ${this.energia}`);
    },
    curar() {
        if (this.energia >= 20) {
            this.vida += 50;
            this.energia -= 20;
            console.log(`Curación realizada! Vida: ${this.vida}, Energía: ${this.energia}`);
        }
    },
    subirNivel() {
        this.nivel += 1;
        this.vida += 20;
        this.energia = 100;
        console.log(`¡Nivel ${this.nivel} alcanzado!`);
    }
};

// 2. 🎨 Sistema de Temas con Estado
interface EstadoTema {
    colorPrimario: string;
    colorSecundario: string;
    modo: 'claro' | 'oscuro';
}

interface AccionesTema {
    cambiarModo(): void;
    actualizarColor(tipo: 'primario' | 'secundario', color: string): void;
}

const temaControlador: AccionesTema & ThisType<EstadoTema & AccionesTema> = {
    cambiarModo() {
        this.modo = this.modo === 'claro' ? 'oscuro' : 'claro';
        this.colorPrimario = this.modo === 'claro' ? '#ffffff' : '#000000';
        this.colorSecundario = this.modo === 'claro' ? '#f0f0f0' : '#1a1a1a';
    },
    actualizarColor(tipo, color) {
        if (tipo === 'primario') {
            this.colorPrimario = color;
        } else {
            this.colorSecundario = color;
        }
    }
};

// 3. 🎲 Sistema de Inventario
interface EstadoInventario {
    items: Map<string, number>;
    capacidad: number;
    oro: number;
}

interface AccionesInventario {
    agregarItem(item: string, cantidad: number): boolean;
    removerItem(item: string, cantidad: number): boolean;
    comprarCapacidad(): void;
}

const inventarioControlador: AccionesInventario & ThisType<EstadoInventario & AccionesInventario> = {
    agregarItem(item, cantidad) {
        const itemsActuales = this.items.get(item) || 0;
        const totalItems = [...this.items.values()].reduce((a, b) => a + b, 0);
        
        if (totalItems + cantidad <= this.capacidad) {
            this.items.set(item, itemsActuales + cantidad);
            return true;
        }
        return false;
    },
    removerItem(item, cantidad) {
        const itemsActuales = this.items.get(item) || 0;
        if (itemsActuales >= cantidad) {
            this.items.set(item, itemsActuales - cantidad);
            return true;
        }
        return false;
    },
    comprarCapacidad() {
        const costo = Math.floor(this.capacidad * 10);
        if (this.oro >= costo) {
            this.oro -= costo;
            this.capacidad += 5;
            console.log(`¡Capacidad aumentada a ${this.capacidad}!`);
        }
    }
};

// 4. 🎯 Sistema de Logros
interface EstadoLogros {
    logrosDesbloqueados: Set<string>;
    puntosTotales: number;
    ultimoLogro?: string;
}

interface AccionesLogros {
    desbloquearLogro(logro: string, puntos: number): void;
    verificarLogro(logro: string): boolean;
    obtenerResumen(): string;
}

const logrosControlador: AccionesLogros & ThisType<EstadoLogros & AccionesLogros> = {
    desbloquearLogro(logro, puntos) {
        if (!this.logrosDesbloqueados.has(logro)) {
            this.logrosDesbloqueados.add(logro);
            this.puntosTotales += puntos;
            this.ultimoLogro = logro;
            console.log(`¡Logro desbloqueado: ${logro}! +${puntos} puntos`);
        }
    },
    verificarLogro(logro) {
        return this.logrosDesbloqueados.has(logro);
    },
    obtenerResumen() {
        return `Logros: ${this.logrosDesbloqueados.size}, Puntos: ${this.puntosTotales}`;
    }
};

// 5. 🎮 Ejemplo de Uso Combinado
function crearJuego<T, A>(estado: T, acciones: A & ThisType<T & A>): T & A {
    return Object.assign({}, estado, acciones);
}

const jugadorPrincipal = crearJuego(
    {
        vida: 100,
        energia: 100,
        nivel: 1
    },
    personajeMixin
);

// Beneficios de ThisType:
// 1. 🔍 Tipado seguro para this
// 2. 🎯 Mejor autocompletado en el IDE
// 3. 🔒 Prevención de errores en tiempo de compilación
// 4. ✨ Composición flexible de objetos
// 5. 📝 Código más mantenible

// Casos de uso comunes:
// 1. 🎮 Sistemas de juegos
// 2. 🎨 Gestores de estado
// 3. 🎲 Mixins y composición
// 4. 🎯 Controladores de UI
// 5. 🔍 APIs fluidas

//AWAITED<T> UTILITY TYPE
// ======================
// Awaited<T> es como un guía mágico 🧭 que nos permite esperar a que un valor se resuelva

// 1. 🎮 Carga de Recursos del Juego
type RecursoJuego = {
    nombre: string;
    tamaño: number;
    tipo: 'textura' | 'sonido' | 'modelo';
};

// Promise simple
type PromesaRecurso = Promise<RecursoJuego>;
type RecursoResuelto = Awaited<PromesaRecurso>; // RecursoJuego

// Promise anidada
type PromesaAnidada = Promise<Promise<RecursoJuego>>;
type RecursoAnidadoResuelto = Awaited<PromesaAnidada>; // RecursoJuego

// 2. 🎲 Sistema de Misiones
interface Mision {
    id: number;
    nombre: string;
    recompensa: number;
}

// Función que devuelve una promesa de misión
async function obtenerMision(id: number): Promise<Mision> {
    return {
        id,
        nombre: "Misión Secreta",
        recompensa: 1000
    };
}

// Tipo inferido de la promesa
type ResultadoMision = Awaited<ReturnType<typeof obtenerMision>>; // Mision

// 3. 🎯 Sistema de Logros Asíncrono
interface LogroAsync {
    nombre: string;
    puntos: number;
    desbloquearSiguiente: Promise<LogroAsync | null>;
}

// Resolviendo promesas en cadena
type LogroResuelto = Awaited<LogroAsync['desbloquearSiguiente']>; // LogroAsync | null

// 4. 🎨 Cargador de Temas
type TemaJuego = {
    nombre: string;
    colores: {
        primario: string;
        secundario: string;
    };
};

// Función que carga temas de forma asíncrona
async function cargarTema(nombre: string): Promise<Promise<TemaJuego>> {
    return Promise.resolve({
        nombre,
        colores: {
            primario: '#ff0000',
            secundario: '#00ff00'
        }
    });
}

type TemaResuelto = Awaited<ReturnType<typeof cargarTema>>; // TemaJuego

// 5. 🎮 Sistema de Guardado
interface DatosGuardado {
    personaje: {
        nivel: number;
        experiencia: number;
    };
    inventario: string[];
}

// Función que carga datos guardados
async function cargarPartida(): Promise<Promise<Promise<DatosGuardado>>> {
    return Promise.resolve(Promise.resolve({
        personaje: {
            nivel: 1,
            experiencia: 0
        },
        inventario: []
    }));
}

// Awaited resuelve todas las promesas anidadas
type DatosPartida = Awaited<ReturnType<typeof cargarPartida>>; // DatosGuardado

// 6. 🎲 Ejemplo Práctico: Sistema de Recompensas
interface Recompensa {
    tipo: 'oro' | 'item' | 'experiencia';
    cantidad: number;
}

// Función que genera recompensas aleatorias
async function generarRecompensa(): Promise<Promise<Recompensa[]>> {
    return Promise.resolve([
        { tipo: 'oro', cantidad: 100 },
        { tipo: 'experiencia', cantidad: 500 }
    ]);
}

type RecompensasResueltas = Awaited<ReturnType<typeof generarRecompensa>>; // Recompensa[]

// Ejemplo de uso:
async function procesarRecompensas() {
    const recompensas: RecompensasResueltas = await generarRecompensa();
    console.log('Recompensas obtenidas:', recompensas);
}

// Beneficios de Awaited:
// 1. 🔍 Resolución automática de promesas anidadas
// 2. 🎯 Inferencia precisa de tipos
// 3. 🔒 Manejo seguro de tipos asíncronos
// 4. ✨ Mejor legibilidad del código
// 5. 📝 Código más mantenible

// Casos de uso comunes:
// 1. 🎮 Carga de recursos
// 2. 🎲 Sistemas asíncronos
// 3. 🎯 Manejo de datos en cadena
// 4. 🎨 Carga de configuraciones
// 5. 🔍 APIs y servicios web

// STRING MANIPULATION UTILITIES
// =============================
// Las utilidades de manipulación de cadenas son como un selector mágico 🎯 que nos permite 
// transformar y combinar texto de formas poderosas

// 1. 🎨 Concatenación de Cadenas con Template Literals
type Saludo = 'Hola' | 'Adiós';
type Nombre = 'Mario' | 'Luigi' | 'Peach';
type MensajeSaludo = `${Saludo}, ${Nombre}!`;  // 'Hola, Mario!' | 'Hola, Luigi!' | etc.

// 2. 🔠 Manipulación de Casos
type NombreJuego = 'super mario' | 'zelda' | 'pokemon';
type TituloJuego = Uppercase<NombreJuego>;     // 'SUPER MARIO' | 'ZELDA' | 'POKEMON'
type CodigoJuego = Lowercase<'MARIO123'>;      // 'mario123'
type NombrePropio = Capitalize<NombreJuego>;   // 'Super mario' | 'Zelda' | 'Pokemon'
type MinusculaInicial = Uncapitalize<'Mario'>; // 'mario'

// 3. 🗂️ Rutas y URLs
type Ruta = '/juegos' | '/niveles' | '/perfil';
type ID = '123' | '456' | '789';
type RutaCompleta = `${Ruta}/${ID}`;          // '/juegos/123' | '/juegos/456' | etc.

// 4. 📝 Sistema de Mensajes del Juego
type TipoMensaje = 'error' | 'éxito' | 'info';
type Accion = 'guardar' | 'cargar' | 'actualizar';
type MensajeSistema = `[${TipoMensaje}]: No se pudo ${Accion} el juego`;

// 5. 🎮 Eventos del Juego
type EventoJuego = 'inicio' | 'pausa' | 'fin';
type Jugador = 'J1' | 'J2';
type LogEvento = `${Uppercase<EventoJuego>}_${Uppercase<Jugador>}`;  // 'INICIO_J1' | 'PAUSA_J1' | etc.

// 6. 🎲 Sistema de Logros
interface LogroBase {
    nombre: string;
    descripcion: string;
}

type LogroFormateado<T extends LogroBase> = {
    [K in keyof T as `logro_${string & K}`]: T[K];
};

// 7. 📱 Validación de Formatos
type FormatoTelefono = `+${number}`;
type FormatoColor = `#${string}`;
type FormatoVersion = `${number}.${number}.${number}`;

// 8. 🎯 Ejemplo Práctico: Sistema de Notificaciones
type NivelPrioridad = 'alta' | 'media' | 'baja';
type EstadoTarea = 'pendiente' | 'en_proceso' | 'completado';

type NotificacionJuego = `[${Capitalize<NivelPrioridad>}] ${string} - ${Uppercase<EstadoTarea>}`;

// Ejemplos válidos:
const notificacion1: NotificacionJuego = '[Alta] Nueva misión disponible - PENDIENTE';
const notificacion2: NotificacionJuego = '[Media] Logro desbloqueado - COMPLETADO';

// 9. 🎨 Sistema de Temas
type ModoTema = 'claro' | 'oscuro';
type TipoComponente = 'botón' | 'menú' | 'panel';

type ClaseCSS = `tema-${ModoTema}__${TipoComponente}`;
// Resultado: 'tema-claro__botón' | 'tema-claro__menú' | etc.

// 10. 🔍 Utilidad para Rutas API
type MetodoHTTP = 'GET' | 'POST' | 'PUT' | 'DELETE';
type RecursoAPI = 'usuarios' | 'partidas' | 'logros';
type VersionAPI = 'v1' | 'v2';

type RutaAPI = `/${VersionAPI}/api/${RecursoAPI}`;
type EndpointAPI = `${Uppercase<MetodoHTTP>} ${RutaAPI}`;
// Ejemplos: 'GET /v1/api/usuarios' | 'POST /v2/api/partidas'

// Beneficios de las String Utilities:
// 1. 🎯 Tipado fuerte para cadenas
// 2. 🔍 Validación en tiempo de compilación
// 3. ✨ Autocompletado inteligente
// 4. 🔒 Prevención de errores
// 5. 📝 Código más mantenible

// Casos de uso comunes:
// 1. 🌐 URLs y rutas
// 2. 📨 Mensajes y notificaciones
// 3. 🎨 Clases CSS
// 4. 🔑 Generación de IDs
// 5. 🎨 Formateo de texto

// MAPPED TYPES AS CLAUSES
// =======================
// Las cláusulas de tipos mapeados son como un selector mágico 🎯 que nos permite 
// transformar y renombrar propiedades de tipos de forma poderosa

// 1. 🎮 Sistema de Eventos del Juego
interface EventosJuego {
    moverJugador: (x: number, y: number) => void;
    atacar: (objetivo: string) => void;
    recogerItem: (item: string) => void;
}

// Convertir eventos en handlers
type ManejadoresEventos = {
    [K in keyof EventosJuego as `handle${Capitalize<string & K>}`]: EventosJuego[K]
};
// Resultado:
// {
//     handleMoverJugador: (x: number, y: number) => void;
//     handleAtacar: (objetivo: string) => void;
//     handleRecogerItem: (item: string) => void;
// }

// 2. 🎲 Sistema de Estadísticas
interface EstadisticasJugador {
    vida: number;
    mana: number;
    velocidad: number;
    fuerza: number;
}

// Crear getters y setters
type EstadisticasAccesores = {
    [K in keyof EstadisticasJugador as `get${Capitalize<string & K>}`]: () => EstadisticasJugador[K]
} & {
    [K in keyof EstadisticasJugador as `set${Capitalize<string & K>}`]: (valor: EstadisticasJugador[K]) => void
};

// 3. 🎯 Filtrado de Propiedades por Tipo
interface ConfiguracionJuegoNueva {
    nombre: string;
    dificultad: 'fácil' | 'normal' | 'difícil';
    puntuacionMaxima: number;
    activado: boolean;
}

// Filtrar solo propiedades string
type PropiedadesString = {
    [K in keyof ConfiguracionJuegoNueva as ConfiguracionJuegoNueva[K] extends string ? K : never]: ConfiguracionJuegoNueva[K]
};
// Resultado: { nombre: string, dificultad: 'fácil' | 'normal' | 'difícil' }

// 4. 🎨 Sistema de Validación
interface DatosJugador {
    nombre: string;
    edad: number;
    email: string;
}

// Crear validadores
type Validadores = {
    [K in keyof DatosJugador as `validar${Capitalize<string & K>}`]: (valor: DatosJugador[K]) => boolean
};

const validadores: Validadores = {
    validarNombre: (nombre) => nombre.length >= 3,
    validarEdad: (edad) => edad >= 18,
    validarEmail: (email) => email.includes('@')
};

// 5. 🎮 Sistema de Prefijos para Debug
interface AccionesJuego {
    saltar: () => void;
    correr: () => void;
    atacar: () => void;
}

// Agregar prefijo de debug
type AccionesDebug = {
    [K in keyof AccionesJuego as `debug_${string & K}`]: () => string
};

// 6. 🎲 Sistema de Eventos con Metadata
interface Eventos {
    login: { usuario: string; tiempo: Date };
    logout: { usuario: string; duracion: number };
    error: { codigo: number; mensaje: string };
}

// Crear tipos de eventos con metadata
type EventosConMetadata = {
    [K in keyof Eventos as `${string & K}Event`]: {
        tipo: K;
        timestamp: Date;
        datos: Eventos[K];
    }
};

// 7. 🎯 Sistema de Transformación de Datos
interface DatosEntrada {
    nombreUsuario: string;
    puntajeTotal: number;
    ultimoAcceso: Date;
}

// Crear transformadores
type Transformadores = {
    [K in keyof DatosEntrada as `transformar${Capitalize<string & K>}`]: (valor: DatosEntrada[K]) => string
};

// 8. 🎨 Sistema de UI Components
interface ComponentesBase {
    boton: { texto: string; onClick: () => void };
    input: { valor: string; onChange: (valor: string) => void };
    panel: { contenido: string; visible: boolean };
}

// Crear wrappers de componentes
type ComponentesWrapper = {
    [K in keyof ComponentesBase as `with${Capitalize<string & K>}Wrapper`]: (props: ComponentesBase[K]) => ComponentesBase[K]
};

// 9. 🎮 Sistema de Logros con Estado
interface LogrosJuego {
    primeraNivel: boolean;
    jefeDerrotado: boolean;
    coleccionCompleta: boolean;
}

// Crear observadores de logros
type ObservadoresLogros = {
    [K in keyof LogrosJuego as `on${Capitalize<string & K>}Changed`]: (nuevo: boolean, anterior: boolean) => void
};

// 10. 📊 Sistema de Métricas
interface MetricasJuego {
    tiempoJugado: number;
    enemigosDestruidos: number;
    itemsRecolectados: number;
}

// Crear recolectores de métricas
type RecolectoresMetricas = {
    [K in keyof MetricasJuego as `track${Capitalize<string & K>}`]: (valor: MetricasJuego[K]) => void
} & {
    [K in keyof MetricasJuego as `get${Capitalize<string & K>}Average`]: () => number
};

// Beneficios de Mapped Types con as:
// 1. 🎯 Transformación flexible de nombres de propiedades
// 2. 🔍 Filtrado de propiedades por tipo
// 3. 🎨 Generación automática de tipos relacionados
// 4. ✨ Mejor organización del código
// 5. 📝 Mantenimiento más sencillo

// Casos de uso comunes:
// 1. 🎮 Sistemas de eventos
// 2. 🎲 Validación de datos
// 3. 🎯 Transformación de tipos
// 4. 🎨 Generación de API
// 5. 📊 Sistemas de métricas

// TYPESCRIPT UNIONS VS INTERSECTION MENTAL MODEL
// =============================================
// Las uniones (|) son como opciones múltiples 🎯, mientras que las intersecciones (&) son como combinaciones 🔄

// 1. 🎮 Uniones Básicas
type DireccionJuego = 'arriba' | 'abajo' | 'izquierda' | 'derecha';
type NivelDificultad = 'fácil' | 'normal' | 'difícil';
type PuntajeJuego = number | 'N/A';  // Puede ser número o texto

// Ejemplo de uso:
function moverJugador(direccion: DireccionJuego) {
    console.log(`Moviendo jugador hacia ${direccion}`);
}

// 2. 🎲 Intersecciones Básicas
interface PersonajeBase {
    nombre: string;
    nivel: number;
}

interface HabilidadesBase {
    atacar: () => void;
    defender: () => void;
}

// Combinamos ambas interfaces
type GuerreroBase = PersonajeBase & HabilidadesBase;

const heroe: GuerreroBase = {
    nombre: "Aragorn",
    nivel: 10,
    atacar: () => console.log("¡Ataque con espada!"),
    defender: () => console.log("¡Defensa con escudo!")
};

// 3. 🎯 Uniones Discriminadas
interface MovimientoAtaque {
    tipo: 'ataque';
    daño: number;
    arma: string;
}

interface MovimientoDefensa {
    tipo: 'defensa';
    bloqueo: number;
    escudo: string;
}

type MovimientoJugador = MovimientoAtaque | MovimientoDefensa;

function procesarMovimiento(movimiento: MovimientoJugador) {
    switch (movimiento.tipo) {
        case 'ataque':
            console.log(`Atacando con ${movimiento.arma}, daño: ${movimiento.daño}`);
            break;
        case 'defensa':
            console.log(`Defendiendo con ${movimiento.escudo}, bloqueo: ${movimiento.bloqueo}`);
            break;
    }
}

// 4. 🎨 Intersecciones Complejas
interface EstadoBase {
    id: number;
    activo: boolean;
}

interface Posicion {
    x: number;
    y: number;
}

interface Animacion {
    frameActual: number;
    velocidad: number;
}

// Objeto de juego completo
type ObjetoJuego = EstadoBase & Posicion & Animacion;

// 5. 🎮 Uniones con Null Safety
type ResultadoMisionUnion = {
    completada: true;
    recompensa: number;
} | {
    completada: false;
    razon: string;
};

function procesarMisionUnion(resultado: ResultadoMisionUnion) {
    if (resultado.completada) {
        console.log(`¡Misión completada! Recompensa: ${resultado.recompensa}`);
    } else {
        console.log(`Misión fallida: ${resultado.razon}`);
    }
}

// 6. 🎲 Intersecciones con Genéricos
interface ConVida {
    vida: number;
    maxVida: number;
}

interface ConMana {
    mana: number;
    maxMana: number;
}

interface ConEstamina {
    estamina: number;
    maxEstamina: number;
}

// Creamos diferentes tipos de personajes
type MagoPersonaje = PersonajeBase & ConVida & ConMana;
type GuerreroPersonaje = PersonajeBase & ConVida & ConEstamina;
type ArchiMago = PersonajeBase & ConVida & ConMana & ConEstamina;

// 7. 🎯 Uniones de Funciones
type ManejadorClick = ((x: number, y: number) => void) | (() => void);
type ValidadorDatos = ((valor: string) => boolean) | ((valor: number) => boolean);

// 8. 🎨 Intersecciones de Comportamientos
interface Nadador {
    nadar(): void;
}

interface Volador {
    volar(): void;
}

interface Corredor {
    correr(): void;
}

// Criatura con múltiples habilidades
type CriaturaMagica = Nadador & Volador & Corredor;

const dragon: CriaturaMagica = {
    nadar: () => console.log("Nadando en el lago"),
    volar: () => console.log("Volando por los aires"),
    correr: () => console.log("Corriendo por la tierra")
};

// 9. 🎮 Ejemplo Práctico: Sistema de Inventario
type ItemInventarioComun = {
    tipo: 'comun';
    durabilidad: number;
};

type ItemInventarioMagico = {
    tipo: 'magico';
    poder: number;
    durabilidad: number;
};

type ItemInventarioLegendario = {
    tipo: 'legendario';
    poder: number;
    durabilidad: number;
    efectoEspecial: string;
};

type ItemInventarioUnion = ItemInventarioComun | ItemInventarioMagico | ItemInventarioLegendario;

// 10. 📊 Sistema de Estadísticas Combinado
interface EstadisticasBase {
    nivel: number;
    experiencia: number;
}

interface EstadisticasCombate {
    ataque: number;
    defensa: number;
}

interface EstadisticasMagia {
    poderMagico: number;
    resistenciaMagica: number;
}

// Diferentes builds de personaje
type GuerreroStats = EstadisticasBase & EstadisticasCombate;
type MagoStats = EstadisticasBase & EstadisticasMagia;
type PaladinStats = EstadisticasBase & EstadisticasCombate & EstadisticasMagia;

// Beneficios de Unions vs Intersections:
// 1. 🎯 Unions:
//    - Perfectas para tipos mutuamente excluyentes
//    - Excelentes para modelar estados
//    - Ideales para manejo de errores

// 2. 🔄 Intersections:
//    - Perfectas para combinar tipos
//    - Excelentes para composición
//    - Ideales para mixins y comportamientos

// Casos de uso comunes:
// 1. 🎮 Unions:
//    - Estados de juego
//    - Tipos de items
//    - Resultados de operaciones

// 2. 🎲 Intersections:
//    - Composición de objetos
//    - Sistemas de habilidades
//    - Configuraciones complejas

// TYPESCRIPT ENUMS ARE BAD
// ========================
// Los enums en TypeScript son problemáticos 🚫 y es mejor evitarlos.
// Veamos por qué y qué alternativas tenemos.

// 1. 🎮 Problema: Los Enums No Son Type-Safe
// ❌ Enum tradicional (problemático)
enum DireccionEnum {
    ARRIBA,    // 0
    ABAJO,     // 1
    IZQUIERDA, // 2
    DERECHA    // 3
}

// Esto compila pero es inseguro:
const direccionInsegura: DireccionEnum = 99; // ❌ Acepta cualquier número

// 2. 🎯 Solución: Union de Literales
// ✅ Union type (recomendado)
type Direccion = 'arriba' | 'abajo' | 'izquierda' | 'derecha';

const direccionSegura: Direccion = 'arriba'; // ✅ Type-safe
// const direccionInvalida: Direccion = 'diagonal'; // ❌ Error de tipo

// 3. 🎲 Problema: Enums Generan Código JavaScript
// ❌ Enum genera código en tiempo de ejecución
enum EstadoJuegoEnum {
    INICIANDO,
    JUGANDO,
    PAUSADO,
    TERMINADO
}

// 4. 🎨 Solución: const enum o Union Type
// ✅ const enum (mejor, pero aún no ideal)
const enum EstadoJuegoConst {
    INICIANDO = 'INICIANDO',
    JUGANDO = 'JUGANDO',
    PAUSADO = 'PAUSADO',
    TERMINADO = 'TERMINADO'
}

// ✅ Mejor: Union type con as const
const EstadoJuego = {
    INICIANDO: 'INICIANDO',
    JUGANDO: 'JUGANDO',
    PAUSADO: 'PAUSADO',
    TERMINADO: 'TERMINADO'
} as const;

type EstadoJuego = typeof EstadoJuego[keyof typeof EstadoJuego];

// 5. 🎮 Problema: Enums con Valores Mixtos
// ❌ Enum con tipos mixtos (problemático)
enum PowerUpEnum {
    ESTRELLA = 'estrella',
    HONGO = 1,
    FLOR = 'flor',
    PLUMA = 2
}

// 6. 🎯 Solución: Objetos Tipados
// ✅ Objeto tipado con valores consistentes
const PowerUps = {
    ESTRELLA: 'estrella',
    HONGO: 'hongo',
    FLOR: 'flor',
    PLUMA: 'pluma'
} as const;

type PowerUp = typeof PowerUps[keyof typeof PowerUps];

// 7. 🎲 Ejemplo Práctico: Sistema de Logros
// ❌ Enum tradicional (no recomendado)
enum LogroEnum {
    PRINCIPIANTE = 'PRINCIPIANTE',
    INTERMEDIO = 'INTERMEDIO',
    EXPERTO = 'EXPERTO'
}

// ✅ Objeto tipado (recomendado)
const Logros = {
    PRINCIPIANTE: 'PRINCIPIANTE',
    INTERMEDIO: 'INTERMEDIO',
    EXPERTO: 'EXPERTO'
} as const;

type Logro = typeof Logros[keyof typeof Logros];

// 8. 🎨 Ejemplo: Sistema de Temas
// ✅ Usando union types
type TemaColor = 'claro' | 'oscuro' | 'alto-contraste';

interface ConfiguracionTema {
    tema: TemaColor;
    autoAjuste: boolean;
}

// 9. 🎮 Ejemplo: Estados de Juego
// ✅ Usando objeto tipado
const EstadosJuego = {
    MENU: 'MENU',
    CARGANDO: 'CARGANDO',
    JUGANDO: 'JUGANDO',
    PAUSA: 'PAUSA',
    GAME_OVER: 'GAME_OVER'
} as const;

type EstadoJuegoType = typeof EstadosJuego[keyof typeof EstadosJuego];

// 10. 🎯 Ejemplo: Sistema de Dificultad
// ✅ Usando union type con valores específicos
type NivelDificultad = {
    nombre: 'facil' | 'normal' | 'dificil';
    multiplicadorPuntos: number;
    vidasIniciales: number;
};

const configuracionesDificultad: Record<NivelDificultad['nombre'], Omit<NivelDificultad, 'nombre'>> = {
    facil: { multiplicadorPuntos: 1, vidasIniciales: 5 },
    normal: { multiplicadorPuntos: 2, vidasIniciales: 3 },
    dificil: { multiplicadorPuntos: 3, vidasIniciales: 1 }
};

// Beneficios de NO usar Enums:
// 1. 🔒 Type Safety Total
//    - Sin valores numéricos inesperados
//    - Sin asignaciones inválidas

// 2. 🎯 Mejor Inferencia de Tipos
//    - TypeScript puede inferir los tipos exactos
//    - Mejor autocompletado en el IDE

// 3. ⚡ Mejor Rendimiento
//    - Sin código adicional en tiempo de ejecución
//    - Bundle size más pequeño

// 4. 📝 Código más Mantenible
//    - Valores explícitos
//    - Menos sorpresas en runtime

// 5. 🔍 Mejor Debuggeo
//    - Valores serializables
//    - Más fácil de depurar

// Alternativas Recomendadas:
// 1. 🎯 Union Types
//    - Para conjuntos simples de valores
//    - Excelente type safety

// 2. 🎨 Objetos const
//    - Para valores con metadata
//    - Buena experiencia de desarrollo

// 3. 🎮 Union Types + Records
//    - Para mapeos complejos
//    - Máxima flexibilidad

// 4. 📊 Template Literal Types
//    - Para valores basados en patrones
//    - Validación en tiempo de compilación







