import DocumentoBase from "@models/documentos/documentos_base/documento_base.model";
import GuiaMadre, { GuiaMadreAttributes } from "@models/documentos/documentos_base/guia_madre.model";
import sequelize from "@db/experts.db";
import { DocumentoBaseAttributes, DocumentoBaseCreationAttributes } from "@models/documentos/documentos_base/documento_base.model";

export async function getDocumentosBase(page: number = 1, pageSize: number = 10): Promise<{ data: any[], total: number }> {
    const offset = (page - 1) * pageSize; // Calcular el desplazamiento (offset)
    const limit = pageSize; // Número de resultados por página

    // Obtener los documentos base con paginación
    const { rows, count } = await DocumentoBase.findAndCountAll({
        limit,
        offset
    });

    return {
        data: rows, // Los documentos de la página actual
        total: count // El número total de documentos
    };
}


export async function getDocumentoBase(id: number): Promise<DocumentoBaseAttributes | null> {
    return await DocumentoBase.findByPk(id) as DocumentoBaseAttributes | null;
}

export async function createDocumentoBase(documento_base: DocumentoBaseCreationAttributes) {
    return await DocumentoBase.create({ ...documento_base, createdAt: new Date(), updatedAt: new Date() });
}

export async function updateDocumentoBase(documento_base: DocumentoBaseAttributes) {
    console.log(documento_base);
    const documento_baseToUpdate = await DocumentoBase.findByPk(documento_base.id);
    if (documento_baseToUpdate) {
        await DocumentoBase.update({ ...documento_base, updatedAt: new Date() }, {
            where: {
                id: documento_base.id
            }
        });
        const updatedDocumentoBase = await DocumentoBase.findByPk(documento_base.id);
        return updatedDocumentoBase;
    }
    return null;
}

export async function deleteDocumentosBase(ids: any[]) {
    await DocumentoBase.destroy({
        where: {
            id: ids
        }
    });
}

/**
 * Genera una lista de secuenciales siguiendo una lógica específica:
 * - Suma 11 en cada incremento.
 * - Si el último dígito es 6, suma 4 en lugar de 11.
 * 
 * @param inicial - El secuencial inicial.
 * @param cantidad - La cantidad de secuenciales a generar.
 * @returns Un arreglo de secuenciales generados.
 */
function generarSecuenciales(inicial: number, cantidad: number): number[] {
    const secuenciales: number[] = [];
    let actual = inicial;

    for (let i = 0; i < cantidad; i++) {
        secuenciales.push(actual);
        const ultimoDigito = actual % 10;

        if (ultimoDigito === 6) {
            actual += 4;
        } else {
            actual += 11;
        }
    }

    return secuenciales;
}

export async function crearDocumentoYGuias(
    documento_base: DocumentoBaseCreationAttributes,
    n_guias: number,
    secuencial_inicial: number,
    prefijo: number
): Promise<DocumentoBaseAttributes> {
    // Iniciar una transacción
    const t = await sequelize.transaction();
    try {
        // Crear el documento base
        const documento_base_creado: DocumentoBaseAttributes = (await DocumentoBase.create(
            { ...documento_base, createdAt: new Date(), updatedAt: new Date() },
            { transaction: t }
        )).get({ plain: true });

        // Generar los secuenciales siguiendo la lógica especificada
        const secuenciales = generarSecuenciales(secuencial_inicial, n_guias);

        // Crear las guías madre
        const guiasPromises = secuenciales.map(sec => GuiaMadre.create({
            id_documento_base: documento_base_creado.id,
            prefijo: prefijo,
            secuencial: sec,
        }, { transaction: t }));

        await Promise.all(guiasPromises);

        // Confirmar la transacción
        await t.commit();
        return documento_base_creado;
    } catch (error) {
        // Revertir la transacción en caso de error
        await t.rollback();
        throw error;
    }
}

export async function previewDocumentoBaseYGuias(
    documento_base: DocumentoBaseCreationAttributes,
    n_guias: number,
    secuencial_inicial: number,
    prefijo: number
): Promise<any> {
    const documento_base_creado = { ...documento_base, createdAt: new Date(), updatedAt: new Date() };

    // Obtener el último documento base para determinar el siguiente ID (opcional)
    const last_documento_base: any = await DocumentoBase.findOne({ order: [['id', 'DESC']] });

    if (last_documento_base) {
        documento_base_creado.id = last_documento_base.id + 1;
    } else {
        documento_base_creado.id = 1;
    }

    // Generar los secuenciales siguiendo la lógica especificada
    const secuenciales = generarSecuenciales(secuencial_inicial, n_guias);

    // Simular las guías madre
    const guias = secuenciales.map(sec => ({
        id_documento_base: documento_base_creado.id, // Actualizamos a un ID simulado
        prefijo: prefijo,
        secuencial: sec,
    }));

    return { ...documento_base_creado, guias_madre: guias };
}

export async function getGuiasMadre(id_documento_base: number): Promise<GuiaMadreAttributes[]> {
    return await GuiaMadre.findAll({ where: { id_documento_base } }) as any as GuiaMadreAttributes[];
}

export async function getGuiasBase(page: number = 1, pageSize: number = 10): Promise<{ data: any[], total: number }> {
    const offset = (page - 1) * pageSize; // Calcular el desplazamiento (offset)
    const limit = pageSize; // Número de resultados por página

    // Obtener todas las guías base con sus guías madre y aplicar paginación
    const { rows, count } = await DocumentoBase.findAndCountAll({
        include: [
            {
                model: GuiaMadre,
                as: 'guias_madre'
            }
        ],
        limit,
        offset
    });

    // Devolver los resultados paginados junto con el número total de registros
    return {
        data: rows, // Los registros de la página actual
        total: count // El número total de registros (sin paginación)
    };
}
