// associations.ts
import Usuario from '@db/models/usuarios.model';
import Admins from '@db/models/admins.model';


Usuario.belongsTo(Admins, { foreignKey: 'id_usuario' });
Admins.hasOne(Usuario, { foreignKey: 'id_usuario' });