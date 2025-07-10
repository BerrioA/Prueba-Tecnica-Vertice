import { User } from "../models/users.model.js";
import { Role } from "../models/roles.model.js";
import { Address } from "../models/address.model.js";

// Servicio encargado de gestionar y retornar la información del usuario autenticado
export const getUserProfileService = async (uid) => {
  const user = await User.findByPk(uid, {
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["role_name"],
      },
      {
        model: Address,
        as: "addresses",
        attributes: [
          "id",
          "address",
          "city",
          "state",
          "zip_code",
          "is_default",
        ],
      },
    ],
  });

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    last_name: user.last_name,
    document_number: user.document_number,
    cellphone: user.cellphone,
    email: user.email,
    role: user.role?.role_name,
    addresses:
      user.addresses?.map((addr) => ({
        id: addr.id,
        address: addr.address,
        city: addr.city,
        state: addr.state,
        zip_code: addr.zip_code,
        is_default: addr.is_default,
      })) || [],
  };
};
