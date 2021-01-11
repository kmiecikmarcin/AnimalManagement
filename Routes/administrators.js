const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
require("dotenv").config();
const { check, validationResult } = require("express-validator");
const verifyToken = require("../Functions/Users/verifyJwtToken");
const Users = require("../Models/Users");
const TypesOfAnimals = require("../Models/TypesOfAnimals");
const TypesOfFood = require("../Models/TypesOfFood");
const TypesOfUsersRoles = require("../Models/TypesOfUsersRoles");
const KindsOfAnimals = require("../Models/KindsOfAnimals");
const SpeciesOfFoods = require("../Models/SpeciesOfFoods");
const ReasonOfDeath = require("../Models/ReasonOfDeath");
const TypesOfJoinToTheHerd = require("../Models/TypesOfJoinToTheHerd");
const TypesOfProducts = require("../Models/TypesOfProducts");
const findUserById = require("../Functions/Users/findUserById");
const takeAllSelectedTypesOfData = require("../Functions/Administrators/takeAllSelectedTypesOfData");
const addNewDataByAdministrator = require("../Functions/Administrators/addNewDataByAdministrator");
const checkEnteredDataByAdministrator = require("../Functions/Administrators/checkEnteredDataByAdministrator");
const deleteDataByAdministrator = require("../Functions/Administrators/deleteDataByAdministrator");
const addNewKindOfAnimal = require("../Functions/Administrators/addNewKindOfAnimal");
const addNewSpeciesOfFood = require("../Functions/Administrators/addNewSpeciesOfFood");
const deleteUserAccountByAdministrator = require("../Functions/Administrators/deleteUserAccountByAdministrator");
const checkUserEmail = require("../Functions/Users/checkUserEmail");

/**
 * @swagger
 * /administrators/takeAllTypesOfAnimals:
 *    get:
 *      tags:
 *      - name: Administrators
 *      summary: Take all types of animals
 *      responses:
 *        200:
 *          description: Types of animals list.
 *        400:
 *          description: User doesn't have permissions!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no types of animals! or User doesn't exists!
 */
