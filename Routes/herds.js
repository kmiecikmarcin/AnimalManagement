const express = require("express");

const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Users = require("../Models/Users");
const Herds = require("../Models/Herds");
const verifyToken = require("../Functions/Users/verifyJwtToken");
const findUserById = require("../Functions/Users/findUserById");
const findAllUserHerds = require("../Functions/Herds/findAllUserHerds");

router.post("/addNewHerd", verifyToken, () => {});

router.get("/takeAllHerds", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.S3_SECRETKEY, async (error, authData) => {
    if (error) {
      res.status(403).json({ Error: "Błąd uwierytelniania!" });
    } else {
      const checkUser = await findUserById(Users, authData);
      if (checkUser !== null) {
        const findHerds = await findAllUserHerds(Herds);
        if (findHerds !== null) {
          res.status(201).json({ Herds: findHerds });
        } else {
          res.status(404).json({
            Error: "Użytkownik nie posiada hodowli przypisanych do konta!",
          });
        }
      } else {
        res.status(404).json({ Error: "Użytkownik nie istnieje!" });
      }
    }
  });
});

module.exports = router;
