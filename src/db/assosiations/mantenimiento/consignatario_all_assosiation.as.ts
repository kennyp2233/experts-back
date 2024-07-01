import Consignatarios from "@dbModels/mantenimiento/consignatario/consignatario.model";
import ConsignatarioCaeSices from "@dbModels/mantenimiento/consignatario/consignatario_cae_sise.model";
import ConsignatarioFacturaciones from "@dbModels/mantenimiento/consignatario/consignatario_facturacion.model";
import ConsignatarioFito from "@dbModels/mantenimiento/consignatario/consignatario_fito.model";
import ConsignatarioGuiaHs from "@dbModels/mantenimiento/consignatario/consignatario_guia_h.model";
import ConsignatarioGuiaMs from "@dbModels/mantenimiento/consignatario/consignatario_guia_m.model";
import ConsignatarioTransmisions from "@dbModels/mantenimiento/consignatario/consignatario_transmision.model";

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

