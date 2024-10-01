import Paises from "@models/mantenimiento/pais.model";
import AcuerdosArancelarios from "@models/mantenimiento/acuerdo_arancelario.model";

Paises.belongsTo(AcuerdosArancelarios, { foreignKey: 'id_acuerdo' });
AcuerdosArancelarios.hasOne(Paises, { foreignKey: 'id_acuerdo' });