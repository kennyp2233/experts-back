// src/repositories/documento_coordinacion.repository.ts
import DocumentoCoordinacion from '@models/documentos/centro_guias/documento_coordinacion.model';
import CoordinacionClientes from '@models/documentos/centro_guias/coordinacion_clientes.model';
import Aerolineas from '@models/mantenimiento/aerolinea.model';
import AgenciaIata from '@models/mantenimiento/agencia_iata';
import Origen from '@models/mantenimiento/origen.model';
import Destino from '@models/mantenimiento/destino.model';
import Producto from '@models/mantenimiento/producto.model';
import Consignatarios from '@models/mantenimiento/consignatario/consignatario.model';
import DocumentoBase from '@models/documentos/documentos_base/documento_base.model';
import GuiaMadre from '@models/documentos/documentos_base/guia_madre.model';
import { Transaction } from 'sequelize';

/**
 * Obtiene los Documentos de Coordinación con paginación y sus asociaciones.
 */
export async function findDocumentosCoordinacionPaginated(offset: number, limit: number) {
    return await DocumentoCoordinacion.findAndCountAll({
        limit,
        offset,
        include: [
            { model: Aerolineas, as: 'aerolinea_by1' },
            { model: Aerolineas, as: 'aerolinea_by2' },
            { model: Aerolineas, as: 'aerolinea_by3' },
            { model: AgenciaIata, as: 'agencia_iata' },
            { model: Origen, as: 'origen_from1' },
            { model: Destino, as: 'destino_to1' },
            { model: Destino, as: 'destino_to2' },
            { model: Destino, as: 'destino_to3' },
            { model: Destino, as: 'destino_awb' },
            { model: Destino, as: 'destino_final_docs' },
            { model: Producto, as: 'producto' },
            { model: Consignatarios, as: 'consignatario' },
            // Se pueden incluir nuevamente asociaciones si es necesario, aunque conviene evitar duplicados.
            { model: CoordinacionClientes, as: 'coordinacion_clientes' }
        ]
    });
}

/**
 * Crea un Documento de Coordinación.
 */
export async function createDocumentoCoordinacionRepository(documentoCoordinacion: any, transaction?: Transaction) {
    return await DocumentoCoordinacion.create(documentoCoordinacion, { transaction });
}

/**
 * Actualiza un Documento de Coordinación (sobre la instancia ya obtenida).
 */
export async function updateDocumentoCoordinacionRepository(documento: any, transaction?: Transaction) {
    return await documento.update(documento, { transaction });
}

/**
 * Elimina un Documento de Coordinación (sobre la instancia ya obtenida).
 */
export async function deleteDocumentoCoordinacionRepository(documento: any, transaction?: Transaction) {
    return await documento.destroy({ transaction });
}

/**
 * Realiza un bulk create para asociar clientes al documento.
 */
export async function bulkCreateCoordinacionClientes(data: any[], transaction?: Transaction) {
    return await CoordinacionClientes.bulkCreate(data, { transaction });
}

/**
 * Busca un Documento de Coordinación por su ID.
 */
export async function findDocumentoCoordinacionById(id: number) {
    return await DocumentoCoordinacion.findByPk(id);
}

/**
 * Obtiene las Aerolíneas disponibles basándose en los documentos base asociados a guías madre
 * que no tengan préstamo ni devolución activos.
 */
export async function getAvailableAerolineasRepository() {
    return await Aerolineas.findAll({
        include: [
            {
                model: DocumentoBase,
                as: 'documentos_base',
                include: [
                    {
                        model: GuiaMadre,
                        as: 'guias_madre',
                        where: {
                            prestamo: false,
                            devolucion: false
                        },
                        required: true
                    }
                ],
                required: true
            }
        ]
    });
}
