const express = require("express");

const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const TypesOfUsersRoles = require("../Models/TypesOfUsersRoles");
const Genders = require("../Models/Genders");
const Users = require("../Models/Users");
const verifyToken = require("../Functions/Users/verifyJwtToken");
const checkUserEmail = require("../Functions/Users/checkUserEmail");
const findTypeOfUserRole = require("../Functions/Users/findTypeOfUserRole");
const userRegistration = require("../Functions/Users/userRegistration");
const checkInPasswordOneSpecialCharacterKey = require("../Functions/Others/checkInPasswordOneSpecialCharacterKey");
const findGender = require("../Functions/Users/findGender");
const checkUserGenderInRegister = require("../Functions/Others/checkUserGenderInRegister");
const userLogin = require("../Functions/Users/userLogin");
const findUserById = require("../Functions/Users/findUserById");
const changeUserEmailAdress = require("../Functions/Users/changeUserEmailAdress");

router.post(
  "/register",
  [
    check("userEmail")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .isLength({ min: 1 })
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
      .withMessage("Hasło jest za długie!")
      .custom((value) => {
        if (checkInPasswordOneSpecialCharacterKey(value) === false) {
          throw new Error(
            "Hasło nie zawiera minimum jednego znaku specjalnego!"
          );
        } else {
          return value;
        }
      })
      .custom((value) => {
        // eslint-disable-next-line no-useless-escape
        const badSpecialKeys = /[\,\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/.test(
          value
        );
        if (badSpecialKeys === true) {
          throw new Error("Hasło zawiera nieprawidłowy znak!");
        } else {
          return value;
        }
      }),

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

    check("userGender")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .isLength({ min: 1 })
      .withMessage("Nie wprowadzono danych!")
      .custom((value) => {
        if (checkUserGenderInRegister(value) === false) {
          throw new Error("Podano błędną wartość!");
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
          "Hodowca"
        );
        const assignUserGender = await findGender(Genders, req.body.userGender);

        if (assignUserRole === null || assignUserGender === null) {
          res.status(501).json({ Error: "Błąd systemu!" });
        } else {
          const registrationResult = await userRegistration(
            Users,
            req.body.userEmail,
            req.body.userPassword,
            assignUserRole.id,
            assignUserGender.id
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

router.post(
  "/login",
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
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json(error.mapped());
    } else {
      const userEmail = await checkUserEmail(Users, req.body.userEmail);
      if (userEmail === null) {
        res
          .status(400)
          .json({ Error: "Użytkownik o podanym adresie e-mail nie istnieje!" });
      } else {
        const userRole = await findTypeOfUserRole(
          TypesOfUsersRoles,
          userEmail.idTypeOfUserRole
        );
        if (userRole !== null) {
          const checkEnteredDataFromUser = await userLogin(
            req.body.userPassword,
            userEmail.password,
            userEmail.id,
            userEmail.password,
            userRole.id
          );
          if (checkEnteredDataFromUser === null) {
            console.log(checkEnteredDataFromUser);
            res.status(201).json({ Token: checkEnteredDataFromUser });
          } else {
            res.status(404).json({ Error: checkEnteredDataFromUser });
          }
        } else {
          res
            .status(400)
            .json({ Error: "Brak dostepu do systemu dla użytkownika!" });
        }
      }
    }
  }
);

router.put(
  "/changeAdressEmail",
  [
    check("oldUserEmailAdress")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .isLength({ min: 1 })
      .withMessage("Wprowadzony adres e-mail jest za krótki!")
      .isEmail()
      .withMessage("Adres e-mail został wprowadzony niepoprawnie!"),
    check("newUserEmailAdress")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .isLength({ min: 1 })
      .withMessage("Wprowadzony adres e-mail jest za krótki!")
      .isLength({ max: 254 })
      .withMessage("Wprowadzony adres e-mail jest za długi!")
      .isEmail()
      .withMessage("Adres e-mail został wprowadzony niepoprawnie!"),
    check("userPassword")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 6 })
      .withMessage("Hasło jest za krótkie!")
      .isLength({ max: 32 })
      .withMessage("Hasło jest za długie!"),
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
            res.status(403).json({ Error: "Błąd uwierzytelniania! " });
          } else {
            const checkUserById = await findUserById(Users, authData);
            if (checkUserById === null) {
              res.status(404).json({ Error: "Użytkownik nie istnieje!" });
            } else {
              const updateUserEmailAdress = await changeUserEmailAdress(
                Users,
                req.body.oldUserEmailAdress,
                req.body.newUserEmailAdress,
                req.body.userPassword
              );
              if (updateUserEmailAdress) {
                res.status(201).json({
                  Message: "Twój adress e-mail został zaktualizowany!",
                });
              } else {
                res.status(400).json({ Error: "Błąd! Coś poszło nie tak!" });
              }
            }
          }
        }
      );
    }
  }
);

// router.put("changePassword", verifyToken, (req, res) => {});

// router.put("/deleteAccount", verifyToken, (req, res) => {});

// router.put("/forgotPassword", async (req, res) => {});

module.exports = router;
