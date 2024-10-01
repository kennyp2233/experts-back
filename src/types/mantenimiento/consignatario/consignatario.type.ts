export type Consignatario = {
    id_consignatario: number;
    nombre_consignatario: string;
    ruc?: string;
    direccion?: string;
    id_embarcador: number;
    id_cliente: number;
    telefono?: string;
    email?: string;
    ciudad?: string;
    pais?: string;
}

export type ConsignatarioCreationAttributes = Omit<Consignatario, 'id_consignatario'>;

export type ConsignatarioCaeSice = {
    id_consignatario: number;
    consignee_nombre?: string;
    consignee_direccion?: string;
    consignee_documento?: string;
    consignee_siglas_pais?: string;
    notify_nombre?: string;
    notify_direccion?: string;
    notify_documento?: string;
    notify_siglas_pais?: string;
    hawb_nombre?: string;
    hawb_direccion?: string;
    hawb_documento?: string;
    hawb_siglas_pais?: string;
    consignee_tipo_documento?: number;
    notify_tipo_documento?: number;
    hawb_tipo_documento?: number;
}

export type ConsignatarioFacturacion = {
    id_consignatario: number;
    factura_nombre?: string;
    factura_ruc?: string;
    factura_direccion?: string;
    factura_telefono?: string;
}

export type ConsignatarioFito = {
    id_consignatario: number;
    fito_declared_name?: string;
    fito_forma_a?: string;
    fito_nombre?: string;
    fito_direccion?: string;
    fito_pais?: string;
}

export type ConsignatarioGuiaH = {
    id_consignatario: number;
    guia_h_consignee?: string;
    guia_h_name_adress?: string;
    guia_h_notify?: string;
}

export type ConsignatarioGuiaM = {
    id_consignatario: number;
    id_destino?: number;
    guia_m_consignee?: string;
    guia_m_name_address?: string;
    guia_m_notify?: string;
}

export type ConsignatarioTransmision = {
    id_consignatario: number;
    consignee_nombre_trans?: string;
    consignee_direccion_trans?: string;
    consignee_ciudad_trans?: string;
    consignee_provincia_trans?: string;
    consignee_pais_trans?: string;
    consignee_eueori_trans?: string;
    notify_nombre_trans?: string;
    notify_direccion_trans?: string;
    notify_ciudad_trans?: string;
    notify_provincia_trans?: string;
    notify_pais_trans?: string;
    notify_eueori_trans?: string;
    hawb_nombre_trans?: string;
    hawb_direccion_trans?: string;
    hawb_ciudad_trans?: string;
    hawb_provincia_trans?: string;
    hawb_pais_trans?: string;
    hawb_eueori_trans?: string;
}

