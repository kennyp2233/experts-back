import { Model, DataTypes } from 'sequelize';
import sequelize from '../../experts.db';
import { OrigenCreationAttributes, Origen } from '@typesApp/entities/mantenimiento/OrigenTypes';
import CaeAduanas from './cae_aduana.model';
import Paises from './paises.model';

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
            model: Paises,
            key: 'id_pais',
        },
    },
    id_cae_aduana: {
        type: DataTypes.INTEGER,
        references: {
            model: CaeAduanas,
            key: 'id_cae_aduana',
        },
    }
});

export default Origenes;