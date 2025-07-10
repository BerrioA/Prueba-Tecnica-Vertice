import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Role } from "./roles.model.js";

export const User = sequelize.define("users", {
  // Id identificador de los Usuarios
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  // Nombre del usuario
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  // Primer apellido del usuario
  last_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  // Número de documento de identidad del usuario
  document_number: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
    validate: {
      isNumeric: true,
      len: [7, 10],
    },
  },
  // Celular del usuario
  cellphone: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [10, 10],
    },
  },
  // Correo del usuario
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  // Contraseña del usuario
  password: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  // Rol del usuario
  role_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
});

// Hook para asignar automáticamente el rol de Usuarios a nuevos usuarios
User.beforeCreate(async (user) => {
  if (!user.role_id) {
    try {
      const userRole = await Role.findOne({
        where: { role_name: "Cliente" },
      });

      if (userRole) {
        user.role_id = userRole.id;
      } else {
        console.error("No se encontró el rol de Usuario");
      }
    } catch (error) {
      console.error("Error al asignar rol por defecto:", error);
    }
  }
});
