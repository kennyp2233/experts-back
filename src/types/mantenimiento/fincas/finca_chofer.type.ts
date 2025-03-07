export type FincaChoferes = {
    id_fincas_choferes: number;
    id_finca: number;
    id_chofer: string;
};

export type FincaChoferesCreationAttributes = Omit<FincaChoferes, 'id_fincas_choferes'>;