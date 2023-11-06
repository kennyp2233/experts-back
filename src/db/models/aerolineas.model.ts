
import { Model, DataTypes } from 'sequelize';
import sequelize from '../experts.db';
import { AerolineaCreationAttributesI, AerolineaAttributesI } from '../../../type';

const Aerolineas = sequelize.define<Model<AerolineaAttributesI, AerolineaCreationAttributesI>>('Aerolineas', {
    id_aerolinea: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    alias: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ci_ruc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contacto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    modo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    maestra_guias_hijas: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prefijo_awb: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    codigo_cae: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado_activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    timestamps: false,
});

export default Aerolineas;