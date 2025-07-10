import { Order } from "../models/orders.model.js";
import { OrderItem } from "../models/orderItems.model.js";
import { Product } from "../models/products.model.js";
import { sequelize } from "../config/db.js";

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

  return orders;
};
