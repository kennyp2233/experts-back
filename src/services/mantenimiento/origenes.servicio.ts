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
    const origenData = extraerOrigenDeData(origen);
    return await origenes.create(origenData as any);
}

export async function updateOrigen(origen: Origen) {
    const origenToUpdate = await origenes.findByPk(origen.id_origen);
    const origenData = extraerOrigenDeData(origen);
    if (origenToUpdate) {
        await origenes.update(origenData, {
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
                required: false
            },
            {
                model: cae_aduanas,
                required: false
            }
        ]
    });
}

function extraerOrigenDeData(data: any) {
    return {
        codigo_origen: data?.codigo_origen,
        nombre: data?.nombre,
        aeropuerto: data?.aeropuerto,
        id_pais: data?.paise?.id_pais,
        id_cae_aduana: data?.cae_aduana?.id_cae_aduana
    }
}