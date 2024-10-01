import Productos from "@models/mantenimiento/producto.model";
import ProductosAranceles from "@models/mantenimiento/productos/productos_aranceles.model";
import ProductosCompuesto from "@models/mantenimiento/productos/productos_producto_compuesto.model";
import ProductosMiPro from "@models/mantenimiento/productos/productos_mi_pro.model";
import CatalogoProductoOpciones from "@models/catalogos/productos/catalogo_productos_opciones.model";
import CatalogoProductosUnidad from "@models/catalogos/productos/catalogo_productos_unidad.model";
Productos.belongsTo(CatalogoProductoOpciones, {
    foreignKey: 'id_opcion',
    as: 'opcion'
});

Productos.belongsTo(CatalogoProductosUnidad, {
    foreignKey: 'id_medida',
    as: 'medida'
});

Productos.hasMany(ProductosAranceles, {
    foreignKey: 'id_producto',
    as: 'aranceles'
});

Productos.hasMany(ProductosCompuesto, {
    foreignKey: 'id_producto',
    as: 'producto_compuesto'
});

Productos.hasMany(ProductosMiPro, {
    foreignKey: 'id_producto',
    as: 'mipro'
});


