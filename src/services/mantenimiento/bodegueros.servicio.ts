import Bodegueros from "@models/mantenimiento/bodeguero.model";
import { Bodeguero, BodegueroAtributosCreacion } from "@typesApp/mantenimiento/bodegueros.type";

export async function getBodegueros(): Promise<Bodeguero[]> {
    const bodeguerosList = await Bodegueros.findAll();
    return bodeguerosList.map((bodeguero) => bodeguero.toJSON()) as Bodeguero[];
}

export async function getBodeguero(id: number): Promise<Bodeguero | null> {
    const bodeguero = await Bodegueros.findByPk(id);
    return bodeguero ? bodeguero.toJSON() as Bodeguero : null;
}

export async function createBodeguero(bodeguero: BodegueroAtributosCreacion) {
    return await Bodegueros.create(bodeguero as any);
}

export async function updateBodeguero(bodeguero: Bodeguero): Promise<Bodeguero | null> {
    const bodegueroToUpdate = await Bodegueros.findByPk(bodeguero.id_bodeguero);
    if (bodegueroToUpdate) {
        await Bodegueros.update(bodeguero, {
            where: {
                id_bodeguero: bodeguero.id_bodeguero
            }
        });
        const updatedBodeguero = await Bodegueros.findByPk(bodeguero.id_bodeguero);
        return updatedBodeguero ? updatedBodeguero.toJSON() as Bodeguero : null;
    }
    return null;
}

export async function deleteBodegueros(ids: any[]) {
    await Bodegueros.destroy({
        where: {
            id_bodeguero: ids
        }
    });
}

