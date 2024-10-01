export type AcuerdoArancelario = {
    id_acuerdo: number;
    nombre: string;
}

export type AcuerdoArancelarioAtributosCreacion = Omit<AcuerdoArancelario, 'id_acuerdo'>;