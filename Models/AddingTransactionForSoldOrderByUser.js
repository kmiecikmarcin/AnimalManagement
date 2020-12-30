const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const Users = require("./Users");

const AddingTransactionForSoldOrderByUser = sequelize.define(
  "AddingTransactionForSoldOrderByUser",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idTransactionNumber",
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "soldProductDate",
    },
  },
  { timestamps: true }
);

Users.hasMany(AddingTransactionForSoldOrderByUser, {
  foreignKey: {
    allowNull: false,
    field: "idUser",
  },
});
AddingTransactionForSoldOrderByUser.belongsTo(Users);

module.exports = AddingTransactionForSoldOrderByUser;
