import { Model, DataTypes } from 'sequelize';
import { ConsignatarioGuiaM } from '@typesApp/mantenimiento/consignatario/consignatario.type';

import sequelize from 'src/config/experts.db';


import Consignatarios from './consignatario.model';
import Destino from '../destino.model';

const ConsignatarioGuiaMs = sequelize.define<Model<ConsignatarioGuiaM>>('consignatario_guia_m', {
    id_consignatario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Consignatarios,
            key: Consignatarios.primaryKeyAttribute,
        },
    },
    id_destino: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Destino,
            key: Destino.primaryKeyAttribute,
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
});

export default ConsignatarioGuiaMs;