import { body, param } from "express-validator";
import { validationResultExpress } from "./express-validator.js";

// Función para normalizar los textos con la primera letra en mayuscula.
const firstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Validaciones para el registro de usuario
export const validateProductRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(
      "El nombre del producto es clave para continuar. ¡Solo falta eso!"
    )
    .isString()
    .isLength({ min: 3 })
    .withMessage("El nombre del producto parece un poco corto. ")
    .isLength({ max: 100 })
    .withMessage("El nombre del producto no puede tener más de 100 caracteres.")
    .matches(/^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s\-\.\#\(\)]+$/)
    .withMessage(
      "El nombre del producto contiene caracteres no válidos. Usa solo letras, números, espacios, guiones, puntos, # o paréntesis."
    )
    .customSanitizer(firstLetter)
    .escape(),

  body("description")
    .trim()
    .notEmpty()
    .withMessage(
      "La descripción del producto es clave para continuar. ¡Solo falta eso!"
    )
    .isString()
    .isLength({ min: 10 })
    .withMessage(
      "La descripción del producto parece un poco corta. Debe tener al menos 10 caracteres."
    )
    .isLength({ max: 500 })
    .withMessage(
      "La descripción del producto es demasiado larga. Máximo 500 caracteres."
    )
    .matches(/^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s.,;!?¿¡\-\(\)\/\&%#@*+="'$]+$/)
    .withMessage(
      "La descripción contiene caracteres no válidos. Por favor, usa letras, números, espacios y signos de puntuación comunes."
    )
    .escape(),

  body("price")
    .notEmpty()
    .withMessage("El precio es obligatorio.")
    .isFloat({ min: 0.01, max: 10000000.0 })
    .withMessage(
      "El precio debe ser un número válido entre $0.01 y $10,000,000.00."
    )
    .toFloat(),

  body("stock")
    .notEmpty()
    .withMessage("La cantidad en stock es obligatoria.")
    .isInt({ min: 0 })
    .withMessage(
      "La cantidad en stock debe ser un número entero válido y no negativo."
    )
    .toInt(),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("La categoría del producto es obligatoria.")
    .isString()
    .withMessage("La categoría debe ser texto.")
    .isLength({ min: 3, max: 50 })
    .withMessage("La categoría debe tener entre 3 y 50 caracteres.")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\-&]+$/)
    .withMessage("La categoría contiene caracteres no válidos.")
    .customSanitizer(firstLetter)
    .escape(),

  validationResultExpress,
];

export const validateProductId = [
  param("productId")
    .notEmpty()
    .withMessage("El ID del producto es obligatorio.")
    .isUUID()
    .withMessage("El ID del producto debe ser un UUID válido.")
    .escape(),

  validationResultExpress,
];
