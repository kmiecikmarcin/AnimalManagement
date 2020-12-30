const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const TypesOfAnimals = require("./TypesOfAnimals");

const KindsOfAnimals = sequelize.define(
  "KindsOfAnimals",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idKindOfAnimals",
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
      field: "nameKindOfAnimal",
    },
  },
  { timestamps: true }
);

TypesOfAnimals.hasMany(KindsOfAnimals, {
  foreignKey: {
    allowNull: false,
    name: "idTypesOfAnimals",
  },
});
KindsOfAnimals.belongsTo(TypesOfAnimals);

module.exports = KindsOfAnimals;
