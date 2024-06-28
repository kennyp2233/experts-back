import tipo_embalaje from "@dbModels/catalogos/tipo_embarque/tipo_embalaje.model";
import { TipoEmbalaje, TipoEmbalajeCreationAttributes } from "@typesApp/entities/catalogos/tipo_embarque/TipoEmbalajeTypes";

export async function getTiposEmbalaje(): Promise<TipoEmbalaje[]> {
    const tiposEmbalajeList = await tipo_embalaje.findAll(
        {
            order: [['nombre', 'ASC']] // Ordena por 'nombre' en orden ascendente
        }
    );
    return tiposEmbalajeList.map((tipoEmbalaje) => tipoEmbalaje.toJSON()) as TipoEmbalaje[];
}

export async function getTipoEmbalaje(id: number): Promise<TipoEmbalaje | null> {
    const tipoEmbalaje = await tipo_embalaje.findByPk(id);
    return tipoEmbalaje ? tipoEmbalaje.toJSON() as TipoEmbalaje : null;
}

export async function createTipoEmbalaje(tipoEmbalaje: TipoEmbalajeCreationAttributes) {
    return await tipo_embalaje.create(tipoEmbalaje as any);
}

export async function updateTipoEmbalaje(tipoEmbalaje: TipoEmbalaje): Promise<TipoEmbalaje | null> {
    const tipoEmbalajeToUpdate = await tipo_embalaje.findByPk(tipoEmbalaje.id_tipo_embalaje);
    if (tipoEmbalajeToUpdate) {
        await tipo_embalaje.update(tipoEmbalaje, {
            where: {
                id_tipo_embalaje: tipoEmbalaje.id_tipo_embalaje
            }
        });
        const updatedTipoEmbalaje = await tipo_embalaje.findByPk(tipoEmbalaje.id_tipo_embalaje);
        return updatedTipoEmbalaje ? updatedTipoEmbalaje.toJSON() as TipoEmbalaje : null;
    }
    return null;
}

export async function deleteTipoEmbalaje(id: number): Promise<TipoEmbalaje | null> {
    const tipoEmbalajeToDelete = await tipo_embalaje.findByPk(id);

    if (tipoEmbalajeToDelete) {
        await tipo_embalaje.destroy({
            where: {
                id_tipo_embalaje: id
            }
        });

        return tipoEmbalajeToDelete.toJSON() as TipoEmbalaje;
    }
    return null;
}

export async function deleteTipoEmbalajes(id: number[]): Promise<TipoEmbalaje[]> {
    const tipoEmbalajesToDelete = await tipo_embalaje.findAll({
        where: {
            id_tipo_embalaje: id
        }
    });

    if (tipoEmbalajesToDelete.length) {
        await tipo_embalaje.destroy({
            where: {
                id_tipo_embalaje: id
            }
        });

        return tipoEmbalajesToDelete.map((tipoEmbalaje) => tipoEmbalaje.toJSON()) as TipoEmbalaje[];
    }
    return [];
}
