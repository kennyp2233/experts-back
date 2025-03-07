import Paises from '@models/mantenimiento/pais.model';
import Origenes from '@models/mantenimiento/origen.model';
import CaeAduanas from '@models/mantenimiento/cae_aduana.model';


Paises.hasMany(Origenes, { foreignKey: 'id_pais' });
Origenes.belongsTo(Paises, { foreignKey: 'id_pais' });

CaeAduanas.hasMany(Origenes, { foreignKey: 'id_cae_aduana' });
Origenes.belongsTo(CaeAduanas, { foreignKey: 'id_cae_aduana' })