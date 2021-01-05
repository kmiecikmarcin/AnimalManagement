const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const TypesOfFood = require("./TypesOfFood");

const SpeciesOfFoods = sequelize.define(
  "SpeciesOfFoods",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idSpeciesOfFood",
    },
    name: {
      type: DataTypes.STRING(256),
      unique: true,
      allowNull: false,
      field: "nameOfSpeciesFood",
    },
  },
  { timestamps: true }
);

TypesOfFood.hasMany(SpeciesOfFoods, {
  foreignKey: {
    allowNull: false,
    field: "idTypeOfFood",
  },
});
SpeciesOfFoods.belongsTo(TypesOfFood);

module.exports = SpeciesOfFoods;
