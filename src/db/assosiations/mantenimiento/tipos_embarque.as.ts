import TiposEmbarque from "@dbModels/mantenimiento/tipos_embarque.model";
import TipoCarga from "@dbModels/catalogos/tipo_embarque/tipo_carga.model";
import TipoEmbalaje from "@dbModels/catalogos/tipo_embarque/tipo_embalaje.model";

TiposEmbarque.belongsTo(TipoCarga, {
    foreignKey: 'id_tipo_carga',
    as: 'carga',
});

TiposEmbarque.belongsTo(TipoEmbalaje, {
    foreignKey: 'id_tipo_embalaje',
    as: 'embalaje',
});