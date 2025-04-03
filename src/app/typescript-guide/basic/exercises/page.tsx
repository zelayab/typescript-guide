'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { AlertCircle, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Exercise {
  id: number
  title: string
  description: string
  initialCode: string
  solution: string
  hint: string
  difficulty: 'basic' | 'intermediate' | 'advanced'
  testCases?: Array<{
    input?: any
    expectedOutput?: any
    test: (code: string) => boolean
  }>
}

const difficultyColors = {
  basic: 'text-white bg-emerald-950 border-emerald-500/30',
  intermediate: 'text-white bg-amber-950 border-amber-500/30',
  advanced: 'text-white bg-rose-950 border-rose-500/30'
}

const difficultyBgColors = {
  basic: 'bg-emerald-950/80 border-emerald-500/30 hover:bg-emerald-900/50 text-white',
  intermediate: 'bg-amber-950/80 border-amber-500/30 hover:bg-amber-900/50 text-white',
  advanced: 'bg-rose-950/80 border-rose-500/30 hover:bg-rose-900/50 text-white'
}

const difficultyLabels = {
  basic: 'Básico',
  intermediate: 'Intermedio',
  advanced: 'Avanzado'
}

const exercises: Exercise[] = [
  // EJERCICIOS BÁSICOS
  {
    id: 1,
    title: "Tipos Básicos",
    description: "Define los tipos correctos para las siguientes variables",
    initialCode: `const nombre = "Juan"
const edad = 25
const esEstudiante = true
const notas = [8, 9, 7, 10]
const direccion = {
  calle: "Av. Principal",
  numero: 123,
  ciudad: "Madrid"
}`,
    solution: `const nombre: string = "Juan"
const edad: number = 25
const esEstudiante: boolean = true
const notas: number[] = [8, 9, 7, 10]
const direccion: {
  calle: string;
  numero: number;
  ciudad: string;
} = {
  calle: "Av. Principal",
  numero: 123,
  ciudad: "Madrid"
}`,
    hint: "Recuerda que TypeScript tiene tipos primitivos como string, number, boolean y tipos compuestos como arrays y objetos",
    difficulty: "basic"
  },
  {
    id: 2,
    title: "Arrays y Tuplas",
    description: "Define los tipos correctos para estos arrays y tuplas",
    initialCode: `const colores = ["rojo", "verde", "azul"]
const coordenadas = [40.4168, -3.7038]
const persona = ["Juan", 25, true]
const matriz = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]`,
    solution: `const colores: string[] = ["rojo", "verde", "azul"]
const coordenadas: [number, number] = [40.4168, -3.7038]
const persona: [string, number, boolean] = ["Juan", 25, true]
const matriz: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]`,
    hint: "Las tuplas son arrays con un número fijo de elementos donde cada elemento tiene un tipo específico",
    difficulty: "basic"
  },
  {
    id: 3,
    title: "Interfaces Básicas",
    description: "Crea una interfaz para representar un producto",
    initialCode: `const producto = {
  id: 1,
  nombre: "Laptop",
  precio: 999.99,
  enStock: true,
  detalles: {
    marca: "Dell",
    modelo: "XPS 13",
    especificaciones: ["Intel i7", "16GB RAM", "512GB SSD"]
  }
}`,
    solution: `interface DetallesProducto {
  marca: string;
  modelo: string;
  especificaciones: string[];
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  enStock: boolean;
  detalles: DetallesProducto;
}

const producto: Producto = {
  id: 1,
  nombre: "Laptop",
  precio: 999.99,
  enStock: true,
  detalles: {
    marca: "Dell",
    modelo: "XPS 13",
    especificaciones: ["Intel i7", "16GB RAM", "512GB SSD"]
  }
}`,
    hint: "Las interfaces permiten definir la estructura de un objeto y pueden anidarse",
    difficulty: "basic"
  },
  {
    id: 4,
    title: "Enums y Literales",
    description: "Define un enum para los días de la semana y un tipo literal para los estados de una tarea",
    initialCode: `// Define un enum para los días de la semana
// Define un tipo literal para los estados: 'pendiente' | 'en progreso' | 'completada'

const diaActual = DiaSemana.Lunes
const estadoTarea = 'pendiente'`,
    solution: `enum DiaSemana {
  Lunes = 'LUNES',
  Martes = 'MARTES',
  Miercoles = 'MIERCOLES',
  Jueves = 'JUEVES',
  Viernes = 'VIERNES',
  Sabado = 'SABADO',
  Domingo = 'DOMINGO'
}

type EstadoTarea = 'pendiente' | 'en progreso' | 'completada'

const diaActual: DiaSemana = DiaSemana.Lunes
const estadoTarea: EstadoTarea = 'pendiente'`,
    hint: "Los enums son útiles para conjuntos de valores fijos, mientras que los tipos literales permiten un conjunto específico de valores",
    difficulty: "basic"
  },
  {
    id: 5,
    title: "Funciones Básicas",
    description: "Define tipos para los parámetros y retorno de funciones",
    initialCode: `// Define los tipos para estas funciones
function sumar(a, b) {
  return a + b;
}

function saludar(nombre) {
  return \`¡Hola \${nombre}!\`;
}

function esMayorDeEdad(edad) {
  return edad >= 18;
}

const multiplicar = (a, b) => a * b;`,
    solution: `function sumar(a: number, b: number): number {
  return a + b;
}

function saludar(nombre: string): string {
  return \`¡Hola \${nombre}!\`;
}

function esMayorDeEdad(edad: number): boolean {
  return edad >= 18;
}

const multiplicar = (a: number, b: number): number => a * b;`,
    hint: "Las funciones en TypeScript pueden tener tipos tanto para sus parámetros como para su valor de retorno",
    difficulty: "basic"
  },
  // EJERCICIOS INTERMEDIOS
  {
    id: 6,
    title: "Funciones Genéricas",
    description: "Crea una función genérica para filtrar arrays",
    initialCode: `// Implementa una función que filtre un array según un criterio
function filtrarArray(array, criterio) {
  return array.filter(criterio)
}`,
    solution: `function filtrarArray<T>(array: T[], criterio: (elemento: T) => boolean): T[] {
  return array.filter(criterio)
}

// Ejemplo de uso:
const numeros = [1, 2, 3, 4, 5]
const pares = filtrarArray(numeros, n => n % 2 === 0)

const palabras = ["hola", "mundo", "typescript"]
const largas = filtrarArray(palabras, p => p.length > 5)`,
    hint: "Los genéricos permiten crear funciones reutilizables que trabajan con diferentes tipos",
    difficulty: "intermediate"
  },
  {
    id: 7,
    title: "Type Guards",
    description: "Implementa un type guard personalizado para verificar el tipo de un objeto",
    initialCode: `interface Usuario {
  tipo: 'usuario';
  nombre: string;
  email: string;
}

interface Admin {
  tipo: 'admin';
  nombre: string;
  permisos: string[];
}

type Persona = Usuario | Admin;

// Implementa la función esAdmin
function esAdmin(persona: Persona) {
  // Tu código aquí
}

function gestionarPersona(persona: Persona) {
  if (esAdmin(persona)) {
    console.log(\`Admin \${persona.nombre} tiene \${persona.permisos.length} permisos\`)
  } else {
    console.log(\`Usuario \${persona.nombre} con email \${persona.email}\`)
  }
}`,
    solution: `interface Usuario {
  tipo: 'usuario';
  nombre: string;
  email: string;
}

interface Admin {
  tipo: 'admin';
  nombre: string;
  permisos: string[];
}

type Persona = Usuario | Admin;

function esAdmin(persona: Persona): persona is Admin {
  return persona.tipo === 'admin';
}

function gestionarPersona(persona: Persona) {
  if (esAdmin(persona)) {
    console.log(\`Admin \${persona.nombre} tiene \${persona.permisos.length} permisos\`)
  } else {
    console.log(\`Usuario \${persona.nombre} con email \${persona.email}\`)
  }
}`,
    hint: "Los type guards personalizados usan la sintaxis 'paramName is Type' en el tipo de retorno",
    difficulty: "intermediate"
  },
  {
    id: 8,
    title: "Mapped Types",
    description: "Crea un tipo que haga todas las propiedades de un objeto readonly y nullable",
    initialCode: `interface Configuracion {
  tema: string;
  idioma: string;
  notificaciones: boolean;
  autoguardado: boolean;
}

// Crea un tipo que haga todas las propiedades readonly y nullable
// Ejemplo: ConfiguracionSegura.tema será readonly y podrá ser null`,
    solution: `interface Configuracion {
  tema: string;
  idioma: string;
  notificaciones: boolean;
  autoguardado: boolean;
}

type ConfiguracionSegura = {
  readonly [K in keyof Configuracion]: Configuracion[K] | null;
}

const config: ConfiguracionSegura = {
  tema: 'oscuro',
  idioma: null,  // Permitido porque es nullable
  notificaciones: true,
  autoguardado: null  // Permitido porque es nullable
}

// No permitido porque es readonly:
// config.tema = 'claro'`,
    hint: "Usa mapped types con los modificadores readonly y un union type con null",
    difficulty: "intermediate"
  },
  {
    id: 9,
    title: "Tipos Indexados",
    description: "Crea tipos utilizando tipos indexados para acceder a propiedades anidadas",
    initialCode: `interface Respuesta {
  datos: {
    usuario: {
      id: number;
      perfil: {
        nombre: string;
        edad: number;
      }
    }
  }
  metadata: {
    timestamp: number;
  }
}

// Define tipos para:
// 1. Solo el objeto usuario
// 2. Solo el objeto perfil
// 3. Solo los tipos de metadata`,
    solution: `interface Respuesta {
  datos: {
    usuario: {
      id: number;
      perfil: {
        nombre: string;
        edad: number;
      }
    }
  }
  metadata: {
    timestamp: number;
  }
}

type Usuario = Respuesta['datos']['usuario']
type Perfil = Respuesta['datos']['usuario']['perfil']
type Metadata = Respuesta['metadata']

// Ejemplo de uso:
const usuario: Usuario = {
  id: 1,
  perfil: {
    nombre: "Juan",
    edad: 25
  }
}`,
    hint: "Los tipos indexados permiten acceder a tipos anidados usando la sintaxis de corchetes",
    difficulty: "intermediate"
  },
  {
    id: 10,
    title: "Tipos Condicionales",
    description: "Crea un tipo que extraiga las claves de un objeto que sean strings",
    initialCode: `type Objeto = {
  id: number;
  nombre: string;
  edad: number;
  email: string;
  activo: boolean;
}

// Define el tipo ClavesString aquí`,
    solution: `type Objeto = {
  id: number;
  nombre: string;
  edad: number;
  email: string;
  activo: boolean;
}

type ClavesString<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T]

// Ejemplo de uso:
type ClavesStringDeObjeto = ClavesString<Objeto> // "nombre" | "email"`,
    hint: "Los tipos condicionales permiten crear tipos que dependen de otros tipos",
    difficulty: "intermediate"
  },
  // EJERCICIOS AVANZADOS
  {
    id: 11,
    title: "Decoradores Avanzados",
    description: "Crea un decorador de método que implemente reintentos automáticos",
    initialCode: `// Implementa un decorador que reintente una operación hasta 3 veces
// si esta falla con un error

class ServicioAPI {
  @reintentar(3)
  async fetchDatos(url: string): Promise<any> {
    // Simula una llamada API que puede fallar
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en la petición');
    return response.json();
  }
}`,
    solution: `function reintentar(intentos: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const metodoOriginal = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      let error: Error | null = null;
      
      for (let intento = 0; intento < intentos; intento++) {
        try {
          return await metodoOriginal.apply(this, args);
        } catch (e) {
          error = e as Error;
          console.log(\`Intento \${intento + 1} fallido: \${error.message}\`);
          
          if (intento < intentos - 1) {
            // Espera antes del siguiente intento
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }
      
      throw error;
    };

    return descriptor;
  };
}

class ServicioAPI {
  @reintentar(3)
  async fetchDatos(url: string): Promise<any> {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en la petición');
    return response.json();
  }
}`,
    hint: "Usa un decorador de método que envuelva la función original en un bucle de reintentos con manejo de errores",
    difficulty: "advanced"
  },
  {
    id: 12,
    title: "Patrones de Diseño en TypeScript",
    description: "Implementa el patrón Observer utilizando genéricos",
    initialCode: `// Implementa un sistema de eventos tipado usando el patrón Observer
// Debe permitir suscribirse a eventos y emitir eventos con payload tipado`,
    solution: `interface Observer<T> {
  update(data: T): void;
}

class Observable<T> {
  private observers: Observer<T>[] = [];

  subscribe(observer: Observer<T>): () => void {
    this.observers.push(observer);
    return () => {
      this.observers = this.observers.filter(obs => obs !== observer);
    };
  }

  notify(data: T): void {
    this.observers.forEach(observer => observer.update(data));
  }
}

// Ejemplo de uso:
interface Usuario {
  id: number;
  nombre: string;
}

class UsuarioService extends Observable<Usuario> {
  actualizarUsuario(usuario: Usuario) {
    // Lógica de actualización...
    this.notify(usuario);
  }
}

class UsuarioUI implements Observer<Usuario> {
  update(usuario: Usuario) {
    console.log(\`UI actualizada para usuario: \${usuario.nombre}\`);
  }
}

const servicio = new UsuarioService();
const ui = new UsuarioUI();

const desuscribir = servicio.subscribe(ui);
servicio.actualizarUsuario({ id: 1, nombre: "Juan" });
// Para desuscribirse:
// desuscribir();`,
    hint: "Implementa una clase Observable genérica que mantenga una lista de observadores y les notifique cuando hay cambios",
    difficulty: "advanced"
  },
  {
    id: 13,
    title: "Types vs Interfaces",
    description: "Demuestra las diferencias clave entre Types e Interfaces",
    initialCode: `// 1. Crea un tipo y una interfaz para un objeto Persona
// 2. Demuestra la extensión de interfaces
// 3. Demuestra la unión de tipos
// 4. Demuestra la implementación en clases`,
    solution: `// 1. Tipo vs Interfaz
type PersonaTipo = {
  nombre: string;
  edad: number;
}

interface PersonaInterfaz {
  nombre: string;
  edad: number;
}

// 2. Extensión de interfaces
interface Empleado extends PersonaInterfaz {
  salario: number;
}

// 3. Unión de tipos (solo posible con types)
type Identificacion = string | number;

// 4. Implementación en clases
interface Animal {
  nombre: string;
  hacerSonido(): void;
}

class Perro implements Animal {
  constructor(public nombre: string) {}
  
  hacerSonido() {
    console.log("Guau!");
  }
}

// Declaración múltiple de interfaces (merging)
interface Configuracion {
  tema: string;
}

interface Configuracion {
  idioma: string;
}

const config: Configuracion = {
  tema: "oscuro",
  idioma: "es"  // Ambas propiedades son requeridas
}`,
    hint: "Las interfaces son extensibles y pueden hacer merge, mientras que los types son más flexibles para uniones y tipos primitivos",
    difficulty: "advanced"
  },
  {
    id: 14,
    title: "Tipos Recursivos",
    description: "Crea un tipo que represente un árbol binario",
    initialCode: `// Define un tipo para un árbol binario de números`,
    solution: `type ArbolBinario<T> = {
  valor: T;
  izquierdo: ArbolBinario<T> | null;
  derecho: ArbolBinario<T> | null;
}

// Ejemplo de uso:
const arbol: ArbolBinario<number> = {
  valor: 1,
  izquierdo: {
    valor: 2,
    izquierdo: null,
    derecho: null
  },
  derecho: {
    valor: 3,
    izquierdo: null,
    derecho: null
  }
}`,
    hint: "Los tipos pueden hacer referencia a sí mismos para crear estructuras recursivas",
    difficulty: "advanced"
  },
  {
    id: 15,
    title: "Utility Types Avanzados",
    description: "Implementa utility types personalizados",
    initialCode: `interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: 'admin' | 'usuario';
}

// Implementa:
// 1. Un tipo que haga todas las propiedades opcionales excepto id
// 2. Un tipo que excluya password y haga el resto readonly
// 3. Un tipo que solo incluya las propiedades de tipo string`,
    solution: `interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: 'admin' | 'usuario';
}

// 1. Todas opcionales excepto id
type UsuarioActualizable = { id: number } & Partial<Omit<Usuario, 'id'>>;

// 2. Excluir password y hacer readonly
type UsuarioSeguro = Readonly<Omit<Usuario, 'password'>>;

// 3. Solo propiedades string
type PropiedadesString = {
  [K in keyof Usuario as Usuario[K] extends string ? K : never]: Usuario[K];
};

// Ejemplos de uso:
const actualizarUsuario: UsuarioActualizable = {
  id: 1,
  nombre: "Juan" // resto de propiedades opcionales
};

const usuarioSeguro: UsuarioSeguro = {
  id: 1,
  nombre: "Juan",
  email: "juan@email.com",
  rol: "usuario"
};

const soloStrings: PropiedadesString = {
  nombre: "Juan",
  email: "juan@email.com",
  password: "secreto",
  rol: "usuario"
};`,
    hint: "Combina diferentes utility types y mapped types para crear tipos más específicos",
    difficulty: "advanced"
  }
]

