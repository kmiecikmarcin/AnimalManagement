const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const AnimalsInHerd = require("./AnimalsInHerd");
const KindsOfAnimals = require("./KindsOfAnimals");
const Herds = require("./Herds");

const AnimalsBirths = sequelize.define(
  "AnimalsBirths",
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

AnimalsInHerd.hasMany(AnimalsBirths, {
  foreignKey: {
    allowNull: false,
    field: "idAnimal",
  },
});
AnimalsBirths.belongsTo(AnimalsInHerd);

KindsOfAnimals.hasMany(AnimalsBirths, {
  foreignKey: {
    allowNull: false,
    field: "idKindOfAnimals",
  },
});
AnimalsBirths.belongsTo(KindsOfAnimals);

Herds.hasMany(AnimalsBirths, {
  foreignKey: {
    allowNull: false,
    field: "idHerd",
  },
});
AnimalsBirths.belongsTo(Herds);

module.exports = AnimalsBirths;
