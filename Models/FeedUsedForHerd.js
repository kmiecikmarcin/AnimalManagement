const { DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const Herds = require("./Herds");
const PurchasedFeedForHerd = require("./PurchasedFeedForHerd");

const FeedUsedForHerd = sequelize.define(
  "FeedUsedForHerd",
  {
    quentity: {
      type: DataTypes.FLOAT,
      unique: true,
      allowNull: false,
      field: "quantityOfFeedUsedForAnimals",
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "dataWhenFeedWasUsed",
    },
  },
  { timestamps: true }
);

Herds.belongsToMany(PurchasedFeedForHerd, {
  through: FeedUsedForHerd,
});

PurchasedFeedForHerd.belongsToMany(Herds, {
  through: FeedUsedForHerd,
});

module.exports = FeedUsedForHerd;
