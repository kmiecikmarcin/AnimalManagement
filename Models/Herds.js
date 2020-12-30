const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const Users = require("./Users");
const KindsOfAnimals = require("./KindsOfAnimals");

const Herds = sequelize.define(
  "Herds",
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
      field: "creationDateOfHerd",
    },
  },
  { timestamps: true }
);

Users.hasMany(Herds, {
  foreignKey: {
    allowNull: false,
    name: "idUser",
  },
});
Herds.belongsTo(Users);

KindsOfAnimals.hasMany(Herds, {
  foreignKey: {
    allowNull: false,
    name: "idKindOfAnimals",
  },
});
Herds.belongsTo(KindsOfAnimals);

module.exports = Herds;
