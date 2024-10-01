import CatalogoMultiplicadorAerolinea from "@models/catalogos/aerolineas/catalogo_multiplicador_aerolinea.model";

import { CatalogoMultiplicador, CatalogoMultiplicadorCreationAttributes } from "@typesApp/catalogos/aerolineas/catalogo_multiplicador.type";



export async function getCatalogoMultiplicadores(): Promise<CatalogoMultiplicador[]> {
    const catalogoMultiplicadoresList = await CatalogoMultiplicadorAerolinea.findAll();
    return catalogoMultiplicadoresList.map((catalogoMultiplicador) => catalogoMultiplicador.toJSON()) as CatalogoMultiplicador[];
}

export async function getCatalogoMultiplicador(id: number): Promise<CatalogoMultiplicador | null> {
    const catalogoMultiplicador = await CatalogoMultiplicadorAerolinea.findByPk(id);
    return catalogoMultiplicador ? catalogoMultiplicador.toJSON() as CatalogoMultiplicador : null;
}

export async function createCatalogoMultiplicador(catalogoMultiplicador: CatalogoMultiplicadorCreationAttributes) {
    return await CatalogoMultiplicadorAerolinea.create(catalogoMultiplicador as any);
}

export async function updateCatalogoMultiplicador(catalogoMultiplicador: CatalogoMultiplicador): Promise<CatalogoMultiplicador | null> {
    const catalogoMultiplicadorToUpdate = await CatalogoMultiplicadorAerolinea.findByPk(catalogoMultiplicador.id_multiplicador);
    if (catalogoMultiplicadorToUpdate) {
        await CatalogoMultiplicadorAerolinea.update(catalogoMultiplicador, {
            where: {
                id_multiplicador: catalogoMultiplicador.id_multiplicador
            }
        });
        const updatedCatalogoMultiplicador = await CatalogoMultiplicadorAerolinea.findByPk(catalogoMultiplicador.id_multiplicador);
        return updatedCatalogoMultiplicador ? updatedCatalogoMultiplicador.toJSON() as CatalogoMultiplicador : null;
    }
    return null;
}

export async function deleteCatalogoMultiplicador(id: number): Promise<CatalogoMultiplicador | null> {
    const catalogoMultiplicadorToDelete = await CatalogoMultiplicadorAerolinea.findByPk(id);

    if (catalogoMultiplicadorToDelete) {
        await CatalogoMultiplicadorAerolinea.destroy({
            where: {
                id_multiplicador: id
            }
        });

        return catalogoMultiplicadorToDelete.toJSON() as CatalogoMultiplicador;
    }
    return null;
}

export async function deleteCatalogoMultiplicadores(id: number[]): Promise<CatalogoMultiplicador[]> {
    const catalogoMultiplicadoresToDelete = await CatalogoMultiplicadorAerolinea.findAll({
        where: {
            id_multiplicador: id
        }
    });

    if (catalogoMultiplicadoresToDelete.length) {
        await CatalogoMultiplicadorAerolinea.destroy({
            where: {
                id_multiplicador: id
            }
        });

        return catalogoMultiplicadoresToDelete.map((catalogoMultiplicador) => catalogoMultiplicador.toJSON()) as CatalogoMultiplicador[];
    }
    return [];
}
