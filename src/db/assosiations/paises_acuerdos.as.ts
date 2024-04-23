import Paises from "@dbModels/paises.model";
import AcuerdosArancelarios from "@dbModels/acuerdos_arancelarios";

Paises.belongsTo(AcuerdosArancelarios, { foreignKey: 'id_acuerdo' });
AcuerdosArancelarios.hasOne(Paises, { foreignKey: 'id_acuerdo' });