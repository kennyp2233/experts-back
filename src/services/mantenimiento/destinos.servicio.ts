import Destinos from "@models/mantenimiento/destino.model";
import Pais from "@models/mantenimiento/pais.model";
import { Destino, DestinoAtributosCreacion } from "@typesApp/mantenimiento/destino.type"
import "src/config/assosiations/mantenimiento/destinos_pais.as"

export async function getDestinos() {
    const destinosList = await Destinos.findAll({
        order: [['codigo_destino', 'ASC']], // Order by codigo_destino in ascending order (use 'DESC' for descending)
    });
    return destinosList;
}

export async function getDestino(id: number) {
    const destino = await Destinos.findByPk(id);
    return destino ? destino.toJSON() as Destino : null;
}

export async function createDestino(destino: DestinoAtributosCreacion) {
    const destinoData = extraerDestinoDeData(destino);
    return await Destinos.create(destinoData);
}

export async function updateDestino(destino: Destino) {
    const destinoToUpdate = await Destinos.findByPk(destino.id_destino);
    const destinoData = extraerDestinoDeData(destino);
    if (destinoToUpdate) {
        await Destinos.update(destinoData, {
            where: {
                id_destino: destino.id_destino
            }
        });
        const updatedDestino = await Destinos.findByPk(destino.id_destino);
        return updatedDestino ? updatedDestino.toJSON() as Destino : null;
    }
    return null;
}

export async function deleteDestino(id: number) {
    const destinoToDelete = await Destinos.findByPk(id);
    if (destinoToDelete) {
        await Destinos.destroy({
            where: {
                id_destino: id
            }
        });
        return destinoToDelete.toJSON() as Destino;
    }
    return null;
}

export async function deleteDestinos(destinosDelete: number[]) {
    return await Destinos.destroy({
        where: {
            id_destino: destinosDelete
        }
    });
}

export async function getDestinosJoinPais() {
    return await Destinos.findAll({
        include: [
            {
                model: Pais,
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