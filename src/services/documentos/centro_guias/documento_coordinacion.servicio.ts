// src/services/documento_coordinacion.service.ts
import sequelize from '@db/experts.db';
import DocumentoCoordinacion from '@models/documentos/centro_guias/documento_coordinacion.model';
import GuiaMadre from '@models/documentos/documentos_base/guia_madre.model';
import Consignatarios from '@models/mantenimiento/consignatario/consignatario.model';
import CoordinacionClientes from '@models/documentos/centro_guias/coordinacion_clientes.model';
import {
    findDocumentosCoordinacionPaginated,
    createDocumentoCoordinacionRepository,
    bulkCreateCoordinacionClientes,
    findDocumentoCoordinacionById,
    getAvailableAerolineasRepository
} from '@repositories/documento_coordinacion.repository';

/**
 * Retorna los Documentos de Coordinación con paginación.
 */
export async function getDocumentosCoordinacion(page: number = 1, pageSize: number = 10): Promise<{ data: any[], total: number }> {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const { rows, count } = await findDocumentosCoordinacionPaginated(offset, limit);
    return { data: rows, total: count };
}

/**
 * Crea un Documento de Coordinación validando las restricciones de la Guía Madre,
 * asociando el consignatario y vinculando los clientes.
 */
export async function createDocumentoCoordinacion(documentoCoordinacion: any): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
        const { id_guia_madre, id_clientes = [] } = documentoCoordinacion;

        // Validar que la Guía Madre exista y que no tenga ya asignado un Documento de Coordinación.
        const guiaMadre = await GuiaMadre.findOne({
            where: { id: id_guia_madre },
            include: [{ model: DocumentoCoordinacion, as: "documento_coordinacion" }]
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

        // Obtener el consignatario asociado.
        const consignatario = await Consignatarios.findOne({ where: { id_consignatario: documentoCoordinacion.id_consignatario } });
        if (!consignatario) {
            throw new Error("El consignatario asociado a la Guía Madre no existe.");
        }

        // Crear el Documento de Coordinación.
        const documento = await createDocumentoCoordinacionRepository(documentoCoordinacion, transaction);

        // Asegurarse de incluir el consignatario en la lista de clientes.
        const clientesUnicos = new Set([...id_clientes, (consignatario as any).id_consignatario]);
        const clientesToCreate = Array.from(clientesUnicos).map(id_cliente => ({
            id_coordinacion: (documento as any).id,
            id_cliente,
        }));
        await bulkCreateCoordinacionClientes(clientesToCreate, transaction);

        await transaction.commit();
        return documento;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

/**
 * Actualiza un Documento de Coordinación, validando restricciones de la Guía Madre
 * y actualizando la asociación de clientes.
 */
export async function updateDocumentoCoordinacion(id: number, documentoCoordinacion: any): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
        const { id_guia_madre, id_clientes = [] } = documentoCoordinacion;

        // Buscar el Documento de Coordinación existente.
        const documento = await findDocumentoCoordinacionById(id);
        if (!documento) {
            throw new Error("Documento de coordinación no encontrado.");
        }

        // Validar la Guía Madre y sus restricciones.
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

        // Actualizar el Documento.
        await documento.update(documentoCoordinacion, { transaction });

        // Validar el consignatario.
        const consignatario = await Consignatarios.findOne({ where: { id_consignatario: documentoCoordinacion.id_consignatario } });
        if (!consignatario) {
            throw new Error("El consignatario asociado a la Guía Madre no existe.");
        }

        // Obtener clientes actuales asociados al documento.
        const clientesActuales = await CoordinacionClientes.findAll({
            where: { id_coordinacion: id },
        });
        const clientesActualesIds = clientesActuales.map((c: any) => c.id_cliente);

        // Crear la nueva lista de clientes, incluyendo el consignatario.
        const nuevosClientes = new Set([...id_clientes, (consignatario as any).id_consignatario]);
        const clientesAEliminar = clientesActualesIds.filter(id_cliente => !nuevosClientes.has(id_cliente));
        const clientesAAgregar = Array.from(nuevosClientes).filter(id_cliente => !clientesActualesIds.includes(id_cliente));

        if (clientesAEliminar.length > 0) {
            await CoordinacionClientes.destroy({
                where: {
                    id_coordinacion: id,
                    id_cliente: clientesAEliminar,
                },
                transaction,
            });
        }

        if (clientesAAgregar.length > 0) {
            const clientesToAdd = clientesAAgregar.map(id_cliente => ({
                id_coordinacion: id,
                id_cliente,
            }));
            await CoordinacionClientes.bulkCreate(clientesToAdd, { transaction });
        }

        await transaction.commit();
        return documento;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

/**
 * Elimina un Documento de Coordinación.
 */
export async function deleteDocumentoCoordinacion(id: number): Promise<any> {
    const documento = await findDocumentoCoordinacionById(id);
    if (!documento) {
        throw new Error('Documento de coordinación no encontrado');
    }
    await documento.destroy();
    return documento;
}

/**
 * Retorna las Aerolíneas disponibles según los documentos base asociados a guías madre
 * sin préstamo ni devolución.
 */
export async function getAvailableAerolineas(): Promise<any[]> {
    return await getAvailableAerolineasRepository();
}
