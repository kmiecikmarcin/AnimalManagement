const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const AnimalsInHerd = require("./AnimalsInHerd");
const KindOfAnimals = require("./KindOfAnimals");
const Herd = require("./Herds");

const AnimalsBirth = sequelize.define(
  "AnimalsBirth",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idAnimalsBirth",
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "birthDate",
    },
    identityNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "temporaryIdentityNumber",
    },
  },
  { timestamps: true }
);

AnimalsInHerd.hasMany(AnimalsBirth, {
  foreignKey: {
    allowNull: false,
    field: "idAnimal",
  },
});

KindOfAnimals.hasMany(AnimalsBirth, {
  foreignKey: {
    allowNull: false,
    field: "idSpeciesOfAnimals",
  },
});

Herd.hasMany(AnimalsBirth, {
  foreignKey: {
    allowNull: false,
    field: "idHerd",
  },
});

module.exports = AnimalsBirth;
