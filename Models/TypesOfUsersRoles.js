const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../Functions/Database/connectionWithDatabase");

const TypesOfUsersRoles = sequelize.define(
  "TypesOfUsersRoles",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idTypeOfUserRole",
    },
    name: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
      field: "nameOfUserRole",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = TypesOfUsersRoles;
