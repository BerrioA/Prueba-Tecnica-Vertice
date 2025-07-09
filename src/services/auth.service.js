import bcrypt from "bcryptjs";
import { User } from "../models/users.model.js";
import { Address } from "../models/address.model.js";
import { sequelize } from "../config/db.js";

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
