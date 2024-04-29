import usuarios from "@dbModels/usuarios/usuarios.model";
import { Usuario, UsuarioCreationAttributes } from "@typesApp/entities/usuarios/UsuarioTypes";

export async function getUsuarios() {
    const usuariosList = await usuarios.findAll();
    return usuariosList.map((usuario) => usuario.toJSON()) as Usuario[];
}

export async function getUsuario(id: number) {
    const usuarioInstance = await usuarios.findByPk(id);
    return usuarioInstance ? usuarioInstance.toJSON() as Usuario : null;
}

export async function createUsuario(usuario: UsuarioCreationAttributes) {
    return await usuarios.create(usuario);
}

export async function updateUsuario(usuario: Usuario) {
    const usuarioToUpdate = await usuarios.findByPk(usuario.id_usuario);
    if (usuarioToUpdate) {
        await usuarios.update(usuario, {
            where: {
                id_usuario: usuario.id_usuario
            }
        });
        const updatedUsuario = await usuarios.findByPk(usuario.id_usuario);
        return updatedUsuario ? updatedUsuario.toJSON() as Usuario : null;
    }
    return null;
}

export async function deleteUsuario(id: number) {
    const usuarioToDelete = await usuarios.findByPk(id);
    if (usuarioToDelete) {
        await usuarios.destroy({
            where: {
                id_usuario: id
            }
        });
        return usuarioToDelete.toJSON() as Usuario;
    }
    return null;
}