import { body } from "express-validator";
import { validationResultExpress } from "./express-validator.js";

// Validacion para registrar una orden con multiples productos
export const validateOrderCreate = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("La orden debe contener al menos un producto."),

  body("items.*.product_id")
    .notEmpty()
    .withMessage("El ID del producto es obligatorio.")
    .isUUID()
    .withMessage("El ID del producto debe ser un UUID válido."),

  body("items.*.quantity")
    .notEmpty()
    .withMessage("La cantidad del producto es obligatoria.")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un número entero mayor o igual a 1."),

  validationResultExpress,
];
