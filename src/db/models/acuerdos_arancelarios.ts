import { Model, DataTypes } from 'sequelize';
import sequelize from '../experts.db';

import { AcuerdoArancelarioCreationAttributes, AcuerdoArancelario } from '@typesApp/entities/AcuerdosArancelariosTypes';

const AcuerdosArancelarios = sequelize.define<Model<AcuerdoArancelario, AcuerdoArancelarioCreationAttributes>>('acuerdos_arancelarios', {
    id_acuerdo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default AcuerdosArancelarios;