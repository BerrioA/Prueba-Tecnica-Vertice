import { registerUserService } from "../services/auth.service.js";

export const registerUser = async (req, res) => {
  try {
    const result = await registerUserService(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({
      error: "Ha ocurrido un error al registrar el usuario.",
    });
  }
};
