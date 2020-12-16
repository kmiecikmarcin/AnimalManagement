const express = require("express");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const sequelize = require("./Functions/Database/connectionWithDatabase");
const RoutesUsers = require("./Routes/users");
const RoutesHerds = require("./Routes/herds");
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

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Zarządzanie hodowlą zwierząt - API",
      version: "0.2.0",
    },
  },
  apis: ["./Routes/*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

sequelize
  .sync({ force: false })
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

app.use("/herdapi/v1/users", RoutesUsers);
app.use("/herdapi/v1/herds", RoutesHerds);

app.listen(port);

module.exports = app;
