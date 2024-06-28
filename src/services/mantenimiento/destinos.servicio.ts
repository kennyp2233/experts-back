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
    const destinoData = extraerDestinoDeData(destino);
    return await destinos.create(destinoData);
}

export async function updateDestino(destino: Destino) {
    const destinoToUpdate = await destinos.findByPk(destino.id_destino);
    const destinoData = extraerDestinoDeData(destino);
    if (destinoToUpdate) {
        await destinos.update(destinoData, {
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
                required: false
            }
        ]
    });
}

function extraerDestinoDeData(data: any) {
    return {
        codigo_destino: data?.codigo_destino,
        nombre: data?.nombre,
        aeropuerto: data.aeropuerto,
        id_pais: data?.paise?.id_pais,
        sesa_id: data?.sesa_id,
        leyenda_fito: data?.leyenda_fito,
        cobro_fitos: data?.cobro_fitos
    }
}