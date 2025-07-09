import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// Definición del modelo de productos o items que pertenecen a una orden
export const OrderItem = sequelize.define("orderitems", {
  // Id identificador de los items de la orden
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  // Identificador de la orden
  order_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  // Identificador del producto
  product_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  // Cantidad del producto
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
  // Precio unitario del producto
  unit_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  // Subtotal de la orden
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});
