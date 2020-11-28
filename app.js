const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./Functions/Database/connectionWithDatabase");
const RoutesUsers = require("./Routes/users");
const Genders = require("./Models/Genders");
const TypesOfUsersRoles = require("./Models/TypesOfUsersRoles");
const TypesOfAnimals = require("./Models/TypesOfAnimals");
const ReasonOfDeath = require("./Models/ReasonOfDeath");
const TypesOfFeed = require("./Models/TypesOfFeed");
const fillDataForGenderTable = require("./Functions/Database/fillDataForGenderTable");
const fillDataForUsersTypesOfRolesInDatabase = require("./Functions/Database/fillDataForUsersTypesOfRolesInDatabase");
const fillDataForTypesOfAnimalsTable = require("./Functions/Database/fillDataForTypesOfAnimalsTable");
const fillDataForTypesOfProducts = require("./Functions/Database/fillDataForTypesOfProducts");
const fillDataForReasonOfDeath = require("./Functions/Database/fillDataForReasonOfDeath");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

sequelize
  .sync({ force: true })
  .then(() => {
    fillDataForGenderTable(Genders);
    fillDataForUsersTypesOfRolesInDatabase(TypesOfUsersRoles);
    fillDataForTypesOfAnimalsTable(TypesOfAnimals);
    fillDataForReasonOfDeath(ReasonOfDeath);
    fillDataForTypesOfProducts(TypesOfFeed);
  })
  .catch((error) => {
    throw new Error(error);
  });

const port = process.env.PORT || 3000;

app.use("/herdpi/v1/users", RoutesUsers);

app.listen(port);

module.exports = app;
