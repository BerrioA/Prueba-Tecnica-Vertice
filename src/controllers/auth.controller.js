import {
  registerUserService,
  loginUserService,
  refreshTokenService,
  logoutService,
} from "../services/auth.service.js";

// Controlador encargado de registrar un usuario
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

// Controlador encargado de realizar el login de usuario
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUserService({ email, password }, res);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);

    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(403).json({ message: "Credenciales incorrectas." });
    }

    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

// Controlador encargado de solicitar el refreshToken
export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = refreshTokenService(req.uid, req.role_id);
    return res.status(200).json({ token, expiresIn });
  } catch (error) {
    console.error("Error al generar el RefreshToken:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

// Controlador encargado de cerrar la sesion del usuario autenticado
export const logout = (req, res) => {
  try {
    const result = logoutService(req, res);

    return res.status(200).json({ message: result.message });
  } catch (error) {
    console.error("Error al intentar cerrar sesión:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
