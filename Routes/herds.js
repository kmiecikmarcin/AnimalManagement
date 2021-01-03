const express = require("express");

const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Users = require("../Models/Users");
const Herds = require("../Models/Herds");
const KindsOfAnimals = require("../Models/KindsOfAnimals");
const verifyToken = require("../Functions/Users/verifyJwtToken");
const findUserById = require("../Functions/Users/findUserById");
const findAllUserHerds = require("../Functions/Herds/findAllUserHerds");
const findHerdByName = require("../Functions/Herds/findHerdByName");
const createNewHerdForUser = require("../Functions/Herds/createNewHerdForUser");
const changeHerdName = require("../Functions/Herds/changeHerdName");
const findKindOfAnimalsByName = require("../Functions/Animals/findKindOfAnimalsByName");
const changeTypeOfHerd = require("../Functions/Herds/changeTypeOfHerd");
const deleteHerdByUser = require("../Functions/Herds/deleteHerdByUser");
const findHerdByAnimalType = require("../Functions/Herds/findHerdByAnimalType");

/**
 * @swagger
 * /herds/addNewHerd:
 *    post:
 *      tags:
 *      - name: Herds
 *      summary: Add new herd by user
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *        - name: herdType
 *          in: formData
 *          required: true
 *          type: string
 *        - name: creationDate
 *          in: formData
 *          required: true
 *          type: date
 *      responses:
 *        201:
 *          description: New herd has been added!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist!
 */
router.post(
  "/addNewHerd",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("herdType")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ max: 256 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("creationDate")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isDate()
      .withMessage(
        "Wprowadzona wartość nie jest datą! Spróbuj według schematu: YYYY-MM-DD"
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
            res.status(403).json({ Error: "Błąd uwierzytelniania!" });
          } else {
            const checkUser = await findUserById(Users, authData);
            if (checkUser !== null) {
              const addNewHerd = await createNewHerdForUser(
                Herds,
                req.body.herdName,
                req.body.creationDate,
                authData.id,
                req.body.herdType
              );
              if (addNewHerd) {
                res
                  .status(201)
                  .json({ Message: "Nowa hodowla została dodana!" });
              } else {
                res.status(400).json({
                  Error: "Coś poszło nie tak! Sprawdź wprowadzone dane!",
                });
              }
            } else {
              res.status(404).json({ Error: "Użytkownik nie istnieje!" });
            }
          }
        }
      );
    }
  }
);

/**
 * @swagger
 * /herds/findAllHerds:
 *    get:
 *      tags:
 *      - name: Herds
 *      summary: Take all herds for user
 *      responses:
 *        201:
 *          description: List of all herds!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist!
 */
router.get("/findAllHerds", verifyToken, (req, res) => {
  jwt.verify(
    req.token,
    process.env.S3_SECRETKEY,
    async (jwtError, authData) => {
      if (jwtError) {
        res.status(403).json({ Error: "Błąd uwierzytelniania!" });
      } else {
        const checkUser = await findUserById(Users, authData);
        if (checkUser !== null) {
          const findHerds = await findAllUserHerds(Herds, authData.id);
          if (findHerds !== null) {
            res.status(200).json({ Herds: findHerds });
          } else {
            res.status(404).json({
              Error: "Użytkownik nie posiada hodowli przypisanych do konta!",
            });
          }
        } else {
          res.status(404).json({ Error: "Użytkownik nie istnieje!" });
        }
      }
    }
  );
});

/**
 * @swagger
 * /herds/findHerdByName/{name}:
 *    get:
 *      tags:
 *      - name: Herds
 *      summary: Take herd by name for user
 *      parameters:
 *        - name: name
 *          in: path
 *          type: string
 *      responses:
 *        201:
 *          description: Data about herd!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist!
 */
router.get("/findHerdByName/:name", verifyToken, (req, res) => {
  if (req.params.name) {
    jwt.verify(
      req.token,
      process.env.S3_SECRETKEY,
      async (jwtError, authData) => {
        if (jwtError) {
          res.status(403).json({ Error: "Błąd uwierzytelniania!" });
        } else {
          const checkUser = await findUserById(Users, authData);
          if (checkUser !== null) {
            const findHerd = await findHerdByName(
              Herds,
              req.params.name,
              authData.id
            );
            if (findHerd) {
              res.status(200).json({ Herds: findHerd });
            } else {
              res.status(404).json({
                Error: "Użytkownik nie posiada hodowli z podaną nazwą!",
              });
            }
          } else {
            res.status(404).json({ Error: "Użytkownik nie istnieje!" });
          }
        }
      }
    );
  } else {
    res.status(400).json({ Error: "Nie wprowadzono wymaganych danych!" });
  }
});

/**
 * @swagger
 * /herds/findHerdByAnimalType/{typeOfAnimal}:
 *    get:
 *      tags:
 *      - name: Herds
 *      summary: Take herd by type of animal
 *      parameters:
 *        - name: typeOfAnimal
 *          in: path
 *          type: string
 *      responses:
 *        201:
 *          description: Data about herd!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist!
 */
