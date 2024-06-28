import productos from '@db/models/mantenimiento/productos.model';
import { ProductoCreationAttributes, Producto } from '@typesApp/entities/mantenimiento/ProductosTypes';
import "@db/assosiations/mantenimiento/productos.as";
export async function getProductos() {
    const productosList = await productos.findAll();
    return productosList.map((producto) => producto.toJSON()) as Producto[];
}

export async function getProducto(id: number) {
    const producto = await productos.findByPk(id);
    return producto ? producto.toJSON() as Producto : null;
}

export async function createProducto(producto: ProductoCreationAttributes) {
    const productoData = extraerProductoDeData(producto);
    return await productos.create(productoData);
}

export async function updateProducto(producto: Producto) {
    const productoToUpdate = await productos.findByPk(producto.id_producto);
    const productoData = extraerProductoDeData(producto);
    if (productoToUpdate) {
        await productos.update(productoData, {
            where: {
                id_producto: producto.id_producto
            }
        });
        const updatedProducto = await productos.findByPk(producto.id_producto);
        return updatedProducto ? updatedProducto.toJSON() as Producto : null;
    }
    return null;
}

export async function deleteProducto(id: number) {
    const productoToDelete = await productos.findByPk(id);
    if (productoToDelete) {
        await productos.destroy({
            where: {
                id_producto: id
            }
        });
        return productoToDelete.toJSON() as Producto;
    }
    return null;
}

export async function deleteProductos(productosDelete: number[]) {
    const productosToDelete = await productos.findAll({
        where: {
            id_producto: productosDelete
        }
    });
    if (productosToDelete) {
        await productos.destroy({
            where: {
                id_producto: productosDelete
            }
        });
        return productosToDelete.map((producto) => producto.toJSON()) as Producto[];
    }
    return null;
}

export async function getProductoJoinAll() {
    return await productos.findAll({
        include: [
            {
                association: 'opcion',
                required: false
            },
            {
                association: 'medida',
                required: false
            }
        ]
    });

}



function extraerProductoDeData(data: any) {
    return {
        id_producto: data?.id_producto,
        codigo_producto: data?.codigo_producto,
        nombre: data?.nombre,
        descripcion: data?.descripcion,
        nombre_botanico: data?.nombre_botanico,
        especie: data?.especie,
        id_medida: data?.medida?.id_medida,
        precio_unitario: data?.precio_unitario,
        estado: data?.estado,
        id_opcion: data?.opcion?.id_opcion,
        stems_por_full: data?.stems_por_full,
        id_sesa: data?.id_sesa
    }
}