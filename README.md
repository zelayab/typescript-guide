# 🚀 Guía Avanzada de TypeScript

Una guía completa y práctica sobre las características avanzadas de TypeScript, con ejemplos prácticos y casos de uso reales.

## 📚 Contenido

1. [Utility Types](#utility-types)
2. [String Manipulation](#string-manipulation)
3. [Mapped Types](#mapped-types)
4. [Unions vs Intersections](#unions-vs-intersections)
5. [Alternativas a Enums](#alternativas-a-enums)
6. [PropertyKey](#propertykey)
7. [ThisType](#thistype)
8. [Awaited Type](#awaited-type)

## 🛠️ Utility Types

### Partial<T>
Hace todas las propiedades opcionales:
```typescript
interface Juguete {
    nombre: string;
    precio: number;
}

type JugueteActualizable = Partial<Juguete>;
// { nombre?: string; precio?: number; }
```

### Required<T>
Hace todas las propiedades obligatorias:
```typescript
interface ListaDeseos {
    nombre?: string;
    precio?: number;
}

type CompraDefinitiva = Required<ListaDeseos>;
// { nombre: string; precio: number; }
```

### Readonly<T>
Hace todas las propiedades inmutables:
```typescript
interface ConfiguracionJuego {
    dificultad: string;
    puntuacionMaxima: number;
}

type ConfiguracionSegura = Readonly<ConfiguracionJuego>;
```

## 🎨 String Manipulation

### Template Literals
```typescript
type Saludo = 'Hola' | 'Adiós';
type Nombre = 'Mario' | 'Luigi';
type MensajeSaludo = `${Saludo}, ${Nombre}!`;
```

### Case Manipulation
```typescript
type NombreJuego = 'super mario';
type TituloJuego = Uppercase<NombreJuego>; // 'SUPER MARIO'
type CodigoJuego = Lowercase<'MARIO123'>; // 'mario123'
```

## 🗺️ Mapped Types

### Transformación de Propiedades
```typescript
interface EventosJuego {
    moverJugador: (x: number, y: number) => void;
    atacar: (objetivo: string) => void;
}

type ManejadoresEventos = {
    [K in keyof EventosJuego as `handle${Capitalize<string & K>}`]: EventosJuego[K]
};
```

## 🔄 Unions vs Intersections

### Unions (|)
```typescript
type DireccionJuego = 'arriba' | 'abajo' | 'izquierda' | 'derecha';
type PuntajeJuego = number | 'N/A';
```

### Intersections (&)
```typescript
interface PersonajeBase {
    nombre: string;
    nivel: number;
}

interface Habilidades {
    atacar: () => void;
    defender: () => void;
}

type Guerrero = PersonajeBase & Habilidades;
```

## 🎯 Alternativas a Enums

### Union Types
```typescript
type Direccion = 'arriba' | 'abajo' | 'izquierda' | 'derecha';
```

### Const Objects
```typescript
const EstadosJuego = {
    MENU: 'MENU',
    JUGANDO: 'JUGANDO',
    PAUSA: 'PAUSA'
} as const;

type EstadoJuego = typeof EstadosJuego[keyof typeof EstadosJuego];
```

## 🔑 PropertyKey

```typescript
type ClaveColor = PropertyKey; // string | number | symbol
```

## 🎮 ThisType

```typescript
interface EstadoPersonaje {
    vida: number;
    energia: number;
}

interface AccionesPersonaje {
    atacar(): void;
    curar(): void;
}

const personajeMixin: AccionesPersonaje & ThisType<EstadoPersonaje & AccionesPersonaje> = {
    atacar() { this.energia -= 10; },
    curar() { this.vida += 20; }
};
```

## ⏳ Awaited Type

```typescript
type RecursoJuego = {
    nombre: string;
    tamaño: number;
};

type PromesaRecurso = Promise<RecursoJuego>;
type RecursoResuelto = Awaited<PromesaRecurso>; // RecursoJuego
```

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el compilador de TypeScript:
```bash
npm run tsc
```

## 📖 Uso

Cada sección incluye ejemplos prácticos que puedes encontrar en el directorio `typescript-guide/`. Los ejemplos están organizados por categorías y están completamente documentados.

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, asegúrate de:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## ✨ Características Destacadas

- ✅ Ejemplos prácticos y realistas
- 🎮 Enfoque en desarrollo de juegos y aplicaciones
- 📚 Documentación detallada
- 🔍 Casos de uso comunes
- 💡 Mejores prácticas
- 🛠️ Patrones de diseño TypeScript

## 🎯 Objetivos del Proyecto

1. Proporcionar una guía completa de TypeScript avanzado
2. Demostrar casos de uso prácticos y realistas
3. Explicar conceptos complejos de forma clara
4. Fomentar las mejores prácticas de TypeScript
5. Servir como referencia para desarrolladores

## 📚 Recursos Adicionales

- [Documentación Oficial de TypeScript](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

## 🤝 Agradecimientos

- Comunidad de TypeScript
- Contribuidores del proyecto
- Usuarios que proporcionan feedback

## 📞 Contacto

Para preguntas y soporte, por favor abre un issue en el repositorio.

---

⭐️ Si este proyecto te ha sido útil, ¡no dudes en darle una estrella! 