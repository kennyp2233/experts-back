import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '@db/experts.db';
import DocumentoBase from './documento_base.model';

export interface GuiaMadreAttributes {
    id: number;
    prefijo: number;
    secuencial: number;
    id_documento_base: number;
    id_coordinacion?: number;
    prestamo?: boolean;
    observaciones?: string;
    fecha_prestamo?: string;
    devolucion?: boolean;
    fecha_devolucion?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface GuiaMadreCreationAttributes extends Optional<GuiaMadreAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

const GuiaMadre = sequelize.define<Model<GuiaMadreAttributes, GuiaMadreCreationAttributes>>('guia_madre', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_documento_base: {
        type: DataTypes.INTEGER,
        references: {
            model: DocumentoBase,
            key: 'id', // Especifica directamente la clave primaria
        }
    },
    prefijo: {
        type: DataTypes.INTEGER,
    },
    secuencial: {
        type: DataTypes.INTEGER,
    },
    id_coordinacion: {
        type: DataTypes.INTEGER,
    },
    prestamo: {
        type: DataTypes.BOOLEAN,
    },
    observaciones: {
        type: DataTypes.STRING,
    },
    fecha_prestamo: {
        type: DataTypes.DATE,
    },
    devolucion: {
        type: DataTypes.BOOLEAN,
    },
    fecha_devolucion: {
        type: DataTypes.DATE,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
});

//relaciones

export default GuiaMadre;

