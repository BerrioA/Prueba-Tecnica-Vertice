import { Role } from "./roles.model.js";
import { User } from "./users.model.js";
import { Address } from "./address.model.js";
import { Product } from "./products.model.js";
import { Order } from "./orders.model.js";
import { OrderItem } from "./orderItems.model.js";

// 1 Rol tiene muchos Usuarios
Role.hasMany(User, { foreignKey: "role_id", as: "users" });
User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

// 1 Usuario registra muchos Productos
User.hasMany(Product, { foreignKey: "created_by", as: "products" });
Product.belongsTo(User, {
  foreignKey: "created_by",
  as: "creator",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

// 1 Usuario tiene muchas direcciones
User.hasMany(Address, { foreignKey: "user_id", as: "addresses" });
Address.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// 1 Usuario crea muchas Órdenes
User.hasMany(Order, { foreignKey: "user_id", as: "orders" });
Order.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// 1 Orden puede tener varios OrderItems
Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
OrderItem.belongsTo(Order, {
  foreignKey: "order_id",
  as: "order",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// 1 Producto puede estar en múltiples OrderItems
Product.hasMany(OrderItem, { foreignKey: "product_id", as: "orderItems" });
OrderItem.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
