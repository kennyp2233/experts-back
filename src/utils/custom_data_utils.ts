export async function crearRegistrosConSeries(
    id: number,
    data: any[],
    keys: string[],
    modelo: any,
    transaction: any,
    fieldKey: string // Nombre del campo a usar en lugar de `id_producto`
) {
    // Verificar si `data` es un array y no está vacío
    if (!Array.isArray(data) || data.length === 0) {
        console.warn('No hay datos para procesar');
        return; // Salir de la función si no hay datos
    }

    for (const item of data) {
        const dataToCreate: any = {};

        keys.forEach(key => {
            const value = item[key];
            if (value !== undefined) {
                dataToCreate[key] = value;
            }
        });

        // Verificar si hay datos para crear
        if (Object.keys(dataToCreate).length > 0) {
            await modelo.create({
                ...dataToCreate,
                [fieldKey]: id // Usa el nombre del campo proporcionado
            }, { transaction });
        }
    }
}
