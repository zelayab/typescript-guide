// Ejercicios Prácticos de Patrones de Diseño

/**
 * Ejercicio 1: Implementar un Singleton Thread-Safe
 * 
 * Crea una clase ConfigurationManager que:
 * - Sea thread-safe
 * - Permita almacenar y recuperar configuraciones
 * - Tenga un método para recargar la configuración
 * - Implemente un mecanismo de bloqueo para operaciones críticas
 */

export interface IConfiguration {
  apiUrl: string;
  timeout: number;
  retryCount: number;
}

// TODO: Implementa el ConfigurationManager aquí

/**
 * Ejercicio 2: Factory Method con Validación
 * 
 * Implementa un sistema de creación de documentos que:
 * - Soporte diferentes tipos (PDF, Word, Excel)
 * - Valide el contenido antes de crear el documento
 * - Aplique formato específico según el tipo
 */

export interface IDocument {
  content: string;
  format(): void;
  validate(): boolean;
  save(): void;
}

// TODO: Implementa las clases Document y DocumentCreator

/**
 * Ejercicio 3: Observer con Prioridad
 * 
 * Crea un sistema de notificaciones que:
 * - Permita asignar prioridades a los observadores
 * - Notifique en orden según la prioridad
 * - Permita filtrar notificaciones por tipo
 */

export interface IPriorityObserver {
  priority: number;
  update(message: string, type: string): void;
}

// TODO: Implementa el NotificationSystem

/**
 * Ejercicio 4: Decorator con Cache
 * 
 * Implementa un decorator que:
 * - Cachee los resultados de operaciones costosas
 * - Permita establecer un tiempo de expiración
 * - Limpie automáticamente la cache
 */

export interface IDataService {
  fetchData(id: string): Promise<any>;
}

// TODO: Implementa el CacheDecorator

/**
 * Ejercicio 5: Chain of Responsibility con Logging
 * 
 * Crea una cadena de procesamiento que:
 * - Valide requests HTTP
 * - Registre cada paso del procesamiento
 * - Permita modificar la cadena en runtime
 */

export interface IRequest {
  headers: Record<string, string>;
  body: any;
  method: string;
}

export interface IHandler {
  setNext(handler: IHandler): IHandler;
  handle(request: IRequest): Promise<void>;
}

// TODO: Implementa los handlers de la cadena

// Tests de ejemplo:
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('Patrones de Diseño - Ejercicios', () => {
    // TODO: Implementa los tests para cada ejercicio
  });
} 