export type ProductosCompuesto = {
    id_producto_compuesto: number;
    id_producto: number;
    producto_compuesto_destino: string;
    producto_compuesto_declaracion: string;
}

export type ProductosCompuestoCreationAttributes = Omit<ProductosCompuesto, 'id_producto_compuesto'>;