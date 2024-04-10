import origenes from "@dbModels/origenes.model";
import { Origen, OrigenCreationAttributes } from "@typesApp/entities/OrigenTypes";

export async function getOrigenes() {
    const origenesList = await origenes.findAll();
    return origenesList.map((origen) => origen.toJSON()) as Origen[];
}

export async function getOrigen(id: number) {
    const origen = await origenes.findByPk(id);
    return origen ? origen.toJSON() as Origen : null;
}

export async function createOrigen(origen: OrigenCreationAttributes) {
    try {
        return await origenes.create(origen);
    } catch (error) {
        throw error;
    }
}

export async function updateOrigen(id: number, origen: OrigenCreationAttributes) {
    const origenToUpdate = await origenes.findByPk(id);
    if (origenToUpdate) {
        await origenes.update(origen, {
            where: {
                id_origen: id
            }
        });
        const updatedOrigen = await origenes.findByPk(id);
        return updatedOrigen ? updatedOrigen.toJSON() as Origen : null;
    }
    return null;
}

export async function deleteOrigen(id: number) {
    const origenToDelete = await origenes.findByPk(id);
    if (origenToDelete) {
        await origenes.destroy({
            where: {
                id_origen: id
            }
        });
        return origenToDelete.toJSON() as Origen;
    }
    return null;
}

