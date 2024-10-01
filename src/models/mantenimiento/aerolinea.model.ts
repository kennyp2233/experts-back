
import { Model, DataTypes } from 'sequelize';
import { AerolineaCreationAttributes, Aerolinea } from '@typesApp/mantenimiento/aerolinea.type';

import sequelize from '@db/experts.db';

import CatalogoModoAerolinea from '@models/catalogos/aerolineas/catalogo_modo_aerolinea.model';
import Origen from './origen.model';
import Destino from './destino.model';


const Aerolineas = sequelize.define<Model<Aerolinea, AerolineaCreationAttributes>>('aerolineas', {
    id_aerolinea: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    ci_ruc: {
        type: DataTypes.STRING,
    },
    direccion: {
        type: DataTypes.STRING,
    },
    telefono: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    ciudad: {
        type: DataTypes.STRING,
    },
    pais: {
        type: DataTypes.STRING,
    },
    contacto: {
        type: DataTypes.STRING,
    },
    id_modo: {
        type: DataTypes.INTEGER,
        references: {
            model: CatalogoModoAerolinea,
            key: CatalogoModoAerolinea.primaryKeyAttribute,
        },
    },
    maestra_guias_hijas: {
        type: DataTypes.BOOLEAN,
    },
    codigo: {
        type: DataTypes.STRING,
    },
    prefijo_awb: {
        type: DataTypes.STRING,
    },
    codigo_cae: {
        type: DataTypes.STRING,
    },
    estado_activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    from1: {
        type: DataTypes.INTEGER,
        references: {
            model: Origen,
            key: Origen.primaryKeyAttribute,
        },
        onDelete: 'RESTRICT',
    },
    to1: {
        type: DataTypes.INTEGER,
        references: {
            model: Destino,
            key: Destino.primaryKeyAttribute,
        },
        onDelete: 'RESTRICT',
    },
    by1: {
        type: DataTypes.INTEGER,
        references: {
            model: 'aerolineas',
            key: 'id_aerolinea',
        },
        onDelete: 'RESTRICT',
    },
    to2: {
        type: DataTypes.INTEGER,
        references: {
            model: Destino,
            key: Destino.primaryKeyAttribute,
        },
        onDelete: 'RESTRICT',
    },
    by2: {
        type: DataTypes.INTEGER,
        references: {
            model: 'aerolineas',
            key: 'id_aerolinea',
        },
        onDelete: 'RESTRICT',
    },
    to3: {
        type: DataTypes.INTEGER,
        references: {
            model: Destino,
            key: Destino.primaryKeyAttribute,
        },
        onDelete: 'RESTRICT',
    },
    by3: {
        type: DataTypes.INTEGER,
        references: {
            model: 'aerolineas',
            key: 'id_aerolinea',
        },
        onDelete: 'RESTRICT',
    },
    afiliado_cass: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    guias_virtuales: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

});

export default Aerolineas;