"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SistemaUsuarios = void 0;
class SistemaUsuarios {
    constructor() {
        this.usuarios = [];
    }
    agregarUsuario(usuario) {
        this.usuarios.push(usuario);
    }
    buscarPorEmail(email) {
        return this.usuarios.find(u => u.email === email);
    }
    desactivarUsuario(id) {
        const usuario = this.usuarios.find(u => u.id === id);
        if (usuario) {
            usuario.activo = false;
            return true;
        }
        return false;
    }
}
exports.SistemaUsuarios = SistemaUsuarios;
