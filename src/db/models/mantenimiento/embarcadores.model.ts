import { Model, DataTypes } from 'sequelize';
import sequelize from '../../experts.db';
import { Embarcador, EmbarcadorCreationAttributes } from '@typesApp/entities/mantenimiento/EmbarcadoresTypes';

const Embarcadores = sequelize.define<Model<Embarcador, EmbarcadorCreationAttributes>>('embarcadores', {
    id_embarcador: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    ci: {
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
    provincia: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    codigo_pais: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    handling: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
});


export default Embarcadores;