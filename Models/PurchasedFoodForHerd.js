const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const SpeciesOfFoods = require("./SpeciesOfFoods");
const Users = require("./Users");

const PurchasedFoodForHerd = sequelize.define(
  "PurchasedFoodForHerd",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idPurchasedFood",
    },
    identityNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "identityNumberOfPurchasedFood",
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "quantityOfFood",
    },
    currentQuantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "currentQuantityOfFood",
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "dateOfPurchasedFood",
    },
  },
  { timestamps: true }
);

SpeciesOfFoods.hasMany(PurchasedFoodForHerd, {
  foreignKey: {
    allowNull: false,
    field: "idSpecieOfFood",
  },
});
PurchasedFoodForHerd.belongsTo(SpeciesOfFoods);

Users.hasMany(PurchasedFoodForHerd, {
  foreignKey: {
    allowNull: false,
    field: "idUser",
  },
});
PurchasedFoodForHerd.belongsTo(Users);

module.exports = PurchasedFoodForHerd;
