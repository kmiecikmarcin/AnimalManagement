const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const Herd = require("./Herd");
const TypesOfJoinToTheHerd = require("./TypesOfJoinToTheHerd");
const SpeciesOfAnimals = require("./SpeciesOfAnimals");
const Genders = require("./Genders");

const AnimalsInHerd = sequelize.define(
  "AnimalsInHerd",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idAnimal",
    },
    identityNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "identityNumberOfAnimal",
    },
    joinDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "dateOfJoinToTheHerd",
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "birthDate",
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "animalWeight",
    },
  },
  { timestamps: true }
);

Herd.hasMany(SpeciesOfAnimals, {
  foreignKey: {
    allowNull: false,
    field: "idHerd",
  },
});

TypesOfJoinToTheHerd.hasMany(AnimalsInHerd, {
  foreignKey: {
    allowNull: false,
    field: "idJoinType",
  },
});

SpeciesOfAnimals.hasMany(SpeciesOfAnimals, {
  foreignKey: {
    allowNull: false,
    field: "idSpeciesOfAnimal",
  },
});

Genders.hasMany(SpeciesOfAnimals, {
  foreignKey: {
    allowNull: false,
    field: "idGender",
  },
});

module.exports = AnimalsInHerd;
