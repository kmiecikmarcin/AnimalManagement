const { DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const AllProductsFromAnimals = require("./AllProductsFromAnimals");
const AddingTransactionForSoldOrderByUser = require("./AddingTransactionForSoldOrderByUser");

const SoldProductsByUser = sequelize.define(
  "SoldProductsByUser",
  {
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "soldQuantityOfProduct",
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "price",
    },
  },
  { timestamps: true }
);

AllProductsFromAnimals.belongsToMany(AddingTransactionForSoldOrderByUser, {
  through: SoldProductsByUser,
});

AddingTransactionForSoldOrderByUser.belongsToMany(AllProductsFromAnimals, {
  through: SoldProductsByUser,
});

module.exports = SoldProductsByUser;
