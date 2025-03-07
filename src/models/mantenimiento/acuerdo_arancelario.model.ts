import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';

import { AcuerdoArancelarioAtributosCreacion, AcuerdoArancelario } from '@typesApp/mantenimiento/acuerdo_arancelario.type';

const AcuerdosArancelarios = sequelize.define<Model<AcuerdoArancelario, AcuerdoArancelarioAtributosCreacion>>('acuerdos_arancelarios', {
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