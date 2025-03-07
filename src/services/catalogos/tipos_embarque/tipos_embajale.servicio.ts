import TiposEmbalaje from "@models/catalogos/tipo_embarque/tipo_embalaje.model";
import { TipoEmbalaje, TipoEmbalajeAtributosCreacion } from "@typesApp/catalogos/tipo_embarque/tipo_embalaje.type";

export async function getTiposEmbalaje(): Promise<TipoEmbalaje[]> {
    const tiposEmbalajeList = await TiposEmbalaje.findAll(
        {
            order: [['nombre', 'ASC']] // Ordena por 'nombre' en orden ascendente
        }
    );
    return tiposEmbalajeList.map((tipoEmbalaje) => tipoEmbalaje.toJSON()) as TipoEmbalaje[];
}

export async function getTipoEmbalaje(id: number): Promise<TipoEmbalaje | null> {
    const tipoEmbalaje = await TiposEmbalaje.findByPk(id);
    return tipoEmbalaje ? tipoEmbalaje.toJSON() as TipoEmbalaje : null;
}

export async function createTipoEmbalaje(tipoEmbalaje: TipoEmbalajeAtributosCreacion) {
    return await TiposEmbalaje.create(tipoEmbalaje as any);
}

export async function updateTipoEmbalaje(tipoEmbalaje: TipoEmbalaje): Promise<TipoEmbalaje | null> {
    const tipoEmbalajeToUpdate = await TiposEmbalaje.findByPk(tipoEmbalaje.id_tipo_embalaje);
    if (tipoEmbalajeToUpdate) {
        await TiposEmbalaje.update(tipoEmbalaje, {
            where: {
                id_tipo_embalaje: tipoEmbalaje.id_tipo_embalaje
            }
        });
        const updatedTipoEmbalaje = await TiposEmbalaje.findByPk(tipoEmbalaje.id_tipo_embalaje);
        return updatedTipoEmbalaje ? updatedTipoEmbalaje.toJSON() as TipoEmbalaje : null;
    }
    return null;
}

export async function deleteTipoEmbalaje(id: number): Promise<TipoEmbalaje | null> {
    const tipoEmbalajeToDelete = await TiposEmbalaje.findByPk(id);

    if (tipoEmbalajeToDelete) {
        await TiposEmbalaje.destroy({
            where: {
                id_tipo_embalaje: id
            }
        });

        return tipoEmbalajeToDelete.toJSON() as TipoEmbalaje;
    }
    return null;
}

export async function deleteTipoEmbalajes(id: number[]): Promise<TipoEmbalaje[]> {
    const tipoEmbalajesToDelete = await TiposEmbalaje.findAll({
        where: {
            id_tipo_embalaje: id
        }
    });

    if (tipoEmbalajesToDelete.length) {
        await TiposEmbalaje.destroy({
            where: {
                id_tipo_embalaje: id
            }
        });

        return tipoEmbalajesToDelete.map((tipoEmbalaje) => tipoEmbalaje.toJSON()) as TipoEmbalaje[];
    }
    return [];
}
