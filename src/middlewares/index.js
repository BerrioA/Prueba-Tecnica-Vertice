import { validateAdminRegister } from "./admin.validation.js";
import { requireRefreshToken, requireToken } from "./auth.middlewares.js";
import {
  validateUserRegister,
  loginValidation,
  validateExistingUser,
} from "./auth.validation.js";
import { validateOrderCreate } from "./order.validation.js";
import {
  validateProductId,
  validateProductRegister,
} from "./product.validation.js";
import { verifyAdmin, verifyClient } from "./role.middlewares.js";
import { validateAdminExistence } from "./validateAdminExistence.js";

export {
  validateExistingUser,
  validateUserRegister,
  loginValidation,
  requireRefreshToken,
  requireToken,
  verifyAdmin,
  verifyClient,
  validateProductRegister,
  validateProductId,
  validateOrderCreate,
  validateAdminRegister,
  validateAdminExistence,
};
