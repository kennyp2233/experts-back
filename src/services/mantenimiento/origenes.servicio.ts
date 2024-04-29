import origenes from "@dbModels/mantenimiento/origenes.model";
import paises from "@dbModels/mantenimiento/paises.model";
import cae_aduanas from "@dbModels/mantenimiento/cae_aduana.model";
import "@db/assosiations/mantenimiento/origenes_paises_aduanas.as"

import { Origen, OrigenCreationAttributes } from "@typesApp/entities/mantenimiento/OrigenTypes";

export async function getOrigenes() {
    const origenesList = await origenes.findAll();
    return origenesList.map((origen) => origen.toJSON()) as Origen[];
}

export async function getOrigen(id: number) {
    const origen = await origenes.findByPk(id);
    return origen ? origen.toJSON() as Origen : null;
}

export async function createOrigen(origen: OrigenCreationAttributes) {
    return await origenes.create(origen);
}

export async function updateOrigen(origen: Origen) {
    const origenToUpdate = await origenes.findByPk(origen.id_origen);
    if (origenToUpdate) {
        await origenes.update(origen, {
            where: {
                id_origen: origen.id_origen
            }
        });
        const updatedOrigen = await origenes.findByPk(origen.id_origen);
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

export async function deleteOrigenes(origenesDelete: number[]) {
    return await origenes.destroy({
        where: {
            id_origen: origenesDelete
        }
    });
}

export async function origenJoinPaisesAduanas() {
    return await origenes.findAll({
        include: [
            {
                model: paises,
                required: true
            },
            {
                model: cae_aduanas,
                required: true
            }
        ]
    });
}