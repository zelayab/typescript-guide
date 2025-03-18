# Patrones de Diseño en TypeScript

Este módulo contiene implementaciones de los patrones de diseño más comunes utilizando TypeScript. Los patrones están organizados en tres categorías principales:

## 1. Patrones Creacionales

Estos patrones se centran en mecanismos de creación de objetos.

### 1.1 Singleton
- **Propósito**: Garantizar que una clase tenga una única instancia y proporcionar un punto de acceso global a ella.
- **Uso**: Conexiones a bases de datos, configuraciones globales.
- **Ejemplo**: `DatabaseConnection`

### 1.2 Factory Method
- **Propósito**: Definir una interfaz para crear objetos, pero permitir a las subclases decidir qué clase instanciar.
- **Uso**: Creación de objetos con lógica compleja o dependiente del contexto.
- **Ejemplo**: `Creator` y `ConcreteCreator`

### 1.3 Abstract Factory
- **Propósito**: Proporcionar una interfaz para crear familias de objetos relacionados.
- **Uso**: Sistemas que necesitan ser independientes de cómo se crean sus productos.
- **Ejemplo**: `GUIFactory` y `WindowsFactory`

## 2. Patrones Estructurales

Estos patrones se ocupan de la composición de clases y objetos.

### 2.1 Adapter
- **Propósito**: Permitir que interfaces incompatibles trabajen juntas.
- **Uso**: Integración de sistemas legacy, APIs de terceros.
- **Ejemplo**: `LibraryAdapter`

### 2.2 Decorator
- **Propósito**: Añadir responsabilidades adicionales a objetos dinámicamente.
- **Uso**: Extensión de funcionalidad sin subclases.
- **Ejemplo**: `LoggingDecorator`

## 3. Patrones de Comportamiento

Estos patrones se centran en la comunicación entre objetos.

### 3.1 Observer
- **Propósito**: Definir una dependencia uno-a-muchos entre objetos.
- **Uso**: Sistemas de eventos, notificaciones.
- **Ejemplo**: `ConcreteSubject` y `ConcreteObserver`

### 3.2 Strategy
- **Propósito**: Definir una familia de algoritmos intercambiables.
- **Uso**: Diferentes implementaciones de un algoritmo.
- **Ejemplo**: `SumStrategy` y `MultiplyStrategy`

## Uso de los Patrones

### Instalación
```bash
npm install
```

### Ejecutar Tests
```bash
npm test
```

### Ejemplo de Uso

```typescript
// Singleton
const db = DatabaseConnection.getInstance();
db.connect();

// Strategy
const context = new Context(new SumStrategy());
console.log(context.executeStrategy([1, 2, 3])); // 6

context.setStrategy(new MultiplyStrategy());
console.log(context.executeStrategy([1, 2, 3])); // 6
```

## Mejores Prácticas

1. **Uso de Tipos**
   - Aprovechar el sistema de tipos de TypeScript
   - Definir interfaces claras
   - Utilizar genéricos cuando sea apropiado

2. **Principios SOLID**
   - Single Responsibility Principle
   - Open/Closed Principle
   - Liskov Substitution Principle
   - Interface Segregation Principle
   - Dependency Inversion Principle

3. **Documentación**
   - Comentarios claros y concisos
   - Ejemplos de uso
   - Tests unitarios

## Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Crea un Pull Request

## Referencias

- [Design Patterns: Elements of Reusable Object-Oriented Software](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Refactoring Guru - Design Patterns](https://refactoring.guru/design-patterns) 