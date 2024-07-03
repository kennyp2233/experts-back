import Consignatarios from "@dbModels/mantenimiento/consignatario/consignatario.model";
import ConsignatarioCaeSices from "@dbModels/mantenimiento/consignatario/consignatario_cae_sise.model";
import ConsignatarioFacturaciones from "@dbModels/mantenimiento/consignatario/consignatario_facturacion.model";
import ConsignatarioFito from "@dbModels/mantenimiento/consignatario/consignatario_fito.model";
import ConsignatarioGuiaHs from "@dbModels/mantenimiento/consignatario/consignatario_guia_h.model";
import ConsignatarioGuiaMs from "@dbModels/mantenimiento/consignatario/consignatario_guia_m.model";
import ConsignatarioTransmisions from "@dbModels/mantenimiento/consignatario/consignatario_transmision.model";
import TipoDocumento from "@dbModels/catalogos/consignatario/consignatario_tipo_documento.model";
import Embarcadores from "@dbModels/mantenimiento/embarcadores.model";
import Clientes from "@dbModels/mantenimiento/clientes.model";
import Destinos from "@dbModels/mantenimiento/destinos.model";

import "@db/assosiations/mantenimiento/consignatario_all_assosiation.as";
import sequelize from "@db/experts.db";


export async function getConsignatariosJoinAll() {
    const respuesta = await Consignatarios.findAll({
        include: [
            {
                model: ConsignatarioCaeSices,
                as: 'cae_sice',
                include: [
                    {
                        model: TipoDocumento,
                        as: 'tipo_documento',
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

export async function createConsignatarioJoinAll(data: any) {
    const transaction = await sequelize.transaction();
    extractConsignatarioFromData(data);

}

function extractConsignatarioFromData(data: any) {
    console.log(data);
}

