import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';

import { ConsignatarioFacturacion } from '@typesApp/entities/mantenimiento/consignatario/ConsignatarioTypes';

const ConsignatarioFacturaciones = sequelize.define<Model<ConsignatarioFacturacion>>('consignatario_facturacion', {
    id_consignatario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'consignatarios',
            key: 'id_consignatario',
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
}, {
    tableName: 'consignatario_facturacion',
    freezeTableName: true,
});

export default ConsignatarioFacturaciones;