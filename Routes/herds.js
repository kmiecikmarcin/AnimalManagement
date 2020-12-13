const express = require("express");

const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Users = require("../Models/Users");
const Herds = require("../Models/Herds");
const KindOfAnimals = require("../Models/KindOfAnimals");
const verifyToken = require("../Functions/Users/verifyJwtToken");
const findUserById = require("../Functions/Users/findUserById");
const findAllUserHerds = require("../Functions/Herds/findAllUserHerds");
const findHerdByName = require("../Functions/Herds/findHerdByName");
const createNewHerdforUser = require("../Functions/Herds/createNewHerdForUser");
const changeHerdName = require("../Functions/Herds/changeHerdName");
const findKindOfAnimalsByName = require("../Functions/Animals/findKindOfAnimalsByName");
const changeTypeOfHerd = require("../Functions/Herds/changeTypeOfHerd");
const deleteHerdByUser = require("../Functions/Herds/deleteHerdByUser");

router.post(
  "/addNewHerd",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długośc wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("herdType")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ max: 256 })
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
            res.status(403).json({ Error: "Błąd uwierzytelniania!" });
          } else {
            const checkUser = await findUserById(Users, authData);
            if (checkUser !== null) {
              const addNewHerd = await createNewHerdforUser(
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

router.get("/findAllHerds", verifyToken, (req, res) => {
  jwt.verify(
    req.token,
    process.env.S3_SECRETKEY,
    async (jwtError, authData) => {
      if (jwtError) {
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
    }
  );
});

router.get("/findHerdByName/:name", verifyToken, (req, res) => {
  if (!req.params.name) {
    jwt.verify(
      req.token,
      process.env.S3_SECRETKEY,
      async (jwtError, authData) => {
        if (jwtError) {
          res.status(403).json({ Error: "Błąd uwierytelniania!" });
        } else {
          const checkUser = await findUserById(Users, authData);
          if (checkUser !== null) {
            const findHerd = await findHerdByName(
              Herds,
              req.params.name,
              authData.id
            );
            if (findHerd) {
              res.status(201).json({ Herds: findHerd });
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

router.put(
  "/changeHerdName",
  [
    check("oldHerdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długośc wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("newHerdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długośc wprowadzonej nazwy jest niezgodna z wymaganiami!"),
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
              const findHerd = await findHerdByName(
                Herds,
                req.body.oldHerdName,
                authData.id
              );
              if (findHerd) {
                const updateHerdName = await changeHerdName(
                  Herds,
                  req.body.newHerdName,
                  authData.id
                );
                if (updateHerdName) {
                  res
                    .status(201)
                    .json({ Message: "Nazwa hodowli została zaktualizowana!" });
                } else {
                  res.status(400).json({ Error: "Coś poszło nie tak" });
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

router.put(
  "/changeTypeofHerd",
  [
    check("newTypeOfHerd")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ max: 256 })
      .withMessage("Długośc wprowadzonej nazwy jest niezgodna z wymaganiami!"),
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
              const checkEnteredHerdTypeFromUser = await findKindOfAnimalsByName(
                KindOfAnimals,
                req.body.newTypeOfHerd
              );
              if (checkEnteredHerdTypeFromUser) {
                const updateType = await changeTypeOfHerd(
                  Herds,
                  req.body.newHerdName,
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

router.delete(
  "/deleteHerd",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długośc wprowadzonej nazwy jest niezgodna z wymaganiami!"),
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
            res.status(403).json({ Error: "Błąd uwierytelniania!" });
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
                    Error: "Coś poszło nie tak! Sprawdź wprowadozne dane!",
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
