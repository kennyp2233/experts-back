import AcuerdosArancelarios from "@models/mantenimiento/acuerdo_arancelario.model";

import { AcuerdoArancelario, AcuerdoArancelarioAtributosCreacion } from "@typesApp/mantenimiento/acuerdo_arancelario.type";

export async function getAcuerdosArancelarios(): Promise<AcuerdoArancelario[]> {
    const acuerdosArancelariosList = await AcuerdosArancelarios.findAll();
    return acuerdosArancelariosList.map((acuerdoArancelario) => acuerdoArancelario.toJSON()) as AcuerdoArancelario[];
}

export async function getAcuerdoArancelario(id: number): Promise<AcuerdoArancelario | null> {
    const acuerdoArancelario = await AcuerdosArancelarios.findByPk(id);
    return acuerdoArancelario ? acuerdoArancelario.toJSON() as AcuerdoArancelario : null;
}

export async function createAcuerdoArancelario(acuerdoArancelario: AcuerdoArancelarioAtributosCreacion) {
    return await AcuerdosArancelarios.create(acuerdoArancelario as any);
}

export async function updateAcuerdoArancelario(acuerdoArancelario: AcuerdoArancelario): Promise<AcuerdoArancelario | null> {
    const acuerdoArancelarioToUpdate = await AcuerdosArancelarios.findByPk(acuerdoArancelario.id_acuerdo);
    if (acuerdoArancelarioToUpdate) {
        await AcuerdosArancelarios.update(acuerdoArancelario, {
            where: {
                id_acuerdo: acuerdoArancelario.id_acuerdo
            }
        });
        const updatedAcuerdoArancelario = await AcuerdosArancelarios.findByPk(acuerdoArancelario.id_acuerdo);
        return updatedAcuerdoArancelario ? updatedAcuerdoArancelario.toJSON() as AcuerdoArancelario : null;
    }
    return null;
}

export async function deleteAcuerdoArancelario(id: number): Promise<AcuerdoArancelario | null> {
    const acuerdoArancelarioToDelete = await AcuerdosArancelarios.findByPk(id);

    if (acuerdoArancelarioToDelete) {
        await AcuerdosArancelarios.destroy({
            where: {
                id_acuerdo: id
            }
        });

        return acuerdoArancelarioToDelete.toJSON() as AcuerdoArancelario;
    }
    return null;
}

