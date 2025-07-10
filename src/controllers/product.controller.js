import {
  getAllProductsService,
  getProductByIdService,
  registerProductService,
} from "../services/product.service.js";

// Controlador para registrar productos
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

// Controlador para obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Controlador para obtener los detalles de un producto por ID
export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await getProductByIdService(productId);
    res.status(200).json(product);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(404).json({ error: error.message });
  }
};
