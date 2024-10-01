import { Model, DataTypes } from 'sequelize';
import { TipoDocumento, TipoDocumentoAtributosCreacion } from '@typesApp/catalogos/consignatario/tipo_documento.type';
import sequelize from '@db/experts.db';



const TipoDocumento = sequelize.define<Model<TipoDocumento, TipoDocumentoAtributosCreacion>>('catalogo_tipo_documento', {
    id_tipo_documento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default TipoDocumento;