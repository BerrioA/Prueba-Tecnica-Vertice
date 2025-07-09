import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// Definición del modelo de Ordenes
export const Order = sequelize.define("orders", {
  // Id identificador de las ordenes
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  // Id identificador del usuario al cual pertenece la orden
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  // Total de la orden
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
});
