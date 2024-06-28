
import { Model, DataTypes } from 'sequelize';
import sequelize from '../../experts.db';
import { AerolineaCreationAttributes, Aerolinea } from '@typesApp/entities/mantenimiento/AerolineaTypes';

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
            model: 'catalogo_modo_aerolinea',
            key: 'id_modo',
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
            model: 'origenes',
            key: 'id_origen',
        },
    },
    to1: {
        type: DataTypes.INTEGER,
        references: {
            model: 'destinos',
            key: 'id_destino',
        },
    },
    by1: {
        type: DataTypes.INTEGER,
        references: {
            model: 'aerolineas',
            key: 'id_aerolinea',
        },
    },
    to2: {
        type: DataTypes.INTEGER,
        references: {
            model: 'destinos',
            key: 'id_destino',
        },
    },
    by2: {
        type: DataTypes.INTEGER,
        references: {
            model: 'aerolineas',
            key: 'id_aerolinea',
        },
    },
    to3: {
        type: DataTypes.INTEGER,
        references: {
            model: 'destinos',
            key: 'id_destino',
        },
    },
    by3: {
        type: DataTypes.INTEGER,
        references: {
            model: 'aerolineas',
            key: 'id_aerolinea',
        },
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