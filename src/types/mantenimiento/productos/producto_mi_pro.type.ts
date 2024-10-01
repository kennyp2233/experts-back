export type ProductosMiPro = {
    id_productos_mi_pro: number;
    id_producto: number;
    mipro_acuerdo: string;
    mipro_djocode: string;
    mipro_tariffcode: string;
}

export type ProductosMiProCreationAttributes = Omit<ProductosMiPro, 'id_productos_mi_pro'>;