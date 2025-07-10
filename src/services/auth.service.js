import bcrypt from "bcryptjs";
import { User } from "../models/users.model.js";
import { Address } from "../models/address.model.js";
import { Role } from "../models/roles.model.js";
import { sequelize } from "../config/db.js";
import { generateToken, generateRefreshToken } from "../utils/tokenManager.js";

// Servicio que gestiona el registro de un primer usuario como administrador
export const registerAdminService = async (userData) => {
  const t = await sequelize.transaction();

  try {
    const adminRole = await Role.findOne({ where: { role_name: "Admin" } });

    if (!adminRole) {
      return {
        status: 500,
        error: "No se encontró el rol Administrador.",
      };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    await User.create(
      {
        name: userData.name,
        last_name: userData.last_name,
        document_number: userData.document_number,
        cellphone: userData.cellphone,
        email: userData.email,
        password: hashedPassword,
        role_id: adminRole.id,
      },
      { transaction: t }
    );

    await t.commit();
    return {
      status: 201,
      message: "Administrador registrado correctamente.",
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

// Servicio que gestiona el registro de un nuevo usuario
export const registerUserService = async ({ user, address }) => {
  const t = await sequelize.transaction();

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await User.create(
      {
        name: user.name,
        last_name: user.last_name,
        document_number: user.document_number,
        cellphone: user.cellphone,
        email: user.email,
        password: hashedPassword,
      },
      { transaction: t }
    );

    await Address.create(
      {
        address: address.address,
        city: address.city,
        state: address.state,
        zip_code: address.zip_code,
        is_default: address.is_default,
        user_id: newUser.id,
      },
      { transaction: t }
    );

    await t.commit();

    return { message: "Usuario registrado correctamente." };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

// Servicio que gestiona el login de un usuario
export const loginUserService = async ({ email, password }, res) => {
  const user = await User.findOne({
    where: { email },
    attributes: ["id", "password", "role_id"],
  });

  // Retornar si usuario no es encontrado por su direccion de email
  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // Comparar contraseñas
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // Generar tokens
  const { token, expiresIn } = generateToken(user.id);
  generateRefreshToken(user.id, user.role_id, res);

  return { token, expiresIn };
};

// Servicio que gestiona el refreshToken del usuario que inicia sesión
export const refreshTokenService = (uid, role_id) => {
  return generateToken(uid, role_id);
};

// Servicio que gestiona el logout de un usuario autenticado
export const logoutService = (req, res) => {
  if (!req?.cookies?.refreshToken) {
    return { cleared: false, message: "No hay sesión activa." };
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return { cleared: true, message: "Sesión cerrada correctamente." };
};
