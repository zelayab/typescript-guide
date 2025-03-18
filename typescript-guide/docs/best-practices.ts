/**
 * GUÍA DE MEJORES PRÁCTICAS DE TYPESCRIPT 📚
 * =====================================
 * 
 * Una guía completa de las mejores prácticas para escribir
 * código TypeScript mantenible, seguro y eficiente.
 */

// 1. TIPOS Y INTERFACES 📝
// =====================

/**
 * - Prefiere interfaces para APIs públicas
 * - Usa types para uniones y tipos utilitarios
 * - Evita el tipo 'any'
 */

// ✅ Bien
interface Usuario {
    id: number;
    nombre: string;
    email: string;
}

// ❌ Mal
type UsuarioType = {
    id: any;
    nombre: any;
    email: any;
}

// 2. GENÉRICOS 🎁
// ============

/**
 * - Usa nombres descriptivos para parámetros genéricos
 * - Añade restricciones cuando sea necesario
 * - Documenta el propósito de cada parámetro
 */

// ✅ Bien
function obtenerPrimero<TElemento extends object>(array: TElemento[]): TElemento | undefined {
    return array[0];
}

// ❌ Mal
function getPrimero<T>(a: T[]): T | undefined {
    return a[0];
}

// 3. FUNCIONES 🎯
// ============

/**
 * - Define tipos de retorno explícitos
 * - Usa parámetros opcionales en lugar de undefined
 * - Implementa manejo de errores adecuado
 */

// ✅ Bien
function calcularTotal(precios: number[], descuento?: number): number {
    try {
        return precios.reduce((total, precio) => 
            total + precio * (1 - (descuento || 0)), 0);
    } catch (error) {
        throw new Error(`Error al calcular total: ${error.message}`);
    }
}

// 4. CLASES Y DECORADORES 🏰
// ======================

/**
 * - Usa modificadores de acceso
 * - Implementa interfaces explícitamente
 * - Mantén las clases pequeñas y enfocadas
 */

// ✅ Bien
class CarritoCompras implements ICarrito {
    private items: Producto[] = [];

    agregarProducto(producto: Producto): void {
        this.items.push(producto);
    }
}

// 5. PATRONES ASÍNCRONOS ⏳
// =====================

/**
 * - Usa async/await sobre promesas directas
 * - Maneja errores con try/catch
 * - Tipifica las respuestas de API
 */

// ✅ Bien
async function obtenerDatos<T>(url: string): Promise<T> {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`HTTP error: ${respuesta.status}`);
        }
        return await respuesta.json();
    } catch (error) {
        throw new Error(`Error al obtener datos: ${error.message}`);
    }
}

// 6. ORGANIZACIÓN DE CÓDIGO 📂
// ========================

/**
 * - Usa barrel exports (index.ts)
 * - Agrupa por funcionalidad
 * - Mantén una estructura clara de directorios
 */

// ✅ Bien - En index.ts
export * from './usuarios/usuario.controller';
export * from './usuarios/usuario.model';
export * from './usuarios/usuario.service';

// 7. TESTING 🧪
// ==========

/**
 * - Escribe tests unitarios para lógica de tipos
 * - Usa fixtures tipados
 * - Implementa mocks tipados
 */

// ✅ Bien
interface TestFixture {
    entrada: Usuario;
    esperado: ResultadoProcesado;
}

const casos: TestFixture[] = [
    {
        entrada: { id: 1, nombre: 'Test' },
        esperado: { procesado: true }
    }
];

// 8. RENDIMIENTO ⚡
// =============

/**
 * - Usa tipos condicionales con moderación
 * - Implementa lazy loading cuando sea posible
 * - Optimiza la inferencia de tipos
 */

// ✅ Bien
type OptimizedConditional<T> = T extends string 
    ? StringProcessResult 
    : NumberProcessResult;

// 9. SEGURIDAD 🔒
// ============

/**
 * - Valida entrada de usuario
 * - Usa tipos estrictos
 * - Implementa comprobaciones en tiempo de ejecución
 */

// ✅ Bien
function procesarEntradaUsuario(entrada: unknown): ProcessedData {
    if (!esEntradaValida(entrada)) {
        throw new Error('Entrada inválida');
    }
    return procesarDatos(entrada);
} 