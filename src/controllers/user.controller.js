import { getUserProfileService } from "../services/user.service.js";

export const profile = async (req, res) => {
  try {
    const userProfile = await getUserProfileService(req.uid);

    if (!userProfile) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    return res.status(200).json(userProfile);
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);

    return res.status(500).json({
      message: "Error interno del servidor al obtener el perfil.",
    });
  }
};
