export type ProductosAranceles = {
    id_productos_aranceles: number;
    id_producto: number;
    aranceles_destino: string;
    aranceles_codigo: string;
}

export type ProductosArancelesCreationAttributes = Omit<ProductosAranceles, 'id_productos_aranceles'>;