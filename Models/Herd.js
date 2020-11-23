const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const Users = require("./Users");

const Herd = sequelize.define(
  "Herd",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idHerd",
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      field: "nameOfHerd",
    },
    creationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      dield: "creationDateOfHerd",
    },
  },
  { timestamps: true }
);

Users.hasMany(Herd, {
  foreignKey: {
    allowNull: false,
    name: "idUser",
  },
});

module.exports = Herd;
