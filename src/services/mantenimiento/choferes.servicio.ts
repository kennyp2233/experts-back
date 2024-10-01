import Choferes from "@models/mantenimiento/chofer.model";
import { Chofer, ChoferAtributosCreacion } from "@typesApp/mantenimiento/chofer.type";

export async function getChoferes() {
    const choferesList = await Choferes.findAll();
    return choferesList.map((chofer) => chofer.toJSON()) as Chofer[];
}

export async function getChofer(id: number) {
    const chofer = await Choferes.findByPk(id);
    return chofer ? chofer.toJSON() as Chofer : null;
}

export async function createChofer(chofer: ChoferAtributosCreacion) {
    const newChofer = await Choferes.create(chofer);
    return newChofer.toJSON() as Chofer;
}

export async function updateChofer(chofer: Chofer) {
    const updatedChofer = await Choferes.update(chofer, {
        where: {
            id_chofer: chofer.id_chofer
        }
    });
    return updatedChofer;
}

export async function deleteChoferes(ids: number[]) {
    const deletedChoferes = await Choferes.destroy({
        where: {
            id_chofer: ids
        }
    });
    return deletedChoferes;
}

