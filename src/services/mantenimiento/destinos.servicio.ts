import destinos from "@dbModels/mantenimiento/destinos.model"
import pais from "@dbModels/mantenimiento/paises.model"
import { Destino, DestinoCreationAttributes } from "@typesApp/entities/mantenimiento/DestinoTypes"
import "@db/assosiations/mantenimiento/destinos_pais.as"

export async function getDestinos() {
    const destinosList = await destinos.findAll();
    return destinosList.map((destino) => destino.toJSON()) as Destino[];
}

export async function getDestino(id: number) {
    const destino = await destinos.findByPk(id);
    return destino ? destino.toJSON() as Destino : null;
}

export async function createDestino(destino: DestinoCreationAttributes) {
    return await destinos.create(destino);
}

export async function updateDestino(destino: Destino) {
    const destinoToUpdate = await destinos.findByPk(destino.id_destino);
    if (destinoToUpdate) {
        await destinos.update(destino, {
            where: {
                id_destino: destino.id_destino
            }
        });
        const updatedDestino = await destinos.findByPk(destino.id_destino);
        return updatedDestino ? updatedDestino.toJSON() as Destino : null;
    }
    return null;
}

export async function deleteDestino(id: number) {
    const destinoToDelete = await destinos.findByPk(id);
    if (destinoToDelete) {
        await destinos.destroy({
            where: {
                id_destino: id
            }
        });
        return destinoToDelete.toJSON() as Destino;
    }
    return null;
}

export async function deleteDestinos(destinosDelete: number[]) {
    return await destinos.destroy({
        where: {
            id_destino: destinosDelete
        }
    });
}

export async function getDestinosJoinPais() {
    return await destinos.findAll({
        include: [
            {
                model: pais,
                required: true
            }
        ]
    });
}