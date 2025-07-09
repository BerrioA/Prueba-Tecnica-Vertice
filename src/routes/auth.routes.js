import express from "express";
import { validateUserRegister } from "../middlewares/handleErrors.js";
import { registerUser } from "../controllers/index.js";

const app = express();

app.post("/register", validateUserRegister, registerUser);

export default app;
