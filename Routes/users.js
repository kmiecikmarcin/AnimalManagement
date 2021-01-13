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
const findTypeOfUserRoleById = require("../Functions/Users/findTypeOfUserRoleById");
const findTypeOfUserRoleByName = require("../Functions/Users/findTypeOfUserRoleByName");
const userRegistration = require("../Functions/Users/userRegistration");
const checkInPasswordOneSpecialCharacterKey = require("../Functions/Others/checkInPasswordOneSpecialCharacterKey");
const findGender = require("../Functions/Users/findGender");
const checkUserGenderInRegister = require("../Functions/Others/checkUserGenderInRegister");
const userLogin = require("../Functions/Users/userLogin");
const findUserById = require("../Functions/Users/findUserById");
const changeUserEmailAdress = require("../Functions/Users/changeUserEmailAdress");
const changeUserPassword = require("../Functions/Users/changeUserPassword");
const deleteUserAccount = require("../Functions/Users/deleteUserAccount");
const checkUserVerification = require("../Functions/Others/checkUserVerification");

/**
 * @swagger
 * /users/register:
 *    post:
 *      tags:
 *      - name: Users
 *      summary: Register in system
 *      parameters:
 *        - name: userEmail
 *          in: formData
 *          required: true
 *          type: string
 *          example: user@gmail.com
 *        - name: userPassword
 *          in: formData
 *          required: true
 *          type: string
 *          format: password
 *          example: userpassword#
 *        - name: confirmPassword
 *          in: formData
 *          required: true
 *          type: string
 *          format: password
 *          example: userpassword#
 *        - name: userGender
 *          in: formData
 *          required: true
 *          type: string
 *          example: Kobieta or Mężczyzna
 *        - name: userVerification
 *          in: formData
 *          required: true
 *          type: boolean
 *          example: true
 *      responses:
 *        201:
 *          description: Successfully registered!
 *        400:
 *          description: Two errors - user with entered adress e-mail exists in system
 *                        or registration failed!
 *        500:
 *          description: System error - user role doesn't exist!
 */
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
      .isLength({ min: 1, max: 20 })
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
      .withMessage("Wprowadzona wartość jest nieprawidłowa!")
      .custom((value) => {
        const verification = checkUserVerification(value);
        if (verification === false) {
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
        console.log(userEmail);
        const assignUserRole = await findTypeOfUserRoleByName(
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

/**
 * @swagger
 * /users/login:
 *    post:
 *      tags:
 *      - name: Users
 *      summary: Login in system
 *      parameters:
 *        - name: userEmail
 *          in: formData
 *          required: true
 *          type: string
 *          example: user@gmail.com
 *        - name: userPassword
 *          in: formData
 *          required: true
 *          type: string
 *          format: password
 *          example: userpassword#
 *      responses:
 *        201:
 *          description: System will return token!
 *        400:
 *          description: Check your entered data!
 *        404:
 *          description: User with entered adress e-mail doesn't exist in system!
 */

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
          .status(404)
          .json({ Error: "Użytkownik o podanym adresie e-mail nie istnieje!" });
      } else {
        const userRole = await findTypeOfUserRoleById(
          TypesOfUsersRoles,
          userEmail.TypesOfUsersRoleId
        );
        if (userRole !== null) {
          const checkEnteredDataFromUser = await userLogin(
            req.body.userPassword,
            userEmail.password,
            userEmail.id,
            userEmail.TypesOfUsersRoleId,
            userRole.name
          );
          if (checkEnteredDataFromUser !== null) {
            res.status(201).json({ Token: checkEnteredDataFromUser });
          } else {
            res
              .status(400)
              .json({ Error: "Coś poszło nie tak! Sprawdź wprowadzone dane!" });
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

/**
 * @swagger
 * /users/changeAdressEmail:
 *    put:
 *      tags:
 *      - name: Users
 *      summary: Change adress e-mail by user
 *      parameters:
 *        - name: oldUserEmailAdress
 *          in: formData
 *          required: true
 *          type: string
 *          example: user@gmail.com
 *        - name: newUserEmailAdress
 *          in: formData
 *          required: true
 *          type: string
 *          example: newuser@gmail.com
 *        - name: userPassword
 *          in: formData
 *          required: true
 *          type: string
 *          format: password
 *          example: userpassword#
 *      responses:
 *        200:
 *          description: Adress e-mail will be updated!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist!
 */
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
                res.status(200).json({
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

/**
 * @swagger
 * /users/changePassword:
 *    put:
 *      tags:
 *      - name: Users
 *      summary: Change password by user
 *      parameters:
 *        - name: oldUserPassword
 *          in: formData
 *          required: true
 *          type: string
 *          format: password
 *          example: userpassword#
 *        - name: newUserPassword
 *          in: formData
 *          required: true
 *          type: string
 *          format: password
 *          example: newuserpassword#
 *        - name: confirmNewPassword
 *          in: formData
 *          required: true
 *          type: string
 *          format: password
 *          example: newuserpassword#
 *      responses:
 *        200:
 *          description: Password will be updated!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist!
 */
router.put(
  "/changePassword",
  [
    check("oldUserPassword")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 6 })
      .withMessage("Hasło jest za krótkie!")
      .isLength({ max: 32 })
      .withMessage("Hasło jest za długie!"),
    check("newUserPassword")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
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
    check("confirmNewPassword")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .custom((value, { req }) => {
        if (value !== req.body.newUserPassword) {
          throw new Error("Hasła sa różne!");
        } else {
          return value;
        }
      }),
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
              const updateUserPassword = await changeUserPassword(
                Users,
                req.body.oldUserPassword,
                req.body.newUserPassword,
                checkUserById.id,
                checkUserById.password
              );
              if (updateUserPassword) {
                res.status(200).json({
                  Message: "Twoje hasło zostało zaktualizowane!",
                });
              } else {
                res.status(400).json({
                  Error: "Błąd! Coś poszło nie tak! Sprawdź wprowadzone dane!",
                });
              }
            }
          }
        }
      );
    }
  }
);

/**
 * @swagger
 * /users/deleteAccount:
 *    put:
 *      tags:
 *      - name: Users
 *      summary: Delete account by user
 *      parameters:
 *        - name: userPassword
 *          in: formData
 *          required: true
 *          type: string
 *          format: password
 *          example: userpassword#
 *        - name: confirmPassword
 *          in: formData
 *          required: true
 *          type: string
 *          format: password
 *          example: userpassword#
 *      responses:
 *        200:
 *          description: Account deleted!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist!
 */
router.put(
  "/deleteAccount",
  [
    check("userPassword")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 6 })
      .withMessage("Hasło jest za krótkie!")
      .isLength({ max: 32 })
      .withMessage("Hasło jest za długie!"),
    check("confirmPassword")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .custom((value, { req }) => {
        if (value !== req.body.userPassword) {
          throw new Error("Hasła sa różne!");
        } else {
          return value;
        }
      }),
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
            res.status(403).json({ Error: "Błąd uwierzytelniania!" });
          } else {
            const checkUserById = await findUserById(Users, authData);
            if (checkUserById === null) {
              res.status(404).json({ Error: "Użytkownik nie istnieje!" });
            } else {
              const deleteAccount = await deleteUserAccount(
                Users,
                req.body.userPassword,
                checkUserById.id,
                checkUserById.password,
                checkUserById.accountDeletedStatus
              );
              if (deleteAccount) {
                console.log(deleteAccount);
                res.status(200).json({
                  Message: "Twoje konto zostało usunięte!",
                });
              } else {
                res.status(400).json({
                  Error: "Błąd! Coś poszło nie tak! Sprawdź wprowadzone dane!",
                });
              }
            }
          }
        }
      );
    }
  }
);

// condition router.put("/forgotPassword", async (req, res) => {});

module.exports = router;
