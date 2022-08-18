'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class publicplaces extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  publicplaces.init({
    name: DataTypes.STRING,
    source: DataTypes.STRING,
    how_long: DataTypes.STRING,
    frequency: DataTypes.INTEGER,
    type: DataTypes.STRING,
    cat_id: DataTypes.STRING,
    prov_name: DataTypes.STRING,
    dis_name: DataTypes.STRING,
    sec_name: DataTypes.STRING,
    cell_name: DataTypes.STRING,
    vil_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'publicplaces',
  });
  return publicplaces;
};