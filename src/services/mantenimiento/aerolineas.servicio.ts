import Aerolineas from "@models/mantenimiento/aerolinea.model";
import { Aerolinea, AerolineaCreationAttributes } from "@typesApp/mantenimiento/aerolinea.type";
import Origenes from "@models/mantenimiento/origen.model";
import Destinos from "@models/mantenimiento/destino.model";
import AerolineasPlantillas from "@models/mantenimiento/aerolinea_plantilla.model";
import CatalogoModoAerolinea from "@models/catalogos/aerolineas/catalogo_modo_aerolinea.model";
import CatalogoMultiplicadorAerolinea from "@models/catalogos/aerolineas/catalogo_multiplicador_aerolinea.model";
import "src/config/assosiations/mantenimiento/aerolineas_all_assosiation.as"
import sequelize from "src/config/experts.db";
import { AerolineasPlantilla, AerolineasPlantillaCreationAttributes } from "@typesApp/mantenimiento/aerolinea_plantilla.type";

export async function getAerolineas(): Promise<Aerolinea[]> {
    const aerolineasList = await Aerolineas.findAll();
    return aerolineasList.map((aerolinea) => aerolinea.toJSON()) as Aerolinea[];
}

export async function getAerolinea(id: number): Promise<Aerolinea | null> {
    const aerolinea = await Aerolineas.findByPk(id);
    return aerolinea ? aerolinea.toJSON() as Aerolinea : null;
}

export async function createAerolinea(aerolinea: AerolineaCreationAttributes) {
    return await Aerolineas.create(aerolinea as any);
}

export async function updateAerolinea(aerolinea: Aerolinea): Promise<Aerolinea | null> {
    const aerolineaToUpdate = await Aerolineas.findByPk(aerolinea.id_aerolinea);
    if (aerolineaToUpdate) {
        await Aerolineas.update(aerolinea, {
            where: {
                id_aerolinea: aerolinea.id_aerolinea
            }
        });
        const updatedAerolinea = await Aerolineas.findByPk(aerolinea.id_aerolinea);
        return updatedAerolinea ? updatedAerolinea.toJSON() as Aerolinea : null;
    }
    return null;
}

export async function deleteAerolineas(ids: any[]) {
    await Aerolineas.destroy({
        where: {
            id_aerolinea: ids
        }
    });
}

export async function aerolineaJoinAll() {
    const respuesta = await Aerolineas.findAll({
        // raw: true,
        include: [
            {
                model: Origenes,
                as: 'origen1',
                required: false
            },
            {
                model: Destinos,
                as: 'destino1',
                required: false
            },
            {
                model: Aerolineas,
                as: 'via1',
                required: false
            },
            {
                model: Destinos,
                as: 'destino2',
                required: false
            },
            {
                model: Aerolineas,
                as: 'via2',
                required: false
            },
            {
                model: Destinos,
                as: 'destino3',
                required: false
            },
            {
                model: Aerolineas,
                as: 'via3',
                required: false
            },
            {
                model: AerolineasPlantillas,
                as: 'plantilla',
                required: false,
                include: [
                    {
                        model: CatalogoMultiplicadorAerolinea,
                        as: 'multiplicador1',
                        required: false
                    },
                    {
                        model: CatalogoMultiplicadorAerolinea,
                        as: 'multiplicador2',
                        required: false
                    },
                    {
                        model: CatalogoMultiplicadorAerolinea,
                        as: 'multiplicador3',
                        required: false
                    },
                ]
            },
            {
                model: CatalogoModoAerolinea,
                as: 'modo',
                required: false
            },

        ]
    });
    return respuesta.map((aerolinea: any) => {
        // Mezclar los atributos de plantilla con los de aerolinea
        const plantillaData = aerolinea.plantilla ? aerolinea.plantilla.dataValues : {};
        return {
            ...aerolinea.dataValues,
            ...plantillaData
        };
    });
}

export async function createAerolineaAndPlantilla(data: any) {
    const transaction = await sequelize.transaction();
    const aerolineaData = extractDataToAerolinea(data);
    const plantillaData = extractDataToAerolineaPlantilla(data);

    try {
        // Crear registro en Aerolineas
        const newAerolinea = await Aerolineas.create(aerolineaData as any, { transaction }) as any;

        // Crear registro en AerolineasPlantillas con la relación 1 a 1
        const newAerolineaPlantilla = await AerolineasPlantillas.create({
            id_aerolinea: newAerolinea.id_aerolinea, // Usar el ID generado de `Aerolineas`
            ...plantillaData
        }, { transaction });

        // Confirmar la transacción
        await transaction.commit();

        return {
            aerolinea: newAerolinea.toJSON(),
            aerolineaPlantilla: newAerolineaPlantilla.toJSON()
        };
    } catch (error) {
        await transaction.rollback();
        throw error
    }
}

