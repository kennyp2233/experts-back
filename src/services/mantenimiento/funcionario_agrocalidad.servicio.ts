import FuncionariosAgrocalidad from "@models/mantenimiento/funcionarios_agrocalidad.model";
import { FuncionarioAgrocalidad, FuncionarioAgrocalidadAtributosCreacion } from "@typesApp/mantenimiento/funcionario_agrocalidad.type";

export async function getFuncionariosAgrocalidad(): Promise<FuncionarioAgrocalidad[]> {
    const funcionariosList = await FuncionariosAgrocalidad.findAll();
    return funcionariosList.map((funcionario) => funcionario.toJSON()) as FuncionarioAgrocalidad[];
}

export async function getFuncionarioAgrocalidad(id: number): Promise<FuncionarioAgrocalidad | null> {
    const funcionario = await FuncionariosAgrocalidad.findByPk(id);
    return funcionario ? funcionario.toJSON() as FuncionarioAgrocalidad : null;
}

export async function createFuncionarioAgrocalidad(funcionario: FuncionarioAgrocalidadAtributosCreacion) {
    return await FuncionariosAgrocalidad.create(funcionario as any);
}

export async function updateFuncionarioAgrocalidad(funcionario: FuncionarioAgrocalidad): Promise<FuncionarioAgrocalidad | null> {
    const funcionarioToUpdate = await FuncionariosAgrocalidad.findByPk(funcionario.id_funcionario_agrocalidad);
    if (funcionarioToUpdate) {
        await FuncionariosAgrocalidad.update(funcionario, {
            where: {
                id_funcionario_agrocalidad: funcionario.id_funcionario_agrocalidad
            }
        });
        const updatedFuncionario = await FuncionariosAgrocalidad.findByPk(funcionario.id_funcionario_agrocalidad);
        return updatedFuncionario ? updatedFuncionario.toJSON() as FuncionarioAgrocalidad : null;
    }
    return null;
}


export async function deleteFuncionariosAgrocalidad(funcionariosDelete: number[]) {
    return await FuncionariosAgrocalidad.destroy({
        where: {
            id_funcionario_agrocalidad: funcionariosDelete
        }
    });
}
