const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../../kit/platform/database');
const User = require('../../user/entity/userEntity');
const Status = require('../entities/statusEntity');

const TaskEntity = sequelize.define('Task', {
    TaskID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    TaskDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    StatusID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Status,
            key: 'StatusID',
        },
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'UserID',
        },
    },
}, {
    timestamps: false,
    tableName: 'TASK',
});

// Definición de relaciones
TaskEntity.belongsTo(User, { foreignKey: 'UserID', as: 'user' });
TaskEntity.belongsTo(Status, { foreignKey: 'StatusID', as: 'status' });

module.exports = TaskEntity;
