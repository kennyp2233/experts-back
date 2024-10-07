import SubAgencias from "@models/mantenimiento/subagencia.model";
import { SubAgencia, SubAgenciaAtributosCreacion } from "@typesApp/mantenimiento/subagencia.type";

export async function getSubAgencias(): Promise<SubAgencia[]> {
    const subAgenciasList = await SubAgencias.findAll();
    return subAgenciasList.map((subAgencia) => subAgencia.toJSON()) as SubAgencia[];
}

export async function getSubAgencia(id: number): Promise<SubAgencia | null> {
    const subAgencia = await SubAgencias.findByPk(id);
    return subAgencia ? subAgencia.toJSON() as SubAgencia : null;
}

export async function createSubAgencia(subAgencia: SubAgenciaAtributosCreacion) {
    return await SubAgencias.create(subAgencia as any);
}

export async function updateSubAgencia(subAgencia: SubAgencia): Promise<SubAgencia | null> {
    const subAgenciaToUpdate = await SubAgencias.findByPk(subAgencia.id_subagencia);
    if (subAgenciaToUpdate) {
        await SubAgencias.update(subAgencia, {
            where: {
                id_subagencia: subAgencia.id_subagencia
            }
        });
        const updatedSubAgencia = await SubAgencias.findByPk(subAgencia.id_subagencia);
        return updatedSubAgencia ? updatedSubAgencia.toJSON() as SubAgencia : null;
    }
    return null;
}

export async function deleteSubAgencias(ids: any[]) {
    await SubAgencias.destroy({
        where: {
            id_subagencia: ids
        }
    });
}