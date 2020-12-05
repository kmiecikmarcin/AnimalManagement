const express = require("express");

const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Users = require("../Models/Users");
const Herds = require("../Models/Herds");
const verifyToken = require("../Functions/Users/verifyJwtToken");
const findUserById = require("../Functions/Users/findUserById");
const findAllUserHerds = require("../Functions/Herds/findAllUserHerds");

router.post(
  "/addNewHerd",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .length({ min: 3, max: 40 })
      .withMessage("Długośc wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("creationDate")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isDate()
      .withMessage(
        "Wprowadzona wartość nie jest datą lub została wprowadzona niepoprawnie"
      ),
  ],
  verifyToken,
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json(error.mapped());
    } else {
      jwt.verify(
        req.token,
        process.env.S3_SECRETKEY,
        async (jwtError, authData) => {
          if (jwtError) {
            res.status(403).json({ Error: "Błąd uwierytelniania!" });
          } else {
            const checkUser = await findUserById(Users, authData);
            if (checkUser !== null) {
              res.status(200);
            } else {
              res.status(404).json({ Error: "Użytkownik nie istnieje!" });
            }
          }
        }
      );
    }
  }
);

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
