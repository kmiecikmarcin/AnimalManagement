const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const TypesOfFeed = require("./TypesOfFeed");

const SpeciesOfFeeds = sequelize.define(
  "SpeciesOfFeeds",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idSpeciesOfFeed",
    },
    name: {
      type: DataTypes.STRING(256),
      unique: true,
      allowNull: false,
      field: "nameOfSpeciesFeed",
    },
  },
  { timestamps: true }
);

TypesOfFeed.hasMany(SpeciesOfFeeds, {
  foreignKey: {
    allowNull: false,
    field: "idTypeOfFeed",
  },
});
SpeciesOfFeeds.belongsTo(TypesOfFeed);

module.exports = SpeciesOfFeeds;
