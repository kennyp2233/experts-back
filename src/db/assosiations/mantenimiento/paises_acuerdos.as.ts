import Paises from "@dbModels/mantenimiento/paises.model";
import AcuerdosArancelarios from "@dbModels/mantenimiento/acuerdos_arancelarios.model";

Paises.belongsTo(AcuerdosArancelarios, { foreignKey: 'id_acuerdo' });
AcuerdosArancelarios.hasOne(Paises, { foreignKey: 'id_acuerdo' });