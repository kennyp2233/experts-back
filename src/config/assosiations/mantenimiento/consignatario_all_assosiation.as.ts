import Consignatarios from "@models/mantenimiento/consignatario/consignatario.model";
import ConsignatarioCaeSices from "@models/mantenimiento/consignatario/consignatario_cae_sise.model";
import ConsignatarioFacturaciones from "@models/mantenimiento/consignatario/consignatario_facturacion.model";
import ConsignatarioFito from "@models/mantenimiento/consignatario/consignatario_fito.model";
import ConsignatarioGuiaHs from "@models/mantenimiento/consignatario/consignatario_guia_h.model";
import ConsignatarioGuiaMs from "@models/mantenimiento/consignatario/consignatario_guia_m.model";
import ConsignatarioTransmisions from "@models/mantenimiento/consignatario/consignatario_transmision.model";
import Destinos from "@models/mantenimiento/destino.model";
import Embarcadores from "@models/mantenimiento/embarcador.model";
import Clientes from "@models/mantenimiento/cliente.model";
import TipoDocumento from "@models/catalogos/consignatario/consignatario_tipo_documento.model";
// consignatario es la tabla madre de todas las tablas de consignatario
// todo es relacion 1 a 1

Consignatarios.hasOne(ConsignatarioCaeSices, {
    foreignKey: 'id_consignatario',
    as: 'cae_sice',
});

Consignatarios.hasOne(ConsignatarioFacturaciones, {
    foreignKey: 'id_consignatario',
    as: 'facturacion',
});

Consignatarios.hasOne(ConsignatarioFito, {
    foreignKey: 'id_consignatario',
    as: 'fito',
});

Consignatarios.hasOne(ConsignatarioGuiaHs, {
    foreignKey: 'id_consignatario',
    as: 'guia_h',
});

Consignatarios.hasOne(ConsignatarioGuiaMs, {
    foreignKey: 'id_consignatario',
    as: 'guia_m',
});

Consignatarios.hasOne(ConsignatarioTransmisions, {
    foreignKey: 'id_consignatario',
    as: 'transmision',
});





// belongsTo
ConsignatarioCaeSices.belongsTo(Consignatarios, {
    foreignKey: 'id_consignatario',
    as: 'consignatario',
});

ConsignatarioFacturaciones.belongsTo(Consignatarios, {
    foreignKey: 'id_consignatario',
    as: 'consignatario',
});

ConsignatarioFito.belongsTo(Consignatarios, {
    foreignKey: 'id_consignatario',
    as: 'consignatario',
});

ConsignatarioGuiaHs.belongsTo(Consignatarios, {
    foreignKey: 'id_consignatario',
    as: 'consignatario',
});

ConsignatarioGuiaMs.belongsTo(Consignatarios, {
    foreignKey: 'id_consignatario',
    as: 'consignatario',
});

ConsignatarioTransmisions.belongsTo(Consignatarios, {
    foreignKey: 'id_consignatario',
    as: 'consignatario',
});

Consignatarios.belongsTo(Embarcadores, {
    foreignKey: 'id_embarcador',
    as: 'embarcador',
});

Consignatarios.belongsTo(Clientes, {
    foreignKey: 'id_cliente',
    as: 'cliente',
});


//

ConsignatarioGuiaMs.belongsTo(Destinos, {
    foreignKey: 'id_destino',
    as: 'destino',
});


// cae sice
// Definir las asociaciones
ConsignatarioCaeSices.belongsTo(TipoDocumento, {
    foreignKey: 'consignee_tipo_documento',
    as: 'tipo_documento_consignee',
});

ConsignatarioCaeSices.belongsTo(TipoDocumento, {
    foreignKey: 'notify_tipo_documento',
    as: 'tipo_documento_notify',
});

ConsignatarioCaeSices.belongsTo(TipoDocumento, {
    foreignKey: 'hawb_tipo_documento',
    as: 'tipo_documento_hawb',
});

