const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../../../kit/platform/database');

const User = sequelize.define('User', {
    UserID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    UserPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [5],
                msg: 'La contraseña debe ser de por lo menos 5 caracteres'
            }
        }
    },

}, {
    tableName: 'USERS',
    timestamps: false,
});


module.exports = User;
