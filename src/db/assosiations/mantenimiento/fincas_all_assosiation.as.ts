import Fincas from "@dbModels/mantenimiento/finca.model";
import FincaChoferes from "@dbModels/mantenimiento/fincas/fincas_choferes.model";
import FincaProductos from "@dbModels/mantenimiento/fincas/fincas_productos.model";
import Productos from "@dbModels/mantenimiento/productos.model";
import Choferes from "@dbModels/mantenimiento/chofer.model";

Fincas.hasMany(FincaChoferes, {
    foreignKey: "id_finca",
    as: "fincas_choferes",
});

Fincas.hasMany(FincaProductos, {
    foreignKey: "id_finca",
    as: "fincas_productos",
});

FincaProductos.belongsTo(Productos, {
    foreignKey: "id_producto",
    as: "productos",
});

FincaChoferes.belongsTo(Choferes, {
    foreignKey: "id_chofer",
    as: "choferes",
});




