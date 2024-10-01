// src/services/usuarios/usuarios.servicio.ts
import Usuarios from "@models/usuarios/usuario.model";
import { Usuario, UsuarioAtributosCreacion } from "@typesApp/usuarios/usuario.type";

// No se utiliza try/catch aquí; los errores se propagan a las rutas
export async function getUsuarios(): Promise<Usuario[]> {
    const usuariosList = await Usuarios.findAll();
    return usuariosList.map((usuario) => usuario.toJSON()) as Usuario[];
}

export async function getUsuario(id: number): Promise<Usuario> {
    const usuarioInstance = await Usuarios.findByPk(id);
    if (!usuarioInstance) {
        throw new Error('Usuario no encontrado');
    }
    return usuarioInstance.toJSON() as Usuario;
}

export async function createUsuario(usuario: UsuarioAtributosCreacion): Promise<Usuario> {
    const existingUser = await Usuarios.findOne({ where: { email: usuario.email } });
    if (existingUser) {
        throw new Error('El usuario ya existe');
    }

    const nuevoUsuario = await Usuarios.create(usuario);
    return nuevoUsuario.toJSON() as Usuario;
}

export async function updateUsuario(id: number, usuario: Partial<UsuarioAtributosCreacion>): Promise<Usuario> {
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
    return updatedUsuario.toJSON() as Usuario;
}

export async function deleteUsuario(id: number): Promise<Usuario> {
    const usuarioToDelete = await Usuarios.findByPk(id);
    if (!usuarioToDelete) {
        throw new Error('Usuario no encontrado');
    }

    await Usuarios.destroy({
        where: {
            id_usuario: id
        }
    });
    return usuarioToDelete.toJSON() as Usuario;
}
