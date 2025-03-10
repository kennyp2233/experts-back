// src/models/usuarios/pendientes.model.ts
import { Model, DataTypes } from 'sequelize';
import { UUID } from 'crypto';
import sequelize from '@db/experts.db';
import Usuario from './usuario.model';

export interface PendienteAttributes {
    id_usuario: UUID;
}

const Pendiente = sequelize.define<Model<PendienteAttributes>>('pendientes_rol', {
    id_usuario: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: Usuario,
            key: 'id_usuario',
        },
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Pendiente.hasOne(Usuario, { foreignKey: 'id_usuario' });


export default Pendiente;