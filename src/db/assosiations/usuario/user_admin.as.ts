// associations.ts
import Usuario from '@dbModels/usuarios/usuarios.model';
import Admins from '@dbModels/usuarios/admins.model';


Usuario.belongsTo(Admins, { foreignKey: 'id_usuario' });
Admins.hasOne(Usuario, { foreignKey: 'id_usuario' });