import Paises from '@dbModels/mantenimiento/paises.model';
import Origenes from '@dbModels/mantenimiento/origenes.model';
import CaeAduanas from '@dbModels/mantenimiento/cae_aduana.model';


Paises.hasMany(Origenes, { foreignKey: 'id_pais' });
Origenes.belongsTo(Paises, { foreignKey: 'id_pais' });

CaeAduanas.hasMany(Origenes, { foreignKey: 'id_cae_aduana' });
Origenes.belongsTo(CaeAduanas, { foreignKey: 'id_cae_aduana' })