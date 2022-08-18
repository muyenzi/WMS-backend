'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cells extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cells.init({
    Cells: DataTypes.STRING,
    SectorId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cells',
  });
  return cells;
};