import sequelize from "@db/experts.db";
import DocumentoCoordinacion from "@models/documentos/centro_guias/documento_coordinacion.model";
import GuiaMadre from "@models/documentos/documentos_base/guia_madre.model";
import Consignatarios from "@models/mantenimiento/consignatario/consignatario.model";
import Producto from "@models/mantenimiento/producto.model";
import AgenciaIata from "@models/mantenimiento/agencia_iata";
import Destino from "@models/mantenimiento/destino.model";
import Origen from "@models/mantenimiento/origen.model";
import Aerolineas from "@models/mantenimiento/aerolinea.model";
import CoordinacionClientes from "@models/documentos/centro_guias/coordinacion_clientes.model";
import DocumentoBase from "@models/documentos/documentos_base/documento_base.model";
import { get } from "node:https";

export async function getDocumentosCoordinacion(page: number = 1, pageSize: number = 10): Promise<{ data: any[], total: number }> {
    const offset = (page - 1) * pageSize; // Calcular el desplazamiento (offset)
    const limit = pageSize; // Número de resultados por página

    // Obtener los documentos de coordinación con paginación
    const { rows, count } = await DocumentoCoordinacion.findAndCountAll({
        limit,
        offset,
        include: [
            {
                model: Aerolineas,
                as: 'aerolinea_by1'
            },
            {
                model: Aerolineas,
                as: 'aerolinea_by2'
            },
            {
                model: Aerolineas,
                as: 'aerolinea_by3'
            },
            {
                model: AgenciaIata,
                as: 'agencia_iata'
            },
            {
                model: Origen,
                as: 'origen_from1'
            },
            {
                model: Destino,
                as: 'destino_to1'
            },
            {
                model: Destino,
                as: 'destino_to2'
            },
            {
                model: Destino,
                as: 'destino_to3'
            },
            {
                model: Destino,
                as: 'destino_awb'
            },
            {
                model: Destino,
                as: 'destino_final_docs'
            },
            {
                model: Producto,
                as: 'producto'
            },
            {
                model: Consignatarios,
                as: 'consignatario'

            },
            {
                model: AgenciaIata,
                as: 'agencia_iata'
            },
            {
                model: Destino,
                as: 'destino_awb'
            },
            {
                model: Destino,
                as: 'destino_final_docs'
            },
            {
                model: CoordinacionClientes,
                as: 'coordinacion_clientes',
            }
        ]
    });
    return {
        data: rows, // Los documentos de coordinación de la página actual
        total: count // El número total de documentos de coordinación
    };
}

export async function createDocumentoCoordinacion(documentoCoordinacion: any): Promise<any> {
    const { id_guia_madre, id_clientes = [] } = documentoCoordinacion;

    // Verificar si la Guía Madre ya tiene un Documento de Coordinación
    const guiaMadre = await GuiaMadre.findOne({
        where: { id: id_guia_madre },
        include: [{ model: DocumentoCoordinacion, as: "documento_coordinacion" }],
    });

    if (!guiaMadre) {
        throw new Error("La Guía Madre especificada no existe.");
    }

    if ((guiaMadre as any).documento_coordinacion) {
        throw new Error("Esta Guía Madre ya tiene un Documento de Coordinación asignado.");
    }

    if ((guiaMadre as any).prestamo || (guiaMadre as any).devolucion) {
        throw new Error("No se puede asignar un Documento de Coordinación a una Guía Madre con préstamo o devolución activa.");
    }

    // Obtener el consignatario de la Guía Madre
    const consignatario = await Consignatarios.findOne({ where: { id_consignatario: documentoCoordinacion.id_consignatario } });

    if (!consignatario) {
        throw new Error("El consignatario asociado a la Guía Madre no existe.");
    }

    // Crear el Documento de Coordinación
    const documento = await DocumentoCoordinacion.create(documentoCoordinacion);

    // Crear lista de clientes asegurando que el consignatario esté presente
    const clientesUnicos = new Set([...id_clientes, (consignatario as any).id_consignatario]);

    // Asociar clientes al Documento de Coordinación
    await CoordinacionClientes.bulkCreate(
        Array.from(clientesUnicos).map(id_cliente => ({
            id_coordinacion: (documento as any).id,
            id_cliente,
        }))
    );

    return documento;
}

