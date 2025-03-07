import { UUID } from "crypto";

export type Usuario = {
    id_usuario: UUID;
    usuario: string;
    email: string | null;
    pass: string;
}

export type UsuarioAtributosCreacion = Omit<Usuario, 'id_usuario'>;