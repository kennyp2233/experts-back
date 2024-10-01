import Productos from '@models/mantenimiento/producto.model';
import ProductosMiPro from '@models/mantenimiento/productos/productos_mi_pro.model';
import ProductosAranceles from '@models/mantenimiento/productos/productos_aranceles.model';
import { ProductoAtributosCreacion, Producto } from '@typesApp/mantenimiento/producto.type';
import ProductosCompuesto from '@models/mantenimiento/productos/productos_producto_compuesto.model';

import "src/config/assosiations/mantenimiento/productos.as";
import sequelize from "src/config/experts.db";
import { crearRegistrosConSeries } from '@utils/custom_data_utils';
export async function getProductos() {
    const productosList = await Productos.findAll();
    return productosList.map((producto) => producto.toJSON()) as Producto[];
}

export async function getProducto(id: number) {
    const producto = await Productos.findByPk(id);
    return producto ? producto.toJSON() as Producto : null;
}

export async function createProducto(producto: ProductoAtributosCreacion) {
    const transaction = await sequelize.transaction();

    try {
        const productoData = extraerProductoDeData(producto);
        const miProData = extraerMiProData(producto) as any[];
        const arancelesData = extraerArancelesData(producto) as any[];
        const productoCompuestoData = extraerProductoCompuestoData(producto) as any[];

        const newProducto: any = await Productos.create(productoData, { transaction });

        await crearRegistrosConSeries(newProducto.id_producto, miProData, ['mipro_acuerdo', 'mipro_djocode', 'mipro_tariffcode'], ProductosMiPro, transaction, 'id_producto');
        await crearRegistrosConSeries(newProducto.id_producto, arancelesData, ['aranceles_destino', 'aranceles_codigo'], ProductosAranceles, transaction, 'id_producto');
        await crearRegistrosConSeries(newProducto.id_producto, productoCompuestoData, ['producto_compuesto_destino', 'producto_compuesto_declaracion'], ProductosCompuesto, transaction, 'id_producto');

        await transaction.commit();
        return await Productos.findByPk(newProducto.id_producto);

    } catch (error) {
        await transaction.rollback();
        throw error
    }
}

export async function updateProducto(producto: Producto) {
    const transaction = await sequelize.transaction();

    try {
        const productoToUpdate = await Productos.findByPk(producto.id_producto, { transaction });
        if (!productoToUpdate) {
            throw new Error('Producto no encontrado');
        }

        const productoData = extraerProductoDeData(producto);
        const miProData = extraerMiProData(producto) as any[];
        const arancelesData = extraerArancelesData(producto) as any[];
        const productoCompuestoData = extraerProductoCompuestoData(producto) as any[];

        await ProductosMiPro.destroy({ where: { id_producto: producto.id_producto }, transaction });
        await ProductosAranceles.destroy({ where: { id_producto: producto.id_producto }, transaction });
        await ProductosCompuesto.destroy({ where: { id_producto: producto.id_producto }, transaction });

        await Productos.update(productoData, {
            where: { id_producto: producto.id_producto },
            transaction
        });

        await crearRegistrosConSeries(producto.id_producto, miProData, ['mipro_acuerdo', 'mipro_djocode', 'mipro_tariffcode'], ProductosMiPro, transaction, 'id_producto');
        await crearRegistrosConSeries(producto.id_producto, arancelesData, ['aranceles_destino', 'aranceles_codigo'], ProductosAranceles, transaction, 'id_producto');
        await crearRegistrosConSeries(producto.id_producto, productoCompuestoData, ['producto_compuesto_destino', 'producto_compuesto_declaracion'], ProductosCompuesto, transaction, 'id_producto');

        await transaction.commit();

        const updatedProducto = await Productos.findByPk(producto.id_producto);
        return updatedProducto ? updatedProducto.toJSON() as Producto : null;

    } catch (error) {
        await transaction.rollback();
        throw error
    }
}



export async function deleteProducto(id: number) {
    const transaction = await sequelize.transaction();

    try {
        // Buscar el producto que se desea eliminar
        const productoToDelete = await Productos.findByPk(id, { transaction });
        if (!productoToDelete) {
            throw new Error('Producto no encontrado');
        }

        // Eliminar registros relacionados en otras tablas
        await ProductosMiPro.destroy({ where: { id_producto: id }, transaction });
        await ProductosAranceles.destroy({ where: { id_producto: id }, transaction });
        await ProductosCompuesto.destroy({ where: { id_producto: id }, transaction });

        // Eliminar el producto principal
        await Productos.destroy({ where: { id_producto: id }, transaction });

        // Confirmar la transacción
        await transaction.commit();

        return productoToDelete.toJSON() as Producto;
    } catch (error) {
        await transaction.rollback();
        throw error
    }
}


export async function deleteProductos(productosDelete: number[]) {
    const transaction = await sequelize.transaction();

    try {
        // Buscar los productos que se desean eliminar
        const productosToDelete = await Productos.findAll({
            where: {
                id_producto: productosDelete
            },
            transaction
        });

        if (!productosToDelete.length) {
            throw new Error('No se encontraron productos para eliminar');
        }

        // Eliminar registros relacionados en otras tablas
        await Promise.all([
            ProductosMiPro.destroy({ where: { id_producto: productosDelete }, transaction }),
            ProductosAranceles.destroy({ where: { id_producto: productosDelete }, transaction }),
            ProductosCompuesto.destroy({ where: { id_producto: productosDelete }, transaction }),
        ]);

        // Eliminar los productos principales
        await Productos.destroy({
            where: {
                id_producto: productosDelete
            },
            transaction
        });

        // Confirmar la transacción
        await transaction.commit();

        return productosToDelete.map((producto) => producto.toJSON()) as Producto[];
    } catch (error) {
        await transaction.rollback();
        throw error
    }
}


export async function getProductoJoinAll() {
    return await Productos.findAll({
        include: [
            {
                association: 'opcion',
                required: false
            },
            {
                association: 'medida',
                required: false
            },
            {
                model: ProductosMiPro,
                as: 'mipro',
                required: false
            },
            {
                model: ProductosAranceles,
                as: 'aranceles',
                required: false
            },
            {
                model: ProductosCompuesto,
                as: 'producto_compuesto',
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
        id_sesa: data?.id_sesa,
    }
}

function extraerMiProData(data: any) {
    return data?.mipro
}

function extraerArancelesData(data: any) {
    return data?.aranceles
}

function extraerProductoCompuestoData(data: any) {
    return data?.producto_compuesto
}