router.get("/findHerdByAnimalType/:typeOfAnimal", verifyToken, (req, res) => {
  if (req.params.typeOfAnimal) {
    jwt.verify(
      req.token,
      process.env.S3_SECRETKEY,
      async (jwtError, authData) => {
        if (jwtError) {
          res.status(403).json({ Error: "Błąd uwierzytelniania!" });
        } else {
          const checkUser = await findUserById(Users, authData);
          if (checkUser !== null) {
            const findHerd = await findHerdByAnimalType(
              KindsOfAnimals,
              Herds,
              req.params.typeOfAnimal,
              authData.id
            );
            if (findHerd) {
              res.status(200).json({ Herds: findHerd });
            } else {
              res.status(404).json({
                Error: "Użytkownik nie posiada tego typu hodowli!",
              });
            }
          } else {
            res.status(404).json({ Error: "Użytkownik nie istnieje!" });
          }
        }
      }
    );
  } else {
    res.status(400).json({ Error: "Nie wprowadzono danych!" });
  }
});

/**
 * @swagger
 * /herds/changeHerdName:
 *    put:
 *      tags:
 *      - name: Herds
 *      summary: Change name of herd
 *      parameters:
 *        - name: oldHerdName
 *          in: formData
 *          required: true
 *          type: string
 *        - name: newHerdName
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        201:
 *          description: Name of herd changed successfully!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist or herd with entered name doesn't exist!
 */
router.put(
  "/changeHerdName",
  [
    check("oldHerdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("newHerdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
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
            const checkUser = await findUserById(Users, authData);
            if (checkUser !== null) {
              const findHerd = await findHerdByName(
                Herds,
                req.body.oldHerdName,
                authData.id
              );
              if (findHerd) {
                const updateHerdName = await changeHerdName(
                  Herds,
                  req.body.oldHerdName,
                  req.body.newHerdName,
                  authData.id
                );
                if (updateHerdName) {
                  res
                    .status(201)
                    .json({ Message: "Nazwa hodowli została zaktualizowana!" });
                } else {
                  res.status(400).json({
                    Error: "Coś poszło nie tak! Sprawdź wprowadzone dane!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Użytkownik nie posiada hodowli z podaną nazwą!",
                });
              }
            } else {
              res.status(404).json({ Error: "Użytkownik nie istnieje!" });
            }
          }
        }
      );
    }
  }
);

/**
 * @swagger
 * /herds/changeTypeofHerd:
 *    put:
 *      tags:
 *      - name: Herds
 *      summary: Change type of herd
 *      parameters:
 *        - name: newTypeOfHerd
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        201:
 *          description: Type of herd changed successfully!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist or entered type doesn't exist!
 */
router.put(
  "/changeTypeofHerd",
  [
    check("newTypeOfHerd")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ max: 256 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
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
            const checkUser = await findUserById(Users, authData);
            if (checkUser !== null) {
              const checkEnteredHerdTypeFromUser = await findKindOfAnimalsByName(
                KindsOfAnimals,
                req.body.newTypeOfHerd
              );
              if (checkEnteredHerdTypeFromUser) {
                const updateType = await changeTypeOfHerd(
                  Herds,
                  checkEnteredHerdTypeFromUser.id,
                  authData.id
                );
                if (updateType) {
                  res.status(201).json({
                    Message: "Pomyślnie zaktualizowano typ zwierząt w hodowli!",
                  });
                } else {
                  res.status(400).json({
                    Error: "Coś poszło nie tak! Sprawdź wprowadozne dane!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Nie odnaleziono wprowadzonego typu zwierząt w bazie!",
                });
              }
            } else {
              res.status(404).json({ Error: "Użytkownik nie istnieje!" });
            }
          }
        }
      );
    }
  }
);

/**
 * @swagger
 * /herds/deleteHerd:
 *    delete:
 *      tags:
 *      - name: Herds
 *      summary: Delete the herd
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *        - name: userPassword
 *          in: formData
 *          required: true
 *          type: string
 *          format: password
 *        - name: confirmPassword
 *          in: formData
 *          required: true
 *          type: string
 *          format: password
 *      responses:
 *        201:
 *          description: The herd deleted successfully!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist or herd with entered name doesn't exist!
 */
router.delete(
  "/deleteHerd",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
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
            const checkUser = await findUserById(Users, authData);
            if (checkUser !== null) {
              const findHerd = await findHerdByName(
                Herds,
                req.body.herdName,
                authData.id
              );
              if (findHerd) {
                const deleteHerd = await deleteHerdByUser(
                  Herds,
                  req.body.userPassword,
                  req.body.herdName,
                  authData.id,
                  checkUser.password
                );
                if (deleteHerd) {
                  res
                    .status(200)
                    .json({ Message: "Hodowla została usunięta pomyślnie!" });
                } else {
                  res.status(400).json({
                    Error: "Coś poszło nie tak! Sprawdź wprowadzone dane!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Użytkownik nie posiada hodowli z podaną nazwą!",
                });
              }
            } else {
              res.status(404).json({ Error: "Użytkownik nie istnieje!" });
            }
          }
        }
      );
    }
  }
);

module.exports = router;
