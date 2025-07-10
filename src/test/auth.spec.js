// __tests__/auth.spec.js
import request from "supertest";
import app from "../src/app.js";
import { sequelize } from "../src/config/db.js";

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reinicia la DB antes de correr los tests
});

afterAll(async () => {
  await sequelize.close(); // Cierra conexión al finalizar
});

describe("🧪 Pruebas de autenticación", () => {
  const testUser = {
    user: {
      name: "Juan",
      last_name: "Pérez",
      document_number: "123456789",
      cellphone: "3001234567",
      email: "juanperez@example.com",
      password: "Test1234",
    },
    address: {
      address: "Calle 123",
      city: "Bogotá",
      state: "Cundinamarca",
      zip_code: "110111",
      is_default: true,
    },
  };

  it("📌 Registro de usuario - POST /auth/register", async () => {
    const res = await request(app)
      .post("/api/ptvertice/v1/auth/register")
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty(
      "message",
      "Usuario registrado correctamente."
    );
  });

  it("📌 Login de usuario - POST /auth/login", async () => {
    const res = await request(app).post("/api/ptvertice/v1/auth/login").send({
      email: testUser.user.email,
      password: testUser.user.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");

    // Guarda el token para futuras pruebas si deseas
  });
});
