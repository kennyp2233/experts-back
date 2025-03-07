import TipoEmbarque from "@models/mantenimiento/tipos_embarque.model";
import TipoCarga from "@models/catalogos/tipo_embarque/tipo_carga.model";
import TipoEmbalaje from "@models/catalogos/tipo_embarque/tipo_embalaje.model";

TipoEmbarque.belongsTo(TipoCarga, {
    foreignKey: 'id_tipo_carga',
    as: 'carga',
});

TipoEmbarque.belongsTo(TipoEmbalaje, {
    foreignKey: 'id_tipo_embalaje',
    as: 'embalaje',
});