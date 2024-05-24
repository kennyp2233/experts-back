import paises from '@dbModels/mantenimiento/paises.model';
import acuerdos from '@dbModels/mantenimiento/acuerdos_arancelarios.model';
import "@db/assosiations/mantenimiento/paises_acuerdos.as"
import { Pais, PaisCreationAttributes } from '@typesApp/entities/mantenimiento/PaisTypes';

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


export async function updatePais(pais: Pais) {
    const paisToUpdate = await paises.findByPk(pais.id_pais);
    if (paisToUpdate) {
        await paises.update(pais, {
            where: {
                id_pais: pais.id_pais
            }
        });
        const updatedPais = await paises.findByPk(pais.id_pais);
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

export async function deletePaises(paisesDelete: number[]) {
    const paisesToDelete = await paises.findAll({
        where: {
            id_pais: paisesDelete // Fix: Use paisesDelete instead of paises
        }
    });
    if (paisesToDelete) {
        await paises.destroy({
            where: {
                id_pais: paisesDelete // Fix: Use paisesDelete instead of paises
            }
        });
        return paisesToDelete.map((pais) => pais.toJSON()) as Pais[];
    }
    return null;
}
export async function paisesJoinAcuerdos() {
    const paisesList = await paises.findAll({
        include: [{
            model: acuerdos,
            required: false,

        }]
    });

    return paisesList.map((pais) => pais.dataValues);
}

//getPaises().then(console.log);