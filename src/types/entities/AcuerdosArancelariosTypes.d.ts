export type AcuerdoArancelario = {
    id_acuerdo: number;
    nombre: string;
}

export type AcuerdoArancelarioCreationAttributes = Omit<AcuerdoArancelario, 'id_acuerdo'>;