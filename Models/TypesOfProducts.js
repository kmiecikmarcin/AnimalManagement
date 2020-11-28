const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");

const TypesOfProducts = sequelize.define(
  "TypesOfProducts",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idProductType",
    },
    name: {
      type: DataTypes.STRING(64),
      unique: true,
      allowNull: false,
      field: "nameOfProduct",
    },
  },
  { timestamps: true }
);

module.exports = TypesOfProducts;
