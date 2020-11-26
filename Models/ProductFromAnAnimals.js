const { DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const AllProductsFromAnimals = require("./AllProductsFromAnimals");
const AnimalsInHerd = require("./AnimalsInHerd");

const ProductFromAnAnimal = sequelize.define(
  "ProductFromAnAnimal",
  {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "dateOfAddedProductFromAnAnimal",
    },
  },
  { timestamps: true }
);

AllProductsFromAnimals.belongsToMany(AnimalsInHerd, {
  through: ProductFromAnAnimal,
});

AnimalsInHerd.belongsToMany(AllProductsFromAnimals, {
  through: ProductFromAnAnimal,
});

module.exports = ProductFromAnAnimal;
