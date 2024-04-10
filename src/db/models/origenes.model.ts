import { Model, DataTypes } from 'sequelize';
import sequelize from '../experts.db';
import { OrigenCreationAttributes, Origen } from '@typesApp/entities/OrigenTypes';

const Origenes = sequelize.define<Model<Origen, OrigenCreationAttributes>>('origenes', {
    id_origen: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo_origen: {
        type: DataTypes.STRING,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    aeropuerto: {
        type: DataTypes.STRING,
    },
    id_pais: {
        type: DataTypes.INTEGER,
        references: {
            model: 'paises',
            key: 'id_pais',
        },
    },
    id_aduana: {
        type: DataTypes.INTEGER,
        references: {
            model: 'cae_aduana',
            key: 'id_cae_aduana',
        },
    }
});

export default Origenes;