import {
  createOrderService,
  getOrdersByUserService,
} from "../services/order.service.js";

export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Se requiere una lista de productos." });
    }

    const result = await createOrderService(req.uid, items);
    return res.status(201).json(result);
  } catch (error) {
    console.error("Error al crear la orden:", error);
    res.status(500).json({ message: "Error al crear la orden." });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await getOrdersByUserService(req.uid);

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error al obtener las órdenes del usuario:", error);
    res.status(500).json({ message: "Error al obtener historial de órdenes." });
  }
};
