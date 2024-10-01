import Consignatarios from "@models/mantenimiento/consignatario/consignatario.model";
import ConsignatarioCaeSices from "@models/mantenimiento/consignatario/consignatario_cae_sise.model";
import ConsignatarioFacturaciones from "@models/mantenimiento/consignatario/consignatario_facturacion.model";
import ConsignatarioFito from "@models/mantenimiento/consignatario/consignatario_fito.model";
import ConsignatarioGuiaHs from "@models/mantenimiento/consignatario/consignatario_guia_h.model";
import ConsignatarioGuiaMs from "@models/mantenimiento/consignatario/consignatario_guia_m.model";
import ConsignatarioTransmisions from "@models/mantenimiento/consignatario/consignatario_transmision.model";
import TipoDocumento from "@models/catalogos/consignatario/consignatario_tipo_documento.model";
import Embarcadores from "@models/mantenimiento/embarcador.model";
import Clientes from "@models/mantenimiento/cliente.model";
import Destinos from "@models/mantenimiento/destino.model";

import "src/config/assosiations/mantenimiento/consignatario_all_assosiation.as";
import sequelize from "src/config/experts.db";


export async function getConsignatariosJoinAll() {
    const respuesta = await Consignatarios.findAll({
        include: [
            {
                model: ConsignatarioCaeSices,
                as: 'cae_sice',
                include: [
                    {
                        model: TipoDocumento,
                        as: 'tipo_documento_consignee',
                        required: false,
                    },
                    {
                        model: TipoDocumento,
                        as: 'tipo_documento_notify',
                        required: false,
                    },
                    {
                        model: TipoDocumento,
                        as: 'tipo_documento_hawb',
                        required: false,
                    },
                ]
            },
            {
                model: ConsignatarioFacturaciones,
                as: 'facturacion',
            },
            {
                model: ConsignatarioFito,
                as: 'fito',
            },
            {
                model: ConsignatarioGuiaHs,
                as: 'guia_h',
            },
            {
                model: ConsignatarioGuiaMs,
                as: 'guia_m',
                include: [
                    {
                        model: Destinos,
                        as: 'destino',
                        required: false,
                    },
                ]
            },
            {
                model: ConsignatarioTransmisions,
                as: 'transmision',
            },
            {
                model: Embarcadores,
                as: 'embarcador',
            },
            {
                model: Clientes,
                as: 'cliente',
            }
        ]

    })


    // mezclar todos los atributos de cada include en un solo objeto
    return respuesta.map((consignatario: any) => {
        return {
            ...consignatario?.dataValues,
            ...consignatario?.cae_sice?.dataValues,
            ...consignatario?.facturacion?.dataValues,
            ...consignatario?.fito?.dataValues,
            ...consignatario?.guia_h?.dataValues,
            ...consignatario?.guia_m?.dataValues,
            ...consignatario?.transmision?.dataValues,
            ...consignatario?.embarcador?.dataValues,
            ...consignatario?.cliente?.dataValues,
        };
    });
}

export async function createConsignatarioJoinAll(data: any): Promise<any> {
    const transaction = await sequelize.transaction();
    const consignatario = extractConsignatarioFromData(data);
    const transmision = extractTransmisionFromData(data);
    const guiaM = extractGuiaMFromData(data);
    const guiaH = extractGuiaHFromData(data);
    const fito = extractFitoFromData(data);
    const facturacion = extractFacturacionFromData(data);
    const caeSice = extractCaeSiceFromData(data);

    try {
        const newConsignatario = await Consignatarios.create(consignatario, { transaction }) as any;
        const newTransmision = await ConsignatarioTransmisions.create({
            ...transmision,
            id_consignatario: newConsignatario.id_consignatario
        }, { transaction });

        const newGuiaM = await ConsignatarioGuiaMs.create({
            ...guiaM,
            id_consignatario: newConsignatario.id_consignatario
        }, { transaction });

        const newGuiaH = await ConsignatarioGuiaHs.create({
            ...guiaH,
            id_consignatario: newConsignatario.id_consignatario
        }, { transaction });

        const newFito = await ConsignatarioFito.create({
            ...fito,
            id_consignatario: newConsignatario.id_consignatario
        }, { transaction });


        const newFacturacion = await ConsignatarioFacturaciones.create({
            ...facturacion,
            id_consignatario: newConsignatario.id_consignatario
        }, { transaction });

        const newCaeSice = await ConsignatarioCaeSices.create({
            ...caeSice,
            id_consignatario: newConsignatario.id_consignatario
        }, { transaction });

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error
    }
}

export async function updateConsignatarioJoinAll(data: any): Promise<any> {
    const transaction = await sequelize.transaction();

    const consignatario = extractConsignatarioFromData(data);
    const transmision = extractTransmisionFromData(data);
    const guiaM = extractGuiaMFromData(data);
    const guiaH = extractGuiaHFromData(data);
    const fito = extractFitoFromData(data);
    const facturacion = extractFacturacionFromData(data);
    const caeSice = extractCaeSiceFromData(data);
    /*
        console.log("FACTURACION", facturacion);
        console.log("CAE SOCE", caeSice);
        console.log("FITO", fito);
        console.log("GUIA H", guiaH);
        console.log("GUIA M", guiaM);
        console.log("TRANSMISION", transmision);
        console.log("CONSIGNATARIO", consignatario);
        */

    try {
        await Consignatarios.update(consignatario, {
            where: { id_consignatario: data.id_consignatario },
            transaction
        });

        await ConsignatarioTransmisions.update(transmision, {
            where: { id_consignatario: data.id_consignatario },
            transaction
        });

        await ConsignatarioGuiaMs.update(guiaM, {
            where: { id_consignatario: data.id_consignatario },
            transaction
        });

        await ConsignatarioGuiaHs.update(guiaH, {
            where: { id_consignatario: data.id_consignatario },
            transaction
        });

        await ConsignatarioFito.update(fito, {
            where: { id_consignatario: data.id_consignatario },
            transaction
        });

        await ConsignatarioFacturaciones.update(facturacion, {
            where: { id_consignatario: data.id_consignatario },
            transaction
        });

        await ConsignatarioCaeSices.update(caeSice, {
            where: { id_consignatario: data.id_consignatario },
            transaction
        });

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error
    }

}

