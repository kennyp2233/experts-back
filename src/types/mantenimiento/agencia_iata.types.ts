export type AgenciaIata = {
    id_agencia_iata: number;

    alias_shipper: string;
    nombre_shipper: string;
    ruc_shipper: string;
    direccion_shipper: string;
    telefono_shipper: string;
    ciudad_shipper: string;
    pais_shipper: string;

    nombre_carrier: string;
    ruc_carrier: string;
    direccion_carrier: string;
    telefono_carrier: string;
    ciudad_carrier: string;
    pais_carrier: string;
    iata_code_carrier: string;

    registro_exportador: string;
    codigo_operador: string;
    codigo_consolidador: string;
    comision: number;
    estado_agencia_iata: boolean;
}

export type AgenciaIataAtributosCreacion = Omit<AgenciaIata, 'id_agencia_iata'>;