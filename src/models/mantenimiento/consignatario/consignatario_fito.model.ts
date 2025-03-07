import { Model, DataTypes } from 'sequelize';
import { ConsignatarioFito } from '@typesApp/mantenimiento/consignatario/consignatario.type';

import sequelize from 'src/config/experts.db';

import Consignatarios from './consignatario.model';


const ConsignatarioFito = sequelize.define<Model<ConsignatarioFito>>('consignatario_fito', {
    id_consignatario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Consignatarios,
            key: Consignatarios.primaryKeyAttribute,
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
});

export default ConsignatarioFito;