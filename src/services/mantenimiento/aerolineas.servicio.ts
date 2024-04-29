import Aerolineas from "@dbModels/mantenimiento/aerolineas.model";
import { Aerolinea, AerolineaCreationAttributes } from "@typesApp/entities/mantenimiento/AerolineaTypes";
import Origenes from "@dbModels/mantenimiento/origenes.model";
import Destinos from "@dbModels/mantenimiento/destinos.model";
import AerolineasPlantillas from "@dbModels/mantenimiento/aerolineas_plantillas.model"
import "@db/assosiations/mantenimiento/aerolineas_all_assosiation.as"

export async function getAerolineas(): Promise<Aerolinea[]> {
    const aerolineasList = await Aerolineas.findAll();
    return aerolineasList.map((aerolinea) => aerolinea.toJSON()) as Aerolinea[];
}

export async function getAerolinea(id: number): Promise<Aerolinea | null> {
    const aerolinea = await Aerolineas.findByPk(id);
    return aerolinea ? aerolinea.toJSON() as Aerolinea : null;
}

export async function createAerolinea(aerolinea: AerolineaCreationAttributes) {
    return await Aerolineas.create(aerolinea as any);
}

export async function updateAerolinea(aerolinea: Aerolinea): Promise<Aerolinea | null> {
    const aerolineaToUpdate = await Aerolineas.findByPk(aerolinea.id_aerolinea);
    if (aerolineaToUpdate) {
        await Aerolineas.update(aerolinea, {
            where: {
                id_aerolinea: aerolinea.id_aerolinea
            }
        });
        const updatedAerolinea = await Aerolineas.findByPk(aerolinea.id_aerolinea);
        return updatedAerolinea ? updatedAerolinea.toJSON() as Aerolinea : null;
    }
    return null;
}

export async function deleteAerolinea(id: number): Promise<Aerolinea | null> {
    const aerolineaToDelete = await Aerolineas.findByPk(id);

    if (aerolineaToDelete) {
        await Aerolineas.destroy({
            where: {
                id_aerolinea: id
            }
        });

        return aerolineaToDelete.toJSON() as Aerolinea;
    }
    return null;
}

export async function deleteAerolineas(ids: any[]) {
    await Aerolineas.destroy({
        where: {
            id_aerolinea: ids
        }
    });
}

export async function aerolineaJoinAll() {
    const respuesta = await Aerolineas.findAll({
        include: [
            {
                model: Origenes,
                as: 'origen1',
                required: false
            },
            {
                model: Destinos,
                as: 'destino1',
                required: false
            },
            {
                model: Aerolineas,
                as: 'via1',
                required: false
            },
            {
                model: Destinos,
                as: 'destino2',
                required: false
            },
            {
                model: Aerolineas,
                as: 'via2',
                required: false
            },
            {
                model: Destinos,
                as: 'destino3',
                required: false
            },
            {
                model: Aerolineas,
                as: 'via3',
                required: false
            },
            {
                model: AerolineasPlantillas,
                as: 'plantilla',
                required: false
            }
        ]
    });
    return respuesta.map((aerolinea) => aerolinea.dataValues);
}

//aerolineaJoinAll().then(console.log)