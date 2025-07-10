import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Definición básica de Swagger (OpenAPI 3.0)
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
        url: "http://localhost:3000/api/ptvertice/v1",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // <-- ajusta si tienes tus rutas en otra carpeta
};

export const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(
    `🧾 Documentación Swagger disponible en http://localhost:3000/api-docs`
  );
};
