const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./Functions/Database/connectionWithDatabase");
const RoutesUsers = require("./Routes/users");
const Genders = require("./Models/Genders");
const TypesOfUsersRoles = require("./Models/TypesOfUsersRoles");
const TypesOfAnimals = require("./Models/TypesOfAnimals");
const KindOfAnimals = require("./Models/KindOfAnimals");
const fillDataForGenderTable = require("./Functions/Database/fillDataForGenderTable");
const fillDataForUsersTypesOfRolesInDatabase = require("./Functions/Database/fillDataForUsersTypesOfRolesInDatabase");
const fillDataForTypesOfAnimalsTable = require("./Functions/Database/fillDataForTypesOfAnimalsTable");
const fillDataForKindOfAnimalsTable = require("./Functions/Database/fillDataForKindOfAnimalsTable");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

sequelize
  .sync({ force: false })
  .then(() => {
    fillDataForGenderTable(Genders);
    fillDataForUsersTypesOfRolesInDatabase(TypesOfUsersRoles);
    fillDataForTypesOfAnimalsTable(TypesOfAnimals);
    fillDataForKindOfAnimalsTable(KindOfAnimals, TypesOfAnimals);
  })
  .catch((err) => {
    throw new Error(err);
  });

const port = process.env.PORT || 3000;

app.use("/herdpi/v1/users", RoutesUsers);

app.listen(port);

module.exports = app;