router.get("/takeAllTypesOfAnimals", verifyToken, (req, res) => {
  jwt.verify(
    req.token,
    process.env.S3_SECRETKEY,
    async (jwtError, authData) => {
      if (jwtError) {
        res.status(403).json({ Error: "Błąd uwierzytelniania!" });
      } else {
        const checkUser = await findUserById(Users, authData);
        if (checkUser !== null) {
          const takeTypesOFAnimals = await takeAllSelectedTypesOfData(
            res,
            TypesOfAnimals,
            authData.name
          );
          if (takeTypesOFAnimals !== null) {
            res.status(200).json(takeTypesOFAnimals);
          } else {
            res.status(400).json({
              Error: "Nie posiadasz uprawnień do pobrania danych!",
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
 * /administrators/addNewTypeOfAnimal:
 *    post:
 *      tags:
 *      - name: Administrators
 *      summary: Add new type of animal
 *      parameters:
 *        - name: new type of animal
 *          in: formData
 *          required: true
 *          type: string
 *          example: Koniowate
 *      responses:
 *        201:
 *          description: New type of animal has been added!
 *        400:
 *          description: User doesn't have permissions!, System has this type of animal!, Validation error!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exists!
 */
router.post(
  "/addNewTypeOfAnimal",
  [
    check("newTypeOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 256 })
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
              const checkTypeOfAnimal = await checkEnteredDataByAdministrator(
                TypesOfAnimals,
                req.body.newTypeOfAnimal
              );
              if (checkTypeOfAnimal === null) {
                const addNewTypeOfAnimal = await addNewDataByAdministrator(
                  res,
                  TypesOfAnimals,
                  authData.name,
                  req.body.newTypeOfAnimal
                );
                if (addNewTypeOfAnimal !== null) {
                  res.status(201).json({
                    Message: "Pomyślnie utworzono nowy typ zwierzęcia!",
                  });
                } else {
                  res.status(400).json({
                    Error: "Nie posiadasz uprawnień do utworzenia danych!",
                  });
                }
              } else {
                res
                  .status(400)
                  .json({ Error: "Wprowadzony typ zwierzęcia już istnieje!" });
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
 * /administrators/deleteTypeOfAnimal:
 *    delete:
 *      tags:
 *      - name: Administrators
 *      summary: Delete type of animal
 *      parameters:
 *        - name: type of animal
 *          in: formData
 *          required: true
 *          type: string
 *          example: Koniowate
 *      responses:
 *        200:
 *          description: Type of animal has been deleted!
 *        400:
 *          description: User doesn't have permissions! Validation error!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no this type of animal! or User doesn't exists!
 */
router.delete(
  "/deleteTypeOfAnimal",
  [
    check("typeOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 256 })
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
              const checkTypeOfAnimal = await checkEnteredDataByAdministrator(
                TypesOfAnimals,
                req.body.typeOfAnimal
              );
              if (checkTypeOfAnimal !== null) {
                const deleteTypeOfanimal = await deleteDataByAdministrator(
                  res,
                  TypesOfAnimals,
                  authData.name,
                  checkTypeOfAnimal.id,
                  checkTypeOfAnimal.name
                );
                if (deleteTypeOfanimal !== null) {
                  res.status(200).json({
                    Message: "Pomyślnie usunięto wybrany typ zwierzęcia!",
                  });
                } else {
                  res.status(400).json({
                    Error: "Nie posiadasz uprawnień do utworzenia danych!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Wprowadzony typ zwierzęcia nie istnieje!",
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
 * /administrators/addNewKindOfAnimal:
 *    post:
 *      tags:
 *      - name: Administrators
 *      summary: Add new kind of animal
 *      parameters:
 *        - name: type of animal
 *          in: formData
 *          required: true
 *          type: string
 *          example: Drób
 *        - name: new kind of animal
 *          in: formData
 *          required: true
 *          type: string
 *          example: Kaczka
 *      responses:
 *        201:
 *          description: New kind of animal has been added!
 *        400:
 *          description: User doesn't have permissions!, System has this kind of animal!, Validation error!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exists! System has no entered type of animal!
 */
router.post(
  "/addNewKindOfAnimal",
  [
    check("typeOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 256 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("newKindOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 256 })
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
              const checkTypeOfAnimal = await checkEnteredDataByAdministrator(
                TypesOfAnimals,
                req.body.typeOfAnimal
              );
              if (checkTypeOfAnimal !== null) {
                const checkKindOfAnimal = await checkEnteredDataByAdministrator(
                  KindsOfAnimals,
                  req.body.newKindOfAnimal
                );
                if (checkKindOfAnimal === null) {
                  const addNewTypeOfAnimal = await addNewKindOfAnimal(
                    res,
                    KindsOfAnimals,
                    authData.name,
                    req.body.newKindOfAnimal,
                    checkTypeOfAnimal.id
                  );
                  if (addNewTypeOfAnimal !== null) {
                    res.status(201).json({
                      Message: "Pomyślnie utworzono nowy rodzaj zwierzęcia!",
                    });
                  } else {
                    res.status(400).json({
                      Error: "Nie posiadasz uprawnień do utworzenia danych!",
                    });
                  }
                } else {
                  res.status(400).json({
                    Error: "Wprowadzony rodzaj zwierzęcia już istnieje!",
                  });
                }
              } else {
                res
                  .status(404)
                  .json({ Error: "Wprowadzony typ zwierzęcia nie istnieje!" });
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
 * /administrators/deleteKindOfAnimal:
 *    delete:
 *      tags:
 *      - name: Administrators
 *      summary: Delete kind of animal
 *      parameters:
 *        - name: kind of animal
 *          in: formData
 *          required: true
 *          type: string
 *          example: Kaczka
 *      responses:
 *        200:
 *          description: Kind of animal has been deleted!
 *        400:
 *          description: User doesn't have permissions!, Validation error!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exists!, System has no this kind of animal!
 */
router.delete(
  "/deleteKindOfAnimal",
  [
    check("kindOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 256 })
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
              const checkKindOfAnimal = await checkEnteredDataByAdministrator(
                KindsOfAnimals,
                req.body.kindOfAnimal
              );
              if (checkKindOfAnimal !== null) {
                const deleteKindOfanimal = await deleteDataByAdministrator(
                  res,
                  KindsOfAnimals,
                  authData.name,
                  checkKindOfAnimal.id,
                  checkKindOfAnimal.name
                );
                if (deleteKindOfanimal !== null) {
                  res.status(200).json({
                    Message: "Pomyślnie usunięto wybrany rodzaj zwierzęcia!",
                  });
                } else {
                  res.status(400).json({
                    Error: "Nie posiadasz uprawnień do utworzenia danych!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Wprowadzony rodzaj zwierzęcia nie istnieje!",
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
 * /administrators/takeAllTypesOfFoods:
 *    get:
 *      tags:
 *      - name: Administrators
 *      summary: Take all types of foods
 *      responses:
 *        200:
 *          description: Types of foods list.
 *        400:
 *          description: User doesn't have permissions!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no types of foods! or User doesn't exists!
 */
router.get("/takeAllTypesOfFoods", verifyToken, (req, res) => {
  jwt.verify(
    req.token,
    process.env.S3_SECRETKEY,
    async (jwtError, authData) => {
      if (jwtError) {
        res.status(403).json({ Error: "Błąd uwierzytelniania!" });
      } else {
        const checkUser = await findUserById(Users, authData);
        if (checkUser !== null) {
          const takeTypesOfFood = await takeAllSelectedTypesOfData(
            res,
            TypesOfFood,
            authData.name
          );
          if (takeTypesOfFood !== null) {
            res.status(200).json(takeTypesOfFood);
          } else {
            res.status(400).json({
              Error: "Nie posiadasz uprawnień do pobrania danych!",
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
 * /administrators/addNewTypeOfFood:
 *    post:
 *      tags:
 *      - name: Administrators
 *      summary: Add new type of food
 *      parameters:
 *        - name: new type of food
 *          in: formData
 *          required: true
 *          type: string
 *          example: Sianokos
 *      responses:
 *        201:
 *          description: New type of food has been added!
 *        400:
 *          description: User doesn't have permissions!, Validation error!, System has this type of food!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exists!
 */
router.post(
  "/addNewTypeOfFood",
  [
    check("newTypeOfFood")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 256 })
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
              const checkTypeOfFood = await checkEnteredDataByAdministrator(
                TypesOfFood,
                req.body.newTypeOfFood
              );
              if (checkTypeOfFood === null) {
                const addNewTypeOfFood = await addNewDataByAdministrator(
                  res,
                  TypesOfFood,
                  authData.name,
                  req.body.newTypeOfFood
                );
                if (addNewTypeOfFood !== null) {
                  res.status(201).json({
                    Message: "Pomyślnie utworzono nowy typ pożywienia!",
                  });
                } else {
                  res.status(400).json({
                    Error: "Nie posiadasz uprawnień do utworzenia danych!",
                  });
                }
              } else {
                res
                  .status(400)
                  .json({ Error: "Wprowadzony typ pożywienia już istnieje!" });
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
 * /administrators/deleteTypeOfFood:
 *    delete:
 *      tags:
 *      - name: Administrators
 *      summary: Delete type of food
 *      parameters:
 *        - name: type of food
 *          in: formData
 *          required: true
 *          type: string
 *          example: Sianokos
 *      responses:
 *        200:
 *          description: Type of food has been deleted!
 *        400:
 *          description: User doesn't have permissions!, Validation error!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no this type of food! or User doesn't exists!
 */
router.delete(
  "/deleteTypeOfFood",
  [
    check("typeOfFood")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 256 })
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
              const checkTypeOfFood = await checkEnteredDataByAdministrator(
                TypesOfFood,
                req.body.typeOfFood
              );
              if (checkTypeOfFood !== null) {
                const deleteTypeOfFood = await deleteDataByAdministrator(
                  res,
                  TypesOfFood,
                  authData.name,
                  checkTypeOfFood.id,
                  checkTypeOfFood.name
                );
                if (deleteTypeOfFood !== null) {
                  res.status(200).json({
                    Message: "Pomyślnie usunięto wybrany typ pożywienia!",
                  });
                } else {
                  res.status(400).json({
                    Error: "Nie posiadasz uprawnień do utworzenia danych!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Wprowadzony typ pożywienia nie istnieje!",
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
 * /administrators/addNewSpeciesOfFood:
 *    post:
 *      tags:
 *      - name: Administrators
 *      summary: Add new species of food
 *      parameters:
 *        - name: type of food
 *          in: formData
 *          required: true
 *          type: string
 *          example: Sianokos
 *        - name: new species of food
 *          in: formData
 *          required: true
 *          type: string
 *          example: Siano
 *      responses:
 *        201:
 *          description: New species of food has been added!
 *        400:
 *          description: User doesn't have permissions!, System has this species of food!, Validation error!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exists! System has no entered type of food!
 */
router.post(
  "/addNewSpeciesOfFood",
  [
    check("typeOfFood")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 256 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("newSpeciesOfFood")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 256 })
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
              const checkTypeOfFood = await checkEnteredDataByAdministrator(
                TypesOfFood,
                req.body.typeOfFood
              );
              if (checkTypeOfFood !== null) {
                const checkSpeciesOfFood = await checkEnteredDataByAdministrator(
                  SpeciesOfFoods,
                  req.body.newSpeciesOfFood
                );
                if (checkSpeciesOfFood === null) {
                  const addNewTypeOfAnimal = await addNewSpeciesOfFood(
                    res,
                    SpeciesOfFoods,
                    authData.name,
                    req.body.newSpeciesOfFood,
                    checkTypeOfFood.id
                  );
                  if (addNewTypeOfAnimal !== null) {
                    res.status(201).json({
                      Message: "Pomyślnie utworzono nowy gatunek pożywienia!",
                    });
                  } else {
                    res.status(400).json({
                      Error: "Nie posiadasz uprawnień do utworzenia danych!",
                    });
                  }
                } else {
                  res.status(400).json({
                    Error: "Wprowadzony gatunek pożywienia już istnieje!",
                  });
                }
              } else {
                res
                  .status(404)
                  .json({ Error: "Wprowadzony typ pożywienia nie istnieje!" });
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
 * /administrators/deleteSpeciesOfFood:
 *    delete:
 *      tags:
 *      - name: Administrators
 *      summary: Delete species of food
 *      parameters:
 *        - name: species of food
 *          in: formData
 *          required: true
 *          type: string
 *          example: Siano
 *      responses:
 *        200:
 *          description: Species of food has been deleted!
 *        400:
 *          description: User doesn't have permissions!, Validation error!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no this species of food! or User doesn't exists!
 */
router.delete(
  "/deleteSpeciesOfFood",
  [
    check("speciesOfFood")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 256 })
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
              const checkSpeciesOfFood = await checkEnteredDataByAdministrator(
                SpeciesOfFoods,
                req.body.speciesOfFood
              );
              if (checkSpeciesOfFood !== null) {
                const deleteSpeciesOfFood = await deleteDataByAdministrator(
                  res,
                  SpeciesOfFoods,
                  authData.name,
                  checkSpeciesOfFood.id,
                  checkSpeciesOfFood.name
                );
                if (deleteSpeciesOfFood !== null) {
                  res.status(200).json({
                    Message: "Pomyślnie usunięto wybrany gatunek pożywienia!",
                  });
                } else {
                  res.status(400).json({
                    Error: "Nie posiadasz uprawnień do utworzenia danych!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Wprowadzony gatunek pożywienia nie istnieje!",
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
 * /administrators/takeTypesOfUsersRoles:
 *    get:
 *      tags:
 *      - name: Administrators
 *      summary: Take all types of users roles
 *      responses:
 *        200:
 *          description: Types of users roles list.
 *        400:
 *          description: User doesn't have permissions!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no types of users roles! or User doesn't exists!
 */
router.get("/takeTypesOfUsersRoles", verifyToken, (req, res) => {
  jwt.verify(
    req.token,
    process.env.S3_SECRETKEY,
    async (jwtError, authData) => {
      if (jwtError) {
        res.status(403).json({ Error: "Błąd uwierzytelniania!" });
      } else {
        const checkUser = await findUserById(Users, authData);
        if (checkUser !== null) {
          const takeTypesOfUsersRoles = await takeAllSelectedTypesOfData(
            res,
            TypesOfUsersRoles,
            authData.name
          );
          if (takeTypesOfUsersRoles !== null) {
            res.status(200).json(takeTypesOfUsersRoles);
          } else {
            res.status(400).json({
              Error: "Nie posiadasz uprawnień do pobrania danych!",
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
 * /administrators/addNewTypeOfUserRole:
 *    post:
 *      tags:
 *      - name: Administrators
 *      summary: Add new type of user role
 *      parameters:
 *        - name: new type of user role
 *          in: formData
 *          required: true
 *          type: string
 *          example: Hodowca
 *      responses:
 *        201:
 *          description: Type of user role has been added!
 *        400:
 *          description: User doesn't have permissions!, Validation error!, System has this type of user role!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exists!
 */
router.post(
  "/addNewTypeOfUserRole",
  [
    check("newTypeOfUserRole")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 20 })
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
              const checkTypeOfUserRole = await checkEnteredDataByAdministrator(
                TypesOfUsersRoles,
                req.body.newTypeOfUserRole
              );
              if (checkTypeOfUserRole === null) {
                const addNewTypeOfUserRole = await addNewDataByAdministrator(
                  res,
                  TypesOfUsersRoles,
                  authData.name,
                  req.body.newTypeOfUserRole
                );
                if (addNewTypeOfUserRole !== null) {
                  res.status(201).json({
                    Message: "Pomyślnie utworzono nowy typ użytkownika!",
                  });
                } else {
                  res.status(400).json({
                    Error: "Nie posiadasz uprawnień do utworzenia danych!",
                  });
                }
              } else {
                res
                  .status(400)
                  .json({ Error: "Wprowadzony typ użytkownika już istnieje!" });
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
 * /administrators/deleteTypeOfUserRole:
 *    delete:
 *      tags:
 *      - name: Administrators
 *      summary: Delete type of user role
 *      parameters:
 *        - name: type of user role
 *          in: formData
 *          required: true
 *          type: string
 *          example: Hodowca
 *      responses:
 *        200:
 *          description: Type of user role has been deleted!
 *        400:
 *          description: User doesn't have permissions!, Validation error!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no this type of user role! or User doesn't exists!
 */
router.delete(
  "/deleteTypeOfUserRole",
  [
    check("typeOfUserRole")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 20 })
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
              const checkTypeOfUserRole = await checkEnteredDataByAdministrator(
                TypesOfUsersRoles,
                req.body.typeOfUserRole
              );
              if (checkTypeOfUserRole !== null) {
                const deleteTypeOfUserRole = await deleteDataByAdministrator(
                  res,
                  TypesOfUsersRoles,
                  authData.name,
                  checkTypeOfUserRole.id,
                  checkTypeOfUserRole.name
                );
                if (deleteTypeOfUserRole !== null) {
                  res.status(200).json({
                    Message: "Pomyślnie usunięto wybrany typ użytkownika!",
                  });
                } else {
                  res.status(400).json({
                    Error: "Nie posiadasz uprawnień do utworzenia danych!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Wprowadzony typ użytkownika nie istnieje!",
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
 * /administrators/editUserPermissions:
 *    put:
 *      tags:
 *      - name: Administrators
 *      summary: Edit user permissions
 *      parameters:
 *        - name: old type of user role
 *          in: formData
 *          required: true
 *          type: string
 *          example: Administrator
 *        - name: new type of user role
 *          in: formData
 *          required: true
 *          type: string
 *          example: Hodowca
 *      responses:
 *        201:
 *          description: User permissions updated successfully!
 *        400:
 *          description: User doesn't have permissions!, Validation error!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no type of user role! or User doesn't exists!
 */
router.put(
  "/editUserPermissions",
  [
    check("oldTypeOfUserRole")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 20 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("newTypeOfUserRole")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 20 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
  ],
  verifyToken,
  () => {}
);

/**
 * @swagger
 * /administrators/addNewReasonOfAnimalDeath:
 *    post:
 *      tags:
 *      - name: Administrators
 *      summary: Add new reason of animal death
 *      parameters:
 *        - name: new reason of animal death
 *          in: formData
 *          required: true
 *          type: string
 *          example: Choroba
 *      responses:
 *        201:
 *          description: New reason of animal death role has been added!
 *        400:
 *          description: User doesn't have permissions!, Validation error!, System has this reason of animal death!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exists!
 */
router.post(
  "/addNewReasonOfAnimalDeath",
  [
    check("newReasonOfAnimalDeath")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 256 })
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
              const checkReasonOfAnimalDeath = await checkEnteredDataByAdministrator(
                ReasonOfDeath,
                req.body.newReasonOfAnimalDeath
              );
              if (checkReasonOfAnimalDeath === null) {
                const addNewReasonOfAnimalDeath = await addNewDataByAdministrator(
                  res,
                  ReasonOfDeath,
                  authData.name,
                  req.body.newReasonOfAnimalDeath
                );
                if (addNewReasonOfAnimalDeath !== null) {
                  res.status(201).json({
                    Message:
                      "Pomyślnie dodano nową przyczynę śmierci zwierzęcia!",
                  });
                } else {
                  res.status(400).json({
                    Error: "Nie posiadasz uprawnień do utworzenia danych!",
                  });
                }
              } else {
                res.status(400).json({
                  Error:
                    "Wprowadzona przyczyna śmierci zwierzęcia już istnieje!",
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
 * /administrators/deleteReasonOfAnimalDeath:
 *    delete:
 *      tags:
 *      - name: Administrators
 *      summary: Delete reason of animal death
 *      parameters:
 *        - name: reason of animal death
 *          in: formData
 *          required: true
 *          type: string
 *          example: Choroba
 *      responses:
 *        200:
 *          description: Reason of animal death has been deleted!
 *        400:
 *          description: User doesn't have permissions!, Validation error!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no this reason of animal death! or User doesn't exists!
 */
router.delete(
  "/deleteReasonOfAnimalDeath",
  [
    check("reasonOfAnimalDeath")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 256 })
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
              const checkReasonOfAnimalDeath = await checkEnteredDataByAdministrator(
                ReasonOfDeath,
                req.body.reasonOfAnimalDeath
              );
              if (checkReasonOfAnimalDeath !== null) {
                const deleteReasonOfAnimalDeath = await deleteDataByAdministrator(
                  res,
                  ReasonOfDeath,
                  authData.name,
                  checkReasonOfAnimalDeath.id,
                  checkReasonOfAnimalDeath.name
                );
                if (deleteReasonOfAnimalDeath !== null) {
                  res.status(200).json({
                    Message:
                      "Pomyślnie usunięto wybraną przyczynę śmierci zwierzęcia!",
                  });
                } else {
                  res.status(400).json({
                    Error: "Nie posiadasz uprawnień do utworzenia danych!",
                  });
                }
              } else {
                res.status(404).json({
                  Error:
                    "Wprowadzona przyczyna śmierci zwierzęcia nie istnieje!",
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
 * /administrators/addNewTypeOfJoinToHerd:
 *    post:
 *      tags:
 *      - name: Administrators
 *      summary: Add new type of join to herd
 *      parameters:
 *        - name: new type of join to herd
 *          in: formData
 *          required: true
 *          type: string
 *          example: Narodziny w hodowli
 *      responses:
 *        201:
 *          description: New type of join to herd role has been added!
 *        400:
 *          description: User doesn't have permissions!, Validation error!, System has this type of join to herd!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has this type of join to herd! or User doesn't exists!
 */
router.post(
  "/addNewTypeOfJoinToHerd",
  [
    check("newTypeOfJoinToHerd")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 256 })
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
              const checkTypeOfJoinToHerd = await checkEnteredDataByAdministrator(
                TypesOfJoinToTheHerd,
                req.body.newTypeOfJoinToHerd
              );
              if (checkTypeOfJoinToHerd === null) {
                const addNewTypeOfJoinToHerd = await addNewDataByAdministrator(
                  res,
                  TypesOfJoinToTheHerd,
                  authData.name,
                  req.body.newTypeOfJoinToHerd
                );
                if (addNewTypeOfJoinToHerd !== null) {
                  res.status(201).json({
                    Message: "Pomyślnie dodano nowy typ dołączenia do stada!",
                  });
                } else {
                  res.status(400).json({
                    Error: "Nie posiadasz uprawnień do utworzenia danych!",
                  });
                }
              } else {
                res.status(400).json({
                  Error: "Wprowadzony typ dołączenia do stada już istnieje!",
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
 * /administrators/deleteTypeOfJoinToHerd:
 *    delete:
 *      tags:
 *      - name: Administrators
 *      summary: Delete type of join to herd
 *      parameters:
 *        - name: type of join to herd
 *          in: formData
 *          required: true
 *          type: string
 *          example: Kupiony
 *      responses:
 *        200:
 *          description: Type of join to herd has been deleted!
 *        400:
 *          description: User doesn't have permissions!, Validation error!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no this type of join to herd! or User doesn't exists!
 */
router.delete(
  "/deleteTypeOfJoinToHerd",
  [
    check("typeOfJoinToHerd")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 256 })
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
              const checkTypeOfJoinToHerd = await checkEnteredDataByAdministrator(
                TypesOfJoinToTheHerd,
                req.body.typeOfJoinToHerd
              );
              if (checkTypeOfJoinToHerd !== null) {
                const deleteTypeOfJoinToHerd = await deleteDataByAdministrator(
                  res,
                  TypesOfJoinToTheHerd,
                  authData.name,
                  checkTypeOfJoinToHerd.id,
                  checkTypeOfJoinToHerd.name
                );
                if (deleteTypeOfJoinToHerd !== null) {
                  res.status(200).json({
                    Message: "Pomyślnie usunięto typ dołączenia do stada!",
                  });
                } else {
                  res.status(400).json({
                    Error: "Nie posiadasz uprawnień do utworzenia danych!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Wprowadzony typ dołączenia do stada nie istnieje!",
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
 * /administrators/addNewTypeOfProduct:
 *    post:
 *      tags:
 *      - name: Administrators
 *      summary: Add new type of product
 *      parameters:
 *        - name: new type of product
 *          in: formData
 *          required: true
 *          type: string
 *          example: Jajko
 *      responses:
 *        201:
 *          description: New type of product to herd role has been added!
 *        400:
 *          description: User doesn't have permissions!, Validation error!, System has this type of product!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exists!
 */
router.post(
  "/addNewTypeOfProduct",
  [
    check("newTypeOfProduct")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 64 })
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
              const checkTypeOfProduct = await checkEnteredDataByAdministrator(
                TypesOfProducts,
                req.body.newTypeOfProduct
              );
              if (checkTypeOfProduct === null) {
                const addNewTypeOfProduct = await addNewDataByAdministrator(
                  res,
                  TypesOfProducts,
                  authData.name,
                  req.body.newTypeOfProduct
                );
                if (addNewTypeOfProduct !== null) {
                  res.status(201).json({
                    Message: "Pomyślnie dodano nowy typ produktu!",
                  });
                } else {
                  res.status(400).json({
                    Error: "Nie posiadasz uprawnień do utworzenia danych!",
                  });
                }
              } else {
                res.status(400).json({
                  Error: "Wprowadzony typ produktu już istnieje!",
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
 * /administrators/deleteTypeOfProduct:
 *    delete:
 *      tags:
 *      - name: Administrators
 *      summary: Delete type of product
 *      parameters:
 *        - name: type of product
 *          in: formData
 *          required: true
 *          type: string
 *          example: Choroba
 *      responses:
 *        200:
 *          description: Type of product has been deleted!
 *        400:
 *          description: User doesn't have permissions!, Validation error!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no this type of product! or User doesn't exists!
 */
router.delete(
  "/deleteTypeOfProduct",
  [
    check("typeOfProduct")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 64 })
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
              const checkTypeOfProduct = await checkEnteredDataByAdministrator(
                TypesOfProducts,
                req.body.typeOfProduct
              );
              if (checkTypeOfProduct !== null) {
                const deleteTypeOfProduct = await deleteDataByAdministrator(
                  res,
                  TypesOfProducts,
                  authData.name,
                  checkTypeOfProduct.id,
                  checkTypeOfProduct.name
                );
                if (deleteTypeOfProduct !== null) {
                  res.status(200).json({
                    Message: "Pomyślnie usunięto wybrany typ produktu!",
                  });
                } else {
                  res.status(400).json({
                    Error: "Nie posiadasz uprawnień do utworzenia danych!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Wprowadzony typ produktu nie istnieje!",
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
 * /administrators/takeListOfUsers:
 *    get:
 *      tags:
 *      - name: Administrators
 *      summary: Take all users account in system
 *      responses:
 *        200:
 *          description: List of users.
 *        400:
 *          description: User doesn't have permissions!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no users! or User doesn't exists!
 */
router.get("/takeListOfUsers", verifyToken, (req, res) => {
  jwt.verify(
    req.token,
    process.env.S3_SECRETKEY,
    async (jwtError, authData) => {
      if (jwtError) {
        res.status(403).json({ Error: "Błąd uwierzytelniania!" });
      } else {
        const checkUser = await findUserById(Users, authData);
        if (checkUser !== null) {
          const takeListOfUsers = await takeAllSelectedTypesOfData(
            res,
            Users,
            authData.name
          );
          if (takeListOfUsers !== null) {
            res.status(200).json(takeListOfUsers);
          } else {
            res.status(400).json({
              Error: "Nie posiadasz uprawnień do pobrania danych!",
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
 * /administrators/deleteUserAccount:
 *    delete:
 *      tags:
 *      - name: Administrators
 *      summary: Delete user account
 *      parameters:
 *        - name: user id
 *          in: formData
 *          required: true
 *          type: string
 *          example: 2dc59f7a-8605-4a37-84f3-af2cd9a2d3e7
 *      responses:
 *        200:
 *          description: User account has been deleted!
 *        400:
 *          description: User doesn't have permissions!, Validation error!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no this user! or User doesn't exists!
 */
router.delete(
  "/deleteUserAccount",
  [
    check("userEmail")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isEmail()
      .withMessage("Wprowadzony e-mail jest nieprawidłowy!"),
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
              const checkUserAccount = await checkUserEmail(
                Users,
                req.body.userEmail
              );
              if (checkUserAccount !== null) {
                const deleteUserAccount = await deleteUserAccountByAdministrator(
                  res,
                  Users,
                  authData.name,
                  checkUser.id,
                  checkUser.email
                );
                if (deleteUserAccount !== null) {
                  res.status(200).json({
                    Message: "Pomyślnie usunięto konto wybranego użytkownika!",
                  });
                } else {
                  res.status(400).json({
                    Error: "Nie posiadasz uprawnień do utworzenia danych!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Wybrane konto użytkownika nie istnieje!",
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
