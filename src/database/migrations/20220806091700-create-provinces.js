'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('provinces', {
      id: {
        allowNull: false,
       // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      Provinces: {
        type: Sequelize.STRING
      },createdAt: {
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
    await queryInterface.dropTable('provinces');
  }
};