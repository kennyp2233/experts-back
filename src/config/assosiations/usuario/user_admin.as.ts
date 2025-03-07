// associations.ts
import Usuario from '@models/usuarios/usuario.model';
import Admin from '@models/usuarios/admins.model';


Usuario.belongsTo(Admin, { foreignKey: 'id_usuario' });
Admin.hasOne(Usuario, { foreignKey: 'id_usuario' });