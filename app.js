const express = require("express");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const sequelize = require("./Functions/Database/connectionWithDatabase");
const RoutesUsers = require("./Routes/users");
const RoutesHerds = require("./Routes/herds");
const RouterAnimals = require("./Routes/animals");
const Genders = require("./Models/Genders");
const GenderOfAnimal = require("./Models/GenderOfAnimal");
const TypesOfUsersRoles = require("./Models/TypesOfUsersRoles");
const TypesOfAnimals = require("./Models/TypesOfAnimals");
const TypesOfJoinToTheHerd = require("./Models/TypesOfJoinToTheHerd");
const ReasonOfDeath = require("./Models/ReasonOfDeath");
const TypesOfProducts = require("./Models/TypesOfProducts");
const TypesOfFeed = require("./Models/TypesOfFeed");
const fillDataForGenderTable = require("./Functions/Database/fillDataForGenderTable");
const fillDataForAnimalGender = require("./Functions/Database/fillDataForAnimalGender");
const fillDataForUsersTypesOfRolesInDatabase = require("./Functions/Database/fillDataForUsersTypesOfRolesInDatabase");
const fillDataForTypesOfAnimalsTable = require("./Functions/Database/fillDataForTypesOfAnimalsTable");
const fillDataForTypesOfFeed = require("./Functions/Database/fillDataForTypesOfFeed");
const fillDataForReasonOfDeath = require("./Functions/Database/fillDataForReasonOfDeath");
const fillDataForTypesOfJoinToTheHerd = require("./Functions/Database/fillDataForTypesOfJoinToTheHerd");
const fillDataForTypesOfProducts = require("./Functions/Database/fillDataForTypesOfProducts");

const app = express();

const swaggerOptions = {
  openapi: "3.0.3",
  swaggerDefinition: {
    info: {
      title: "Animal herds management - API",
      description:
        "API for easy work with documentation which describe data based on life of animals.",
      version: "0.3.0",
    },
    host: "localhost:3000",
    basePath: "/herdapi/v1",
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        scheme: "bearer",
        in: "header",
      },
    },
    security: [{ bearerAuth: [] }],
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
    fillDataForAnimalGender(GenderOfAnimal);
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
app.use("/herdapi/v1/animals", RouterAnimals);

app.listen(port);

module.exports = app;
