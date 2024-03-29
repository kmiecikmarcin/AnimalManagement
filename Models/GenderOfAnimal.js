const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");

const GenderOfAnimal = sequelize.define(
  "GenderOfAnimal",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idAnimalGender",
    },
    name: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
      field: "nameOfAnimalGender",
    },
  },
  { timestamps: true }
);

module.exports = GenderOfAnimal;
