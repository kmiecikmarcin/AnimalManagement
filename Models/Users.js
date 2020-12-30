const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../Functions/Database/connectionWithDatabase");
const TypesOfUsersRoles = require("./TypesOfUsersRoles");
const Genders = require("./Genders");

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
      field: "idUser",
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      field: "userEmail",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "userPassword",
    },
    accountDeletedStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      field: "accountDeletedStatus",
    },
  },
  {
    timestamps: true,
  }
);

TypesOfUsersRoles.hasMany(Users, {
  foreignKey: {
    allowNull: false,
    field: "idTypeOfUserRole",
  },
});
Users.belongsTo(TypesOfUsersRoles);

Genders.hasMany(Users, {
  foreignKey: {
    allowNull: false,
    field: "idGender",
  },
});
Users.belongsTo(Genders);

module.exports = Users;
