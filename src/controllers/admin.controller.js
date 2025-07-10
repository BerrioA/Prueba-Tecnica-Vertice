import { registerAdminService } from "../services/admin.service.js";

export const registerAdmin = async (req, res) => {
  try {
    const result = await registerAdminService(req.body);

    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }

    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error("Error al registrar el administrador:", error);
    return res.status(500).json({
      error: "Error interno del servidor al registrar el administrador.",
    });
  }
};
