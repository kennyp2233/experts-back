import catalogo from "@models/catalogos/productos/catalogo_productos_opciones.model";
import { CatalogoProductoOpciones, CatalogoProductoOpcionesCreationAttributes } from "@typesApp/catalogos/productos/catalogo_producto_opciones.type";

export async function getCatalogoProductosOpciones(): Promise<CatalogoProductoOpciones[]> {
    const catalogoProductosOpcionesList = await catalogo.findAll();
    return catalogoProductosOpcionesList.map((catalogoProductoOpciones) => catalogoProductoOpciones.toJSON()) as CatalogoProductoOpciones[];
}

export async function getCatalogoProductoOpciones(id: number): Promise<CatalogoProductoOpciones | null> {
    const catalogoProductoOpciones = await catalogo.findByPk(id);
    return catalogoProductoOpciones ? catalogoProductoOpciones.toJSON() as CatalogoProductoOpciones : null;
}

export async function createCatalogoProductoOpciones(catalogoProductoOpciones: CatalogoProductoOpcionesCreationAttributes) {
    return await catalogo.create(catalogoProductoOpciones as any);
}

export async function updateCatalogoProductoOpciones(catalogoProductoOpciones: CatalogoProductoOpciones): Promise<CatalogoProductoOpciones | null> {
    const catalogoProductoOpcionesToUpdate = await catalogo.findByPk(catalogoProductoOpciones.id_opcion);
    if (catalogoProductoOpcionesToUpdate) {
        await catalogo.update(catalogoProductoOpciones, {
            where: {
                id_opcion: catalogoProductoOpciones.id_opcion
            }
        });
        const updatedCatalogoProductoOpciones = await catalogo.findByPk(catalogoProductoOpciones.id_opcion);
        return updatedCatalogoProductoOpciones ? updatedCatalogoProductoOpciones.toJSON() as CatalogoProductoOpciones : null;
    }
    return null;
}

export async function deleteCatalogoProductoOpciones(id: number): Promise<CatalogoProductoOpciones | null> {
    const catalogoProductoOpcionesToDelete = await catalogo.findByPk(id);

    if (catalogoProductoOpcionesToDelete) {
        await catalogo.destroy({
            where: {
                id_opcion: id
            }
        });

        return catalogoProductoOpcionesToDelete.toJSON() as CatalogoProductoOpciones;
    }
    return null;
}

export async function deleteCatalogoProductosOpciones(id: number[]): Promise<CatalogoProductoOpciones[]> {
    const catalogoProductosOpcionesToDelete = await catalogo.findAll({
        where: {
            id_opcion: id
        }
    });

    if (catalogoProductosOpcionesToDelete.length) {
        await catalogo.destroy({
            where: {
                id_opcion: id
            }
        });

        return catalogoProductosOpcionesToDelete.map((catalogoProductoOpciones) => catalogoProductoOpciones.toJSON()) as CatalogoProductoOpciones[];
    }
    return [];
}