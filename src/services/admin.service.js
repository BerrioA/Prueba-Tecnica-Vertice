import bcrypt from "bcryptjs";
import { sequelize } from "../config/db.js";
import { User } from "../models/users.model.js";
import { Role } from "../models/roles.model.js";

// Servicio que gestiona el registro de un primer usuario como administrador
export const registerAdminService = async (userData) => {
  const t = await sequelize.transaction();

  try {
    // Validar que no exista ya un administrador
    const existingAdmin = await User.findOne({
      include: {
        model: Role,
        as: "role",
        where: { role_name: "Admin" },
      },
    });

    if (existingAdmin) {
      return {
        status: 403,
        error: "Ya existe un administrador registrado.",
      };
    }

    const adminRole = await Role.findOne({
      where: { role_name: "Admin" },
    });

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
