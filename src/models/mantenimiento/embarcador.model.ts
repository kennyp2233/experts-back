import { Model, DataTypes } from 'sequelize';
import { Embarcador, EmbarcadorAtributosCreacion } from '@typesApp/mantenimiento/embarcador.type';

import sequelize from '@db/experts.db';


const Embarcador = sequelize.define<Model<Embarcador, EmbarcadorAtributosCreacion>>('embarcadores', {
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
    embarcador_codigo_pais: {
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


export default Embarcador;