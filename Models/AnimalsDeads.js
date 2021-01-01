const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
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
    identityNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "identityNumberOfAnimal",
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

ReasonOfDeath.hasMany(AnimalsDeads, {
  foreignKey: {
    allowNull: false,
    field: "idReasonDeath",
  },
});
AnimalsDeads.belongsTo(ReasonOfDeath);

Herds.hasMany(AnimalsDeads, {
  foreignKey: {
    allowNull: false,
    field: "idHerd",
  },
});
AnimalsDeads.belongsTo(Herds);

module.exports = AnimalsDeads;
