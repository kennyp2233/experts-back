// src/services/guia_hija.servicio.ts
import sequelize from '@db/experts.db';
import GuiaHija, { GuiaHijaAttributes } from '@models/documentos/centro_guias/guias_hija.model';
import Finca from '@models/mantenimiento/finca.model';
import DocumentoCoordinacion from '@models/documentos/centro_guias/documento_coordinacion.model';
import * as guiaHijaRepo from '@repositories/guia_hija.repository';

/**
 * Formatea el número de la guía hija en formato "AAAANNNN".
 */
function formatearNumeroGuiaHija(anio: number, secuencial: number): string {
    return `${anio}${secuencial.toString().padStart(4, '0')}`;
}

/**
 * Busca si ya existe una guía hija para la combinación de finca y guía madre.
 */
export async function obtenerGuiaHijaPorFincaYGuiaMadre(id_finca: number, id_guia_madre: number): Promise<GuiaHijaAttributes | null> {
    const guiaHija = await guiaHijaRepo.findByFincaAndGuiaMadre(id_finca, id_guia_madre);
    return guiaHija ? (guiaHija as any).toJSON() : null;
}

/**
 * Asigna o crea una guía hija para un documento de coordinación.
 */
export async function asignarGuiaHija(id_documento_coordinacion: number, id_finca: number): Promise<GuiaHijaAttributes> {
    const transaction = await sequelize.transaction();
    try {
        // Obtener el documento de coordinación para conocer la guía madre asociada.
        const docCoordinacion = await DocumentoCoordinacion.findByPk(id_documento_coordinacion, { transaction });
        if (!docCoordinacion) {
            throw new Error('Documento de coordinación no encontrado');
        }
        const id_guia_madre = (docCoordinacion as any).id_guia_madre;

        // Verificar si ya existe una guía hija para esta finca y guía madre.
        const guiaHijaExistente = await guiaHijaRepo.findByFincaAndGuiaMadre(id_finca, id_guia_madre);
        if (guiaHijaExistente) {
            if ((guiaHijaExistente as any).id_documento_coordinacion !== id_documento_coordinacion) {
                await guiaHijaRepo.updateGuiaHija((guiaHijaExistente as any).id, { id_documento_coordinacion }, transaction);
            }
            await transaction.commit();
            return (guiaHijaExistente as any).toJSON();
        }

        // Si no existe, se crea una nueva guía hija.
        const anioActual = new Date().getFullYear();
        const ultimaGuia = await guiaHijaRepo.getLastGuiaHijaByYear(anioActual);
        const nuevoSecuencial = ultimaGuia ? (ultimaGuia as any).secuencial + 1 : 1;
        const numeroGuiaHija = formatearNumeroGuiaHija(anioActual, nuevoSecuencial);

        const nuevaGuiaHija = await guiaHijaRepo.createGuiaHija({
            id_documento_coordinacion,
            id_guia_madre,
            id_finca,
            numero_guia_hija: numeroGuiaHija,
            anio: anioActual,
            secuencial: nuevoSecuencial,
            createdAt: new Date(),
            updatedAt: new Date()
        }, transaction);

        await transaction.commit();
        return (nuevaGuiaHija as any).toJSON();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

/**
 * Obtiene todas las guías hijas con paginación opcional.
 */
export async function getGuiasHijas(page: number = 1, pageSize: number = 10): Promise<{ data: GuiaHijaAttributes[], total: number }> {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const { rows, count } = await guiaHijaRepo.findAllGuiasHijas(offset, limit);
    return {
        data: rows.map((row: any) => (row as any).toJSON()) as GuiaHijaAttributes[],
        total: count
    };
}

/**
 * Obtiene una guía hija por su ID.
 */
export async function getGuiaHija(id: number): Promise<GuiaHijaAttributes | null> {
    const guiaHija = await guiaHijaRepo.findGuiaHijaById(id);
    return guiaHija ? (guiaHija as any).toJSON() : null;
}

/**
 * Obtiene todas las guías hijas asociadas a una guía madre específica.
 */
export async function getGuiasHijasPorGuiaMadre(id_guia_madre: number): Promise<GuiaHijaAttributes[]> {
    const guiasHijas = await guiaHijaRepo.findGuiasHijasByGuiaMadre(id_guia_madre);
    return guiasHijas.map((guia: any) => (guia as any).toJSON());
}

/**
 * Obtiene todas las guías hijas asociadas a una finca específica.
 */
export async function getGuiasHijasPorFinca(id_finca: number): Promise<GuiaHijaAttributes[]> {
    const guiasHijas = await guiaHijaRepo.findGuiasHijasByFinca(id_finca);
    return guiasHijas.map((guia: any) => (guia as any).toJSON());
}

/**
 * Simula el proceso de asignación sin guardar cambios,
 * devolviendo información sobre qué guías serían asignadas.
 */
export async function prevalidarAsignacionGuiasHijas(asignaciones: { id_documento_coordinacion: number; id_finca: number }[]): Promise<{
    asignacionesExistentes: any[],
    nuevasAsignaciones: any[],
    secuencialActual: number,
    proximo: number
}> {
    const anioActual = new Date().getFullYear();
    const ultimaGuia = await guiaHijaRepo.getLastGuiaHijaByYear(anioActual);
    const secuencialActual = ultimaGuia ? (ultimaGuia as any).secuencial : 0;
    let proximoSecuencial = secuencialActual + 1;
    const asignacionesExistentes = [];
    const nuevasAsignaciones = [];

    for (const asignacion of asignaciones) {
        // Obtener documento de coordinación para conocer la guía madre.
        const docCoordinacion = await DocumentoCoordinacion.findByPk(asignacion.id_documento_coordinacion);
        if (!docCoordinacion) {
            throw new Error(`Documento de coordinación ${asignacion.id_documento_coordinacion} no encontrado`);
        }
        const id_guia_madre = (docCoordinacion as any).id_guia_madre;

        // Verificar si ya existe una guía hija para la combinación.
        const guiaExistente = await guiaHijaRepo.findByFincaAndGuiaMadre(asignacion.id_finca, id_guia_madre);
        if (guiaExistente) {
            asignacionesExistentes.push({
                ...asignacion,
                id_guia_madre,
                guia_hija: (guiaExistente as any).toJSON(),
                accion: 'EXISTENTE'
            });
        } else {
            const numeroGuiaHija = formatearNumeroGuiaHija(anioActual, proximoSecuencial);
            const finca = await Finca.findByPk(asignacion.id_finca);
            nuevasAsignaciones.push({
                ...asignacion,
                id_guia_madre,
                numero_guia_hija: numeroGuiaHija,
                secuencial: proximoSecuencial,
                anio: anioActual,
                finca: finca ? finca.toJSON() : null,
                accion: 'NUEVA'
            });
            proximoSecuencial++;
        }
    }
    return {
        asignacionesExistentes,
        nuevasAsignaciones,
        secuencialActual,
        proximo: proximoSecuencial - 1
    };
}

/**
 * Confirma las asignaciones previamente validadas.
 */
export async function confirmarAsignacionGuiasHijas(asignaciones: any[]): Promise<GuiaHijaAttributes[]> {
    const transaction = await sequelize.transaction();
    try {
        const resultados = [];
        for (const asignacion of asignaciones) {
            if (asignacion.accion === 'EXISTENTE') {
                if (asignacion.guia_hija.id_documento_coordinacion !== asignacion.id_documento_coordinacion) {
                    await guiaHijaRepo.updateGuiaHija(asignacion.guia_hija.id, { id_documento_coordinacion: asignacion.id_documento_coordinacion }, transaction);
                }
                resultados.push(asignacion.guia_hija);
            } else {
                const nuevaGuiaHija = await GuiaHija.create({
                    id_documento_coordinacion: asignacion.id_documento_coordinacion,
                    id_guia_madre: asignacion.id_guia_madre,
                    id_finca: asignacion.id_finca,
                    numero_guia_hija: asignacion.numero_guia_hija,
                    anio: asignacion.anio,
                    secuencial: asignacion.secuencial,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }, { transaction });
                resultados.push((nuevaGuiaHija as any).toJSON());
            }
        }
        await transaction.commit();
        return resultados;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}
