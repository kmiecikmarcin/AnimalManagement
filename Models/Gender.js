const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Database/connectionWithDatabase");

const Gender = sequelize.define(
  "Gender",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: true,
      field: "idGender",
    },
    nameOfGender: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      field: "nameOfGender",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Gender;
