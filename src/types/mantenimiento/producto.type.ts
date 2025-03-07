export type Producto = {
    id_producto: number;
    codigo_producto?: string;
    nombre?: string;
    descripcion?: string;
    nombre_botanico?: string;
    especie?: string;
    id_medida?: number;
    precio_unitario?: number;
    estado?: boolean;
    id_opcion?: number;
    stems_por_full?: number;
    id_sesa?: number;
}

export type ProductoAtributosCreacion = Omit<Producto, 'id_producto'>;