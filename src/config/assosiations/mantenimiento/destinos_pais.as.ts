import Destinos from "@models/mantenimiento/destino.model";
import Paises from "@models/mantenimiento/pais.model";

Destinos.belongsTo(Paises, { foreignKey: 'id_pais' });
Paises.hasMany(Destinos, { foreignKey: 'id_pais' });

