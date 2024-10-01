import { Model, DataTypes } from 'sequelize';
import { CaeAduanaAtributosCreacion, CaeAduana } from '@typesApp/mantenimiento/cae_aduana.type';

import sequelize from '@db/experts.db';

const CaeAduana = sequelize.define<Model<CaeAduana, CaeAduanaAtributosCreacion>>('cae_aduana', {
    id_cae_aduana: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo_aduana: {
        type: DataTypes.INTEGER,
    },
    nombre: {
        type: DataTypes.STRING,
    },
});

export default CaeAduana;