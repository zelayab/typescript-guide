/**
 * PATRONES DE SEGURIDAD Y VALIDACIÓN 🔒
 * ================================
 */

// 1. VALIDACIÓN DE ENTRADA SEGURA 🛡️
// ============================

// ✅ Bien: Validador de entrada con tipos seguros
class ValidadorEntrada<T> {
    private reglas: Map<keyof T, ((valor: any) => boolean)[]> = new Map();
    private mensajes: Map<keyof T, string[]> = new Map();

    agregarRegla<K extends keyof T>(
        campo: K,
        validador: (valor: T[K]) => boolean,
        mensaje: string
    ): this {
        const reglasCampo = this.reglas.get(campo) || [];
        const mensajesCampo = this.mensajes.get(campo) || [];

        reglasCampo.push(validador as any);
        mensajesCampo.push(mensaje);

        this.reglas.set(campo, reglasCampo);
        this.mensajes.set(campo, mensajesCampo);

        return this;
    }

    validar(datos: Partial<T>): Map<keyof T, string[]> {
        const errores = new Map<keyof T, string[]>();

        for (const [campo, validadores] of this.reglas) {
            const valor = datos[campo];
            const mensajesCampo = this.mensajes.get(campo) || [];

            const mensajesError = validadores
                .map((validador, index) => {
                    return validador(valor) ? null : mensajesCampo[index];
                })
                .filter((mensaje): mensaje is string => mensaje !== null);

            if (mensajesError.length > 0) {
                errores.set(campo, mensajesError);
            }
        }

        return errores;
    }
}

// 2. SANITIZACIÓN DE DATOS 🧹
// =====================

// ✅ Bien: Sistema de sanitización tipado
interface Sanitizador<T> {
    sanitizar(valor: unknown): T;
}

class SanitizadorCadena implements Sanitizador<string> {
    sanitizar(valor: unknown): string {
        if (typeof valor !== 'string') {
            return '';
        }
        return valor
            .trim()
            .replace(/[<>]/g, '') // Previene XSS básico
            .slice(0, 1000);      // Limita longitud
    }
}

class SanitizadorObjeto<T> implements Sanitizador<Partial<T>> {
    constructor(private esquema: Record<keyof T, Sanitizador<any>>) {}

    sanitizar(valor: unknown): Partial<T> {
        if (typeof valor !== 'object' || !valor) {
            return {};
        }

        const resultado: Partial<T> = {};
        for (const [clave, sanitizador] of Object.entries(this.esquema)) {
            if (clave in valor) {
                resultado[clave as keyof T] = sanitizador.sanitizar(
                    (valor as any)[clave]
                );
            }
        }
        return resultado;
    }
}

// 3. CONTROL DE ACCESO BASADO EN ROLES (RBAC) 🔑
// =======================================

// ✅ Bien: Sistema RBAC tipado
type Permiso = string;
type Rol = string;

interface Usuario {
    id: string;
    roles: Set<Rol>;
}

class SistemaRBAC {
    private permisosPorRol = new Map<Rol, Set<Permiso>>();

    agregarRol(rol: Rol, permisos: Permiso[]): void {
        this.permisosPorRol.set(rol, new Set(permisos));
    }

    tienePermiso(usuario: Usuario, permiso: Permiso): boolean {
        return Array.from(usuario.roles).some(rol => {
            const permisosRol = this.permisosPorRol.get(rol);
            return permisosRol?.has(permiso) ?? false;
        });
    }

    verificarPermiso(usuario: Usuario, permiso: Permiso): void {
        if (!this.tienePermiso(usuario, permiso)) {
            throw new Error(`Usuario no tiene permiso: ${permiso}`);
        }
    }
}

// 4. RATE LIMITING 🚦
// ==============

// ✅ Bien: Rate limiter tipado
interface RateLimitConfig {
    ventanaTiempo: number;  // en ms
    maxSolicitudes: number;
}

class RateLimiter {
    private solicitudes = new Map<string, number[]>();

    constructor(private config: RateLimitConfig) {}

    async verificar(identificador: string): Promise<boolean> {
        const ahora = Date.now();
        const solicitudesUsuario = this.solicitudes.get(identificador) || [];

        // Limpiar solicitudes antiguas
        const solicitudesActivas = solicitudesUsuario.filter(
            tiempo => ahora - tiempo < this.config.ventanaTiempo
        );

        if (solicitudesActivas.length >= this.config.maxSolicitudes) {
            return false;
        }

        solicitudesActivas.push(ahora);
        this.solicitudes.set(identificador, solicitudesActivas);
        return true;
    }
}

// 5. AUDITORÍA DE ACCIONES 📝
// =====================

// ✅ Bien: Sistema de auditoría tipado
interface EventoAuditoria<T = unknown> {
    timestamp: number;
    usuario: string;
    accion: string;
    recurso: string;
    datos: T;
    resultado: 'éxito' | 'error';
    detalles?: string;
}

class SistemaAuditoria {
    private eventos: EventoAuditoria[] = [];

    registrar<T>(evento: Omit<EventoAuditoria<T>, 'timestamp'>): void {
        this.eventos.push({
            ...evento,
            timestamp: Date.now()
        });
    }

    async buscar(criterios: Partial<EventoAuditoria>): Promise<EventoAuditoria[]> {
        return this.eventos.filter(evento =>
            Object.entries(criterios).every(([clave, valor]) =>
                evento[clave as keyof EventoAuditoria] === valor
            )
        );
    }

    async exportar(formato: 'json' | 'csv'): Promise<string> {
        if (formato === 'json') {
            return JSON.stringify(this.eventos, null, 2);
        }
        // Implementar exportación CSV
        return '';
    }
} 