// src/models/usuarios/fincas_rol.model.ts
import { Model, DataTypes } from 'sequelize';
import { UUID } from 'crypto';
import sequelize from '@db/experts.db';
import Usuario from './usuario.model';

export interface FincaRolAttributes {
    id_usuario: UUID;
    codigo_finca?: string;
    direccion_finca?: string;
    cliente_previo?: boolean;
}

const FincaRol = sequelize.define<Model<FincaRolAttributes>>('fincas_rol', {
    id_usuario: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: Usuario,
            key: 'id_usuario',
        },
    },
    codigo_finca: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    direccion_finca: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cliente_previo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    freezeTableName: true,
    timestamps: false
});

FincaRol.hasOne(Usuario, { foreignKey: 'id_usuario' });

export default FincaRol;