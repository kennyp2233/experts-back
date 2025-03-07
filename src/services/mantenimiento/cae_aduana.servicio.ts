import CaesAduana from '@models/mantenimiento/cae_aduana.model';
import { CaeAduana, CaeAduanaAtributosCreacion } from '@typesApp/mantenimiento/cae_aduana.type';

export async function getAduanas() {
    const aduanasList = await CaesAduana.findAll();
    return aduanasList.map((cae_aduana) => cae_aduana.toJSON()) as CaeAduana[];
}

export async function getAduana(id: number) {
    const aduana = await CaesAduana.findByPk(id);
    return aduana ? aduana.toJSON() as CaeAduana : null;
}

export async function createAduana(aduana: CaeAduanaAtributosCreacion) {
    return await CaesAduana.create(aduana);
}

export async function updateAduana(aduana: CaeAduana) {
    const aduanaToUpdate = await CaesAduana.findByPk(aduana.id_cae_aduana);
    if (aduanaToUpdate) {
        await CaesAduana.update(aduana, {
            where: {
                id_cae_aduana: aduana.id_cae_aduana
            }
        });
        const updatedAduana = await CaesAduana.findByPk(aduana.id_cae_aduana);
        return updatedAduana ? updatedAduana.toJSON() as CaeAduana : null;
    }
    return null;
}

export async function deleteAduana(id: number) {
    const aduanaToDelete = await CaesAduana.findByPk(id);
    if (aduanaToDelete) {
        await CaesAduana.destroy({
            where: {
                id_cae_aduana: id
            }
        });
        return aduanaToDelete.toJSON() as CaeAduana;
    }
    return null;
}

export async function deleteAduanas(aduanasDelete: number[]) {
    return await CaesAduana.destroy({
        where: {
            id_cae_aduana: aduanasDelete
        }
    });
}
