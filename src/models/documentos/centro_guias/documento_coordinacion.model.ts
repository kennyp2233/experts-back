import sequelize from "@db/experts.db";
import GuiaMadre from "../documentos_base/guia_madre.model";
import Consignatarios from "@models/mantenimiento/consignatario/consignatario.model";
import Producto from "@models/mantenimiento/producto.model";
import AgenciaIata from "@models/mantenimiento/agencia_iata";
import Destino from "@models/mantenimiento/destino.model";
import Origen from "@models/mantenimiento/origen.model";
import Aerolineas from "@models/mantenimiento/aerolinea.model";
import CoordinacionClientes from "./coordinacion_clientes.model";

import { DataTypes, Model } from "sequelize";

type DocumentoCoordinacionAttributes = {
    id: number;
    id_guia_madre: number;
    id_consignatario: number;
    id_producto: number;
    //-----------------------------------
    id_agencia_iata: number;
    id_destino_awb: number;
    id_destino_final_docs: number;
    pago: string;
    fecha_vuelo: Date;
    fecha_asignacion: Date;
    //-----------------------------------
    from1?: number;
    to1?: number;
    by1?: number;
    to2?: number;
    by2?: number;
    to3?: number;
    by3?: number;
    //-----------------------------------
    costo_guia_valor?: number;
    combustible_valor?: number;
    seguridad_valor?: number;
    aux_calculo_valor?: number;
    otros_valor?: number;
    aux1_valor?: number;
    aux2_valor?: number;
    //-----------------------------------
    tarifa_rate?: number;
    char_weight?: number;
    //-----------------------------------
    form_a?: number;
    transport?: number;
    pca?: number;
    fitos?: number;
    termografo?: number;
    mca?: number;
    tax?: number;
    //-----------------------------------
    createdAt: Date;
    updatedAt: Date;
}

type DocumentoCoordinacionCreationAttributes = Omit<DocumentoCoordinacionAttributes, 'id'>;

const DocumentoCoordinacion = sequelize.define<Model<DocumentoCoordinacionAttributes, DocumentoCoordinacionCreationAttributes>>('documento_coordinacion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_guia_madre: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: GuiaMadre,
            key: GuiaMadre.primaryKeyAttribute,
        },
    },
    id_consignatario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Consignatarios,
            key: Consignatarios.primaryKeyAttribute,
        },
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: Producto.primaryKeyAttribute,
        },
    },
    id_agencia_iata: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AgenciaIata,
            key: AgenciaIata.primaryKeyAttribute,
        },
    },
    id_destino_awb: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Destino,
            key: Destino.primaryKeyAttribute,
        },
    },
    id_destino_final_docs: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Destino,
            key: Destino.primaryKeyAttribute,
        },
    },
    pago: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PREPAID',
    },
    fecha_vuelo: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fecha_asignacion: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    from1: {
        type: DataTypes.INTEGER,
        references: {
            model: Origen,
            key: Origen.primaryKeyAttribute,
        },
    },
    to1: {
        type: DataTypes.INTEGER,
        references: {
            model: Destino,
            key: Destino.primaryKeyAttribute,
        },
    },
    by1: {
        type: DataTypes.INTEGER,
        references: {
            model: Aerolineas,
            key: Aerolineas.primaryKeyAttribute,
        },
    },
    to2: {
        type: DataTypes.INTEGER,
        references: {
            model: Destino,
            key: Destino.primaryKeyAttribute,
        },
    },
    by2: {
        type: DataTypes.INTEGER,
        references: {
            model: Aerolineas,
            key: Aerolineas.primaryKeyAttribute,
        },
    },
    to3: {
        type: DataTypes.INTEGER,
        references: {
            model: Destino,
            key: Destino.primaryKeyAttribute,
        },
    },
    by3: {
        type: DataTypes.INTEGER,
        references: {
            model: Aerolineas,
            key: Aerolineas.primaryKeyAttribute,
        }
    },
    costo_guia_valor: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    combustible_valor: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    seguridad_valor: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    aux_calculo_valor: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    otros_valor: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    aux1_valor: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    aux2_valor: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    tarifa_rate: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    char_weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    form_a: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    transport: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    pca: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    fitos: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    termografo: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    mca: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    tax: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

DocumentoCoordinacion.belongsTo(GuiaMadre, {
    foreignKey: 'id_guia_madre',
    as: 'guia_madre',
});

DocumentoCoordinacion.belongsTo(Consignatarios, {
    foreignKey: 'id_consignatario',
    as: 'consignatario',
});

DocumentoCoordinacion.belongsTo(Producto, {
    foreignKey: 'id_producto',
    as: 'producto',
});

DocumentoCoordinacion.belongsTo(AgenciaIata, {
    foreignKey: 'id_agencia_iata',
    as: 'agencia_iata',
});

DocumentoCoordinacion.belongsTo(Destino, {
    foreignKey: 'id_destino_awb',
    as: 'destino_awb',
});

DocumentoCoordinacion.belongsTo(Destino, {
    foreignKey: 'id_destino_final_docs',
    as: 'destino_final_docs',
});

DocumentoCoordinacion.belongsTo(Origen, {
    foreignKey: 'from1',
    as: 'origen_from1',
});

DocumentoCoordinacion.belongsTo(Destino, {
    foreignKey: 'to1',
    as: 'destino_to1',
});

DocumentoCoordinacion.belongsTo(Aerolineas, {
    foreignKey: 'by1',
    as: 'aerolinea_by1',
});

DocumentoCoordinacion.belongsTo(Destino, {
    foreignKey: 'to2',
    as: 'destino_to2',
});

DocumentoCoordinacion.belongsTo(Aerolineas, {
    foreignKey: 'by2',
    as: 'aerolinea_by2',
});

DocumentoCoordinacion.belongsTo(Destino, {
    foreignKey: 'to3',
    as: 'destino_to3',
});

DocumentoCoordinacion.belongsTo(Aerolineas, {
    foreignKey: 'by3',
    as: 'aerolinea_by3',
});

DocumentoCoordinacion.hasMany(CoordinacionClientes, {
    foreignKey: 'id_coordinacion',
    as: 'coordinacion_clientes',
});

GuiaMadre.hasOne(DocumentoCoordinacion, {
    foreignKey: 'id_guia_madre',
    as: 'documento_coordinacion',
});


export default DocumentoCoordinacion;



