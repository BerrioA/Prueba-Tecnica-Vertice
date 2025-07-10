import { Product } from "../models/products.model.js";

// Servicio para la gestión del registro de productos
export const registerProductService = async (productData) => {
  try {
    await Product.create(productData);
    return {
      message: "Producto registrado correctamente.",
    };
  } catch (error) {
    throw error;
  }
};

// Servicio para obtener todos los productos con información basica
export const getAllProductsService = async () => {
  return await Product.findAll({
    attributes: ["id", "name", "stock"],
    order: [["createdAt", "DESC"]],
  });
};

// Servicio para obtener un producto por ID con todos los detalles
export const getProductByIdService = async (productId) => {
  const product = await Product.findByPk(productId, {
    attributes: ["id", "name", "price", "stock", "description", "category"],
    order: [["createdAt", "DESC"]],
  });

  if (!product) {
    throw new Error("Producto no encontrado.");
  }

  return product;
};
