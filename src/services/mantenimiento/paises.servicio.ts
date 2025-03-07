import Paises from '@models/mantenimiento/pais.model';
import AcuerdosArancelarios from '@models/mantenimiento/acuerdo_arancelario.model';
import "src/config/assosiations/mantenimiento/paises_acuerdos.as"
import { Pais, PaisAtributosCreacion } from '@typesApp/mantenimiento/pais.type';

export async function getPaises() {
    const paisesList = await Paises.findAll();
    return paisesList.map((pais) => pais.toJSON()) as Pais[];
}

export async function getPais(id: number) {
    const pais = await Paises.findByPk(id);
    return pais ? pais.toJSON() as Pais : null;
}

export async function createPais(pais: PaisAtributosCreacion) {
    const paisData = extraerPaisDeData(pais);
    return await Paises.create(paisData);
}


export async function updatePais(pais: Pais) {
    const paisToUpdate = await Paises.findByPk(pais.id_pais);
    const paisData = extraerPaisDeData(pais);
    if (paisToUpdate) {
        await Paises.update(paisData, {
            where: {
                id_pais: pais.id_pais
            }
        });
        const updatedPais = await Paises.findByPk(pais.id_pais);
        return updatedPais ? updatedPais.toJSON() as Pais : null;
    }
    return null;
}

export async function deletePais(id: number) {
    const paisToDelete = await Paises.findByPk(id);
    if (paisToDelete) {
        await Paises.destroy({
            where: {
                id_pais: id
            }
        });
        return paisToDelete.toJSON() as Pais;
    }
    return null;
}

export async function deletePaises(paisesDelete: number[]) {
    const paisesToDelete = await Paises.findAll({
        where: {
            id_pais: paisesDelete // Fix: Use paisesDelete instead of paises
        }
    });
    if (paisesToDelete) {
        await Paises.destroy({
            where: {
                id_pais: paisesDelete // Fix: Use paisesDelete instead of paises
            }
        });
        return paisesToDelete.map((pais) => pais.toJSON()) as Pais[];
    }
    return null;
}
export async function paisesJoinAcuerdos() {
    const paisesList = await Paises.findAll({
        include: [{
            model: AcuerdosArancelarios,
            required: false,

        }]
    });

    return paisesList.map((pais) => pais.dataValues);
}

function extraerPaisDeData(pais: any) {
    return {
        nombre: pais?.nombre,
        siglas_pais: pais?.siglas_pais,
        pais_id: pais?.pais_id,
        id_acuerdo: pais?.acuerdos_arancelario?.id_acuerdo
    };
}