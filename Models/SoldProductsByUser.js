const { DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const AllProductsFromAnimals = require("./AllProductsFromAnimals");
const UserTransactions = require("./UserTransactions");

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

AllProductsFromAnimals.belongsToMany(UserTransactions, {
  through: SoldProductsByUser,
});

UserTransactions.belongsToMany(AllProductsFromAnimals, {
  through: SoldProductsByUser,
});

module.exports = SoldProductsByUser;
