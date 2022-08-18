'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('schools', {
      id: {
        allowNull: false,
       // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.STRING
      },
      how_long: {
        type: Sequelize.STRING
      },
      frequency: {
        type: Sequelize.INTEGER
      },
      level: {
        type: Sequelize.STRING
      },
      cat_id: {
        type: Sequelize.STRING
      },
      prov_name: {
        type: Sequelize.STRING
      },
      dis_name: {
        type: Sequelize.STRING
      },
      sec_name: {
        type: Sequelize.STRING
      },
      cell_name: {
        type: Sequelize.STRING
      },
      vil_name: {
        type: Sequelize.STRING
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('schools');
  }
};