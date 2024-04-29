import { DataTypes, Model } from 'sequelize';
import sequelize from '../../experts.db';
import { UsuarioCreationAttributes, Usuario } from '@typesApp/entities/usuarios/UsuarioTypes';

const Usuario = sequelize.define<Model<Usuario, UsuarioCreationAttributes>>('usuarios', {
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
    },
    pic: {
        type: DataTypes.BLOB('long'),
    },
});

export default Usuario;