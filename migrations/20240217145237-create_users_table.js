'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
          type: Sequelize.STRING,
          allowNull: false
      },
      lastName: {
          type: Sequelize.STRING,
          allowNull: false
      },
      birthDate: {
          type: Sequelize.DATE,
          allowNull: false
      },
      gender: {
          type: Sequelize.ENUM('Male', 'Female', 'N/A'),
          allowNull: false
      },
      username: {
          type: Sequelize.STRING,
          allowNull: false
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

    await queryInterface.addIndex('users', ['firstName']);
    await queryInterface.addIndex('users', ['lastName']);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('users');
  }
};
