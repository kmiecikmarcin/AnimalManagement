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
      field: "dateWhenProductWasAdded",
    },
  },
  { timestamps: true }
);

AnimalsInHerd.belongsToMany(AllProductsFromAnimals, {
  through: { model: "ProductFromAnAnimal", unique: false },
});
AllProductsFromAnimals.belongsToMany(AnimalsInHerd, {
  through: { model: "ProductFromAnAnimal", unique: false },
});

module.exports = ProductFromAnAnimal;
