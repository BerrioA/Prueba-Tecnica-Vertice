import { Product } from "../models/products.model.js";

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
