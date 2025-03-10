import Admins from "@models/usuarios/admins.model";
import Usuarios from "@models/usuarios/usuario.model";

import { Admin, AdminAtrubutosCreacion } from "@typesApp/usuarios/admin.type";
import { UUID } from "crypto";

export async function getAdmins(): Promise<Admin[]> {
    const adminsList = await Admins.findAll();
    return adminsList.map((admin) => admin.toJSON()) as Admin[];
}

export async function getAdmin(id: number): Promise<Admin | null> {
    const admin = await Admins.findByPk(id);
    return admin ? admin.toJSON() as Admin : null;
}

export async function createAdmin(admin: AdminAtrubutosCreacion) {
    return await Admins.create(admin as any);
}

export async function updateAdmin(id: number, admin: AdminAtrubutosCreacion): Promise<Admin | null> {
    const adminToUpdate = await Admins.findByPk(id);
    if (adminToUpdate) {
        await Admins.update(admin, {
            where: {
                id_usuario: id
            }
        });
        const updatedAdmin = await Admins.findByPk(id);
        return updatedAdmin ? updatedAdmin.toJSON() as Admin : null;
    }
    return null;
}

export async function deleteAdmin(id: number): Promise<Admin | null> {
    const adminToDelete = await Admins.findByPk(id);

    if (adminToDelete) {
        await Admins.destroy({
            where: {
                id_usuario: id
            }
        });

        return adminToDelete.toJSON() as Admin;
    }
    return null;
}


export async function isUserAdmin(userId: UUID): Promise<boolean | null> {

    const user = await Usuarios.findOne({
        where: { id_usuario: userId },
        include: [{
            model: Admins,
            required: true

        }]
    });

    return user !== null;
}

