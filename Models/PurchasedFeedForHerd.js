const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const SpeciesOfFeeds = require("./SpeciesOfFeeds");
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
    identityNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "identityNumberOfPurchasedFeed",
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

SpeciesOfFeeds.hasMany(PurchasedFeedForHerd, {
  foreignKey: {
    allowNull: false,
    field: "idSpecieOfFeed",
  },
});
PurchasedFeedForHerd.belongsTo(SpeciesOfFeeds);

Users.hasMany(PurchasedFeedForHerd, {
  foreignKey: {
    allowNull: false,
    field: "idUser",
  },
});
PurchasedFeedForHerd.belongsTo(Users);

module.exports = PurchasedFeedForHerd;
