import Origenes from "@models/mantenimiento/origen.model";
import Paises from "@models/mantenimiento/pais.model";
import CaesAduana from "@models/mantenimiento/cae_aduana.model";
import "src/config/assosiations/mantenimiento/origenes_paises_aduanas.as"

import { Origen, OrigenCreationAttributes } from "@typesApp/mantenimiento/origen.type";

export async function getOrigenes() {
    const origenesList = await Origenes.findAll();
    return origenesList.map((origen) => origen.toJSON()) as Origen[];
}

export async function getOrigen(id: number) {
    const origen = await Origenes.findByPk(id);
    return origen ? origen.toJSON() as Origen : null;
}

export async function createOrigen(origen: OrigenCreationAttributes) {
    const origenData = extraerOrigenDeData(origen);
    return await Origenes.create(origenData as any);
}

export async function updateOrigen(origen: Origen) {
    const origenToUpdate = await Origenes.findByPk(origen.id_origen);
    const origenData = extraerOrigenDeData(origen);
    if (origenToUpdate) {
        await Origenes.update(origenData, {
            where: {
                id_origen: origen.id_origen
            }
        });
        const updatedOrigen = await Origenes.findByPk(origen.id_origen);
        return updatedOrigen ? updatedOrigen.toJSON() as Origen : null;
    }
    return null;
}

export async function deleteOrigen(id: number) {
    const origenToDelete = await Origenes.findByPk(id);
    if (origenToDelete) {
        await Origenes.destroy({
            where: {
                id_origen: id
            }
        });
        return origenToDelete.toJSON() as Origen;
    }
    return null;
}

export async function deleteOrigenes(origenesDelete: number[]) {
    return await Origenes.destroy({
        where: {
            id_origen: origenesDelete
        }
    });
}

export async function origenJoinPaisesAduanas() {
    return await Origenes.findAll({
        include: [
            {
                model: Paises,
                required: false
            },
            {
                model: CaesAduana,
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