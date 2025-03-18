/**
 * PROGRAMACIÓN FUNCIONAL 🎵
 * =====================
 * 
 * ¡Vamos a hacer música con funciones!
 * Como cuando diferentes instrumentos tocan juntos.
 */

// Funciones puras 🎹
// Como una nota musical que siempre suena igual
function sumarPuro(a: number, b: number): number {
    return a + b;  // Siempre da el mismo resultado con los mismos números
}

// Composición de funciones 🎺
// Como cuando juntas varias notas para hacer una melodía
const duplicar = (x: number) => x * 2;
const sumarUno = (x: number) => x + 1;
const duplicarYSumarUno = (x: number) => sumarUno(duplicar(x));

// Funciones de orden superior 🎸
// Como un director de orquesta que dirige otras funciones
function aplicarATodos<T>(arr: T[], fn: (item: T) => T): T[] {
    return arr.map(fn);
}

// Currying 🎻
// Como aprender una canción paso a paso
function sumarCurry(a: number) {
    return function(b: number) {
        return a + b;
    }
}

// Ejercicios musicales 🎮
// 1. Crea una función que componga tres funciones
// 2. Implementa una función map propia
// 3. Crea una función curry que tome tres parámetros

// 1. Funciones Puras
type Operacion = (x: number, y: number) => number;

const suma: Operacion = (x, y) => x + y;
const multiplica: Operacion = (x, y) => x * y;

// 2. Composición de Funciones
type Func<T, R> = (arg: T) => R;

function compose<A, B, C>(
    f: Func<B, C>,
    g: Func<A, B>
): Func<A, C> {
    return (x: A) => f(g(x));
}

// 3. Currying
function curry<T, U, R>(fn: (x: T, y: U) => R): (x: T) => (y: U) => R {
    return x => y => fn(x, y);
}

// 4. Option/Maybe Monad
interface None {
    kind: 'none';
}

interface Some<T> {
    kind: 'some';
    value: T;
}

type Option<T> = None | Some<T>;

class OptionImpl<T> {
    constructor(private value: Option<T>) {}

    static some<T>(value: T): OptionImpl<T> {
        return new OptionImpl({ kind: 'some', value });
    }

    static none<T>(): OptionImpl<T> {
        return new OptionImpl({ kind: 'none' });
    }

    map<U>(fn: (value: T) => U): OptionImpl<U> {
        if (this.value.kind === 'some') {
            return OptionImpl.some(fn(this.value.value));
        }
        return OptionImpl.none();
    }

    flatMap<U>(fn: (value: T) => OptionImpl<U>): OptionImpl<U> {
        if (this.value.kind === 'some') {
            return fn(this.value.value);
        }
        return OptionImpl.none();
    }

    getOrElse(defaultValue: T): T {
        if (this.value.kind === 'some') {
            return this.value.value;
        }
        return defaultValue;
    }
}

// 5. Either Monad
interface Left<E> {
    kind: 'left';
    error: E;
}

interface Right<A> {
    kind: 'right';
    value: A;
}

type Either<E, A> = Left<E> | Right<A>;

class EitherImpl<E, A> {
    constructor(private value: Either<E, A>) {}

    static right<E, A>(value: A): EitherImpl<E, A> {
        return new EitherImpl({ kind: 'right', value });
    }

    static left<E, A>(error: E): EitherImpl<E, A> {
        return new EitherImpl({ kind: 'left', error });
    }

    map<B>(fn: (value: A) => B): EitherImpl<E, B> {
        if (this.value.kind === 'right') {
            return EitherImpl.right(fn(this.value.value));
        }
        return EitherImpl.left(this.value.error);
    }

    flatMap<B>(fn: (value: A) => EitherImpl<E, B>): EitherImpl<E, B> {
        if (this.value.kind === 'right') {
            return fn(this.value.value);
        }
        return EitherImpl.left(this.value.error);
    }
}

// Ejemplos de uso
// 1. Composición de funciones
const duplicarYConvertir = compose(toString, duplicar);

// 2. Currying
const dividir = curry((x: number, y: number) => x / y);
const dividirEntre2 = dividir(2);

// 3. Option Monad
function buscarUsuario(id: number): OptionImpl<string> {
    const usuarios = new Map([
        [1, "Juan"],
        [2, "María"]
    ]);
    
    const usuario = usuarios.get(id);
    return usuario ? OptionImpl.some(usuario) : OptionImpl.none();
}

// 4. Either para manejo de errores
function dividirSeguro(x: number, y: number): EitherImpl<string, number> {
    if (y === 0) {
        return EitherImpl.left("No se puede dividir por cero");
    }
    return EitherImpl.right(x / y);
}

// Ejercicios prácticos
// 1. Implementar un Pipeline operator
type Pipeline = <T>(initial: T) => PipelineBuilder<T>;
type PipelineBuilder<T> = {
    pipe: <R>(fn: (value: T) => R) => PipelineBuilder<R>;
    build: () => T;
};

// 2. Crear un validador funcional
type Validator3<T> = (value: T) => Either<string[], T>;

// 3. Implementar una mónada State
type State<S, A> = (state: S) => [A, S]; 