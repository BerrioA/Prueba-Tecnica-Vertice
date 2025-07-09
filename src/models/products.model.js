import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// Definición del modelo de productos
export const Product = sequelize.define("products", {
  // Id identificador de los productos
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  // Nombre del producto
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  // Descripción del producto
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // Precio del producto
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0,
    },
  },
  // Cantidad stock del producto
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  // Categoria del producto
  category: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});