export async function updateAerolineaAndPlantilla(data: any) {
    const transaction = await sequelize.transaction();
    const aerolineaData = extractDataToAerolinea(data);
    const plantillaData = extractDataToAerolineaPlantilla(data);
    console.log("AEROLINEAS DATA!!!!!!!!!!!!!!!!!!!!!!", data);
    try {
        // Actualizar registro en Aerolineas
        const updatedAerolinea = await Aerolineas.update(aerolineaData, {
            where: { id_aerolinea: data.id_aerolinea },
            transaction
        });

        // Verificar si la Aerolinea existe
        //if (updatedAerolinea[0] === 0) return { error: 'No se encontró la aerolínea' };

        // Actualizar registro en AerolineasPlantillas con la relación 1 a 1
        const updatedAerolineaPlantilla = await AerolineasPlantillas.update(plantillaData, {
            where: { id_aerolinea: data.id_aerolinea },
            transaction
        });

        // Confirmar la transacción
        await transaction.commit();

        // Obtener los registros actualizados
        const aerolinea = await Aerolineas.findByPk(data.id_aerolinea);
        const aerolineaPlantilla = await AerolineasPlantillas.findOne({ where: { id_aerolinea: data.id_aerolinea } });

        return {
            aerolinea: aerolinea ? aerolinea.toJSON() : null,
            aerolineaPlantilla: aerolineaPlantilla ? aerolineaPlantilla.toJSON() : null
        };
    } catch (error) {
        await transaction.rollback();
        throw error
    }
}

export async function deleteAerolineaAndPlantilla(ids: any[]) {
    const transaction = await sequelize.transaction();
    try {
        // Eliminar registro en AerolineasPlantillas
        await AerolineasPlantillas.destroy({
            where: { id_aerolinea: ids },
            transaction
        });

        // Eliminar registro en Aerolineas
        await Aerolineas.destroy({
            where: { id_aerolinea: ids },
            transaction
        });

        // Confirmar la transacción
        await transaction.commit();


    } catch (error) {
        await transaction.rollback();
        throw error
    }

}

function extractDataToAerolinea(data: any) {

    return {
        nombre: data?.nombre,
        ci_ruc: data?.ci_ruc,
        direccion: data?.direccion,
        telefono: data?.telefono,
        email: data?.email,
        ciudad: data?.ciudad,
        pais: data?.pais,
        contacto: data?.contacto,
        id_modo: data?.modo?.id_modo,
        maestras_guias_hijas: data?.maestras_guias_hijas,
        codigo: data?.codigo,
        prefijo_awb: data?.prefijo_awb,
        codigo_cae: data?.codigo_cae,
        estado_activo: data?.estado_activo,
        from1: data?.origen1?.id_origen,
        to1: data?.destino1?.id_destino,
        by1: data?.via1?.id_aerolinea,
        to2: data?.destino2?.id_destino,
        by2: data?.via2?.id_aerolinea,
        to3: data?.destino3?.id_destino,
        by3: data?.via3?.id_aerolinea,
        afiliado_cass: data?.afiliado_cass,
        guias_virtuales: data?.guias_virtuales,
    }
}

function extractDataToAerolineaPlantilla(data: any): AerolineasPlantillaCreationAttributes {
    return {
        costo_guia_abrv: data?.costo_guia_abrv,
        combustible_abrv: data?.combustible_abrv,
        seguridad_abrv: data?.seguridad_abrv,
        aux_calculo_abrv: data?.aux_calculo_abrv,
        iva_abrv: data?.iva_abrv,
        otros_abrv: data?.otros_abrv,
        aux1_abrv: data?.aux1_abrv,
        aux2_abrv: data?.aux2_abrv,
        costo_guia_valor: data?.costo_guia_valor,
        combustible_valor: data?.combustible_valor,
        seguridad_valor: data?.seguridad_valor,
        aux_calculo_valor: data?.aux_calculo_valor,
        otros_valor: data?.otros_valor,
        aux1_valor: data?.aux1_valor,
        aux2_valor: data?.aux2_valor,
        iva_valor: data?.iva_valor,
        plantilla_guia_madre: data?.plantilla_guia_madre,
        plantilla_formato_aerolinea: data?.plantilla_formato_aerolinea,
        plantilla_reservas: data?.plantilla_reservas,
        tarifa_rate: data?.tarifa_rate,
        pca: data?.pca,
        combustible_mult: data?.multiplicador1?.id_multiplicador,
        seguridad_mult: data?.multiplicador2?.id_multiplicador,
        aux_calc_mult: data?.multiplicador3?.id_multiplicador,
    }
}

//aerolineaJoinAll().then(console.log)
