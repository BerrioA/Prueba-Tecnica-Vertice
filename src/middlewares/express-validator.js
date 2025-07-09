import { validationResult } from "express-validator";

// Tomamos los resultados de los errores y me retonar el primero de los errores hayados.
export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    return res.status(400).json({ error: firstError.msg });
  }

  next();
};
