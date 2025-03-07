import AgenciasIata from "@models/mantenimiento/agencia_iata";
import { AgenciaIata, AgenciaIataAtributosCreacion } from "@typesApp/mantenimiento/agencia_iata.types";

export async function getAgenciasIata(): Promise<AgenciaIata[]> {
    const agenciasIataList = await AgenciasIata.findAll();
    return agenciasIataList.map((agenciaIata) => agenciaIata.toJSON()) as AgenciaIata[];
}

export async function getAgenciaIata(id: number): Promise<AgenciaIata | null> {
    const agenciaIata = await AgenciasIata.findByPk(id);
    return agenciaIata ? agenciaIata.toJSON() as AgenciaIata : null;
}

export async function createAgenciaIata(agenciaIata: AgenciaIataAtributosCreacion) {
    return await AgenciasIata.create(agenciaIata as any);
}

export async function updateAgenciaIata(agenciaIata: AgenciaIata): Promise<AgenciaIata | null> {
    const agenciaIataToUpdate = await AgenciasIata.findByPk(agenciaIata.id_agencia_iata);
    if (agenciaIataToUpdate) {
        await AgenciasIata.update(agenciaIata, {
            where: {
                id_agencia_iata: agenciaIata.id_agencia_iata
            }
        });
        const updatedAgenciaIata = await AgenciasIata.findByPk(agenciaIata.id_agencia_iata);
        return updatedAgenciaIata ? updatedAgenciaIata.toJSON() as AgenciaIata : null;
    }
    return null;
}

export async function deleteAgenciasIata(ids: any[]) {
    await AgenciasIata.destroy({
        where: {
            id_agencia_iata: ids
        }
    });
}

