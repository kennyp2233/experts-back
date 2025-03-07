import { Model, DataTypes } from 'sequelize';
import { ConsignatarioFacturacion } from '@typesApp/mantenimiento/consignatario/consignatario.type';

import sequelize from 'src/config/experts.db';

import Consignatarios from './consignatario.model';

const ConsignatarioFacturaciones = sequelize.define<Model<ConsignatarioFacturacion>>('consignatario_facturacion', {
    id_consignatario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Consignatarios,
            key: Consignatarios.primaryKeyAttribute,
        },
    },
    factura_nombre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    factura_ruc: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    factura_direccion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    factura_telefono: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

export default ConsignatarioFacturaciones;