import Productos from "@dbModels/mantenimiento/productos.model";
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
