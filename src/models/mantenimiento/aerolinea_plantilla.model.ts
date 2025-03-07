import sequelize from "src/config/experts.db";
import { AerolineasPlantilla, AerolineasPlantillaCreationAttributes } from "@typesApp/mantenimiento/aerolinea_plantilla.type";

import { DataTypes, Model } from "sequelize";

import Aerolineas from "./aerolinea.model";
import CatalogoMultiplicadorAerolinea from "@models/catalogos/aerolineas/catalogo_multiplicador_aerolinea.model";

const AerolineasPlantillas = sequelize.define<Model<AerolineasPlantilla>>('aerolineas_codigos_plantillas', {
    id_aerolinea: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Aerolineas,
            key: Aerolineas.primaryKeyAttribute
        },
        onDelete: 'CASCADE',
    },
    costo_guia_abrv: {
        type: DataTypes.STRING
    },
    combustible_abrv: {
        type: DataTypes.STRING
    },
    seguridad_abrv: {
        type: DataTypes.STRING
    },
    aux_calculo_abrv: {
        type: DataTypes.STRING
    },
    iva_abrv: {
        type: DataTypes.STRING
    },
    otros_abrv: {
        type: DataTypes.STRING
    },
    aux1_abrv: {
        type: DataTypes.STRING
    },
    aux2_abrv: {
        type: DataTypes.STRING
    },
    costo_guia_valor: {
        type: DataTypes.FLOAT
    },
    combustible_valor: {
        type: DataTypes.FLOAT
    },
    seguridad_valor: {
        type: DataTypes.FLOAT
    },
    aux_calculo_valor: {
        type: DataTypes.FLOAT
    },
    otros_valor: {
        type: DataTypes.FLOAT
    },
    aux1_valor: {
        type: DataTypes.FLOAT
    },
    aux2_valor: {
        type: DataTypes.FLOAT
    },
    plantilla_guia_madre: {
        type: DataTypes.STRING
    },
    plantilla_formato_aerolinea: {
        type: DataTypes.STRING
    },
    plantilla_reservas: {
        type: DataTypes.STRING
    },
    tarifa_rate: {
        type: DataTypes.FLOAT
    },
    pca: {
        type: DataTypes.FLOAT
    },
    combustible_mult: {
        type: DataTypes.INTEGER,
        references: {
            model: CatalogoMultiplicadorAerolinea,
            key: CatalogoMultiplicadorAerolinea.primaryKeyAttribute
        }
    },
    seguridad_mult: {
        type: DataTypes.INTEGER,
        references: {
            model: CatalogoMultiplicadorAerolinea,
            key: CatalogoMultiplicadorAerolinea.primaryKeyAttribute
        }
    },
    aux_calc_mult: {
        type: DataTypes.INTEGER,
        references: {
            model: CatalogoMultiplicadorAerolinea,
            key: CatalogoMultiplicadorAerolinea.primaryKeyAttribute
        }
    },

    iva_valor: {
        type: DataTypes.FLOAT
    },


});

export default AerolineasPlantillas;