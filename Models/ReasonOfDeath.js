const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");

const ReasonOfDeath = sequelize.define(
  "ReasonOfDeath",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idReasonDeath",
    },
    description: {
      type: DataTypes.STRING(256),
      unique: true,
      allowNull: false,
      field: "descriptionReasonOfDeath",
    },
  },
  { timestamps: true }
);

module.exports = ReasonOfDeath;
