import { Model, DataTypes } from 'sequelize';
import sequelize from '../experts.db';
import { PaisCreationAttributes, Pais } from '@typesApp/entities/PaisTypes';
import AcuerdosArancelarios from './acuerdos_arancelarios';

const Paises = sequelize.define<Model<Pais, PaisCreationAttributes>>('paises', {
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
            key: 'id_acuerdo',
        }
    },
});

export default Paises;