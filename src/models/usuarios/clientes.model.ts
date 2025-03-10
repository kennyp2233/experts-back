// src/models/usuarios/clientes_rol.model.ts
import { Model, DataTypes } from 'sequelize';
import { UUID } from 'crypto';
import sequelize from '@db/experts.db';
import Usuario from './usuario.model';

export interface ClienteRolAttributes {
    id_usuario: UUID;
    empresa: string;
}

const ClienteRol = sequelize.define<Model<ClienteRolAttributes>>('clientes_rol', {
    id_usuario: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: Usuario,
            key: 'id_usuario',
        },
    },
    empresa: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false
});

ClienteRol.hasOne(Usuario, { foreignKey: 'id_usuario' });


export default ClienteRol;