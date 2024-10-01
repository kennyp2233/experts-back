export type FincaProducto = {
    id_fincas_productos: number;
    id_finca: number;
    id_producto: number;
}

export type FincaProductoCreationAttributes = Omit<FincaProducto, 'id_fincas_productos'>;