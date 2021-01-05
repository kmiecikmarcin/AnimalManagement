const { DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const Herds = require("./Herds");
const PurchasedFoodForHerd = require("./PurchasedFoodForHerd");

const FoodUsedForHerd = sequelize.define(
  "FoodUsedForHerd",
  {
    identityNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "foodIdentityNumberUsedForHerd",
    },
    quentity: {
      type: DataTypes.FLOAT,
      unique: true,
      allowNull: false,
      field: "quantityOfFoodUsedForHerd",
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "dateWhenFoodWasUsed",
    },
  },
  { timestamps: true }
);

Herds.belongsToMany(PurchasedFoodForHerd, {
  through: FoodUsedForHerd,
});

PurchasedFoodForHerd.belongsToMany(Herds, {
  through: FoodUsedForHerd,
});

module.exports = FoodUsedForHerd;
