import tipos_embarque from "@dbModels/mantenimiento/tipos_embarque.model";
import TipoCarga from "@dbModels/catalogos/tipo_embarque/tipo_carga.model";
import TipoEmbalaje from "@dbModels/catalogos/tipo_embarque/tipo_embalaje.model";
import "@db/assosiations/mantenimiento/tipos_embarque.as";
import { TipoEmbarque, TipoEmbarqueCreationAttributes } from "@typesApp/entities/mantenimiento/TiposEmbarqueTypes";

export async function getTiposEmbarque(): Promise<TipoEmbarque[]> {
    const tiposEmbarqueList = await tipos_embarque.findAll();
    return tiposEmbarqueList.map((tipoEmbarque) => tipoEmbarque.toJSON()) as TipoEmbarque[];
}

export async function getTipoEmbarque(id: number): Promise<TipoEmbarque | null> {
    const tipoEmbarque = await tipos_embarque.findByPk(id);
    return tipoEmbarque ? tipoEmbarque.toJSON() as TipoEmbarque : null;
}

export async function createTipoEmbarque(tipoEmbarque: TipoEmbarqueCreationAttributes) {
    const tipoEmbarqueData = extractDataToTipoEmbarque(tipoEmbarque);
    return await tipos_embarque.create(tipoEmbarqueData);
}

export async function updateTipoEmbarque(tipoEmbarque: TipoEmbarque): Promise<TipoEmbarque | null> {
    const tipoEmbarqueToUpdate = await tipos_embarque.findByPk(tipoEmbarque.id_tipo_embarque);
    const tipoEmbarqueData = extractDataToTipoEmbarque(tipoEmbarque);
    if (tipoEmbarqueToUpdate) {
        await tipos_embarque.update(tipoEmbarqueData, {
            where: {
                id_tipo_embarque: tipoEmbarque.id_tipo_embarque
            }
        });
        const updatedTipoEmbarque = await tipos_embarque.findByPk(tipoEmbarque.id_tipo_embarque);
        return updatedTipoEmbarque ? updatedTipoEmbarque.toJSON() as TipoEmbarque : null;
    }
    return null;
}

export async function deleteTipoEmbarque(id: number): Promise<TipoEmbarque | null> {
    const tipoEmbarqueToDelete = await tipos_embarque.findByPk(id);

    if (tipoEmbarqueToDelete) {
        await tipos_embarque.destroy({
            where: {
                id_tipo_embarque: id
            }
        });

        return tipoEmbarqueToDelete.toJSON() as TipoEmbarque;
    }
    return null;
}

export async function deleteTipoEmbarques(id: number[]) {
    const tipoEmbarquesToDelete = await tipos_embarque.findAll({
        where: {
            id_tipo_embarque: id
        }
    });

    if (tipoEmbarquesToDelete.length) {
        await tipos_embarque.destroy({
            where: {
                id_tipo_embarque: id
            }
        });

        return tipoEmbarquesToDelete.map((tipoEmbarque) => tipoEmbarque.toJSON()) as TipoEmbarque[];
    }
    return null;
}

export async function getTiposEmbarqueJoinAll() {
    return await tipos_embarque.findAll({
        include: [
            {
                model: TipoCarga,
                as: 'carga',
            },
            {
                model: TipoEmbalaje,
                as: 'embalaje',
            }
        ]
    });
}

function extractDataToTipoEmbarque(data: any) {
    return {
        id_tipo_embarque: data?.id_tipo_embarque,
        codigo_embarque: data?.codigo_embarque,
        nombre: data?.nombre,
        id_tipo_carga: data?.carga?.id_tipo_carga,
        id_tipo_embalaje: data?.embalaje?.id_tipo_embalaje,
        regimen: data?.regimen,
        mercancia: data?.mercancia,
        harmonised_comidity: data?.harmonised_comidity,
    }
}