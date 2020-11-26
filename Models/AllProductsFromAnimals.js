const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const TypesOfProducts = require("./TypesOfProducts");
const Users = require("./Users");

const AllProductsFromAnimals = sequelize.define("", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,
    allowNull: false,
    field: "idProduct",
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: "quantityOfProduct",
  },
  currentQuentity: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: "currentQuantityOfProduct",
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    dield: "dateOfAddingProduct",
  },
});

TypesOfProducts.hasMany(AllProductsFromAnimals, {
  foreignKey: {
    allowNull: false,
    field: "idProductType",
  },
});

Users.hasMany(AllProductsFromAnimals, {
  foreignKey: {
    allowNull: false,
    field: "idUser",
  },
});

module.exports = AllProductsFromAnimals;
