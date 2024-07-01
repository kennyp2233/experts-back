import embarcadores from "@dbModels/mantenimiento/embarcadores.model";
import { Embarcador, EmbarcadorCreationAttributes } from "@typesApp/entities/mantenimiento/EmbarcadoresTypes";

export async function getEmbarcadores() {
    const embarcadoresList = await embarcadores.findAll();
    return embarcadoresList.map((embarcador) => embarcador.toJSON()) as Embarcador[];
}

export async function getEmbarcador(id: number) {
    const embarcador = await embarcadores.findByPk(id);
    return embarcador ? embarcador.toJSON() as Embarcador : null;
}

export async function createEmbarcador(embarcador: EmbarcadorCreationAttributes) {
    return await embarcadores.create(embarcador);
}

export async function updateEmbarcador(embarcador: Embarcador) {
    const embarcadorToUpdate = await embarcadores.findByPk(embarcador.id_embarcador);
    if (embarcadorToUpdate) {
        await embarcadores.update(embarcador, {
            where: {
                id_embarcador: embarcador.id_embarcador
            }
        });
        const updatedEmbarcador = await embarcadores.findByPk(embarcador.id_embarcador);
        return updatedEmbarcador ? updatedEmbarcador.toJSON() as Embarcador : null;
    }
    return null;
}

export async function deleteEmbarcador(id: number) {
    const embarcadorToDelete = await embarcadores.findByPk(id);
    if (embarcadorToDelete) {
        await embarcadores.destroy({
            where: {
                id_embarcador: id
            }
        });
        return embarcadorToDelete.toJSON() as Embarcador;
    }
    return null;
}

export async function deleteEmbarcadores(embarcadoresDelete: number[]) {
    const embarcadoresToDelete = await embarcadores.findAll({
        where: {
            id_embarcador: embarcadoresDelete
        }
    });
    if (embarcadoresToDelete) {
        await embarcadores.destroy({
            where: {
                id_embarcador: embarcadoresDelete
            }
        });
        return embarcadoresToDelete.map((embarcador) => embarcador.toJSON()) as Embarcador[];
    }
    return null;
}