export default function ExercisesPage() {
  const router = useRouter()
  const [currentExercise, setCurrentExercise] = useState(0)
  const [code, setCode] = useState(exercises[0].initialCode)
  const [showSolution, setShowSolution] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [verificationResult, setVerificationResult] = useState<'success' | 'error' | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'basic' | 'intermediate' | 'advanced'>('all')
  const [exerciseStartTime, setExerciseStartTime] = useState<number>(Date.now())
  const [timeRemaining, setTimeRemaining] = useState<number>(300) // 5 minutos en segundos

  const filteredExercises = exercises.filter(ex => 
    selectedDifficulty === 'all' || ex.difficulty === selectedDifficulty
  )

  // Temporizador para la solución
  useEffect(() => {
    const timer = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - exerciseStartTime) / 1000)
      const remaining = Math.max(300 - elapsedTime, 0) // 5 minutos en segundos
      setTimeRemaining(remaining)
    }, 1000)

    return () => clearInterval(timer)
  }, [exerciseStartTime])

  // Auto-dismiss para mensajes de verificación
  useEffect(() => {
    if (verificationResult) {
      const timer = setTimeout(() => {
        setVerificationResult(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [verificationResult])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const verifyCode = () => {
    try {
      const normalizedCode = code.replace(/\s/g, '')
      const normalizedSolution = exercises[currentExercise].solution.replace(/\s/g, '')
      
      if (normalizedCode === normalizedSolution) {
        setVerificationResult('success')
        setTimeRemaining(0) // Permitir ver la solución inmediatamente si es correcta
      } else {
        setVerificationResult('error')
      }
    } catch (error) {
      setVerificationResult('error')
    }
  }

  const handleExerciseChange = (index: number) => {
    setCurrentExercise(index)
    setCode(exercises[index].initialCode)
    setShowSolution(false)
    setShowHint(false)
    setVerificationResult(null)
    setExerciseStartTime(Date.now())
    setTimeRemaining(300)
  }

  const canShowSolution = timeRemaining === 0 || verificationResult === 'success'

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4"
        >
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="text-white hover:bg-slate-800 hover:text-white flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </motion.div>
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center md:text-left text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Ejercicios Interactivos de TypeScript
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
          {/* Lista de Ejercicios */}
          <Card className="lg:col-span-4 p-4 sm:p-6 bg-slate-900 border-slate-700 shadow-xl shadow-slate-900/50">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">Ejercicios Disponibles</h2>
            
            {/* Filtros de dificultad */}
            <div className="flex flex-wrap gap-2 mb-4">
              
              <Button
                onClick={() => setSelectedDifficulty('basic')}
                className={`text-xs sm:text-sm border text-white ${
                  selectedDifficulty === 'basic' 
                    ? difficultyColors.basic 
                    : 'bg-emerald-950/30 border-emerald-500/20 hover:bg-emerald-900/50'
                }`}
                size="sm"
              >
                Básico
              </Button>
              <Button
                onClick={() => setSelectedDifficulty('intermediate')}
                className={`text-xs sm:text-sm border text-white ${
                  selectedDifficulty === 'intermediate' 
                    ? difficultyColors.intermediate 
                    : 'bg-amber-950/30 border-amber-500/20 hover:bg-amber-900/50'
                }`}
                size="sm"
              >
                Intermedio
              </Button>
              <Button
                onClick={() => setSelectedDifficulty('advanced')}
                className={`text-xs sm:text-sm border text-white ${
                  selectedDifficulty === 'advanced' 
                    ? difficultyColors.advanced 
                    : 'bg-rose-950/30 border-rose-500/20 hover:bg-rose-900/50'
                }`}
                size="sm"
              >
                Avanzado
              </Button>
            </div>

            <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scrollbar">
              {filteredExercises.map((exercise) => (
                <Button
                  key={exercise.id}
                  className={`w-full justify-start text-left border transition-all duration-200 text-white ${
                    currentExercise === exercises.indexOf(exercise)
                      ? `${difficultyColors[exercise.difficulty]} shadow-lg shadow-${exercise.difficulty}-900/30`
                      : `${difficultyBgColors[exercise.difficulty]} opacity-80 hover:opacity-100`
                  }`}
                  onClick={() => handleExerciseChange(exercises.indexOf(exercise))}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center truncate mr-2">
                      <span className="mr-2 flex-shrink-0 font-mono bg-slate-800 px-2 py-0.5 rounded-md text-white">{exercise.id}</span>
                      <span className="truncate font-medium text-white">{exercise.title}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 border text-white ${difficultyColors[exercise.difficulty]}`}>
                      {difficultyLabels[exercise.difficulty]}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </Card>

          {/* Área de Ejercicio */}
          <Card className="lg:col-span-8 p-4 sm:p-6 bg-slate-900 border-slate-700 shadow-xl shadow-slate-900/50">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {exercises[currentExercise].title}
                </h2>
                <span className={`text-xs sm:text-sm px-3 py-1 rounded-full self-start sm:self-center border text-white ${difficultyColors[exercises[currentExercise].difficulty]}`}>
                  {difficultyLabels[exercises[currentExercise].difficulty]}
                </span>
              </div>
              <p className="text-white mb-4 text-sm sm:text-base">
                {exercises[currentExercise].description}
              </p>
              
              {/* Editor de Código */}
              <div className="bg-slate-950 rounded-lg border border-slate-800 shadow-inner mb-4">
                <div className="border-b border-slate-800 px-4 py-2 flex items-center">
                  <span className="text-xs text-white">TypeScript</span>
                </div>
                <div className="p-4 font-mono relative">
                  <textarea
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value)
                      setVerificationResult(null)
                    }}
                    className="w-full bg-transparent outline-none resize-none min-h-[200px] sm:min-h-[300px] text-white leading-relaxed text-sm"
                    spellCheck="false"
                  />
                </div>
              </div>

              {/* Controles */}
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <Button
                  onClick={verifyCode}
                  className={`text-xs sm:text-sm font-medium transition-all duration-200 text-white ${
                    verificationResult === 'success' 
                      ? 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-900/30' 
                      : verificationResult === 'error'
                      ? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-900/30'
                      : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/30'
                  }`}
                >
                  {verificationResult === 'success' && <CheckCircle2 className="mr-2 h-4 w-4" />}
                  {verificationResult === 'error' && <XCircle className="mr-2 h-4 w-4" />}
                  {!verificationResult && <AlertCircle className="mr-2 h-4 w-4" />}
                  Verificar Solución
                </Button>
                <Button
                  onClick={() => setShowHint(!showHint)}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/30 text-xs sm:text-sm font-medium"
                >
                  {showHint ? 'Ocultar Pista' : 'Mostrar Pista'}
                </Button>
                <Button
                  onClick={() => canShowSolution && setShowSolution(!showSolution)}
                  className={`text-xs sm:text-sm font-medium ${
                    canShowSolution
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-900/30'
                      : 'bg-gray-600 cursor-not-allowed text-gray-300'
                  }`}
                  disabled={!canShowSolution}
                >
                  {showSolution 
                    ? 'Ocultar Solución' 
                    : canShowSolution 
                      ? 'Ver Solución'
                      : `Espera ${formatTime(timeRemaining)}`
                  }
                </Button>
              </div>

              {/* Mensaje de tiempo restante */}
              {!canShowSolution && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-slate-800 border border-slate-700 rounded-lg"
                >
                  <p className="text-white text-sm sm:text-base flex items-center">
                    <span className="mr-2">⏳</span>
                    Podrás ver la solución en {formatTime(timeRemaining)} minutos o cuando resuelvas el ejercicio correctamente.
                  </p>
                </motion.div>
              )}

              {/* Resultado de la verificación */}
              {verificationResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 p-4 rounded-lg border ${
                    verificationResult === 'success' 
                      ? 'bg-green-950 border-green-500/30 text-white'
                      : 'bg-red-950 border-red-500/30 text-white'
                  }`}
                >
                  {verificationResult === 'success' ? (
                    <p className="flex items-center text-sm sm:text-base">
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      ¡Correcto! Tu solución es válida.
                    </p>
                  ) : (
                    <p className="flex items-center text-sm sm:text-base">
                      <XCircle className="mr-2 h-5 w-5" />
                      La solución no es correcta. Intenta de nuevo.
                    </p>
                  )}
                </motion.div>
              )}

              {/* Pista */}
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-blue-950 border border-blue-500/30 rounded-lg"
                >
                  <p className="text-white text-sm sm:text-base">💡 {exercises[currentExercise].hint}</p>
                </motion.div>
              )}

              {/* Solución */}
              {showSolution && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <h3 className="text-lg font-semibold mb-2 text-white">Solución:</h3>
                  <div className="bg-green-950 border border-green-500/30 rounded-lg overflow-hidden">
                    <div className="border-b border-green-500/30 px-4 py-2 flex items-center">
                      <span className="text-xs text-white">Solución TypeScript</span>
                    </div>
                    <div className="p-4 font-mono text-xs sm:text-sm overflow-x-auto">
                      <pre className="whitespace-pre-wrap break-words text-white">{exercises[currentExercise].solution}</pre>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.2);
          border-radius: 4px;
          border: 2px solid rgba(30, 41, 59, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.3);
        }
      `}</style>
    </div>
  )
}