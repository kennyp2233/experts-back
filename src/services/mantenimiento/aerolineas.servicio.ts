import aerolineas from "@dbModels/mantenimiento/aerolineas.model";
import { Aerolinea, AerolineaCreationAttributes } from "@typesApp/entities/mantenimiento/AerolineaTypes";
import "@db/assosiations/mantenimiento/aerolineas_all_assosiation.as"

export async function getAerolineas(): Promise<Aerolinea[]> {
    const aerolineasList = await aerolineas.findAll();
    return aerolineasList.map((aerolinea) => aerolinea.toJSON()) as Aerolinea[];
}

export async function getAerolinea(id: number): Promise<Aerolinea | null> {
    const aerolinea = await aerolineas.findByPk(id);
    return aerolinea ? aerolinea.toJSON() as Aerolinea : null;
}

export async function createAerolinea(aerolinea: AerolineaCreationAttributes) {
    return await aerolineas.create(aerolinea as any);
}

export async function updateAerolinea(id: number, aerolinea: AerolineaCreationAttributes): Promise<Aerolinea | null> {
    const aerolineaToUpdate = await aerolineas.findByPk(id);
    if (aerolineaToUpdate) {
        await aerolineas.update(aerolinea, {
            where: {
                id_aerolinea: id
            }
        });
        const updatedAerolinea = await aerolineas.findByPk(id);
        return updatedAerolinea ? updatedAerolinea.toJSON() as Aerolinea : null;
    }
    return null;
}

export async function deleteAerolinea(id: number): Promise<Aerolinea | null> {
    const aerolineaToDelete = await aerolineas.findByPk(id);

    if (aerolineaToDelete) {
        await aerolineas.destroy({
            where: {
                id_aerolinea: id
            }
        });

        return aerolineaToDelete.toJSON() as Aerolinea;
    }
    return null;
}

export async function deleteAerolineas(ids: any[]) {
    await aerolineas.destroy({
        where: {
            id_aerolinea: ids
        }
    });
}
