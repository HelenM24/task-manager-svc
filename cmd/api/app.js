require('dotenv').config();
const express = require('express');
const sequelize = require('../../kit/platform/database');
const userRoutes = require('../../internal/user/routes/userRoutes');
const taskRoutes = require('../../internal/task/routes/taskRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');


const app = async() => {

    const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task management",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:8080",
            }
        ]
    },
        apis: [
            `${path.join(__dirname, "../../internal/user/routes/userRoutes.js")}`,
            `${path.join(__dirname, "../../internal/task/routes/taskRoutes.js")}`
        ],
    }

//Instancia express
    const app = express();

    app.use(express.json());

    app.use('/users', userRoutes);
    app.use('/task', taskRoutes);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerSpec)));

    app.listen(3000, () => console.log("Server started on port 3000"));

}

app();