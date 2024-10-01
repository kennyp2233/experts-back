export type Cliente = {
    id_clientes: number;
    nombre: string;
    ruc?: string;
    direccion?: string;
    telefono?: string;
    email?: string;
    ciudad?: string;
    pais?: string;
    cliente_codigo_pais?: string;
    fitos_valor?: number;
    form_a?: number;
    transport?: number;
    termo?: number;
    mica?: number;
    handling?: number;
    cuenta_contable?: string;
    nombre_factura?: string;
    ruc_factura?: string;
    direccion_factura?: string;
    telefono_factura?: string;
}

export type ClienteAtributosCreacion = Omit<Cliente, 'id_clientes'>;