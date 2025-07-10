import {
  createOrderService,
  getOrdersByUserService,
  getAllOrdersService,
} from "../services/order.service.js";

// Controlador encargado de crear una orden
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

// Controlador encarggado de optener todas las ordenes de un usuario autenticado
export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await getOrdersByUserService(req.uid);

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error al obtener las órdenes del usuario:", error);
    res.status(500).json({ message: "Error al obtener historial de órdenes." });
  }
};

/* Controlador encargado de obtener todas las órdenes del sistema de todos los usuarios.
 Solo accesible por usuarios con rol Administrador.*/
export const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrdersService();
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error al obtener todas las órdenes:", error);
    return res.status(500).json({
      message: "Error interno del servidor al obtener las órdenes.",
    });
  }
};
