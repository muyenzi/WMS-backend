'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class organizations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  organizations.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'organizations',
  });
  return organizations;
};