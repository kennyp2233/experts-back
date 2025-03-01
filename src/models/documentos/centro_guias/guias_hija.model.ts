import sequelize from "@db/experts.db";

import { DataTypes, Model } from "sequelize";

interface GuiaHijaAttributes {
    id: number;
    id_guia_madre: number;
    id_finca: number;
}