export type AerolineasPlantilla = {
    id_aerolinea: number;
    costo_guia_abrv?: string;
    combustible_abrv?: string;
    seguridad_abrv?: string;
    aux_calculo_abrv?: string;
    iva_abrv?: string;
    otros_abrv?: string;
    aux1_abrv?: string;
    aux2_abrv?: string;
    costo_guia_valor?: number;
    combustible_valor?: number;
    seguridad_valor?: number;
    aux_calculo_valor?: number;
    otros_valor?: number;
    aux1_valor?: number;
    aux2_valor?: number;
    plantilla_guia_madre?: string;
    plantilla_formato_aerolinea?: string;
    plantilla_reservas?: string;
    tarifa_rate?: number;
    pca?: number;
    combustible_mult?: number;
    seguridad_mult?: number;
    aux_calc_mult?: number;
    iva_valor?: number;
};

export type AerolineasPlantillaCreationAttributes = Omit<AerolineasPlantilla, 'id_aerolinea'>;