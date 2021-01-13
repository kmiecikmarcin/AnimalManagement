const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Functions/Database/connectionWithDatabase");
const Users = require("./Users");

const UserTransactions = sequelize.define(
  "UserTransactions",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idUserTransaction",
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "dateOfSoldProduct",
    },
  },
  { timestamps: true }
);

Users.hasMany(UserTransactions, {
  foreignKey: {
    allowNull: false,
    field: "idUser",
  },
});
UserTransactions.belongsTo(Users);

module.exports = UserTransactions;
