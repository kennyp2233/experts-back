import Admin from "@models/usuarios/admins.model";
import ClienteRol from "@models/usuarios/clientes.model";
import FincaRol from "@models/usuarios/fincas.model";
import Pendiente from "@models/usuarios/pendiente.model";
import Usuario from "@models/usuarios/usuario.model";

Usuario.hasOne(Admin, { foreignKey: 'id_usuario' });
Usuario.hasOne(ClienteRol, { foreignKey: 'id_usuario' });
Usuario.hasOne(FincaRol, { foreignKey: 'id_usuario' });
Usuario.hasOne(Pendiente, { foreignKey: 'id_usuario' });