export async function updateDocumentoCoordinacion(id: number, documentoCoordinacion: any): Promise<any> {
    const { id_guia_madre, id_clientes = [] } = documentoCoordinacion;

    // Buscar el Documento de Coordinación existente
    const documento = await DocumentoCoordinacion.findByPk(id);
    if (!documento) {
        throw new Error("Documento de coordinación no encontrado.");
    }

    // Verificar si la Guía Madre está asociada y sus restricciones
    const guiaMadre = await GuiaMadre.findOne({
        where: { id: id_guia_madre },
        include: [{ model: DocumentoCoordinacion, as: "documento_coordinacion" }],
    });

    if (!guiaMadre) {
        throw new Error("La Guía Madre especificada no existe.");
    }

    if ((guiaMadre as any).documento_coordinacion && (guiaMadre as any).documento_coordinacion.id !== id) {
        throw new Error("Esta Guía Madre ya tiene un Documento de Coordinación asignado.");
    }

    if ((guiaMadre as any).prestamo || (guiaMadre as any).devolucion) {
        throw new Error("No se puede asignar un Documento de Coordinación a una Guía Madre con préstamo o devolución activa.");
    }

    // Actualizar el Documento de Coordinación
    await documento.update(documentoCoordinacion);

    // Obtener el consignatario de la Guía Madre
    const consignatario = await Consignatarios.findOne({ where: { id_consignatario: documentoCoordinacion.id_consignatario } });

    if (!consignatario) {
        throw new Error("El consignatario asociado a la Guía Madre no existe.");
    }

    // Obtener los clientes actuales del documento
    const clientesActuales = await CoordinacionClientes.findAll({
        where: { id_coordinacion: id },
    });

    const clientesActualesIds = clientesActuales.map((c: any) => c.id_cliente);

    // Crear la nueva lista de clientes asegurando que el consignatario esté presente
    const nuevosClientes = new Set([...id_clientes, (consignatario as any).id_consignatario]);

    // Determinar clientes a eliminar (los que ya no están en la nueva lista)
    const clientesAEliminar = clientesActualesIds.filter(id_cliente => !nuevosClientes.has(id_cliente));

    // Determinar clientes a agregar (los que no están en la base de datos)
    const clientesAAgregar = Array.from(nuevosClientes).filter(id_cliente => !clientesActualesIds.includes(id_cliente));

    // Eliminar los clientes que ya no deben estar asociados
    if (clientesAEliminar.length > 0) {
        await CoordinacionClientes.destroy({
            where: {
                id_coordinacion: id,
                id_cliente: clientesAEliminar,
            },
        });
    }

    // Agregar nuevos clientes
    if (clientesAAgregar.length > 0) {
        await CoordinacionClientes.bulkCreate(
            clientesAAgregar.map(id_cliente => ({
                id_coordinacion: id,
                id_cliente,
            }))
        );
    }

    return documento;
}

export async function deleteDocumentoCoordinacion(id: number): Promise<any> {
    // Eliminar un documento de coordinación
    const documento = await DocumentoCoordinacion.findByPk(id);
    if (!documento) {
        throw new Error('Documento de coordinación no encontrado');
    }
    await documento.destroy();
    return documento;
}

export async function getAvailableAerolineas(): Promise<any[]> {
    const aerolineas = await Aerolineas.findAll({
        include: [
            {
                model: DocumentoBase,
                as: 'documentos_base',
                include: [
                    {
                        model: GuiaMadre,
                        as: 'guias_madre',
                        where: {
                            prestamo: false, // Solo las guías que no están prestadas
                            devolucion: false // Solo las guías que no han sido devueltas
                        },
                        required: true // Solo incluir documentos base que tengan guías disponibles
                    }
                ],
                required: true // Solo incluir aerolíneas con documentos base válidos
            }
        ]
    });
    return aerolineas;
}
