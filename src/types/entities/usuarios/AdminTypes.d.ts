export type Admin = {
    id_usuario: number;
}

export type AdminCreationAttributes = Omit<Admin, 'id_usuario'>;