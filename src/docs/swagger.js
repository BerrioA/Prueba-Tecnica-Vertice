import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Documentacion base con Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Tienda Vertice",
      version: "1.0.0",
      description: "Documentación de la API para la prueba técnica Vertice",
    },
    servers: [
      {
        url: "https://pt-vertice-alejandroberrio.onrender.com/api-docs/api/ptvertice/v1",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(
    `🧾 Documentación Vertice disponible en http://localhost:3000/api-docs`
  );
};
