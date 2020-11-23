const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const TypesOfAnimals = require("./TypesOfAnimals");

const SpeciesOfAnimals = sequelize.define(
  "KindOfAnimals",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idKindOfAnimals",
    },
    name: {
      type: DataTypes.STRING(256),
      unique: true,
      allowNull: false,
      field: "nameKindOfAnimal",
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
