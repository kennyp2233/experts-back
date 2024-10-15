import { Model, DataTypes } from 'sequelize';
import { PaisAtributosCreacion, Pais } from '@typesApp/mantenimiento/pais.type';

import sequelize from '@db/experts.db'

import AcuerdosArancelarios from './acuerdo_arancelario.model';

const Pais = sequelize.define<Model<Pais, PaisAtributosCreacion>>('paises', {
    id_pais: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    siglas_pais: {
        type: DataTypes.STRING,
        unique: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    pais_id: {
        type: DataTypes.INTEGER,
    },
    id_acuerdo: {
        type: DataTypes.INTEGER,
        references: {
            model: AcuerdosArancelarios,
            key: AcuerdosArancelarios.primaryKeyAttribute,
        },
    },
});

export default Pais;