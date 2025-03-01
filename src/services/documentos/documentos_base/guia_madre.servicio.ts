import GuiaMadre, { GuiaMadreAttributes, GuiaMadreCreationAttributes } from "@models/documentos/documentos_base/guia_madre.model";
import sequelize from "@db/experts.db";
import DocumentoBase from "@models/documentos/documentos_base/documento_base.model";
import { Op, Sequelize } from "sequelize";
import DocumentoCoordinacion from "@models/documentos/centro_guias/documento_coordinacion.model";

export async function getGuiasMadre(): Promise<GuiaMadreAttributes[]> {
    return await GuiaMadre.findAll() as any as GuiaMadreAttributes[];
}

export async function getGuiaMadre(id: number): Promise<GuiaMadreAttributes | null> {
    return await GuiaMadre.findByPk(id) as GuiaMadreAttributes | null;
}

export async function getGuiaMadreByAirlineId(id: number): Promise<GuiaMadreAttributes[]> {
    return await GuiaMadre.findAll({
        include: [
            {
                model: DocumentoBase,
                as: 'documento_base',
                where: {
                    id_aerolinea: id,
                },
                required: true
            }
        ],
        where: {
            prestamo: false, // Solo las guías que no están prestadas
            devolucion: false, // Solo las guías que no han sido devueltas
            id: {
                [Op.notIn]: Sequelize.literal(`(
                    SELECT id_guia_madre FROM documento_coordinacion WHERE id_guia_madre IS NOT NULL
                )`)
            }
        }
    }) as any;
}

export async function createGuiaMadre(guia_madre: GuiaMadreCreationAttributes) {
    return await GuiaMadre.create({ ...guia_madre, createdAt: new Date(), updatedAt: new Date() });
}

export async function updateGuiaMadre(guia_madre: GuiaMadreCreationAttributes) {
    const guia_madreToUpdate = await GuiaMadre.findByPk(guia_madre.id);
    if (guia_madreToUpdate) {
        await GuiaMadre.update({ ...guia_madre, updatedAt: new Date() }, {
            where: {
                id: guia_madre.id
            }
        });
        const updatedGuiaMadre = await GuiaMadre.findByPk(guia_madre.id);
        return updatedGuiaMadre;
    }
    return null;
}
