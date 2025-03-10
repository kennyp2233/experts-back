// src/services/usuarios/usuarios.servicio.ts
import Admins from "@models/usuarios/admins.model";
import ClienteRol from "@models/usuarios/clientes.model";
import Usuarios from "@models/usuarios/usuario.model";
import { UsuarioAtributos, UsuarioAtributosCreacion } from "@typesApp/usuarios/usuario.type";
import { UUID } from "crypto";
import FincaRol from "../../models/usuarios/fincas.model";
import Pendiente from "@models/usuarios/pendiente.model";

import "src/config/assosiations/usuarios/usuarios.ass"

// Diccionario de modelos de roles para facilitar recorrerlos
const roleTableMap: { [key: string]: any } = {
    admin: Admins,
    cliente: ClienteRol,
    finca: FincaRol,
    pendiente: Pendiente
};

// Verifica si un usuario tiene un rol específico
export async function isUserInRole(userId: UUID, role: string): Promise<boolean> {
    const roleTable = roleTableMap[role];
    if (!roleTable) {
        throw new Error(`El rol ${role} no está definido en el mapa de roles`);
    }

    const user = await roleTable.findOne({
        where: { id_usuario: userId },
    });

    return user !== null;
}

// Obtiene todos los roles de un usuario
export async function getUserRoles(userId: UUID): Promise<string[]> {
    const roles: string[] = [];

    // Recorrer cada modelo de rol y verificar si el usuario está en ese rol
    for (const role of Object.keys(roleTableMap)) {
        const isInRole = await isUserInRole(userId, role);
        if (isInRole) {
            roles.push(role);
        }
    }

    return roles;
}

// No se utiliza try/catch aquí; los errores se propagan a las rutas
export async function getUsuarios(): Promise<UsuarioAtributos[]> {
    const usuariosList = await Usuarios.findAll();
    return usuariosList.map((usuario) => usuario.toJSON()) as UsuarioAtributos[];
}

export async function getUsuario(id: number): Promise<UsuarioAtributos> {
    const usuarioInstance = await Usuarios.findByPk(id);
    if (!usuarioInstance) {
        throw new Error('Usuario no encontrado');
    }
    return usuarioInstance.toJSON() as UsuarioAtributos;
}

export async function createUsuario(usuario: UsuarioAtributosCreacion): Promise<UsuarioAtributos> {
    const existingUser = await Usuarios.findOne({ where: { email: usuario.email } });
    if (existingUser) {
        throw new Error('El usuario ya existe');
    }

    const nuevoUsuario = await Usuarios.create(usuario);
    return nuevoUsuario.toJSON() as UsuarioAtributos;
}

export async function updateUsuario(id: number, usuario: Partial<UsuarioAtributosCreacion>): Promise<UsuarioAtributos> {
    const usuarioToUpdate = await Usuarios.findByPk(id);
    if (!usuarioToUpdate) {
        throw new Error('Usuario no encontrado');
    }

    await Usuarios.update(usuario, {
        where: {
            id_usuario: id
        }
    });

    const updatedUsuario = await Usuarios.findByPk(id);
    if (!updatedUsuario) {
        throw new Error('Error al actualizar el usuario');
    }
    return updatedUsuario.toJSON() as UsuarioAtributos;
}

export async function deleteUsuario(id: number): Promise<UsuarioAtributos> {
    const usuarioToDelete = await Usuarios.findByPk(id);
    if (!usuarioToDelete) {
        throw new Error('Usuario no encontrado');
    }

    await Usuarios.destroy({
        where: {
            id_usuario: id
        }
    });
    return usuarioToDelete.toJSON() as UsuarioAtributos;
}
