import { body } from "express-validator";
import { validationResultExpress } from "./express-validator.js";

// Función para normalizar los textos con la primera letra en mayuscula.
const firstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Validaciones para el registro de usuario
export const validateUserRegister = [
  body("user.name")
    .trim()
    .notEmpty()
    .withMessage("Tu nombre es clave para continuar. ¡Solo falta eso!")
    .isString()
    .isLength({ min: 3 })
    .withMessage("¡Hola! Tu nombre parece un poco corto. ")
    .isLength({ max: 30 })
    .withMessage("¡Hola! Tu nombre no puede tener más de 30 caracteres.")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage(
      "Los números y símbolos están de vacaciones. Usa solo letras y espacios en tu nombre."
    )
    .customSanitizer(firstLetter)
    .escape(),

  body("user.last_name")
    .trim()
    .notEmpty()
    .withMessage("Tu apellido es clave para continuar. ¡Solo falta eso!")
    .isString()
    .isLength({ min: 3 })
    .withMessage("¡Hola! Tu primer apellido parece un poco corto. ")
    .isLength({ max: 30 })
    .withMessage("¡Hola! Tu apellido no puede tener más de 30 caracteres.")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage(
      "Los números y símbolos están de vacaciones. Usa solo letras y espacios en tu apellido."
    )
    .customSanitizer(firstLetter)
    .escape(),

  body("user.document_number")
    .trim()
    .notEmpty()
    .withMessage(
      "El número de documento es clave para continuar. ¡Solo falta eso!"
    )
    .isLength({ min: 7, max: 10 })
    .withMessage("El número de documento debe tener entre 7 y 10 dígitos")
    .isNumeric()
    .withMessage("El número de documento solo debe contener números")
    .escape(),

  body("user.cellphone")
    .trim()
    .notEmpty()
    .withMessage(
      "El número de teléfono es clave para continuar. ¡Solo falta eso!"
    )
    .matches(
      /^3(00|01|02|04|05|10|11|12|13|14|15|16|17|18|19|20|21|22|23|31|32|33|50|51)\d{7}$/
    )
    .withMessage("¡Ups! Parece que el número de celular no es válido.")
    .escape(),

  body("user.email")
    .trim()
    .notEmpty()
    .withMessage(
      "¡Espera! Necesitamos tu correo electrónico antes de continuar."
    )
    .isEmail()
    .withMessage("Por favor, utiliza un correo valido para poder continuar.")
    .normalizeEmail()
    .escape(),

  body("user.password")
    .trim()
    .notEmpty()
    .withMessage(
      "¡Ups! Parece que olvidaste crear una contraseña. ¡Es hora de inventar algo seguro!"
    )
    .isLength({ min: 6 })
    .withMessage(
      "Las contraseñas cortas no tienen poder. ¡Dale un poco más de longitud!"
    )
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "Las contraseñas sin mayúsculas, minusculas y números no tienen superpoderes. ¡Dales un toque extra!"
    )
    .escape(),

  body("address.address")
    .trim()
    .notEmpty()
    .withMessage("La dirección es obligatoria.")
    .isString()
    .matches(/^[A-Za-z0-9\s#-]+$/)
    .withMessage("La dirección contiene caracteres no válidos.")
    .isLength({ min: 6 })
    .withMessage("La dirección debe tener al menos 6 caracteres.")
    .customSanitizer(firstLetter)
    .escape(),

  body("address.city")
    .trim()
    .notEmpty()
    .withMessage("La ciudad es obligatoria.")
    .matches(/^[A-Za-z0-9#\-\sÁÉÍÓÚáéíóúÑñ]+$/)
    .withMessage("La ciudad contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("La ciudad debe tener al menos 3 caracteres.")
    .customSanitizer(firstLetter)
    .escape(),

  body("address.state")
    .trim()
    .notEmpty()
    .withMessage("El departamento es obligatoria.")
    .matches(/^[A-Za-z0-9#\-\sÁÉÍÓÚáéíóúÑñ]+$/)
    .withMessage("El departamento contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("El departamento debe tener al menos 3 caracteres.")
    .customSanitizer(firstLetter)
    .escape(),

  body("address.zip_code")
    .trim()
    .notEmpty()
    .withMessage("El código postal es obligatorio.")
    .isLength({ min: 6, max: 6 })
    .withMessage("El código postal debe tener exactamente 6 dígitos.")
    .isNumeric()
    .withMessage("El código postal debe contener solo números.")
    .escape(),

  body("address.is_default")
    .optional()
    .isBoolean()
    .withMessage(
      "El valor para 'dirección predeterminada' debe ser verdadero o falso."
    )
    .toBoolean(),

  validationResultExpress,
];
