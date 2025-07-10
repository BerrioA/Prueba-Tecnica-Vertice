import { Order } from "../models/orders.model.js";
import { OrderItem } from "../models/orderItems.model.js";
import { Product } from "../models/products.model.js";
import { sequelize } from "../config/db.js";
import { User } from "../models/users.model.js";

// Servicio que gestiona la creacion de una orden
export const createOrderService = async (uid, items) => {
  const t = await sequelize.transaction();
  try {
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findByPk(item.product_id);

      if (!product) {
        throw new Error(`Producto no encontrado con ID: ${item.product_id}`);
      }

      const unit_price = parseFloat(product.price);
      const subtotal = unit_price * item.quantity;

      orderItems.push({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price,
        subtotal,
      });
    }

    const total = orderItems.reduce((acc, item) => acc + item.subtotal, 0);

    const newOrder = await Order.create(
      { user_id: uid, total },
      { transaction: t }
    );

    for (const item of orderItems) {
      await OrderItem.create(
        {
          order_id: newOrder.id,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          subtotal: item.subtotal,
        },
        { transaction: t }
      );
    }

    await t.commit();
    return {
      message: "Orden creada correctamente.",
      order_id: newOrder.id,
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

// Servicio que gestiona las ordenes de un usuario autenticado
export const getOrdersByUserService = async (uid) => {
  const orders = await Order.findAll({
    where: { user_id: uid },
    include: {
      model: OrderItem,
      as: "items",
      include: {
        model: Product,
        as: "product",
        attributes: ["name", "price"],
      },
    },
    order: [["createdAt", "DESC"]],
  });

  /* Transformación de los datos para una respuesta más limpia, 
  para que asi el front pueda integrar esta respuesta de manera mas optima */
  const formattedOrders = orders.map((order) => ({
    order_id: order.id,
    total: order.total,
    items: order.items.map((item) => ({
      product_name: item.product.name,
      unit_price: item.unit_price,
      quantity: item.quantity,
      subtotal: item.subtotal,
    })),
  }));

  return formattedOrders;
};

// Servicio que gestiona la obtención de todas las ordenes (solo para administradores)
export const getAllOrdersService = async () => {
  const orders = await Order.findAll({
    include: [
      {
        model: OrderItem,
        as: "items",
        include: {
          model: Product,
          as: "product",
          attributes: ["name", "price"],
        },
      },
      {
        model: User,
        as: "user",
        attributes: ["name", "last_name", "email"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  const formattedOrders = orders.map((order) => ({
    order_id: order.id,
    total: order.total,
    user: {
      id: order.user_id,
      name: order.user?.name,
      last_name: order.user?.last_name,
      email: order.user?.email,
    },
    items: order.items.map((item) => ({
      product_name: item.product.name,
      unit_price: item.unit_price,
      quantity: item.quantity,
      subtotal: item.subtotal,
    })),
  }));

  return formattedOrders;
};
