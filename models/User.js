const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(require('../config/config')[process.env.NODE_ENV]);

const Message = require('./Message');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female', 'N/A'),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

User.hasMany(Message, { as: 'sentMessages', foreignKey: 'senderId' });
User.hasMany(Message, { as: 'receivedMessages', foreignKey: 'receiverId' });

module.exports = User;
