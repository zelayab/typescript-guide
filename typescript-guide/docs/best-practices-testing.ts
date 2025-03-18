/**
 * PATRONES DE TESTING Y CALIDAD 🧪
 * ===========================
 */

// 1. BUILDER DE PRUEBAS 🏗️
// ====================

// ✅ Bien: Builder fluido para objetos de prueba
class UsuarioBuilder {
    private datos: Partial<Usuario> = {
        id: '',
        nombre: '',
        email: '',
        roles: new Set<string>()
    };

    constructor() {
        this.reset();
    }

    reset(): this {
        this.datos = {
            id: 'test-id',
            nombre: 'Usuario Test',
            email: 'test@example.com',
            roles: new Set(['usuario'])
        };
        return this;
    }

    conId(id: string): this {
        this.datos.id = id;
        return this;
    }

    conNombre(nombre: string): this {
        this.datos.nombre = nombre;
        return this;
    }

    conEmail(email: string): this {
        this.datos.email = email;
        return this;
    }

    conRoles(...roles: string[]): this {
        this.datos.roles = new Set(roles);
        return this;
    }

    construir(): Usuario {
        return this.datos as Usuario;
    }
}

// 2. FIXTURES TIPADOS 📋
// =================

// ✅ Bien: Sistema de fixtures con tipos
interface FixtureDefinition<T> {
    nombre: string;
    constructor: new (...args: any[]) => T;
    datos: Partial<T>;
}

class FixtureLoader {
    private fixtures = new Map<string, FixtureDefinition<any>>();

    registrar<T>(fixture: FixtureDefinition<T>): void {
        this.fixtures.set(fixture.nombre, fixture);
    }

    crear<T>(nombre: string, sobreescribir?: Partial<T>): T {
        const fixture = this.fixtures.get(nombre);
        if (!fixture) {
            throw new Error(`Fixture no encontrado: ${nombre}`);
        }

        return new fixture.constructor({
            ...fixture.datos,
            ...sobreescribir
        });
    }
}

// 3. MOCKS TIPADOS 🎭
// ==============

// ✅ Bien: Sistema de mocks con verificación de tipos
class MockBuilder<T> {
    private llamadas: Map<keyof T, any[]> = new Map();
    private implementaciones: Map<keyof T, Function> = new Map();

    constructor(private objeto: T) {}

    cuando<K extends keyof T>(
        metodo: K
    ): {
        retornar: (valor: T[K]) => void;
        lanzar: (error: Error) => void;
    } {
        return {
            retornar: (valor: T[K]) => {
                this.implementaciones.set(metodo, () => valor);
            },
            lanzar: (error: Error) => {
                this.implementaciones.set(metodo, () => { throw error; });
            }
        };
    }

    verificar<K extends keyof T>(
        metodo: K,
        veces?: number
    ): void {
        const llamadas = this.llamadas.get(metodo) || [];
        if (veces !== undefined && llamadas.length !== veces) {
            throw new Error(
                `Método ${String(metodo)} llamado ${llamadas.length} veces, esperado: ${veces}`
            );
        }
    }

    obtenerMock(): T {
        const mock = {} as T;
        
        for (const key of Object.keys(this.objeto) as Array<keyof T>) {
            if (typeof this.objeto[key] === 'function') {
                mock[key] = (...args: any[]) => {
                    const llamadas = this.llamadas.get(key) || [];
                    llamadas.push(args);
                    this.llamadas.set(key, llamadas);

                    const implementacion = this.implementaciones.get(key);
                    return implementacion ? implementacion(...args) : undefined;
                };
            }
        }

        return mock;
    }
}

// 4. SNAPSHOTS TIPADOS 📸
// ==================

// ✅ Bien: Sistema de snapshots con tipos
interface Snapshot<T> {
    version: number;
    datos: T;
    timestamp: number;
}

class SnapshotTester<T> {
    private snapshots = new Map<string, Snapshot<T>>();

    tomarSnapshot(nombre: string, datos: T): void {
        const snapshot: Snapshot<T> = {
            version: (this.snapshots.get(nombre)?.version ?? 0) + 1,
            datos,
            timestamp: Date.now()
        };
        this.snapshots.set(nombre, snapshot);
    }

    compararConSnapshot(nombre: string, datos: T): boolean {
        const snapshot = this.snapshots.get(nombre);
        if (!snapshot) {
            this.tomarSnapshot(nombre, datos);
            return true;
        }

        return JSON.stringify(snapshot.datos) === JSON.stringify(datos);
    }

    actualizarSnapshot(nombre: string, datos: T): void {
        this.tomarSnapshot(nombre, datos);
    }
}

// 5. ASERCIONES PERSONALIZADAS ✅
// =========================

// ✅ Bien: Sistema de aserciones tipado
class Assertion<T> {
    constructor(private actual: T) {}

    igual(esperado: T, mensaje?: string): this {
        if (this.actual !== esperado) {
            throw new Error(
                mensaje || `Esperado ${esperado}, recibido ${this.actual}`
            );
        }
        return this;
    }

    verdadero(predicado: (valor: T) => boolean, mensaje?: string): this {
        if (!predicado(this.actual)) {
            throw new Error(
                mensaje || `La condición no se cumple para ${this.actual}`
            );
        }
        return this;
    }

    tipo(tipo: string): this {
        if (typeof this.actual !== tipo) {
            throw new Error(
                `Esperado tipo ${tipo}, recibido ${typeof this.actual}`
            );
        }
        return this;
    }

    async noLanzaError(fn: () => Promise<void>): Promise<void> {
        try {
            await fn();
        } catch (error) {
            throw new Error(`No se esperaba error: ${error.message}`);
        }
    }
}

function assert<T>(valor: T): Assertion<T> {
    return new Assertion(valor);
} 