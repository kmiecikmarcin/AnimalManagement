const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./Functions/Database/connectionWithDatabase");
const RoutesUsers = require("./Routes/users");
const Gender = require("./Models/Gender");
const TypesOfUsersRoles = require("./Models/TypesOfUsersRoles");
const Users = require("./Models/Users");
const fillDataForGenderTable = require("./Functions/Database/fillDataForGenderTable");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

sequelize.sync({ force: true }).then(() => {
  fillDataForGenderTable(Gender);
  console.log("Database & tables created. Probably!");
});

const port = process.env.PORT || 3000;

app.use("/herdpi/v1/users", RoutesUsers);

app.listen(port);

module.exports = app;
