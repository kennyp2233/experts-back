import Consignatarios from "@dbModels/mantenimiento/consignatario/consignatario.model";
import ConsignatarioCaeSices from "@dbModels/mantenimiento/consignatario/consignatario_cae_sise.model";
import ConsignatarioFacturaciones from "@dbModels/mantenimiento/consignatario/consignatario_facturacion.model";
import ConsignatarioFito from "@dbModels/mantenimiento/consignatario/consignatario_fito.model";
import ConsignatarioGuiaHs from "@dbModels/mantenimiento/consignatario/consignatario_guia_h.model";
import ConsignatarioGuiaMs from "@dbModels/mantenimiento/consignatario/consignatario_guia_m.model";
import ConsignatarioTransmisions from "@dbModels/mantenimiento/consignatario/consignatario_transmision.model";
import Destinos from "@dbModels/mantenimiento/destinos.model";
import Embarcadores from "@dbModels/mantenimiento/embarcadores.model";
import Clientes from "@dbModels/mantenimiento/clientes.model";
import TipoDocumento from "@dbModels/catalogos/consignatario/consignatario_tipo_documento.model";
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

Consignatarios.hasOne(Embarcadores, {
    foreignKey: 'id_embarcador',
    as: 'embarcador',
});

Consignatarios.hasOne(Clientes, {
    foreignKey: 'id_clientes',
    as: 'cliente',
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

Embarcadores.belongsTo(Consignatarios, {
    foreignKey: 'id_embarcador',
    as: 'consignatario',
});

Clientes.belongsTo(Consignatarios, {
    foreignKey: 'id_clientes',
    as: 'consignatario',
});

//

ConsignatarioGuiaMs.hasOne(Destinos, {
    foreignKey: 'id_destino',
    as: 'destino',
});

Destinos.belongsTo(ConsignatarioGuiaMs, {
    foreignKey: 'id_destino',
    as: 'guia_m',
});

ConsignatarioCaeSices.hasOne(TipoDocumento, {
    foreignKey: 'id_tipo_documento',
    as: 'tipo_documento',
});

TipoDocumento.belongsTo(ConsignatarioCaeSices, {
    foreignKey: 'id_tipo_documento',
    as: 'cae_sice',
});
