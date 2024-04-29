export type Usuario = {
    id_usuario: number;
    usuario: string;
    email: string | null;
    pass: string;
    pic: string | null;
}

export type UsuarioCreationAttributes = Omit<Usuario, 'id_usuario'>;