import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// Definición del modelo de roles
export const Role = sequelize.define("roles", {
  // Id identificador de los roles
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  // Nombre del rol
  role_name: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
});

// Hook para insertar roles después de sincronizar la tabla
Role.afterSync(async () => {
  const roles = ["Admin", "Cliente"];
  await Role.bulkCreate(
    roles.map((role) => ({ role_name: role })),
    { ignoreDuplicates: true }
  );
});
