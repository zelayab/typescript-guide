/**
 * EJEMPLOS DE MEJORES PRÁCTICAS DE TYPESCRIPT 📚
 * ========================================
 */

// 1. MANEJO DE NULLABLES 🎯
// ======================

// ✅ Bien: Uso de operador nullish coalescing
function obtenerNombre(usuario?: { nombre?: string }) {
    return usuario?.nombre ?? 'Anónimo';
}

// ❌ Mal: Comprobaciones múltiples
function getNombre(usuario: any) {
    return usuario && usuario.nombre ? usuario.nombre : 'Anónimo';
}

// 2. TIPOS DISCRIMINADOS 🎭
// =====================

// ✅ Bien: Uniones discriminadas
type ResultadoOperacion = 
    | { tipo: 'exito'; datos: unknown }
    | { tipo: 'error'; mensaje: string };

function manejarResultado(resultado: ResultadoOperacion) {
    switch (resultado.tipo) {
        case 'exito':
            console.log(resultado.datos);
            break;
        case 'error':
            console.error(resultado.mensaje);
            break;
    }
}

// 3. PATRONES DE DISEÑO TIPADOS 🏗️
// ============================

// ✅ Bien: Builder Pattern con tipos
interface ProductoBuilder {
    setNombre(nombre: string): this;
    setPrecio(precio: number): this;
    setCategoria(categoria: string): this;
    build(): Producto;
}

// 4. MANEJO DE EVENTOS 🎮
// ===================

// ✅ Bien: Eventos tipados
interface EventoPersonalizado<T = unknown> {
    tipo: string;
    datos: T;
    timestamp: number;
}

function dispararEvento<T>(evento: EventoPersonalizado<T>): void {
    console.log(`[${new Date(evento.timestamp).toISOString()}] ${evento.tipo}`);
}

// 5. SERVICIOS HTTP TIPADOS 🌐
// ========================

// ✅ Bien: Cliente HTTP tipado
interface APIClient {
    get<T>(url: string): Promise<T>;
    post<T, U>(url: string, datos: T): Promise<U>;
    put<T, U>(url: string, datos: T): Promise<U>;
    delete(url: string): Promise<void>;
}

// 6. GESTIÓN DE ESTADO 📊
// ===================

// ✅ Bien: Estado tipado con inmutabilidad
interface Estado {
    readonly usuarios: ReadonlyArray<Usuario>;
    readonly configuracion: Readonly<Configuracion>;
}

function actualizarEstado(estado: Estado, cambios: Partial<Estado>): Estado {
    return { ...estado, ...cambios };
}

// 7. VALIDACIÓN DE DATOS 🔍
// =====================

// ✅ Bien: Esquema de validación tipado
interface ValidadorCampo<T> {
    validar(valor: unknown): valor is T;
    mensaje: string;
}

const validadorEmail: ValidadorCampo<string> = {
    validar: (valor): valor is string => 
        typeof valor === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor),
    mensaje: 'Email inválido'
};

// 8. PATRONES DE CARGA ASÍNCRONA ⏳
// ============================

// ✅ Bien: Estado de carga tipado
interface EstadoCarga<T> {
    datos: T | null;
    cargando: boolean;
    error: Error | null;
}

function crearEstadoCarga<T>(): EstadoCarga<T> {
    return {
        datos: null,
        cargando: false,
        error: null
    };
}

// 9. COMPOSICIÓN DE FUNCIONES 🎯
// =========================

// ✅ Bien: Composición tipada
type Transformador<T> = (entrada: T) => T;

function componer<T>(...fns: Transformador<T>[]): Transformador<T> {
    return (x: T) => fns.reduce((acc, fn) => fn(acc), x);
}

// 10. MANEJO DE CONFIGURACIÓN ⚙️
// =========================

// ✅ Bien: Configuración tipada con valores por defecto
interface ConfigApp {
    readonly apiUrl: string;
    readonly timeout: number;
    readonly reintentos: number;
}

function crearConfig(override?: Partial<ConfigApp>): Readonly<ConfigApp> {
    const defaultConfig: ConfigApp = {
        apiUrl: 'https://api.ejemplo.com',
        timeout: 5000,
        reintentos: 3
    };
    return Object.freeze({ ...defaultConfig, ...override });
} 