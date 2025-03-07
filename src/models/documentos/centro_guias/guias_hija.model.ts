// src/models/documentos/centro_guias/guias_hija.model.ts

import sequelize from "@db/experts.db";
import { DataTypes, Model, Optional } from "sequelize";
import DocumentoCoordinacion from "./documento_coordinacion.model";
import GuiaMadre from "../documentos_base/guia_madre.model";
import Finca from "@models/mantenimiento/finca.model";

export interface GuiaHijaAttributes {
    id: number;
    id_documento_coordinacion: number; // Relacionado con documento_coordinacion
    id_guia_madre: number;
    id_finca: number;
    numero_guia_hija: string; // Formato como "20250001"
    anio: number;
    secuencial: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface GuiaHijaCreationAttributes extends Optional<GuiaHijaAttributes, 'id' | 'createdAt' | 'updatedAt' | 'numero_guia_hija' | 'anio' | 'secuencial'> {}

const GuiaHija = sequelize.define<Model<GuiaHijaAttributes, GuiaHijaCreationAttributes>>('guia_hija', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_documento_coordinacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: DocumentoCoordinacion,
            key: 'id',
        }
    },
    id_guia_madre: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: GuiaMadre,
            key: 'id',
        }
    },
    id_finca: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Finca,
            key: 'id_finca',
        }
    },
    numero_guia_hija: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    secuencial: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
});

// Definir relaciones
GuiaHija.belongsTo(DocumentoCoordinacion, { foreignKey: 'id_documento_coordinacion', as: 'documento_coordinacion' });
GuiaHija.belongsTo(GuiaMadre, { foreignKey: 'id_guia_madre', as: 'guia_madre' });
GuiaHija.belongsTo(Finca, { foreignKey: 'id_finca', as: 'finca' });

DocumentoCoordinacion.hasMany(GuiaHija, { foreignKey: 'id_documento_coordinacion', as: 'guias_hijas' });
GuiaMadre.hasMany(GuiaHija, { foreignKey: 'id_guia_madre', as: 'guias_hijas' });
Finca.hasMany(GuiaHija, { foreignKey: 'id_finca', as: 'guias_hijas' });

export default GuiaHija;