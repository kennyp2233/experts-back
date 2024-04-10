import aerolineas from "@dbModels/aerolineas.model";
import { Aerolinea, AerolineaCreationAttributes } from "@typesApp/entities/AerolineaTypes";

export async function getAerolineas(): Promise<Aerolinea[]> {
    try {
        const aerolineasList = await aerolineas.findAll();
        return aerolineasList.map((aerolinea) => aerolinea.toJSON()) as Aerolinea[];
    } catch (error) {
        throw error;
    }
}

export async function getAerolinea(id: number): Promise<Aerolinea | null> {
    try {
        const aerolinea = await aerolineas.findByPk(id);
        return aerolinea ? aerolinea.toJSON() as Aerolinea : null;
    } catch (error) {
        throw error;
    }
}

export async function createAerolinea(aerolinea: AerolineaCreationAttributes) {
    try {
        return await aerolineas.create(aerolinea as any);
    } catch (error) {
        throw error;
    }
}

export async function updateAerolinea(id: number, aerolinea: AerolineaCreationAttributes): Promise<Aerolinea | null> {
    try {
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
    } catch (error) {
        throw error;
    }
}

export async function deleteAerolinea(id: number): Promise<Aerolinea | null> {
    try {
        const aerolineaToDelete = await aerolineas.findByPk(id);

        if (aerolineaToDelete) {
            await aerolineas.destroy({
                where: {
                    id_aerolinea: id
                }
            });

            return aerolineaToDelete.toJSON() as Aerolinea;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}
