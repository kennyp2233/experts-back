export type FuncionarioAgrocalidad = {
    id_funcionario_agrocalidad: number;
    nombre: string;
    telefono: string;
    email: string;
    estado: boolean;
}

export type FuncionarioAgrocalidadAtributosCreacion = Omit<FuncionarioAgrocalidad, 'id_funcionario_agrocalidad'>;