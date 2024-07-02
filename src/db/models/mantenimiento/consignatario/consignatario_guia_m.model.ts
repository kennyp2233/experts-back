import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';

import { ConsignatarioGuiaM } from '@typesApp/entities/mantenimiento/consignatario/ConsignatarioTypes';

const ConsignatarioGuiaMs = sequelize.define<Model<ConsignatarioGuiaM>>('consignatario_guia_m', {
    id_consignatario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'consignatarios',
            key: 'id_consignatario',
        },
    },
    id_destino: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'destinos',
            key: 'id_destino',
        },
    },
    guia_m_consignee: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    guia_m_name_address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    guia_m_notify: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'consignatario_guia_m',
    freezeTableName: true,
});

export default ConsignatarioGuiaMs;