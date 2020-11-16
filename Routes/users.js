const express = require("express");

const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const TypesOfUsersRoles = require("../Models/TypesOfUsersRoles");
const Gender = require("../Models/Gender");
const Users = require("../Models/Users");
const verifyToken = require("../Functions/Users/verifyJwtToken");
const checkUserEmail = require("../Functions/Users/checkUserEmail");
const findTypeOfUserRole = require("../Functions/Users/findTypeOfUserRole");
const userRegistration = require("../Functions/Users/userRegistration");

router.post(
  "/register",
  [
    check("userEmail")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .isLength({ min: 6 })
      .withMessage("Wprowadzony adres e-mail jest za krótki!")
      .isLength({ max: 254 })
      .withMessage("Wprowadzony adres e-mail jest za długi!")
      .isEmail()
      .withMessage("Adres e-mail został wprowadzony niepoprawnie!"),
    check("userPassword")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .isLength({ min: 6 })
      .withMessage("Hasło jest za krótkie!")
      .isLength({ max: 32 })
      .withMessage("Hasło jest za długie!"),
    check("confirmPassword")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .custom((value, { req }) => {
        if (value !== req.body.userPassword) {
          throw new Error("Hasła sa różne!");
        } else {
          return value;
        }
      }),
    check("userVerification")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .isBoolean()
      .withMessage("Wprowadzona wartośc jest nieprawidłowa!")
      .custom((value) => {
        if (!value) {
          throw new Error("Nie zatwierdzono weryfikacji użytkownika!");
        } else {
          return value;
        }
      }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    console.log(error.mapped());
    if (!error.isEmpty()) {
      res.status(400).json(error.mapped());
    } else {
      const userEmail = await checkUserEmail(Users, req.body.userEmail);
      if (userEmail !== null) {
        res
          .status(400)
          .json({ Error: "Użytkownik o podanym adresie e-mail już istnieje!" });
      } else {
        const assignUserRole = await findTypeOfUserRole(
          TypesOfUsersRoles,
          "hodowca"
        );

        if (assignUserRole === null) {
          res.status(501).json({ Error: "Błąd systemu!" });
        } else {
          const registrationResult = await userRegistration(
            res,
            Users,
            req.body.userEmail,
            req.body.userPassword,
            assignUserRole.id
          );

          if (registrationResult) {
            res
              .status(201)
              .json({ Message: "Rejestracja przebiegła pomyślnie!" });
          } else {
            res.status(400).json({ Error: "Rejestracja nie powiodła się!" });
          }
        }
      }
    }
  }
);

router.post("/login", async (req, res) => {});

router.put("/changeAdressEmail", async (req, res) => {});

router.put("changePassword", async (req, res) => {});

router.put("/deleteAccount", async (req, res) => {});

router.put("/forgotPassword", async (req, res) => {});

module.exports = router;
