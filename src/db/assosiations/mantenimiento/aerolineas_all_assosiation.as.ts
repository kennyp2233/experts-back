import Origenes from "@dbModels/mantenimiento/origenes.model";
import Destinos from "@dbModels/mantenimiento/destinos.model";
import Aerolineas from "@dbModels/mantenimiento/aerolineas.model";
import AerolineasPlantillas from "@dbModels/mantenimiento/aerolineas_plantillas.model"

Aerolineas.belongsTo(Origenes, { foreignKey: 'from1', as: 'origen1' });
Aerolineas.belongsTo(Destinos, { foreignKey: 'to1', as: 'destino1' });
Aerolineas.belongsTo(Aerolineas, { foreignKey: 'by1', as: 'via1' });

Aerolineas.belongsTo(Destinos, { foreignKey: 'to2', as: 'destino2' });
Aerolineas.belongsTo(Aerolineas, { foreignKey: 'by2', as: 'via2' });

Aerolineas.belongsTo(Destinos, { foreignKey: 'to3', as: 'destino3' });
Aerolineas.belongsTo(Aerolineas, { foreignKey: 'by3', as: 'via3' });

Origenes.hasMany(Aerolineas, { foreignKey: 'from1', as: 'aerolineas1' });
Destinos.hasMany(Aerolineas, { foreignKey: 'to1', as: 'aerolineas1' });
Aerolineas.hasMany(Aerolineas, { foreignKey: 'by1', as: 'aerolineas1' });

Destinos.hasMany(Aerolineas, { foreignKey: 'to2', as: 'aerolineas2' });
Aerolineas.hasMany(Aerolineas, { foreignKey: 'by2', as: 'aerolineas2' });

Destinos.hasMany(Aerolineas, { foreignKey: 'to3', as: 'aerolineas3' });
Aerolineas.hasMany(Aerolineas, { foreignKey: 'by3', as: 'aerolineas3' });

Aerolineas.hasOne(AerolineasPlantillas, { foreignKey: 'id_aerolinea', as: 'plantilla' });
AerolineasPlantillas.belongsTo(Aerolineas, { foreignKey: 'id_aerolinea', as: 'aerolinea' });
