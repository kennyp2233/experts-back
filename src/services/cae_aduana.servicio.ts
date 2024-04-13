import cae_aduana from '@dbModels/cae_aduana.model';
import { CaeAduana, CaeAduanaCreationAttributes } from '@typesApp/entities/CaeAduanaTypes';

export async function getAduanas() {
    const aduanasList = await cae_aduana.findAll();
    return aduanasList.map((cae_aduana) => cae_aduana.toJSON()) as CaeAduana[];
}

export async function getAduana(id: number) {
    const aduana = await cae_aduana.findByPk(id);
    return aduana ? aduana.toJSON() as CaeAduana : null;
}

export async function createAduana(aduana: CaeAduanaCreationAttributes) {
    return await cae_aduana.create(aduana);
}

export async function updateAduana(id: number, aduana: CaeAduanaCreationAttributes) {
    const aduanaToUpdate = await cae_aduana.findByPk(id);
    if (aduanaToUpdate) {
        await cae_aduana.update(aduana, {
            where: {
                id_cae_aduana: id
            }
        });
        const updatedAduana = await cae_aduana.findByPk(id);
        return updatedAduana ? updatedAduana.toJSON() as CaeAduana : null;
    }
    return null;
}

export async function deleteAduana(id: number) {
    const aduanaToDelete = await cae_aduana.findByPk(id);
    if (aduanaToDelete) {
        await cae_aduana.destroy({
            where: {
                id_cae_aduana: id
            }
        });
        return aduanaToDelete.toJSON() as CaeAduana;
    }
    return null;
}