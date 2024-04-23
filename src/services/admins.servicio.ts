import Admins from "@dbModels/admins.model";
import admins from "@dbModels/admins.model";
import usuarios from "@dbModels/usuarios.model";
import "@db/assosiations/user_admin.as";
import { Admin, AdminCreationAttributes } from "@typesApp/entities/AdminTypes";

export async function getAdmins(): Promise<Admin[]> {
    const adminsList = await admins.findAll();
    return adminsList.map((admin) => admin.toJSON()) as Admin[];
}

export async function getAdmin(id: number): Promise<Admin | null> {
    const admin = await admins.findByPk(id);
    return admin ? admin.toJSON() as Admin : null;
}

export async function createAdmin(admin: AdminCreationAttributes) {
    return await admins.create(admin as any);
}

export async function updateAdmin(id: number, admin: AdminCreationAttributes): Promise<Admin | null> {
    const adminToUpdate = await admins.findByPk(id);
    if (adminToUpdate) {
        await admins.update(admin, {
            where: {
                id_usuario: id
            }
        });
        const updatedAdmin = await admins.findByPk(id);
        return updatedAdmin ? updatedAdmin.toJSON() as Admin : null;
    }
    return null;
}

export async function deleteAdmin(id: number): Promise<Admin | null> {
    const adminToDelete = await admins.findByPk(id);

    if (adminToDelete) {
        await admins.destroy({
            where: {
                id_usuario: id
            }
        });

        return adminToDelete.toJSON() as Admin;
    }
    return null;
}


export async function isUserAdmin(userId: number): Promise<boolean | null> {
 
    const user = await usuarios.findOne({
        where: { id_usuario: userId },
        include: [{
            model: admins,
            required: true

        }]
    });

    return user !== null;
}

