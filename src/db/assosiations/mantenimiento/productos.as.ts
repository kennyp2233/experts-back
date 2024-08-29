import Productos from "@dbModels/mantenimiento/productos.model";
import ProductosAranceles from "@dbModels/mantenimiento/productos/productos_aranceles.model";
import ProductosCompuesto from "@dbModels/mantenimiento/productos/productos_producto_compuesto.model";
import ProductosMiPro from "@dbModels/mantenimiento/productos/productos_mi_pro.model";
import CatalogoProductoOpciones from "@dbModels/catalogos/productos/catalogo_productos_opciones.model";
import CatalogoProductosUnidad from "@dbModels/catalogos/productos/catalogo_productos_unidad.model";

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


