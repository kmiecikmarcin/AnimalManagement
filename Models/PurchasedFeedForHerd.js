const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const SpeciesOfFeed = require("./SpeciesOfFeed");
const Users = require("./Users");

const PurchasedFeedForHerd = sequelize.define(
  "PurchasedFeedForHerd",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idPurchasedFeed",
    },
    quantity: {
      type: DataTypes.FLOAT,
      unique: true,
      allowNull: false,
      field: "quantityOfFeed",
    },
    currentQuantity: {
      type: DataTypes.FLOAT,
      unique: true,
      allowNull: false,
      field: "currentQuantityOfFeed",
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "dateOfPurchasedFeed",
    },
  },
  { timestamps: true }
);

SpeciesOfFeed.hasMany(PurchasedFeedForHerd, {
  foreignKey: {
    allowNull: false,
    field: "idSpeciesOfFeed",
  },
});
PurchasedFeedForHerd.belongsTo(SpeciesOfFeed);

Users.hasMany(PurchasedFeedForHerd, {
  foreignKey: {
    allowNull: false,
    field: "idUser",
  },
});
PurchasedFeedForHerd.belongsTo(Users);

module.exports = PurchasedFeedForHerd;
