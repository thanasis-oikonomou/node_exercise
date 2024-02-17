'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true
      },
      content: {
          type: Sequelize.TEXT,
          allowNull: false
      },
      timestampSent: {
          type: Sequelize.DATE,
          allowNull: false
      },
      seen: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
      },
      senderId: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
              model: 'users',
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
      receiverId: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
              model: 'users',
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
      createdAt: {
          allowNull: false,
          type: Sequelize.DATE
      },
      updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('messages', ['senderId']);
    await queryInterface.addIndex('messages', ['receiverId']);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('messages');
  }
};
