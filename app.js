const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./Database/connectionWithDatabase");
const Gender = require("./Models/Gender");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created. Probably!");
});

const port = process.env.PORT || 3000;
app.listen(port);

module.exports = app;