export async function deleteConsignatarioJoinAll(ids: number[]): Promise<any> {
    const transaction = await sequelize.transaction();
    try {

        await ConsignatarioTransmisions.destroy({
            where: { id_consignatario: ids },
            transaction
        });

        await ConsignatarioGuiaMs.destroy({
            where: { id_consignatario: ids },
            transaction
        });

        await ConsignatarioGuiaHs.destroy({
            where: { id_consignatario: ids },
            transaction
        });

        await ConsignatarioFito.destroy({
            where: { id_consignatario: ids },
            transaction
        });

        await ConsignatarioFacturaciones.destroy({
            where: { id_consignatario: ids },
            transaction
        });

        await ConsignatarioCaeSices.destroy({
            where: { id_consignatario: ids },
            transaction
        });

        await Consignatarios.destroy({
            where: { id_consignatario: ids },
            transaction
        });

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error
    }
}

function extractConsignatarioFromData(data: any) {
    return {
        nombre_consignatario: data?.nombre_consignatario,
        ruc: data?.ruc,
        direccion: data?.direccion,
        id_embarcador: data?.embarcador?.id_embarcador,
        id_cliente: data?.cliente?.id_clientes,
        telefono: data?.telefono,
        email: data?.email,
        ciudad: data?.ciudad,
        pais: data?.pais,
    }
}

function extractTransmisionFromData(data: any) {
    return {
        consignee_nombre_trans: data?.consignee_nombre_trans,
        consignee_direccion_trans: data?.consignee_direccion_trans,
        consignee_ciudad_trans: data?.consignee_ciudad_trans,
        consignee_provincia_trans: data?.consignee_provincia_trans,
        consignee_pais_trans: data?.consignee_pais_trans,
        consignee_eueori_trans: data?.consignee_eueori_trans,
        notify_nombre_trans: data?.notify_nombre_trans,
        notify_direccion_trans: data?.notify_direccion_trans,
        notify_ciudad_trans: data?.notify_ciudad_trans,
        notify_provincia_trans: data?.notify_provincia_trans,
        notify_pais_trans: data?.notify_pais_trans,
        notify_eueori_trans: data?.notify_eueori_trans,
        hawb_nombre_trans: data?.hawb_nombre_trans,
        hawb_direccion_trans: data?.hawb_direccion_trans,
        hawb_ciudad_trans: data?.hawb_ciudad_trans,
        hawb_provincia_trans: data?.hawb_provincia_trans,
        hawb_pais_trans: data?.hawb_pais_trans,
        hawb_eueori_trans: data?.hawb_eueori_trans,
    }
}

function extractGuiaMFromData(data: any) {
    return {
        id_destino: data?.destino?.id_destino,
        guia_m_consignee: data?.guia_m_consignee,
        guia_m_name_address: data?.guia_m_name_address,
        guia_m_notify: data?.guia_m_notify,
    }
}

function extractGuiaHFromData(data: any) {
    return {
        guia_h_consignee: data?.guia_h_consignee,
        guia_h_name_adress: data?.guia_h_name_adress,
        guia_h_notify: data?.guia_h_notify,
    }
}

function extractFitoFromData(data: any) {
    return {
        fito_declared_name: data?.fito_declared_name,
        fito_forma_a: data?.fito_forma_a,
        fito_nombre: data?.fito_nombre,
        fito_direccion: data?.fito_direccion,
        fito_pais: data?.fito_pais,
    }
}

function extractFacturacionFromData(data: any) {
    return {
        factura_nombre: data?.factura_nombre,
        factura_ruc: data?.factura_ruc,
        factura_direccion: data?.factura_direccion,
        factura_telefono: data?.factura_telefono,
    }
}

function extractCaeSiceFromData(data: any) {
    return {
        consignee_nombre: data?.consignee_nombre,
        consignee_direccion: data?.consignee_direccion,
        consignee_documento: data?.consignee_documento,
        consignee_siglas_pais: data?.consignee_siglas_pais,
        notify_nombre: data?.notify_nombre,
        notify_direccion: data?.notify_direccion,
        notify_documento: data?.notify_documento,
        notify_siglas_pais: data?.notify_siglas_pais,
        hawb_nombre: data?.hawb_nombre,
        hawb_direccion: data?.hawb_direccion,
        hawb_documento: data?.hawb_documento,
        hawb_siglas_pais: data?.hawb_siglas_pais,
        consignee_tipo_documento: data?.tipo_documento_consignee?.id_tipo_documento,
        notify_tipo_documento: data?.tipo_documento_notify?.id_tipo_documento,
        hawb_tipo_documento: data?.tipo_documento_hawb?.id_tipo_documento,
    }
}

