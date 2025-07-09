import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// Definición del modelo de direccióon
export const Address = sequelize.define("addresses", {
  // Id identificador de las direcciones
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  // Identificador del usuario al cual pertenece la dirección
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  // Calle, Carrera, Avenida, Diagonal, etc.
  address: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  // Ciudad
  city: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  // Estado o Departamento
  state: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  // Código postal
  zip_code: {
    type: DataTypes.STRING(6),
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [6, 6],
    },
  },
  // Establecer dirección como principal o no.
  is_default: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
