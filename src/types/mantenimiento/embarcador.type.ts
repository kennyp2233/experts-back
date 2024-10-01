export type Embarcador = {
    id_embarcador: number,
    nombre: string,
    ci?: string,
    direccion?: string,
    telefono?: string,
    email?: string,
    ciudad?: string,
    provincia?: string,
    pais?: string,
    embarcador_codigo_pais?: string,
    handling?: number,
    estado?: boolean,
}

export type EmbarcadorAtributosCreacion = Omit<Embarcador, 'id_embarcador'>;