
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
        allowNull: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ci_ruc: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    contacto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    modo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    maestra_guias_hijas: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    prefijo_awb: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    codigo_cae: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    estado_activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    }
}, {
    timestamps: false,
});

export default Aerolineas;