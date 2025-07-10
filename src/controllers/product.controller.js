import { registerProductService } from "../services/product.service.js";

export const registerProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    const result = await registerProductService({
      name,
      description,
      price,
      stock,
      category,
      created_by: req.uid, // Toma el id del usuario mediante el token del usuario autenticado
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Error al registrar el producto:", error);
    res.status(500).json({
      error: "Ha ocurrido un error al registrar el producto.",
    });
  }
};
