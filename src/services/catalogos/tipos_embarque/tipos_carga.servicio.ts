import TiposCarga from "@models/catalogos/tipo_embarque/tipo_carga.model";
import { TipoCarga, TipoCargaAtributosCreacion } from "@typesApp/catalogos/tipo_embarque/tipo_carga.type";

export async function getTiposCarga(): Promise<TipoCarga[]> {
    const tiposCargaList = await TiposCarga.findAll({
        order: [['nombre', 'ASC']] // Ordena por 'codigo_embarque' en orden ascendente
    });
    return tiposCargaList.map((tipoCarga) => tipoCarga.toJSON() as TipoCarga);
}

export async function getTipoCarga(id: number): Promise<TipoCarga | null> {
    const tipoCarga = await TiposCarga.findByPk(id);
    return tipoCarga ? tipoCarga.toJSON() as TipoCarga : null;
}

export async function createTipoCarga(tipoCarga: TipoCargaAtributosCreacion) {
    return await TiposCarga.create(tipoCarga as any);
}

export async function updateTipoCarga(tipoCarga: TipoCarga): Promise<TipoCarga | null> {
    const tipoCargaToUpdate = await TiposCarga.findByPk(tipoCarga.id_tipo_carga);
    if (tipoCargaToUpdate) {
        await TiposCarga.update(tipoCarga, {
            where: {
                id_tipo_carga: tipoCarga.id_tipo_carga
            }
        });
        const updatedTipoCarga = await TiposCarga.findByPk(tipoCarga.id_tipo_carga);
        return updatedTipoCarga ? updatedTipoCarga.toJSON() as TipoCarga : null;
    }
    return null;
}

export async function deleteTipoCarga(id: number): Promise<TipoCarga | null> {
    const tipoCargaToDelete = await TiposCarga.findByPk(id);

    if (tipoCargaToDelete) {
        await TiposCarga.destroy({
            where: {
                id_tipo_carga: id
            }
        });

        return tipoCargaToDelete.toJSON() as TipoCarga;
    }
    return null;
}

export async function deleteTipoCargas(id: number[]): Promise<TipoCarga[]> {
    const tipoCargasToDelete = await TiposCarga.findAll({
        where: {
            id_tipo_carga: id
        }
    });

    if (tipoCargasToDelete.length) {
        await TiposCarga.destroy({
            where: {
                id_tipo_carga: id
            }
        });

        return tipoCargasToDelete.map((tipoCarga) => tipoCarga.toJSON()) as TipoCarga[];
    }
    return [];
}