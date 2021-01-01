const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
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
    parentIdentityNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "parentIdentityNumber",
    },
  },
  { timestamps: true }
);

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
