import { body } from "express-validator";
import { validationResultExpress } from "./express-validator.js";

// Función para normalizar los textos con la primera letra en mayúscula
const firstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Validaciones para el registro del primer administrador
export const validateAdminRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Tu nombre es clave para continuar. ¡Solo falta eso!")
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("El nombre debe tener entre 3 y 30 caracteres.")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("Usa solo letras y espacios.")
    .customSanitizer(firstLetter)
    .escape(),

  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Tu apellido es clave para continuar.")
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("El apellido debe tener entre 3 y 30 caracteres.")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("Solo letras y espacios son permitidos.")
    .customSanitizer(firstLetter)
    .escape(),

  body("document_number")
    .trim()
    .notEmpty()
    .withMessage("El número de documento es obligatorio.")
    .isLength({ min: 7, max: 10 })
    .withMessage("Debe tener entre 7 y 10 dígitos.")
    .isNumeric()
    .withMessage("Solo se permiten números.")
    .escape(),

  body("cellphone")
    .trim()
    .notEmpty()
    .withMessage("El número de celular es obligatorio.")
    .matches(
      /^3(00|01|02|04|05|10|11|12|13|14|15|16|17|18|19|20|21|22|23|31|32|33|50|51)\d{7}$/
    )
    .withMessage("El número de celular no es válido.")
    .escape(),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio.")
    .isEmail()
    .withMessage("Debe ser un correo electrónico válido.")
    .normalizeEmail()
    .escape(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isLength({ min: 6 })
    .withMessage("Debe tener al menos 6 caracteres.")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "La contraseña debe contener mayúsculas, minúsculas y números."
    )
    .escape(),

  validationResultExpress,
];
