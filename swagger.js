const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bhu Bharati EC Automation API",
      version: "1.0.0",
      description: "API for downloading Encumbrance Certificate (EC) PDFs."
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./routes/*.js"]
};

module.exports = swaggerJsdoc(options);