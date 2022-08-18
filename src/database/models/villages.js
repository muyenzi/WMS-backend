'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class villages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  villages.init({
    villages: DataTypes.STRING,
    CellId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'villages',
  });
  return villages;
};