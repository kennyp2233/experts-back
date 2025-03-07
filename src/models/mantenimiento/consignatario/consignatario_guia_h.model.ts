import { Model, DataTypes } from 'sequelize';
import { ConsignatarioGuiaH } from '@typesApp/mantenimiento/consignatario/consignatario.type';

import sequelize from 'src/config/experts.db';

import Consignatarios from './consignatario.model';

const ConsignatarioGuiaHs = sequelize.define<Model<ConsignatarioGuiaH>>('consignatario_guia_h', {
    id_consignatario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Consignatarios,
            key: Consignatarios.primaryKeyAttribute,
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
});

export default ConsignatarioGuiaHs;