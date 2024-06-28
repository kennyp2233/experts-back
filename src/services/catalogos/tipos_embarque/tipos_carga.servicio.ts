import tipo_carga from "@dbModels/catalogos/tipo_embarque/tipo_carga.model";
import { TipoCarga, TypoCargaCreationAttributes } from "@typesApp/entities/catalogos/tipo_embarque/TipoCargaType";

export async function getTiposCarga(): Promise<TipoCarga[]> {
    const tiposCargaList = await tipo_carga.findAll({
        order: [['nombre', 'ASC']] // Ordena por 'codigo_embarque' en orden ascendente
    });
    return tiposCargaList.map((tipoCarga) => tipoCarga.toJSON() as TipoCarga);
}

export async function getTipoCarga(id: number): Promise<TipoCarga | null> {
    const tipoCarga = await tipo_carga.findByPk(id);
    return tipoCarga ? tipoCarga.toJSON() as TipoCarga : null;
}

export async function createTipoCarga(tipoCarga: TypoCargaCreationAttributes) {
    return await tipo_carga.create(tipoCarga as any);
}

export async function updateTipoCarga(tipoCarga: TipoCarga): Promise<TipoCarga | null> {
    const tipoCargaToUpdate = await tipo_carga.findByPk(tipoCarga.id_tipo_carga);
    if (tipoCargaToUpdate) {
        await tipo_carga.update(tipoCarga, {
            where: {
                id_tipo_carga: tipoCarga.id_tipo_carga
            }
        });
        const updatedTipoCarga = await tipo_carga.findByPk(tipoCarga.id_tipo_carga);
        return updatedTipoCarga ? updatedTipoCarga.toJSON() as TipoCarga : null;
    }
    return null;
}

export async function deleteTipoCarga(id: number): Promise<TipoCarga | null> {
    const tipoCargaToDelete = await tipo_carga.findByPk(id);

    if (tipoCargaToDelete) {
        await tipo_carga.destroy({
            where: {
                id_tipo_carga: id
            }
        });

        return tipoCargaToDelete.toJSON() as TipoCarga;
    }
    return null;
}

export async function deleteTipoCargas(id: number[]): Promise<TipoCarga[]> {
    const tipoCargasToDelete = await tipo_carga.findAll({
        where: {
            id_tipo_carga: id
        }
    });

    if (tipoCargasToDelete.length) {
        await tipo_carga.destroy({
            where: {
                id_tipo_carga: id
            }
        });

        return tipoCargasToDelete.map((tipoCarga) => tipoCarga.toJSON()) as TipoCarga[];
    }
    return [];
}