/**
 * EJERCICIOS PRÁCTICOS - NIVEL BÁSICO
 * =================================
 */

// 1. Tipos Básicos
// Crear una función que reciba diferentes tipos de datos y los valide
function validarDato(dato: unknown): string {
    if (typeof dato === "string") return "Es un string";
    if (typeof dato === "number") return "Es un número";
    if (typeof dato === "boolean") return "Es un booleano";
    return "Tipo desconocido";
}

// 2. Arrays y Tuplas
// Implementar una función que maneje una lista de tareas
interface Tarea {
    id: number;
    descripcion: string;
    completada: boolean;
}

class ListaTareas {
    private tareas: Tarea[] = [];

    agregar(descripcion: string): void {
        const tarea: Tarea = {
            id: Date.now(),
            descripcion,
            completada: false
        };
        this.tareas.push(tarea);
    }

    completar(id: number): void {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) tarea.completada = true;
    }

    listar(): Tarea[] {
        return this.tareas;
    }
}

// 3. Objetos y Tipos
// Crear un sistema simple de gestión de usuarios
interface Usuario {
    id: number;
    nombre: string;
    email: string;
    rol: "admin" | "usuario";
    roles: string[];
    edad: number;
    activo: boolean;
}

class SistemaUsuarios {
    private usuarios: Usuario[] = [];

    registrar(nombre: string, email: string): void {
        const usuario: Usuario = {
            id: Date.now(),
            nombre,
            email,
            rol: "usuario",
            roles: ["usuario"],
            edad: 0,
            activo: true
        };
        this.usuarios.push(usuario);
    }

    buscar(email: string): Usuario | undefined {
        return this.usuarios.find(u => u.email === email);
    }
}

// 1. Sistema de Calificaciones
// Implementación de un sistema para gestionar calificaciones de estudiantes

interface Estudiante {
    id: number;
    nombre: string;
    apellido: string;
    curso: string;
}

interface Calificacion {
    id: number;
    estudianteId: number;
    asignatura: string;
    nota: number;
    fecha: Date;
}

class SistemaCalificaciones {
    private estudiantes: Estudiante[] = [];
    private calificaciones: Calificacion[] = [];

    // Agregar un nuevo estudiante
    agregarEstudiante(nombre: string, apellido: string, curso: string): Estudiante {
        const estudiante: Estudiante = {
            id: Date.now(),
            nombre,
            apellido,
            curso
        };
        this.estudiantes.push(estudiante);
        return estudiante;
    }

    // Agregar una calificación
    agregarCalificacion(estudianteId: number, asignatura: string, nota: number): Calificacion | string {
        // Validar que el estudiante existe
        const estudiante = this.estudiantes.find(e => e.id === estudianteId);
        if (!estudiante) {
            return 'Estudiante no encontrado';
        }

        // Validar la nota
        if (nota < 0 || nota > 10) {
            return 'La nota debe estar entre 0 y 10';
        }

        const calificacion: Calificacion = {
            id: Date.now(),
            estudianteId,
            asignatura,
            nota,
            fecha: new Date()
        };
        this.calificaciones.push(calificacion);
        return calificacion;
    }

    // Obtener promedio de un estudiante
    obtenerPromedio(estudianteId: number): number | string {
        const calificacionesEstudiante = this.calificaciones.filter(c => c.estudianteId === estudianteId);
        if (calificacionesEstudiante.length === 0) {
            return 'No hay calificaciones para este estudiante';
        }

        const suma = calificacionesEstudiante.reduce((acc, cal) => acc + cal.nota, 0);
        return Number((suma / calificacionesEstudiante.length).toFixed(2));
    }

    // Obtener todas las calificaciones de un estudiante
    obtenerCalificaciones(estudianteId: number): Calificacion[] | string {
        const estudiante = this.estudiantes.find(e => e.id === estudianteId);
        if (!estudiante) {
            return 'Estudiante no encontrado';
        }

        return this.calificaciones.filter(c => c.estudianteId === estudianteId);
    }

    // Obtener mejor estudiante por asignatura
    obtenerMejorEstudiante(asignatura: string): { estudiante: Estudiante; promedio: number } | string {
        const calificacionesAsignatura = this.calificaciones.filter(c => c.asignatura === asignatura);
        if (calificacionesAsignatura.length === 0) {
            return 'No hay calificaciones para esta asignatura';
        }

        // Calcular promedio por estudiante
        const promediosPorEstudiante = this.estudiantes.map(estudiante => {
            const calificacionesEstudiante = calificacionesAsignatura.filter(c => c.estudianteId === estudiante.id);
            if (calificacionesEstudiante.length === 0) return null;

            const promedio = calificacionesEstudiante.reduce((acc, cal) => acc + cal.nota, 0) / calificacionesEstudiante.length;
            return { estudiante, promedio };
        }).filter((item): item is { estudiante: Estudiante; promedio: number } => item !== null);

        if (promediosPorEstudiante.length === 0) {
            return 'No hay estudiantes con calificaciones en esta asignatura';
        }

        return promediosPorEstudiante.reduce((mejor, actual) => 
            actual.promedio > mejor.promedio ? actual : mejor
        );
    }
}

