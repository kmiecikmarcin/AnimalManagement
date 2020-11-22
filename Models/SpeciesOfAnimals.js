const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const TypesOfAnimals = require("./TypesOfAnimals");

const SpeciesOfAnimals = sequelize.define(
  "SpeciesOfAnimals",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idSpeciesOfAnimals",
    },
    name: {
      type: DataTypes.STRING(256),
      unique: true,
      allowNull: false,
      field: "nameOfSpecies",
    },
  },
  { timestamps: true }
);

TypesOfAnimals.hasMany(SpeciesOfAnimals, {
  foreignKey: {
    allowNull: false,
    name: "idTypesOfAnimals",
  },
});

module.exports = SpeciesOfAnimals;
