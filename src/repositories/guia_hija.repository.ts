// src/repositories/guia_hija.repository.ts
import GuiaHija from '@models/documentos/centro_guias/guias_hija.model';
import Finca from '@models/mantenimiento/finca.model';
import GuiaMadre from '@models/documentos/documentos_base/guia_madre.model';
import DocumentoCoordinacion from '@models/documentos/centro_guias/documento_coordinacion.model';
import { Op } from 'sequelize';

/**
 * Obtiene la última guía hija para un año específico.
 */
export const getLastGuiaHijaByYear = async (anio: number) => {
    return await GuiaHija.findOne({
        where: { anio },
        order: [['secuencial', 'DESC']]
    });
};

/**
 * Busca una guía hija por finca y guía madre.
 */
export const findByFincaAndGuiaMadre = async (id_finca: number, id_guia_madre: number) => {
    return await GuiaHija.findOne({
        where: { id_finca, id_guia_madre }
    });
};

/**
 * Crea una nueva guía hija.
 */
export const createGuiaHija = async (data: any, transaction: any) => {
    return await GuiaHija.create(data, { transaction });
};

/**
 * Actualiza una guía hija.
 */
export const updateGuiaHija = async (id: number, data: any, transaction: any) => {
    return await GuiaHija.update(data, {
        where: { id },
        transaction
    });
};

/**
 * Obtiene todas las guías hijas con sus asociaciones y paginación.
 */
export const findAllGuiasHijas = async (offset: number, limit: number) => {
    return await GuiaHija.findAndCountAll({
        limit,
        offset,
        include: [
            { model: Finca, as: 'finca', required: false },
            { model: GuiaMadre, as: 'guia_madre', required: false },
            { model: DocumentoCoordinacion, as: 'documento_coordinacion', required: false }
        ],
        order: [['createdAt', 'DESC']]
    });
};

/**
 * Obtiene una guía hija por su ID.
 */
export const findGuiaHijaById = async (id: number) => {
    return await GuiaHija.findByPk(id, {
        include: [
            { model: Finca, as: 'finca', required: false },
            { model: GuiaMadre, as: 'guia_madre', required: false },
            { model: DocumentoCoordinacion, as: 'documento_coordinacion', required: false }
        ]
    });
};

/**
 * Obtiene todas las guías hijas asociadas a una guía madre específica.
 */
export const findGuiasHijasByGuiaMadre = async (id_guia_madre: number) => {
    return await GuiaHija.findAll({
        where: { id_guia_madre },
        include: [{ model: Finca, as: 'finca', required: false }],
        order: [['createdAt', 'ASC']]
    });
};

/**
 * Obtiene todas las guías hijas asociadas a una finca específica.
 */
export const findGuiasHijasByFinca = async (id_finca: number) => {
    return await GuiaHija.findAll({
        where: { id_finca },
        include: [
            { model: GuiaMadre, as: 'guia_madre', required: false },
            { model: DocumentoCoordinacion, as: 'documento_coordinacion', required: false }
        ],
        order: [['createdAt', 'DESC']]
    });
};
