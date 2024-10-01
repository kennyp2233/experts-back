import Fincas from "@models/mantenimiento/finca.model";
import FincaChoferes from "@models/mantenimiento/fincas/fincas_choferes.model";
import FincaProductos from "@models/mantenimiento/fincas/fincas_productos.model";
import Productos from "@models/mantenimiento/producto.model";
import Choferes from "@models/mantenimiento/chofer.model";
import "src/config/assosiations/mantenimiento/fincas_all_assosiation.as";
import sequelize from "src/config/experts.db";

import { crearRegistrosConSeries } from "@utils/custom_data_utils";

export async function getFincasJoinAll() {
    const fincasList = await Fincas.findAll({
        include: [
            {
                model: FincaChoferes,
                as: "fincas_choferes",
                include: [
                    {
                        model: Choferes,
                        as: "choferes",
                    },
                ],
            },
            {
                model: FincaProductos,
                as: "fincas_productos",
                include: [
                    {
                        model: Productos,
                        as: "productos",
                    },
                ],
            },
        ],
    });

    return fincasList.map((finca) => finca.toJSON());
}

export async function createFincaWithAllData(finca: any) {
    const transaction = await sequelize.transaction();

    try {
        const fincaData = extraerFincaData(finca) as any;
        const fincaChoferesData = extraerFincaChoferesData(finca) as any[];
        const fincaProductosData = extraerFincaProductosData(finca) as any[];
        console.log('finca:', finca);

        console.log('fincaData:', fincaData);
        console.log('fincaChoferesData:', fincaChoferesData);
        console.log('fincaProductosData:', fincaProductosData);

        const newFinca: any = await Fincas.create(fincaData, { transaction });

        await crearRegistrosConSeries(newFinca.id_finca, fincaChoferesData, ['id_chofer'], FincaChoferes, transaction, 'id_finca');
        await crearRegistrosConSeries(newFinca.id_finca, fincaProductosData, ['id_producto'], FincaProductos, transaction, 'id_finca');

        await transaction.commit();
        return await Fincas.findByPk(newFinca.id_finca);

    } catch (error) {
        await transaction.rollback();
        throw error
    }
}

export async function updateFincaWithAllData(finca: any) {
    const transaction = await sequelize.transaction();

    try {
        const fincaToUpdate = await Fincas.findByPk(finca.id_finca, { transaction });
        if (!fincaToUpdate) {
            throw new Error('Finca no encontrada');
        }

        const fincaData = extraerFincaData(finca) as any;
        const fincaChoferesData = extraerFincaChoferesData(finca) as any[];
        const fincaProductosData = extraerFincaProductosData(finca) as any[];

        await FincaChoferes.destroy({ where: { id_finca: finca.id_finca }, transaction });
        await FincaProductos.destroy({ where: { id_finca: finca.id_finca }, transaction });

        await Fincas.update(fincaData, {
            where: { id_finca: finca.id_finca },
            transaction,
        });

        await crearRegistrosConSeries(finca.id_finca, fincaChoferesData, ['id_chofer'], FincaChoferes, transaction, 'id_finca');
        await crearRegistrosConSeries(finca.id_finca, fincaProductosData, ['id_producto'], FincaProductos, transaction, 'id_finca');

        await transaction.commit();
        return await Fincas.findByPk(finca.id_finca);

    } catch (error) {
        await transaction.rollback();
        throw error
    }
}

export async function deleteFincas(fincas: number[]) {
    const transaction = await sequelize.transaction();

    try {
        await Fincas.destroy({ where: { id_finca: fincas }, transaction });
        await FincaChoferes.destroy({ where: { id_finca: fincas }, transaction });
        await FincaProductos.destroy({ where: { id_finca: fincas }, transaction });

        await transaction.commit();
        return { ok: true };
    } catch (error) {
        await transaction.rollback();
        throw error
    }
}

function extraerFincaData(finca: any) {
    return {
        nombre_finca: finca?.nombre_finca,
        codigo_finca: finca?.codigo_finca,
        ruc_finca: finca?.ruc_finca,
        id_tipo_documento: finca?.id_tipo_documento?.id_tipo_documento,
        genera_guias_certificadas: finca?.genera_guias_certificadas,
        i_general_telefono: finca?.i_general_telefono,
        i_general_email: finca?.i_general_email,
        i_general_ciudad: finca?.i_general_ciudad,
        i_general_provincia: finca?.i_general_provincia,
        i_general_pais: finca?.i_general_pais,
        i_general_cod_sesa: finca?.i_general_cod_sesa,
        i_general_cod_pais: finca?.i_general_cod_pais,
        dim_x: finca?.dim_x,
        dim_y: finca?.dim_y,
        dim_z: finca?.dim_z,
        excel_plantilla: finca?.excel_plantilla,
        a_nombre: finca?.a_nombre,
        a_codigo: finca?.a_codigo,
        a_direccion: finca?.a_direccion,
    };
}

function extraerFincaChoferesData(finca: any) {
    return finca?.fincas_choferes
        ?.map((chofer: any) => ({
            id_finca: finca?.id_finca,
            id_chofer: chofer?.id_chofer,
        }));
}

function extraerFincaProductosData(finca: any) {
    return finca?.fincas_productos?.map((producto: any) => ({
        id_finca: finca?.id_finca,
        id_producto: producto?.id_producto,
    }));
}

