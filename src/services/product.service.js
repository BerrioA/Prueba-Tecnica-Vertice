import { Product } from "../models/products.model.js";

export const registerProductService = async (product) => {
  try {
    const newProduct = await Product.create({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      created_by: req.uid,
    });

    return { message: "Producto registrado correctamente.", newProduct };
  } catch (error) {
    throw error;
  }
};
