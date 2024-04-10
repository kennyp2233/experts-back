import paises from '@dbModels/paises.model';
import { Pais, PaisCreationAttributes } from '@typesApp/entities/PaisTypes';

export async function getPaises() {
    const paisesList = await paises.findAll();
    return paisesList.map((pais) => pais.toJSON()) as Pais[];
}

export async function getPais(id: number) {
    const pais = await paises.findByPk(id);
    return pais ? pais.toJSON() as Pais : null;
}

export async function createPais(pais: PaisCreationAttributes) {
    return await paises.create(pais);
}


export async function updatePais(id: number, pais: PaisCreationAttributes) {
    const paisToUpdate = await paises.findByPk(id);
    if (paisToUpdate) {
        await paises.update(pais, {
            where: {
                id_pais: id
            }
        });
        const updatedPais = await paises.findByPk(id);
        return updatedPais ? updatedPais.toJSON() as Pais : null;
    }
    return null;
}

export async function deletePais(id: number) {
    const paisToDelete = await paises.findByPk(id);
    if (paisToDelete) {
        await paises.destroy({
            where: {
                id_pais: id
            }
        });
        return paisToDelete.toJSON() as Pais;
    }
    return null;
}