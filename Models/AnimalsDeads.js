const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const AnimalsInHerd = require("./AnimalsInHerd");
const ReasonOfDeath = require("./ReasonOfDeath");
const Herds = require("./Herds");

const AnimalsDeads = sequelize.define(
  "AnimalsDeads",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: false,
      allowNull: false,
      field: "idAnimalsDeads",
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "dateOfDeath",
    },
    description: {
      type: DataTypes.TEXT(256),
      allowNull: false,
      field: "description",
    },
  },
  { timestamps: true }
);

AnimalsInHerd.hasMany(AnimalsDeads, {
  foreignKey: {
    allowNull: false,
    field: "idAnimal",
  },
});
AnimalsDeads.belongsTo(AnimalsInHerd);

ReasonOfDeath.hasMany(AnimalsDeads, {
  foreignKey: {
    allowNull: false,
    field: "idReasonDeath",
  },
});

Herds.hasMany(AnimalsDeads, {
  foreignKey: {
    allowNull: false,
    field: "idHerd",
  },
});

module.exports = AnimalsDeads;
