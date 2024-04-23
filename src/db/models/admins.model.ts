
import { Model, DataTypes } from 'sequelize';

import sequelize from '../experts.db';
import Usuario from './usuarios.model';
import { AdminCreationAttributes, Admin } from '@typesApp/entities/AdminTypes';

const Admins = sequelize.define<Model<Admin, AdminCreationAttributes>>('admins', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Usuario,
            key: 'id_usuario',
        },
    },

});

export default Admins;