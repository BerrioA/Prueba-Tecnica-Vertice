import { registerProductService } from "../services/product.service.js";

export const registerProduct = async (req, res) => {
  try {
    const result = await registerProductService(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error al registrar el producto:", error);
    res.status(500).json({
      error: "Ha ocurrido un error al registrar el producto.",
    });
  }
};
