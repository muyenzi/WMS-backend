'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cells', {
      id: {
        allowNull: false,
       // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      Cells: {
        type: Sequelize.STRING
      },
      SectorId: {
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
    await queryInterface.dropTable('cells');
  }
};