// Ejemplo de uso:
/*
const sistema = new SistemaCalificaciones();

// Agregar estudiantes
const estudiante1 = sistema.agregarEstudiante('Juan', 'Pérez', '1A');
const estudiante2 = sistema.agregarEstudiante('María', 'García', '1A');

// Agregar calificaciones
sistema.agregarCalificacion(estudiante1.id, 'Matemáticas', 8.5);
sistema.agregarCalificacion(estudiante1.id, 'Física', 7.5);
sistema.agregarCalificacion(estudiante2.id, 'Matemáticas', 9.0);

// Obtener promedio
console.log(sistema.obtenerPromedio(estudiante1.id));

// Obtener mejor estudiante
console.log(sistema.obtenerMejorEstudiante('Matemáticas'));
*/

// Ejercicios para practicar:
// 1. Implementar un sistema de calificaciones
// 2. Crear un gestor de contactos
// 3. Desarrollar una calculadora con tipos 

// 2. Gestor de Contactos
// Implementación de un sistema para gestionar contactos

interface Contacto {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    categoria: 'familia' | 'trabajo' | 'amigos' | 'otros';
    favorito: boolean;
}

class GestorContactos {
    private contactos: Contacto[] = [];

    // Agregar un nuevo contacto
    agregarContacto(
        nombre: string,
        apellido: string,
        email: string,
        telefono: string,
        categoria: Contacto['categoria'] = 'otros'
    ): Contacto | string {
        // Validar email único
        if (this.contactos.some(c => c.email === email)) {
            return 'Ya existe un contacto con este email';
        }

        const contacto: Contacto = {
            id: Date.now(),
            nombre,
            apellido,
            email,
            telefono,
            categoria,
            favorito: false
        };
        this.contactos.push(contacto);
        return contacto;
    }

    // Eliminar contacto
    eliminarContacto(id: number): boolean {
        const indice = this.contactos.findIndex(c => c.id === id);
        if (indice === -1) return false;
        
        this.contactos.splice(indice, 1);
        return true;
    }

    // Actualizar contacto
    actualizarContacto(id: number, datos: Partial<Omit<Contacto, 'id'>>): Contacto | string {
        const contacto = this.contactos.find(c => c.id === id);
        if (!contacto) {
            return 'Contacto no encontrado';
        }

        // Si se está actualizando el email, verificar que sea único
        if (datos.email && datos.email !== contacto.email) {
            if (this.contactos.some(c => c.email === datos.email)) {
                return 'Ya existe un contacto con este email';
            }
        }

        Object.assign(contacto, datos);
        return contacto;
    }

    // Marcar/Desmarcar como favorito
    toggleFavorito(id: number): boolean {
        const contacto = this.contactos.find(c => c.id === id);
        if (!contacto) return false;
        
        contacto.favorito = !contacto.favorito;
        return true;
    }

    // Buscar contactos
    buscarContactos(termino: string): Contacto[] {
        const terminoLower = termino.toLowerCase();
        return this.contactos.filter(c => 
            c.nombre.toLowerCase().includes(terminoLower) ||
            c.apellido.toLowerCase().includes(terminoLower) ||
            c.email.toLowerCase().includes(terminoLower)
        );
    }

    // Filtrar por categoría
    filtrarPorCategoria(categoria: Contacto['categoria']): Contacto[] {
        return this.contactos.filter(c => c.categoria === categoria);
    }

    // Obtener favoritos
    obtenerFavoritos(): Contacto[] {
        return this.contactos.filter(c => c.favorito);
    }

    // Obtener todos los contactos ordenados
    obtenerContactos(ordenarPor: keyof Contacto = 'nombre'): Contacto[] {
        return [...this.contactos].sort((a, b) => {
            if (a[ordenarPor] < b[ordenarPor]) return -1;
            if (a[ordenarPor] > b[ordenarPor]) return 1;
            return 0;
        });
    }
}

// Ejemplo de uso:
/*
const gestor = new GestorContactos();

// Agregar contactos
const contacto1 = gestor.agregarContacto('Juan', 'Pérez', 'juan@email.com', '123456789', 'trabajo');
const contacto2 = gestor.agregarContacto('María', 'García', 'maria@email.com', '987654321', 'familia');

// Marcar como favorito
gestor.toggleFavorito(contacto1.id);

// Buscar contactos
console.log(gestor.buscarContactos('juan'));

// Filtrar por categoría
console.log(gestor.filtrarPorCategoria('trabajo'));

// Obtener favoritos
console.log(gestor.obtenerFavoritos());
*/ 

// 3. Calculadora con Tipos
// Implementación de una calculadora con tipos TypeScript

// Tipo para las operaciones disponibles
const enum TipoOperacion {
    Suma = 'suma',
    Resta = 'resta',
    Multiplicacion = 'multiplicacion',
    Division = 'division',
    Potencia = 'potencia',
    Raiz = 'raiz'
}

// Tipo para el historial de operaciones
interface RegistroOperacion {
    id: number;
    operacion: TipoOperacion;
    valores: number[];
    resultado: number;
    fecha: Date;
}

