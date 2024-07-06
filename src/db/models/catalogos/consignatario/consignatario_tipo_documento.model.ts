import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';

import { TipoDocumento, TipoDocumentoCreationAttributes } from '@typesApp/entities/catalogos/consignatario/TipoDocumentoTypes';

const TipoDocumento = sequelize.define<Model<TipoDocumento, TipoDocumentoCreationAttributes>>('catalogo_tipo_documento', {
    id_tipo_documento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        tableName: 'catalogo_tipo_documento',  // especifica explícitamente el nombre de la tabla
        freezeTableName: true,  // desactiva la pluralización automática
    });

export default TipoDocumento;