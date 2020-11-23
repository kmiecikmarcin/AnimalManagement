const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./Functions/Database/connectionWithDatabase");
const RoutesUsers = require("./Routes/users");
const Genders = require("./Models/Genders");
const TypesOfUsersRoles = require("./Models/TypesOfUsersRoles");
const TypesOFAnimals = require("./Models/TypesOfAnimals");
const fillDataForGenderTable = require("./Functions/Others/fillDataForGenderTable");
const fillDataForUsersTypesOfRolesInDatabase = require("./Functions/Database/fillDataForUsersTypesOfRolesInDatabase");
const fillDataInTypesOfAnimalsTable = require("./Functions/Animals/fillDataInTypesOfAnimalsTable");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

sequelize.sync({ force: false }).then(() => {
  fillDataForGenderTable(Genders);
  fillDataForUsersTypesOfRolesInDatabase(TypesOfUsersRoles);
  fillDataInTypesOfAnimalsTable(TypesOFAnimals);
  console.log("Database & tables created!");
});

const port = process.env.PORT || 3000;

app.use("/herdpi/v1/users", RoutesUsers);

app.listen(port);

module.exports = app;
