import { User } from "../models/users.model.js";
import { Role } from "../models/roles.model.js";

export const getUserProfileService = async (uid) => {
  const user = await User.findByPk(uid, {
    include: {
      model: Role,
      as: "role",
      attributes: ["role_name"],
    },
  });

  if (!user) {
    return null;
  }

  return {
    uid: user.id,
    name: user.name,
    last_name: user.last_name,
    document_number: user.document_number,
    cellphone: user.cellphone,
    email: user.email,
    role: user.role?.role_name,
  };
};
