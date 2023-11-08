import aerolineas from "../db/models/aerolineas.model";
import { AerolineaCreationAttributesI, AerolineaAttributesI } from "../../type";

class Aerolinea {
    async getAerolineas(): Promise<AerolineaAttributesI[]> {
        try {
            const aerolineasList = await aerolineas.findAll();
            return aerolineasList.map((aerolinea) => aerolinea.toJSON()) as AerolineaAttributesI[];
        } catch (error) {
            throw error;
        }
    }

    async getAerolinea(id: number): Promise<AerolineaAttributesI | null> {
        try {
            const aerolinea = await aerolineas.findByPk(id);
            return aerolinea ? aerolinea.toJSON() as AerolineaAttributesI : null;
        } catch (error) {
            throw error;
        }
    }

    async createAerolinea(aerolinea: AerolineaCreationAttributesI) {
        try {
            return await aerolineas.create(aerolinea as any);
        } catch (error) {
            throw error;
        }
    }

    async updateAerolinea(id: number, aerolinea: AerolineaCreationAttributesI): Promise<AerolineaAttributesI | null> {
        try {
            const aerolineaToUpdate = await aerolineas.findByPk(id);
            if (aerolineaToUpdate) {
                await aerolineas.update(aerolinea, {
                    where: {
                        id_aerolinea: id
                    }
                });
                const updatedAerolinea = await aerolineas.findByPk(id);
                return updatedAerolinea ? updatedAerolinea.toJSON() as AerolineaAttributesI : null;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    async deleteAerolinea(id: number): Promise<AerolineaAttributesI | null> {
        try {
            const aerolineaToDelete = await aerolineas.findByPk(id);

            if (aerolineaToDelete) {
                await aerolineas.destroy({
                    where: {
                        id_aerolinea: id
                    }
                });

                return aerolineaToDelete.toJSON() as AerolineaAttributesI;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }


}

export default Aerolinea;
