export type SubAgencia = {
    id_subagencia: number;
    nombre: string;
    ci_ruc: string;
    direccion: string;
    telefono: string;
    email: string;
    ciudad: string;
    pais: string;
    provincia: string;
    representante: string;
    comision: number;
    estado: boolean;
}

export type SubAgenciaAtributosCreacion = Omit<SubAgencia, 'id_subagencia'>;