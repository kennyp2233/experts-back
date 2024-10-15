import GuiaMadre, { GuiaMadreAttributes, GuiaMadreCreationAttributes } from "@models/documentos/documentos_base/guia_madre.model";
import sequelize from "@db/experts.db";

export async function getGuiasMadre(): Promise<GuiaMadreAttributes[]> {
    return await GuiaMadre.findAll() as any as GuiaMadreAttributes[];
}

export async function getGuiaMadre(id: number): Promise<GuiaMadreAttributes | null> {
    return await GuiaMadre.findByPk(id) as GuiaMadreAttributes | null;
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
