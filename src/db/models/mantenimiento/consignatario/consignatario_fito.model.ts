import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';

import { ConsignatarioFito } from '@typesApp/entities/mantenimiento/consignatario/ConsignatarioTypes';

const ConsignatarioFito = sequelize.define<Model<ConsignatarioFito>>('consignatario_fito', {
    id_consignatario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'consignatarios',
            key: 'id_consignatario',
        },
    },
    fito_declared_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fito_forma_a: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fito_nombre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fito_direccion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fito_pais: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'consignatario_fito',
    freezeTableName: true,
});

export default ConsignatarioFito;