import bcrypt from "bcryptjs";
import { User } from "../models/users.model.js";
import { Address } from "../models/address.model.js";
import { sequelize } from "../config/db.js";
import { generateToken, generateRefreshToken } from "../utils/tokenManager.js";

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

  console.log(user);

  // Generar tokens
  const { token, expiresIn } = generateToken(user.id);
  generateRefreshToken(user.id, user.role_id, res);

  return { token, expiresIn };
};

// Servicio que gestiona el refreshToken del usuario que inicia sesión
export const refreshTokenService = (uid, role_id) => {
  return generateToken(uid, role_id);
};
