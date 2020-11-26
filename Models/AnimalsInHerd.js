const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const Herd = require("./Herds");
const TypesOfJoinToTheHerd = require("./TypesOfJoinToTheHerd");
const KindOfAnimals = require("./KindOfAnimals");
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
    breed: {
      type: DataTypes.STRING(256),
      allowNull: false,
      field: "breedOfAnimal",
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

Herd.hasMany(AnimalsInHerd, {
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

KindOfAnimals.hasMany(AnimalsInHerd, {
  foreignKey: {
    allowNull: false,
    field: "idKindOfAnimals",
  },
});

Genders.hasMany(AnimalsInHerd, {
  foreignKey: {
    allowNull: false,
    field: "idGender",
  },
});

module.exports = AnimalsInHerd;
