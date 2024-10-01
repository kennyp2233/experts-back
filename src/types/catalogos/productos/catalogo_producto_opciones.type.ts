export type CatalogoProductoOpciones = {
    id_opcion: number;
    nombre: string;
}

export type CatalogoProductoOpcionesCreationAttributes = Omit<CatalogoProductoOpciones, 'id_opcion'>;