class CalculadoraAvanzada {
    private historial: RegistroOperacion[] = [];

    // Validar números
    private validarNumeros(...numeros: number[]): boolean {
        return numeros.every(n => !isNaN(n) && isFinite(n));
    }

    // Registrar operación en el historial
    private registrarOperacion(operacion: TipoOperacion, valores: number[], resultado: number): void {
        const registro: RegistroOperacion = {
            id: Date.now(),
            operacion,
            valores,
            resultado,
            fecha: new Date()
        };
        this.historial.push(registro);
    }

    // Suma
    sumar(...numeros: number[]): number | string {
        if (!this.validarNumeros(...numeros)) {
            return 'Números no válidos';
        }
        const resultado = numeros.reduce((acc, curr) => acc + curr, 0);
        this.registrarOperacion(TipoOperacion.Suma, numeros, resultado);
        return resultado;
    }

    // Resta
    restar(...numeros: number[]): number | string {
        if (!this.validarNumeros(...numeros)) {
            return 'Números no válidos';
        }
        const resultado = numeros.reduce((acc, curr, index) => 
            index === 0 ? curr : acc - curr
        );
        this.registrarOperacion(TipoOperacion.Resta, numeros, resultado);
        return resultado;
    }

    // Multiplicación
    multiplicar(...numeros: number[]): number | string {
        if (!this.validarNumeros(...numeros)) {
            return 'Números no válidos';
        }
        const resultado = numeros.reduce((acc, curr) => acc * curr, 1);
        this.registrarOperacion(TipoOperacion.Multiplicacion, numeros, resultado);
        return resultado;
    }

    // División
    dividir(dividendo: number, divisor: number): number | string {
        if (!this.validarNumeros(dividendo, divisor)) {
            return 'Números no válidos';
        }
        if (divisor === 0) {
            return 'No se puede dividir por cero';
        }
        const resultado = dividendo / divisor;
        this.registrarOperacion(TipoOperacion.Division, [dividendo, divisor], resultado);
        return resultado;
    }

    // Potencia
    potencia(base: number, exponente: number): number | string {
        if (!this.validarNumeros(base, exponente)) {
            return 'Números no válidos';
        }
        const resultado = Math.pow(base, exponente);
        this.registrarOperacion(TipoOperacion.Potencia, [base, exponente], resultado);
        return resultado;
    }

    // Raíz cuadrada
    raizCuadrada(numero: number): number | string {
        if (!this.validarNumeros(numero)) {
            return 'Número no válido';
        }
        if (numero < 0) {
            return 'No se puede calcular la raíz cuadrada de un número negativo';
        }
        const resultado = Math.sqrt(numero);
        this.registrarOperacion(TipoOperacion.Raiz, [numero], resultado);
        return resultado;
    }

    // Obtener historial
    obtenerHistorial(): RegistroOperacion[] {
        return this.historial;
    }

    // Obtener última operación
    obtenerUltimaOperacion(): RegistroOperacion | string {
        if (this.historial.length === 0) {
            return 'No hay operaciones en el historial';
        }
        return this.historial[this.historial.length - 1];
    }

    // Limpiar historial
    limpiarHistorial(): void {
        this.historial = [];
    }

    // Nuevos métodos adicionales

    // Obtener estadísticas de operaciones
    obtenerEstadisticas(): Record<TipoOperacion, number> {
        const estadisticas = {
            [TipoOperacion.Suma]: 0,
            [TipoOperacion.Resta]: 0,
            [TipoOperacion.Multiplicacion]: 0,
            [TipoOperacion.Division]: 0,
            [TipoOperacion.Potencia]: 0,
            [TipoOperacion.Raiz]: 0
        };

        this.historial.forEach(op => {
            estadisticas[op.operacion]++;
        });

        return estadisticas;
    }

    // Obtener promedio de resultados
    obtenerPromedioResultados(): number {
        if (this.historial.length === 0) return 0;
        
        const suma = this.historial.reduce((acc, op) => acc + op.resultado, 0);
        return Number((suma / this.historial.length).toFixed(2));
    }

    // Obtener operaciones por fecha
    obtenerOperacionesPorFecha(fecha: Date): RegistroOperacion[] {
        return this.historial.filter(op => 
            op.fecha.toDateString() === fecha.toDateString()
        );
    }
}

// Ejemplo de uso:
/*
const calc = new CalculadoraAvanzada();

// Operaciones básicas
console.log(calc.sumar(5, 3, 2));      // 10
console.log(calc.restar(10, 4, 2));    // 4
console.log(calc.multiplicar(2, 3, 4)); // 24
console.log(calc.dividir(10, 2));      // 5
console.log(calc.potencia(2, 3));      // 8
console.log(calc.raizCuadrada(16));    // 4

// Estadísticas y análisis
console.log(calc.obtenerEstadisticas());
console.log(calc.obtenerPromedioResultados());
console.log(calc.obtenerOperacionesPorFecha(new Date()));

// Historial
console.log(calc.obtenerHistorial());
console.log(calc.obtenerUltimaOperacion());
*/ 