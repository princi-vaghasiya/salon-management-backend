const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Salon Management System API",
            version: "1.0.0",
            description: "API documentation for Salon Management System"
        },

            components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
                servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },
    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;