const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./Functions/Database/connectionWithDatabase");
const RoutesUsers = require("./Routes/users");
const Genders = require("./Models/Genders");
const TypesOfUsersRoles = require("./Models/TypesOfUsersRoles");
const TypesOfAnimals = require("./Models/TypesOfAnimals");
const TypesOfJoinToTheHerd = require("./Models/TypesOfJoinToTheHerd");
const ReasonOfDeath = require("./Models/ReasonOfDeath");
const TypesOfProducts = require("./Models/TypesOfProducts");
const TypesOfFeed = require("./Models/TypesOfFeed");
const fillDataForGenderTable = require("./Functions/Database/fillDataForGenderTable");
const fillDataForUsersTypesOfRolesInDatabase = require("./Functions/Database/fillDataForUsersTypesOfRolesInDatabase");
const fillDataForTypesOfAnimalsTable = require("./Functions/Database/fillDataForTypesOfAnimalsTable");
const fillDataForTypesOfFeed = require("./Functions/Database/fillDataForTypesOfFeed");
const fillDataForReasonOfDeath = require("./Functions/Database/fillDataForReasonOfDeath");
const fillDataForTypesOfJoinToTheHerd = require("./Functions/Database/fillDataForTypesOfJoinToTheHerd");
const fillDataForTypesOfProducts = require("./Functions/Database/fillDataForTypesOfProducts");

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
    fillDataForTypesOfFeed(TypesOfFeed);
    fillDataForTypesOfJoinToTheHerd(TypesOfJoinToTheHerd);
    fillDataForTypesOfProducts(TypesOfProducts);
  })
  .catch((error) => {
    throw new Error(error);
  });

const port = process.env.PORT || 3000;

app.use("/herdpi/v1/users", RoutesUsers);

app.listen(port);

module.exports = app;
