const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");

const Genders = sequelize.define(
  "Genders",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idGender",
    },
    name: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
      field: "nameOfGender",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Genders;
