import { DataTypes, Model } from 'sequelize';
import { UsuarioAtributosCreacion, UsuarioAtributos } from '@typesApp/usuarios/usuario.type';

import sequelize from '@db/experts.db';


const Usuario = sequelize.define<Model<UsuarioAtributos, UsuarioAtributosCreacion>>('usuarios', {
    id_usuario: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    usuario: {
        type: DataTypes.STRING,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    pass: {
        type: DataTypes.STRING,
    }
});



export default Usuario;