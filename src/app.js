import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import { swaggerDocs } from "./docs/swagger.js";

const app = express();

// Configuracion de CORS (Aqui estoy permitiendo el acceso desde el puesto 5173 ya que lo integre con React)
const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

//middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/ptvertice/v1/auth", authRoutes);
app.use("/api/ptvertice/v1/user", userRoutes);
app.use("/api/ptvertice/v1/products", productRoutes);
app.use("/api/ptvertice/v1/orders", orderRoutes);

swaggerDocs(app);
export default app;
