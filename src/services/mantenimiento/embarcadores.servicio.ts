import Embarcadores from "@models/mantenimiento/embarcador.model";
import { Embarcador, EmbarcadorAtributosCreacion } from "@typesApp/mantenimiento/embarcador.type";

export async function getEmbarcadores() {
    const embarcadoresList = await Embarcadores.findAll();
    return embarcadoresList.map((embarcador) => embarcador.toJSON()) as Embarcador[];
}

export async function getEmbarcador(id: number) {
    const embarcador = await Embarcadores.findByPk(id);
    return embarcador ? embarcador.toJSON() as Embarcador : null;
}

export async function createEmbarcador(embarcador: EmbarcadorAtributosCreacion) {
    return await Embarcadores.create(embarcador);
}

export async function updateEmbarcador(embarcador: Embarcador) {
    const embarcadorToUpdate = await Embarcadores.findByPk(embarcador.id_embarcador);
    if (embarcadorToUpdate) {
        await Embarcadores.update(embarcador, {
            where: {
                id_embarcador: embarcador.id_embarcador
            }
        });
        const updatedEmbarcador = await Embarcadores.findByPk(embarcador.id_embarcador);
        return updatedEmbarcador ? updatedEmbarcador.toJSON() as Embarcador : null;
    }
    return null;
}

export async function deleteEmbarcador(id: number) {
    const embarcadorToDelete = await Embarcadores.findByPk(id);
    if (embarcadorToDelete) {
        await Embarcadores.destroy({
            where: {
                id_embarcador: id
            }
        });
        return embarcadorToDelete.toJSON() as Embarcador;
    }
    return null;
}

export async function deleteEmbarcadores(embarcadoresDelete: number[]) {
    const embarcadoresToDelete = await Embarcadores.findAll({
        where: {
            id_embarcador: embarcadoresDelete
        }
    });
    if (embarcadoresToDelete) {
        await Embarcadores.destroy({
            where: {
                id_embarcador: embarcadoresDelete
            }
        });
        return embarcadoresToDelete.map((embarcador) => embarcador.toJSON()) as Embarcador[];
    }
    return null;
}

