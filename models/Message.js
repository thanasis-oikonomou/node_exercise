const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(require('../config/config')[process.env.NODE_ENV]);

const Message = sequelize.define('message', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    timestampSent: {
        type: DataTypes.DATE,
        allowNull: false
    },
    seen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = Message;
