import Origenes from "@models/mantenimiento/origen.model";
import Destinos from "@models/mantenimiento/destino.model";
import Aerolineas from "@models/mantenimiento/aerolinea.model";
import AerolineasPlantillas from "@models/mantenimiento/aerolinea_plantilla.model";
import CatalogoModoAerolinea from "@models/catalogos/aerolineas/catalogo_modo_aerolinea.model";
import CatalogoMultiplicadorAerolinea from "@models/catalogos/aerolineas/catalogo_multiplicador_aerolinea.model";

Aerolineas.belongsTo(Origenes, { foreignKey: 'from1', as: 'origen1' });
Aerolineas.belongsTo(Destinos, { foreignKey: 'to1', as: 'destino1' });
Aerolineas.belongsTo(Aerolineas, { foreignKey: 'by1', as: 'via1' });

Aerolineas.belongsTo(CatalogoModoAerolinea, { foreignKey: 'id_modo', as: 'modo' });
//AerolineasPlantillas.belongsTo(CatalogoMultiplicadorAerolinea, { foreignKey: 'id_multiplicador', as: 'multiplicador' });

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

AerolineasPlantillas.belongsTo(CatalogoMultiplicadorAerolinea, { foreignKey: 'combustible_mult', as: 'multiplicador1' });
AerolineasPlantillas.belongsTo(CatalogoMultiplicadorAerolinea, { foreignKey: 'seguridad_mult', as: 'multiplicador2' });
AerolineasPlantillas.belongsTo(CatalogoMultiplicadorAerolinea, { foreignKey: 'aux_calc_mult', as: 'multiplicador3' });

