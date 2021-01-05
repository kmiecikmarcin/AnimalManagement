const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");

const TypesOfFood = sequelize.define(
  "TypesOfFood",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idTypeOfFood",
    },
    name: {
      type: DataTypes.STRING(256),
      unique: true,
      allowNull: false,
      field: "nameOfFood",
    },
  },
  { timestamps: true }
);

module.exports = TypesOfFood;
