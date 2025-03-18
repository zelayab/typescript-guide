/**
 * META-PROGRAMACIÓN 🌌
 * =================
 * 
 * ¡Vamos a crear código que crea más código!
 * Como un hechicero que puede crear otros hechiceros.
 */

// Decoradores Avanzados 🎭
// Como crear stickers mágicos que transforman todo
function transformar() {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            nuevoPoder = "¡Ahora tengo poderes mágicos! ✨";
            
            usarPoder() {
                console.log(this.nuevoPoder);
            }
        }
    }
}

// Fábricas de Tipos 🏭
// Como una máquina que crea tipos nuevos
type CrearTipoMagico<Base, Extra> = {
    [P in keyof Base | keyof Extra]: 
        P extends keyof Base ? Base[P] :
        P extends keyof Extra ? Extra[P] :
        never;
};

// Proxy Mágico 🔮
// Como un espejo que puede cambiar lo que refleja
function crearProxyMagico<T extends object>(target: T): T {
    return new Proxy(target, {
        get(obj, prop) {
            console.log(`🔍 Leyendo la propiedad ${String(prop)}`);
            return Reflect.get(obj, prop);
        },
        set(obj, prop, value) {
            console.log(`✨ Cambiando ${String(prop)} a ${value}`);
            return Reflect.set(obj, prop, value);
        }
    });
}

// Ejercicios legendarios 🎮
// 1. Crea un decorador que registre el tiempo de ejecución
// 2. Implementa un sistema de plugins usando meta-programación
// 3. Crea un proxy que valide tipos en tiempo de ejecución 