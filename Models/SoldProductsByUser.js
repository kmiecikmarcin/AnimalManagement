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

UserTransactions.belongsToMany(AllProductsFromAnimals, {
  through: { model: "SoldProductsByUser", unique: false },
});
AllProductsFromAnimals.belongsToMany(UserTransactions, {
  through: { model: "SoldProductsByUser", unique: false },
});

module.exports = SoldProductsByUser;
