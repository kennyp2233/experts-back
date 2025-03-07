import catalogo from "@models/catalogos/productos/catalogo_productos_unidad.model";
import { CatalogoProductosUnidad, CatalogoProductosUnidadCreationAttributes } from "@typesApp/catalogos/productos/catalogo_producto_unidad.type";

export async function getCatalogoProductosUnidad(): Promise<CatalogoProductosUnidad[]> {
    const catalogoProductosUnidadList = await catalogo.findAll();
    return catalogoProductosUnidadList.map((catalogoProductosUnidad) => catalogoProductosUnidad.toJSON()) as CatalogoProductosUnidad[];
}

export async function getCatalogoProductoUnidad(id: number): Promise<CatalogoProductosUnidad | null> {
    const catalogoProductoUnidad = await catalogo.findByPk(id);
    return catalogoProductoUnidad ? catalogoProductoUnidad.toJSON() as CatalogoProductosUnidad : null;
}

export async function createCatalogoProductoUnidad(catalogoProductoUnidad: CatalogoProductosUnidadCreationAttributes) {
    return await catalogo.create(catalogoProductoUnidad as any);
}

export async function updateCatalogoProductoUnidad(catalogoProductoUnidad: CatalogoProductosUnidad): Promise<CatalogoProductosUnidad | null> {
    const catalogoProductoUnidadToUpdate = await catalogo.findByPk(catalogoProductoUnidad.id_medida);
    if (catalogoProductoUnidadToUpdate) {
        await catalogo.update(catalogoProductoUnidad, {
            where: {
                id_medida: catalogoProductoUnidad.id_medida
            }
        });
        const updatedCatalogoProductoUnidad = await catalogo.findByPk(catalogoProductoUnidad.id_medida);
        return updatedCatalogoProductoUnidad ? updatedCatalogoProductoUnidad.toJSON() as CatalogoProductosUnidad : null;
    }
    return null;
}

export async function deleteCatalogoProductoUnidad(id: number): Promise<CatalogoProductosUnidad | null> {
    const catalogoProductoUnidadToDelete = await catalogo.findByPk(id);

    if (catalogoProductoUnidadToDelete) {
        await catalogo.destroy({
            where: {
                id_medida: id
            }
        });

        return catalogoProductoUnidadToDelete.toJSON() as CatalogoProductosUnidad;
    }
    return null;
}

export async function deleteCatalogoProductosUnidad(id: number[]): Promise<CatalogoProductosUnidad[]> {
    const catalogoProductosUnidadToDelete = await catalogo.findAll({
        where: {
            id_medida: id
        }
    });

    if (catalogoProductosUnidadToDelete.length) {
        await catalogo.destroy({
            where: {
                id_medida: id
            }
        });

        return catalogoProductosUnidadToDelete.map((catalogoProductoUnidad) => catalogoProductoUnidad.toJSON()) as CatalogoProductosUnidad[];
    }
    return [];
}