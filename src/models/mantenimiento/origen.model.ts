import { Model, DataTypes } from 'sequelize';
import { OrigenCreationAttributes, Origen } from '@typesApp/mantenimiento/origen.type';

import sequelize from "@db/experts.db";

import CaeAduanas from './cae_aduana.model';
import Paises from './pais.model';

const Origen = sequelize.define<Model<Origen, OrigenCreationAttributes>>('origenes', {
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
            key: Paises.primaryKeyAttribute,
        },
    },
    id_cae_aduana: {
        type: DataTypes.INTEGER,
        references: {
            model: CaeAduanas,
            key: CaeAduanas.primaryKeyAttribute,
        },
    }
});

export default Origen;