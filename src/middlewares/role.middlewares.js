import { Role } from "../models/roles.model.js";

const validateRole = async (role_id) => {
  try {
    const role = await Role.findByPk(role_id, { attributes: ["role_name"] });

    if (!role) {
      return "Rol no encontrado";
    }

    switch (role.role) {
      case "Admin":
        return "Admin";

      case "User":
        return "User";

      default:
        return "Rol no existente";
    }
  } catch (error) {
    console.error(
      "Se ha presentado un error al intentar validar el rol del usuario.",
      error
    );

    return res.status(500).json({
      error:
        "Se ha presentado un error al intentar validar el rol del usuario.",
    });
  }
};

// Middleware encargado de validar el rol administrador
export const verifyAdmin = async (req, res, next) => {
  try {
    const roleAdmin = await validateRole(req.role_id);

    if (roleAdmin === "Admin") {
      return next();
    }

    return res.status(403).json({
      message: "Acceso denegado, solo Administrador.",
    });
  } catch (error) {
    console.error("Error al validar el rol:", error);

    return res.status(500).json({
      error: "Error al validar el rol Administrador.",
    });
  }
};

// Middleware encargado de validar el rol Usuario
export const verifyUser = async (req, res, next) => {
  try {
    const roleUser = await validateRole(req.role_id);

    if (roleUser === "User") {
      return next();
    }

    return res.status(400).json({
      message: "Acceso denegado, solo usuario Usuario autenticado.",
    });
  } catch (error) {
    console.error("Error al validar el rol:", error);

    return res.status(500).json({
      error: "Error al validar el rol de usuario.",
    });
  }
};
