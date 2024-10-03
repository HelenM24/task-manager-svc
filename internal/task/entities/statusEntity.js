const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../../kit/platform/database');

const Status = sequelize.define('Status', {
    StatusID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    StatusDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
}, {
    timestamps: false,
    tableName: 'TASK_STATUS',
});

module.exports = Status;
