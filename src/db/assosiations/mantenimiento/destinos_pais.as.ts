import Destinos from "@dbModels/mantenimiento/destinos.model";
import Paises from "@dbModels/mantenimiento/paises.model";

Destinos.belongsTo(Paises, { foreignKey: 'id_pais' });
Paises.hasMany(Destinos, { foreignKey: 'id_pais' });

