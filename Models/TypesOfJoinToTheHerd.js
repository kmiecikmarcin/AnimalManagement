const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");

const TypesOfJoinToTheHerd = sequelize.define(
  "TypesOfJoinToTheHerd",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idJoinType",
    },
    name: {
      type: DataTypes.STRING(256),
      unique: true,
      allowNull: false,
      field: "nameOfJoinType",
    },
  },
  { timestamps: true }
);

module.exports = TypesOfJoinToTheHerd;
