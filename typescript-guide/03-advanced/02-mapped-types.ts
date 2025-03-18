/**
 * MAPPED TYPES 🗺️
 * ============
 * 
 * ¡Vamos a transformar tipos como por arte de magia!
 * Como cuando usas un hechizo para cambiar todos tus juguetes.
 */

// Mapped type simple 🎨
// Como hacer que todo sea opcional
type TodoOpcional<T> = {
    [P in keyof T]?: T[P];
};

// Mapped type con modificadores 🔧
// Como poner candados en todas las propiedades
type TodoReadonly<T> = {
    readonly [P in keyof T]: T[P];
};

// Mapped type con transformación 🎭
// Como convertir todo a texto
type TodoATexto<T> = {
    [P in keyof T]: string;
};

// Ejercicios mágicos 🎮
// 1. Crea un tipo que haga todo nullable
// 2. Crea un tipo que agregue "get" antes de cada propiedad
// 3. Crea un tipo que convierta todo a arrays

// Mapped type básico
type Opcional<T> = {
    [P in keyof T]?: T[P];
};

// Mapped type con renombrado de propiedades
type Getters<T> = {
    [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

// Ejemplo práctico: Sistema de formularios
interface FormField2<T> {
    valor: T;
    error?: string;
    touched: boolean;
    dirty: boolean;
}

type Form<T> = {
    [P in keyof T]: FormField2<T[P]>;
};

// Implementación de un formulario tipado
class FormularioTipado<T extends object> {
    private campos: Form<T>;

    constructor(initialValues: T) {
        this.campos = Object.keys(initialValues).reduce((acc, key) => {
            acc[key as keyof T] = {
                valor: initialValues[key as keyof T],
                touched: false,
                dirty: false
            };
            return acc;
        }, {} as Form<T>);
    }

    setValue<K extends keyof T>(campo: K, valor: T[K]) {
        this.campos[campo] = {
            ...this.campos[campo],
            valor,
            dirty: true
        };
    }

    getValues(): T {
        return Object.keys(this.campos).reduce((acc, key) => {
            acc[key as keyof T] = this.campos[key as keyof T].valor;
            return acc;
        }, {} as T);
    }
}

// Ejemplo de uso
interface RegistroUsuario {
    nombre: string;
    email: string;
    edad: number;
}

const formulario = new FormularioTipado<RegistroUsuario>({
    nombre: '',
    email: '',
    edad: 0
});

// Ejercicios prácticos
// 1. Implementar un mapped type para validación
type Validaciones<T> = {
    [P in keyof T]: (valor: T[P]) => boolean;
};

// 2. Crear un mapped type para transformación de datos
type Transformador2<T> = {
    [P in keyof T]: (valor: T[P]) => any;
};

// 3. Implementar un sistema de serialización
type Serializable<T> = {
    [P in keyof T]: T[P] extends object
        ? Serializable<T[P]>
        : string;
}; 