require('dotenv').config();
const { Sequelize } = require('sequelize');

// Configuración de la base de datos desde .env
const config = {
    server: 'localhost',
    database: 'TaskManager',
    user: 'root',
    password: "root1234",
    port: 1433
};


// Crear la conexión a la base de datos
const connection = new Sequelize(config.database, config.user, config.password, {
    host: config.server,
    port: config.port,
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
    dialectOptions: {
        instanceName: process.env.DB_INSTANCE_NAME
    },
    logging: console.log,
});

// Test the database connection
connection.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida con éxito.');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });


module.exports = connection;
