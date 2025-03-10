import { UUID } from "crypto";

export type UsuarioAtributos = {
    id_usuario: UUID;
    usuario: string;
    email: string | null;
    pass: string;
}

export type UsuarioAtributosCreacion = Omit<UsuarioAtributos, 'id_usuario'>;