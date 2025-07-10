import { User } from "../models/users.model.js";
import { Role } from "../models/roles.model.js";

// Middleware encargado de validar si ya existe un administrador y bloquear el paso
export const validateAdminExistence = async (req, res, next) => {
  try {
    const existingAdmin = await User.findOne({
      include: {
        model: Role,
        as: "role",
        where: { role_name: "Admin" },
      },
    });

    if (existingAdmin) {
      return res.status(403).json({
        message: "Esta ruta no está disponible.",
      });
    }

    next();
  } catch (error) {
    console.error("Error al validar existencia de administrador:", error);
    return res.status(500).json({
      message: "Error al verificar si ya existe un administrador.",
    });
  }
};
