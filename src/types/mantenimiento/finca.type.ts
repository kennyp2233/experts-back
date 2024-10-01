export type Finca = {
    id_finca: number;
    nombre_finca: string;
    codigo_finca: string;
    ruc_finca?: string;
    id_tipo_documento?: number;
    genera_guias_certificadas?: boolean;
    i_general_telefono?: string;
    i_general_email?: string;
    i_general_ciudad?: string;
    i_general_provincia?: string;
    i_general_pais?: string;
    i_general_cod_sesa?: string;
    i_general_cod_pais?: string;
    dim_x?: number;
    dim_y?: number;
    dim_z?: number;
    excel_plantilla?: string;
    a_nombre?: string;
    a_codigo?: string;
    a_direccion?: string;
};

export type FincaAtributosCreacion = Omit<Finca, 'id_finca'>;