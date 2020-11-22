const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");

const TypesOfAnimals = sequelize.define(
  "TypesOfAnimals",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idTypesOfAnimals",
    },
    name: {
      type: DataTypes.STRING(256),
      unique: true,
      allowNull: false,
      field: "typeName",
    },
  },
  { timestamps: true }
);

module.exports = TypesOfAnimals;
