import CatalogoModoAerolinea from "@models/catalogos/aerolineas/catalogo_modo_aerolinea.model";
import { CatalogoModo, CatalogoModoCreationAttributes } from "@typesApp/catalogos/aerolineas/catalogo_modo.type";

export async function getCatalogoModos(): Promise<CatalogoModo[]> {
    const catalogoModosList = await CatalogoModoAerolinea.findAll();
    return catalogoModosList.map((catalogoModo) => catalogoModo.toJSON()) as CatalogoModo[];
}

export async function getCatalogoModo(id: number): Promise<CatalogoModo | null> {
    const catalogoModo = await CatalogoModoAerolinea.findByPk(id);
    return catalogoModo ? catalogoModo.toJSON() as CatalogoModo : null;
}

export async function createCatalogoModo(catalogoModo: CatalogoModoCreationAttributes) {
    return await CatalogoModoAerolinea.create(catalogoModo as any);
}

export async function updateCatalogoModo(catalogoModo: CatalogoModo): Promise<CatalogoModo | null> {
    const catalogoModoToUpdate = await CatalogoModoAerolinea.findByPk(catalogoModo.id_modo);
    if (catalogoModoToUpdate) {
        await CatalogoModoAerolinea.update(catalogoModo, {
            where: {
                id_modo: catalogoModo.id_modo
            }
        });
        const updatedCatalogoModo = await CatalogoModoAerolinea.findByPk(catalogoModo.id_modo);
        return updatedCatalogoModo ? updatedCatalogoModo.toJSON() as CatalogoModo : null;
    }
    return null;
}

export async function deleteCatalogoModo(id: number): Promise<CatalogoModo | null> {
    const catalogoModoToDelete = await CatalogoModoAerolinea.findByPk(id);

    if (catalogoModoToDelete) {
        await CatalogoModoAerolinea.destroy({
            where: {
                id_modo: id
            }
        });

        return catalogoModoToDelete.toJSON() as CatalogoModo;
    }
    return null;
}

export async function deleteCatalogoModos(id: number[]): Promise<CatalogoModo[]> {
    const catalogoModosToDelete = await CatalogoModoAerolinea.findAll({
        where: {
            id_modo: id
        }
    });

    if (catalogoModosToDelete.length) {
        await CatalogoModoAerolinea.destroy({
            where: {
                id_modo: id
            }
        });

        return catalogoModosToDelete.map((catalogoModo) => catalogoModo.toJSON()) as CatalogoModo[];
    }
    return [];
}