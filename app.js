const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./Functions/Database/connectionWithDatabase");
const RoutesUsers = require("./Routes/users");
const Genders = require("./Models/Genders");
const TypesOfUsersRoles = require("./Models/TypesOfUsersRoles");
const TypesOfAnimals = require("./Models/TypesOfAnimals");
const KindOfAnimals = require("./Models/KindOfAnimals");
const fillDataForGenderTable = require("./Functions/Others/fillDataForGenderTable");
const fillDataForUsersTypesOfRolesInDatabase = require("./Functions/Database/fillDataForUsersTypesOfRolesInDatabase");
const fillDataForTypesOfAnimalsTable = require("./Functions/Animals/FilingData/fillDataForTypesOfAnimalsTable");
const fillDataForKindOfAnimalsTable = require("./Functions/Animals/FilingData/fillDataForKindOfAnimalsTable");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

sequelize.sync({ force: true }).then(() => {
  fillDataForGenderTable(Genders);
  fillDataForUsersTypesOfRolesInDatabase(TypesOfUsersRoles);
  fillDataForTypesOfAnimalsTable(TypesOfAnimals);
  fillDataForKindOfAnimalsTable(KindOfAnimals, TypesOfAnimals);
});

const port = process.env.PORT || 3000;

app.use("/herdpi/v1/users", RoutesUsers);

app.listen(port);

module.exports = app;
