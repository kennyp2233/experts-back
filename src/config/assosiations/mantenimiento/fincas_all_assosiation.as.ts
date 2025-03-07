import Fincas from "@models/mantenimiento/finca.model";
import FincaChoferes from "@models/mantenimiento/fincas/fincas_choferes.model";
import FincaProductos from "@models/mantenimiento/fincas/fincas_productos.model";
import Productos from "@models/mantenimiento/producto.model";
import Choferes from "@models/mantenimiento/chofer.model";

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




