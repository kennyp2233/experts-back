import { UUID } from "crypto";

export type Admin = {
    id_usuario: UUID;
}

export type AdminAtrubutosCreacion = Omit<Admin, 'id_usuario'>;