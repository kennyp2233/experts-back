import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';

import { ConsignatarioGuiaH } from '@typesApp/entities/mantenimiento/consignatario/ConsignatarioTypes';

const ConsignatarioGuiaHs = sequelize.define<Model<ConsignatarioGuiaH>>('consignatario_guia_h', {
    id_consignatario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'consignatarios',
            key: 'id_consignatario',
        },
    },
    guia_h_consignee: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    guia_h_name_adress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    guia_h_notify: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'consignatario_guia_h',
    freezeTableName: true,
});

export default ConsignatarioGuiaHs;