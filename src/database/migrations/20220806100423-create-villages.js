'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('villages', {
      id: {
        allowNull: false,
       // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      villages: {
        type: Sequelize.STRING
      },
      CellId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.STRING
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('villages');
  }
};