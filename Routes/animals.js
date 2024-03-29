const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { check, validationResult } = require("express-validator");
const verifyToken = require("../Functions/Users/verifyJwtToken");
const Users = require("../Models/Users");
const AnimalsInHerd = require("../Models/AnimalsInHerd");
const GenderOfAnimal = require("../Models/GenderOfAnimal");
const KindsOfAnimals = require("../Models/KindsOfAnimals");
const TypesOfJoinToTheHerd = require("../Models/TypesOfJoinToTheHerd");
const Herds = require("../Models/Herds");
const ReasonOfDeath = require("../Models/ReasonOfDeath");
const AnimalsBirths = require("../Models/AnimalsBirths");
const AnimalsDeads = require("../Models/AnimalsDeads");
const findUserById = require("../Functions/Users/findUserById");
const createNewAnimal = require("../Functions/Animals/createNewAnimal");
const findAllAnimalsGenders = require("../Functions/Animals/findAllAnimalsGenders");
const findAllKindsOfAnimals = require("../Functions/Animals/findAllKindsOfAnimals");
const findAllJoinTypeToTheHerd = require("../Functions/Animals/findAllJoinTypeToTheHerd");
const findAllAnimalsInHerd = require("../Functions/Animals/findAllAnimalsInHerd");
const findHerdByName = require("../Functions/Herds/findHerdByName");
const findAllReasonDeath = require("../Functions/Animals/findAllReasonDeath");
const findAnimalByHerdIdAndIdentityNumber = require("../Functions/Animals/findAnimalByHerdIdAndIdentityNumber");
const changeAnimalIdentityNumber = require("../Functions/Animals/changeAnimalIdentityNumber");
const changeBreedOfAnimal = require("../Functions/Animals/changeBreedOfAnimal");
const changeBirthDateOfAnimal = require("../Functions/Animals/changeBirthDateOfAnimal");
const changeWeightOfAnimal = require("../Functions/Animals/changeWeightOfAnimal");
const createNewBornAnimal = require("../Functions/Animals/createNewBornAnimal");
const changeBirthDateOfNewBornAnimal = require("../Functions/Animals/changeBirthDateOfNewBornAnimal");
const findAllNewBornAnimalsInHerd = require("../Functions/Animals/findAllNewBornAnimalsInHerd");
const createNewDeadAnimal = require("../Functions/Animals/createNewDeadAnimal");
const findAllNewDeadAnimalsInHerd = require("../Functions/Animals/findAllNewDeadAnimalsInHerd");
const findNewBornAnimalByIdentityNumber = require("../Functions/Animals/findNewBornAnimalByIdentityNumber");
const findDeadAnimalByHerdNameAndIdentityNumber = require("../Functions/Animals/findDeadAnimalByHerdNameAndIdentityNumber");
const changeDateOfAnimalDead = require("../Functions/Animals/changeDateOfAnimalDead");
const deleteAnimal = require("../Functions/Animals/deleteAnimal");
const checkEnteredIdentityNumberForAnimals = require("../Functions/Others/checkEnteredIdentityNumberForAnimals");

/**
 * @swagger
 * /animals/genders:
 *    get:
 *      tags:
 *      - name: Animals
 *      summary: Take all animals genders
 *      responses:
 *        200:
 *          description: List of animals genders.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no gender assigned to the animals! or User doesn't exist!
 */
router.get("/genders", verifyToken, (req, res) => {
  jwt.verify(
    req.token,
    process.env.S3_SECRETKEY,
    async (jwtError, authData) => {
      if (jwtError) {
        res.status(403).json({ Error: "Błąd uwierzytelniania!" });
      } else {
        const checkUser = await findUserById(Users, authData);
        if (checkUser !== null) {
          const findAnimalsGenders = await findAllAnimalsGenders(
            GenderOfAnimal,
            authData.id
          );
          if (findAnimalsGenders !== null) {
            res.status(200).json(findAnimalsGenders);
          } else {
            res.status(404).json({
              Error: "System nie posiada przypisanych płci zwierząt!",
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
 * /animals/allkinds:
 *    get:
 *      tags:
 *      - name: Animals
 *      summary: Take all kinds of animals
 *      responses:
 *        200:
 *          description: List kinds of animals.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no kinds assigned to the animals! or User doesn't exist!
 */
router.get("/allkinds", verifyToken, (req, res) => {
  jwt.verify(
    req.token,
    process.env.S3_SECRETKEY,
    async (jwtError, authData) => {
      if (jwtError) {
        res.status(403).json({ Error: "Błąd uwierzytelniania!" });
      } else {
        const checkUser = await findUserById(Users, authData);
        if (checkUser !== null) {
          const findKindsOfAnimals = await findAllKindsOfAnimals(
            KindsOfAnimals
          );
          if (findKindsOfAnimals !== null) {
            res.status(200).json(findKindsOfAnimals);
          } else {
            res.status(404).json({
              Error: "System nie posiada przypisanych rodzajów zwierząt!",
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
 * /animals/allJoinTypeToHerd:
 *    get:
 *      tags:
 *      - name: Animals
 *      summary: Take all types of animals join to the herd
 *      responses:
 *        200:
 *          description: List about types of animals join to the herd.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no join types assigned to the animals! or User doesn't exist!
 */
router.get("/allJoinTypeToHerd", verifyToken, (req, res) => {
  jwt.verify(
    req.token,
    process.env.S3_SECRETKEY,
    async (jwtError, authData) => {
      if (jwtError) {
        res.status(403).json({ Error: "Błąd uwierzytelniania!" });
      } else {
        const checkUser = await findUserById(Users, authData);
        if (checkUser !== null) {
          const findTypesOfJoinToTheHerd = await findAllJoinTypeToTheHerd(
            TypesOfJoinToTheHerd
          );
          if (findTypesOfJoinToTheHerd !== null) {
            res.status(200).json(findTypesOfJoinToTheHerd);
          } else {
            res.status(404).json({
              Error:
                "System nie posiada przypisanych typów dołączenia zwierząt do stada!",
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
 * /animals/animal:
 *    post:
 *      tags:
 *      - name: Animals
 *      summary: Add new animal by user
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *        - name: joinTypeName
 *          in: formData
 *          required: true
 *          type: string
 *          example: Urodzony w hodowli
 *        - name: kindOfAnimalName
 *          in: formData
 *          required: true
 *          type: date
 *          example: Królik
 *        - name: animalGender
 *          in: formData
 *          required: true
 *          type: string
 *          example: Samica
 *        - name: identityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 1234
 *        - name: breedOfAnimal
 *          in: formData
 *          required: true
 *          type: string
 *          example: Kalifornijski
 *        - name: dateOfJoinToTheHerd
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *          example: 01-01-2021
 *        - name: birthDate
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *          example: 01-12-2020
 *        - name: animalWeight
 *          in: formData
 *          required: true
 *          type: number
 *          format: float
 *          example: 4,8 (kg)
 *      responses:
 *        201:
 *          description: New animal has been added!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User, herd, kind of animal, join type or animal gender doesn't exist!
 */
router.post(
  "/animal",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("joinTypeName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 256 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("kindOfAnimalName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 2, max: 256 })
      .withMessage("Nie spełniono wymagań co do wielkości wprowadzonej nazwy!"),
    check("animalGender")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 2, max: 20 }),
    check("identityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("breedOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 2, max: 256 })
      .withMessage("Nie spełniono wymagań co do wielkości wprowadzonej nazwy!"),
    check("dateOfJoinToTheHerd")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isDate()
      .withMessage(
        "Wprowadzona wartość nie jest datą! Spróbuj według schematu: YYYY-MM-DD."
      ),
    check("birthDate")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isDate()
      .withMessage(
        "Wprowadzona wartość nie jest datą! Spróbuj według schematu: YYYY-MM-DD."
      ),
    check("animalWeight")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isFloat()
      .withMessage("Wprowadzona wartość nie jest wartością liczbową!"),
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
          }
          const checkUser = await findUserById(Users, authData);
          if (checkUser !== null) {
            const checkHerd = await findHerdByName(
              Herds,
              req.body.herdName,
              authData.id
            );
            if (checkHerd) {
              const checkAnimalIdentityNumber = await checkEnteredIdentityNumberForAnimals(
                AnimalsInHerd,
                req.body.identityNumberOfAnimal,
                checkHerd.id
              );
              if (checkAnimalIdentityNumber === null) {
                const addNewAnimal = await createNewAnimal(
                  res,
                  AnimalsInHerd,
                  checkHerd.id,
                  req.body.joinTypeName,
                  req.body.kindOfAnimalName,
                  req.body.animalGender,
                  req.body.identityNumberOfAnimal,
                  req.body.breedOfAnimal,
                  req.body.dateOfJoinToTheHerd,
                  req.body.birthDate,
                  req.body.animalWeight
                );
                if (addNewAnimal) {
                  res
                    .status(201)
                    .json({ Message: "Zwierzę zostało dodane pomyślnie!" });
                } else {
                  res.status(400).json({
                    Error: "Coś poszło nie tak! Sprawdź wprowadzone dane!",
                  });
                }
              } else {
                res.status(400).json({
                  Error:
                    "Posiadasz już zwierzę o wprowadzonym numerze identyfikacyjnym!",
                });
              }
            } else {
              res.status(404).json({
                Error: "Nie posiadasz hodowli o wprowadzonej nazwie!",
              });
            }
          } else {
            res.status(404).json({ Error: "Użytkownik nie istnieje!" });
          }
        }
      );
    }
  }
);

/**
 * @swagger
 * /animals/allInHerd/{herdName}:
 *    get:
 *      tags:
 *      - name: Animals
 *      summary: Take all animals in herd
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *      responses:
 *        200:
 *          description: List of animals in herd.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't have animals in this herd! or User doesn't exist!
 */
router.get("/allInHerd/:herdName", verifyToken, (req, res) => {
  if (req.params.herdName) {
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
              req.params.herdName,
              authData.id
            );
            if (findHerd) {
              const findAnimalsInHerd = await findAllAnimalsInHerd(
                AnimalsInHerd,
                findHerd.id
              );
              if (findAnimalsInHerd !== null) {
                res.status(200).json(findAnimalsInHerd);
              } else {
                res.status(404).json({
                  Error:
                    "Użytkownik nie posiada zwierząt przypisanych do jakiejkolwiek hodowli!",
                });
              }
            } else {
              res
                .status(404)
                .json({ Error: "Użytkownik nie posiada hodowli!" });
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
 * /animals/animalInHerd/{herdName}/{identityNumber}:
 *    get:
 *      tags:
 *      - name: Animals
 *      summary: Take one animal from herd
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *        - name: identityNumber
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 1234
 *      responses:
 *        200:
 *          description: Data about this animal.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't have this animal in this herd!, User doesn't exist! or User doesn't have herd with this name!
 */
router.get(
  "/animalInHerd/:herdName/:identityNumber",
  verifyToken,
  (req, res) => {
    if (req.params.herdName && req.params.identityNumber) {
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
                req.params.herdName,
                authData.id
              );
              if (findHerd) {
                const responseAboutFoundAnimal = await findAnimalByHerdIdAndIdentityNumber(
                  AnimalsInHerd,
                  findHerd.id,
                  req.params.identityNumber
                );
                if (responseAboutFoundAnimal !== null) {
                  res.status(200).json(responseAboutFoundAnimal);
                } else {
                  res.status(404).json({
                    Error:
                      "Użytkownik nie posiada zwierzęcia o wprowadzonym numerze identyfikacyjnym!",
                  });
                }
              } else {
                res
                  .status(404)
                  .json({ Error: "Użytkownik nie posiada hodowli!" });
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
  }
);

/**
 * @swagger
 * /animals/identityNumber:
 *    put:
 *      tags:
 *      - name: Animals
 *      summary: Edit identity number of animal
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *        - name: oldIdentityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 1234
 *        - name: newIdentityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 4321
 *      responses:
 *        200:
 *          description: Data updated successfully!
 *        400:
 *          description: Data has not been updated!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.put(
  "/identityNumber",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("oldIdentityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("newIdentityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
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
              const checkHerd = await findHerdByName(
                Herds,
                req.body.herdName,
                authData.id
              );
              if (checkHerd) {
                const checkAnimalIdentityNumber = await checkEnteredIdentityNumberForAnimals(
                  AnimalsInHerd,
                  req.body.newIdentityNumberOfAnimal,
                  checkHerd.id
                );
                if (checkAnimalIdentityNumber === null) {
                  const findAnimal = await findAnimalByHerdIdAndIdentityNumber(
                    AnimalsInHerd,
                    checkHerd.id,
                    req.body.oldIdentityNumberOfAnimal
                  );
                  if (findAnimal) {
                    const updateAnimalIdentityNumber = await changeAnimalIdentityNumber(
                      AnimalsInHerd,
                      req.body.oldIdentityNumberOfAnimal,
                      req.body.newIdentityNumberOfAnimal,
                      checkHerd.id
                    );
                    if (updateAnimalIdentityNumber) {
                      res.status(200).json({
                        Message:
                          "Numer identyfikacyjny zwierzęcia został zmieniony pomyślnie!",
                      });
                    } else {
                      res.status(400).json({
                        Error:
                          "Nie udało się zmienić numeru identyfikacyjnego zwierzęcia!",
                      });
                    }
                  } else {
                    res.status(404).json({
                      Error:
                        "Zwierzę o wprowadzonym numerze identyfikacyjnym nie istnieje!",
                    });
                  }
                } else {
                  res.status(400).json({
                    Error:
                      "Wprowadzony numer identyfikacyjny jest już przypisany do innego zwierzęcia",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Nie znaleziono hodowli o wprowadzonej nazwie!",
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
 * /animals/breed:
 *    put:
 *      tags:
 *      - name: Animals
 *      summary: Edit breed of animal
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *        - name: identityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 4321
 *        - name: oldBreedOfAnimal
 *          in: formData
 *          required: true
 *          type: string
 *          example: Kalifornijski
 *        - name: newBreedOfAnimal
 *          in: formData
 *          required: true
 *          type: string
 *          example: Olbrzym Belgijski
 *      responses:
 *        200:
 *          description: Data updated successfully!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.put(
  "/breed",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("identityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("oldBreedOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 2, max: 256 })
      .withMessage("Nie spełniono wymagań co do wielkości wprowadzonej nazwy!"),
    check("newBreedOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 2, max: 256 })
      .withMessage("Nie spełniono wymagań co do wielkości wprowadzonej nazwy!"),
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
              const checkHerd = await findHerdByName(
                Herds,
                req.body.herdName,
                authData.id
              );
              if (checkHerd) {
                const findAnimal = await findAnimalByHerdIdAndIdentityNumber(
                  AnimalsInHerd,
                  checkHerd.id,
                  req.body.identityNumberOfAnimal
                );
                if (findAnimal) {
                  const updateBreedOfAnimal = await changeBreedOfAnimal(
                    AnimalsInHerd,
                    checkHerd.id,
                    findAnimal.identityNumber,
                    req.body.oldBreedOfAnimal,
                    req.body.newBreedOfAnimal
                  );
                  if (updateBreedOfAnimal) {
                    res.status(200).json({
                      Message: "Gatunek zwierzęcia został pomyślnie zmieniony!",
                    });
                  } else {
                    res.status(400).json({
                      Error: "Coś poszło nie tak! Sprawdź wprowadzone dane!",
                    });
                  }
                } else {
                  res.status(404).json({
                    Error:
                      "Nie znaleziono zwierzęcia o podanym numerze identyfikacyjnym!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Nie znaleziono hodowli o wprowadzonej nazwie!",
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
 * /animals/birthDate:
 *    put:
 *      tags:
 *      - name: Animals
 *      summary: Edit animal birth date
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *        - name: identityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 4321
 *        - name: oldBirthDate
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *          example: 01-12-2020
 *        - name: newBirthDate
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *          example: 02-12-2020
 *      responses:
 *        200:
 *          description: Data updated successfully!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.put(
  "/birthDate",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("identityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("oldBirthDate")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isDate()
      .withMessage(
        "Wprowadzona wartość nie jest datą! Spróbuj według schematu: YYYY-MM-DD."
      ),
    check("newBirthDate")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isDate()
      .withMessage(
        "Wprowadzona wartość nie jest datą! Spróbuj według schematu: YYYY-MM-DD."
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
              const checkHerd = await findHerdByName(
                Herds,
                req.body.herdName,
                authData.id
              );
              if (checkHerd) {
                const findAnimal = await findAnimalByHerdIdAndIdentityNumber(
                  AnimalsInHerd,
                  checkHerd.id,
                  req.body.identityNumberOfAnimal
                );
                if (findAnimal) {
                  const updateBirthDateOfAnimal = await changeBirthDateOfAnimal(
                    AnimalsInHerd,
                    checkHerd.id,
                    findAnimal.identityNumber,
                    req.body.oldBirthDate,
                    req.body.newBirthDate
                  );
                  if (updateBirthDateOfAnimal) {
                    res.status(200).json({
                      Message:
                        "Data narodzin zwierzęcia została pomyślnie zmieniona!",
                    });
                  } else {
                    res.status(400).json({
                      Error: "Coś poszło nie tak! Sprawdź wprowadzone dane!",
                    });
                  }
                } else {
                  res.status(404).json({
                    Error:
                      "Nie znaleziono zwierzęcia o podanym numerze identyfikacyjnym!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Nie znaleziono hodowli o wprowadzonej nazwie!",
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
 * /animals/weight:
 *    put:
 *      tags:
 *      - name: Animals
 *      summary: Edit animal weight
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *        - name: identityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 4321
 *        - name: oldAnimalWeight
 *          in: formData
 *          required: true
 *          type: number
 *          format: float
 *          example: 4,8
 *        - name: newAnimalWeight
 *          in: formData
 *          required: true
 *          type: number
 *          format: float
 *          example: 4,2
 *      responses:
 *        200:
 *          description: Data updated successfully!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.put(
  "/weight",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("identityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("oldAnimalWeight")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isFloat()
      .withMessage("Wprowadzona wartość nie jest wartością liczbową!"),
    check("newAnimalWeight")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isFloat()
      .withMessage("Wprowadzona wartość nie jest wartością liczbową!"),
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
              const checkHerd = await findHerdByName(
                Herds,
                req.body.herdName,
                authData.id
              );
              if (checkHerd) {
                const findAnimal = await findAnimalByHerdIdAndIdentityNumber(
                  AnimalsInHerd,
                  checkHerd.id,
                  req.body.identityNumberOfAnimal
                );
                if (findAnimal) {
                  const updateWeightOfAnimal = await changeWeightOfAnimal(
                    AnimalsInHerd,
                    checkHerd.id,
                    findAnimal.identityNumber,
                    req.body.oldAnimalWeight,
                    req.body.newAnimalWeight
                  );
                  if (updateWeightOfAnimal) {
                    res.status(200).json({
                      Message: "Waga zwierzęcia została pomyślnie zmieniona!",
                    });
                  } else {
                    res.status(400).json({
                      Error: "Coś poszło nie tak! Sprawdź wprowadzone dane!",
                    });
                  }
                } else {
                  res.status(404).json({
                    Error:
                      "Nie znaleziono zwierzęcia o podanym numerze identyfikacyjnym!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Nie znaleziono hodowli o wprowadzonej nazwie!",
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
 * /animals/born:
 *    post:
 *      tags:
 *      - name: Animals
 *      summary: Add new born animal by user
 *      parameters:
 *        - name: kindOfAnimalName
 *          in: formData
 *          required: true
 *          type: string
 *          example: Królik
 *        - name: parentIdentityNumber
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 4321
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *        - name: birthDate
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *          example: 01-01-2021
 *        - name: temporaryIdentityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 0123
 *      responses:
 *        201:
 *          description: New born animal has been added!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.post(
  "/born",
  [
    check("kindOfAnimalName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 2, max: 256 })
      .withMessage("Nie spełniono wymagań co do wielkości wprowadzonej nazwy!"),
    check("parentIdentityNumber")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("birthDate")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isDate()
      .withMessage(
        "Wprowadzona wartość nie jest datą! Spróbuj według schematu: YYYY-MM-DD."
      ),
    check("temporaryIdentityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
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
            if (checkUser) {
              const checkHerdName = await findHerdByName(
                Herds,
                req.body.herdName,
                authData.id
              );
              if (checkHerdName) {
                const checkAnimalIdentityNumber = await checkEnteredIdentityNumberForAnimals(
                  AnimalsBirths,
                  req.body.temporaryIdentityNumberOfAnimal,
                  checkHerdName.id
                );
                if (checkAnimalIdentityNumber === null) {
                  const addNewBornAnimal = await createNewBornAnimal(
                    res,
                    AnimalsBirths,
                    checkHerdName.id,
                    req.body.kindOfAnimalName,
                    req.body.parentIdentityNumber,
                    req.body.birthDate,
                    req.body.temporaryIdentityNumberOfAnimal
                  );
                  if (addNewBornAnimal) {
                    res.status(201).json({
                      Message: "Pomyślnie dodano nowo narodzone zwierzę!",
                    });
                  } else {
                    res.status(400).json({
                      Error: "Coś poszło nie tak! Sprawdź wprowadzone dane!",
                    });
                  }
                } else {
                  res.status(400).json({
                    Error:
                      "Wprowadzony numer identyfikacyjny jest już przypisany do innego zwierzęcia!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Hodowla o wprowadzonej nazwie nie istnieje!",
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
 * /animals/bornBirthDate:
 *    put:
 *      tags:
 *      - name: Animals
 *      summary: Edit new born animal birth date
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *        - name: animalChildIdentityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 0123
 *        - name: oldBirthDate
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *          example: 01-01-2021
 *        - name: newBirthDate
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *          example: 28-12-2020
 *      responses:
 *        200:
 *          description: Data updated successfully!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.put(
  "/bornBirthDate",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("animalChildIdentityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("oldBirthDate")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isDate()
      .withMessage(
        "Wprowadzona wartość nie jest datą! Spróbuj według schematu: YYYY-MM-DD."
      ),
    check("newBirthDate")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isDate()
      .withMessage(
        "Wprowadzona wartość nie jest datą! Spróbuj według schematu: YYYY-MM-DD."
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
              const checkHerd = await findHerdByName(
                Herds,
                req.body.herdName,
                authData.id
              );
              if (checkHerd) {
                const findAnimal = await findNewBornAnimalByIdentityNumber(
                  AnimalsBirths,
                  checkHerd.id,
                  req.body.animalChildIdentityNumberOfAnimal
                );
                if (findAnimal) {
                  const updateBirthDateOfNewBornAnimal = await changeBirthDateOfNewBornAnimal(
                    AnimalsBirths,
                    checkHerd.id,
                    findAnimal.identityNumber,
                    req.body.oldBirthDate,
                    req.body.newBirthDate
                  );
                  if (updateBirthDateOfNewBornAnimal) {
                    res.status(200).json({
                      Message:
                        "Data narodzin zwierzęcia została pomyślnie zmieniona!",
                    });
                  } else {
                    res.status(400).json({
                      Error: "Coś poszło nie tak! Sprawdź wprowadzone dane!",
                    });
                  }
                } else {
                  res.status(404).json({
                    Error:
                      "Nie znaleziono zwierzęcia o podanym numerze identyfikacyjnym!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Nie znaleziono hodowli o wprowadzonej nazwie!",
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
 * /animals/bornInHerd/{herdName}:
 *    get:
 *      tags:
 *      - name: Animals
 *      summary: Take all new born animals in herd
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *      responses:
 *        200:
 *          description: List of new born animals.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.get("/bornInHerd/:herdName", verifyToken, (req, res) => {
  if (req.params.herdName) {
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
              req.params.herdName,
              authData.id
            );
            if (findHerd) {
              const findNewBornAnimalsInHerd = await findAllNewBornAnimalsInHerd(
                AnimalsBirths,
                findHerd.id
              );
              if (findNewBornAnimalsInHerd !== null) {
                res.status(200).json(findNewBornAnimalsInHerd);
              } else {
                res.status(404).json({
                  Error:
                    "Użytkownik nie posiada zwierząt przypisanych do jakiejkolwiek hodowli!",
                });
              }
            } else {
              res
                .status(404)
                .json({ Error: "Użytkownik nie posiada hodowli!" });
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
 * /animals/allReasonsOfDeath:
 *    get:
 *      tags:
 *      - name: Animals
 *      summary: Take all reasons of death
 *      responses:
 *        200:
 *          description: List of reasons deaths.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.get("/allReasonsOfDeath", verifyToken, (req, res) => {
  jwt.verify(
    req.token,
    process.env.S3_SECRETKEY,
    async (jwtError, authData) => {
      if (jwtError) {
        res.status(403).json({ Error: "Błąd uwierzytelniania!" });
      } else {
        const checkUser = await findUserById(Users, authData);
        if (checkUser !== null) {
          const findReasonDeath = await findAllReasonDeath(ReasonOfDeath);
          if (findReasonDeath !== null) {
            res.status(200).json(findReasonDeath);
          } else {
            res.status(404).json({
              Error: "System nie posiada przypisanych płci zwierząt!",
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
 * /animals/dead:
 *    post:
 *      tags:
 *      - name: Animals
 *      summary: Add new dead animal
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *        - name: identityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 4321
 *        - name: dateOfDeath
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *          example: 02-02-2021
 *        - name: reasonDeath
 *          in: formData
 *          required: true
 *          type: string
 *          example: Ubój
 *        - name: description
 *          in: formData
 *          required: true
 *          type: string
 *          example: Zwierzę zostało przeznaczone na mięso
 *      responses:
 *        201:
 *          description: New dead animal has been added!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.post(
  "/dead",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("identityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("dateOfDeath")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isDate()
      .withMessage(
        "Wprowadzona wartość nie jest datą! Spróbuj według schematu: YYYY-MM-DD."
      ),
    check("reasonDeath")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 256 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("description")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 256 })
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
            if (checkUser) {
              const checkHerdName = await findHerdByName(
                Herds,
                req.body.herdName,
                authData.id
              );
              if (checkHerdName) {
                const checkAnimalIdentityNumber = await checkEnteredIdentityNumberForAnimals(
                  AnimalsDeads,
                  req.body.identityNumberOfAnimal,
                  checkHerdName.id
                );
                if (checkAnimalIdentityNumber === null) {
                  const addNewDeadAnimal = await createNewDeadAnimal(
                    res,
                    AnimalsDeads,
                    checkHerdName.id,
                    req.body.identityNumberOfAnimal,
                    req.body.dateOfDeath,
                    req.body.reasonDeath,
                    req.body.description
                  );
                  if (addNewDeadAnimal) {
                    res.status(201).json({
                      Message: "Pomyślnie dodano nowe zmarłe zwierzę!",
                    });
                  } else {
                    res.status(400).json({
                      Error: "Coś poszło nie tak!Sprawdź wprowadzone dane!",
                    });
                  }
                } else {
                  res.status(400).json({
                    Error:
                      "Wprowadzony numer identyfikacyjny jest już przypisany do innego zwierzęcia!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Hodowla o wprowadzonej nazwie nie istnieje!",
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
 * /animals/allDeadsInHerd/{herdName}:
 *    get:
 *      tags:
 *      - name: Animals
 *      summary: Take all deads animals in herd
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *      responses:
 *        200:
 *          description: List of deads animals.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.get("/allDeadsInHerd/:herdName", verifyToken, (req, res) => {
  if (req.params.herdName) {
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
              req.params.herdName,
              authData.id
            );
            if (findHerd) {
              const findDeadAnimalsInHerd = await findAllNewDeadAnimalsInHerd(
                AnimalsDeads,
                findHerd.id
              );
              if (findDeadAnimalsInHerd !== null) {
                res.status(200).json(findDeadAnimalsInHerd);
              } else {
                res.status(404).json({
                  Error:
                    "Użytkownik nie posiada zwierząt przypisanych do tabeli ze zgonami!",
                });
              }
            } else {
              res
                .status(404)
                .json({ Error: "Użytkownik nie posiada hodowli!" });
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
 * /animals/deadIdentityNumber:
 *    put:
 *      tags:
 *      - name: Animals
 *      summary: Edit new dead animal identity number
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *        - name: oldIdentityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 4321
 *        - name: newIdentityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 5678
 *      responses:
 *        200:
 *          description: Data updated successfully!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.put(
  "/deadIdentityNumber",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("oldIdentityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("newIdentityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
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
              const checkHerd = await findHerdByName(
                Herds,
                req.body.herdName,
                authData.id
              );
              if (checkHerd) {
                const checkAnimalIdentityNumber = await checkEnteredIdentityNumberForAnimals(
                  AnimalsDeads,
                  req.body.newIdentityNumberOfAnimal,
                  checkHerd.id
                );
                if (checkAnimalIdentityNumber === null) {
                  const findAnimal = await findDeadAnimalByHerdNameAndIdentityNumber(
                    AnimalsDeads,
                    checkHerd.id,
                    req.body.oldIdentityNumberOfAnimal
                  );
                  if (findAnimal) {
                    const updateDeadAnimalIdentityNumber = await changeAnimalIdentityNumber(
                      AnimalsDeads,
                      req.body.oldIdentityNumberOfAnimal,
                      req.body.newIdentityNumberOfAnimal,
                      checkHerd.id
                    );
                    if (updateDeadAnimalIdentityNumber) {
                      res.status(200).json({
                        Message:
                          "Numer identyfikacyjny zwierzęcia został zmieniony pomyślnie!",
                      });
                    } else {
                      res.status(400).json({
                        Error:
                          "Nie udało się zmienić numeru identyfikacyjnego zwierzęcia!",
                      });
                    }
                  } else {
                    res.status(404).json({
                      Error:
                        "Nie znaleziono zwierzęcia o wprowadzonym numerze identyfikacyjnym!",
                    });
                  }
                } else {
                  res.status(400).json({
                    Error:
                      "Wprowadzony numer identyfikacyjny jest już przypisany do innego zwierzęcia!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Nie znaleziono hodowli o wprowadzonej nazwie!",
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
 * /animals/deadDate:
 *    put:
 *      tags:
 *      - name: Animals
 *      summary: Edit new dead animal date of death
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *        - name: identityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 4321
 *        - name: oldDate
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *          example: 02-02-2021
 *        - name: newDate
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *          example: 01-02-2021
 *      responses:
 *        200:
 *          description: Data updated successfully!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.put(
  "/deadDate",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("identityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("oldDate")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isDate()
      .withMessage(
        "Wprowadzona wartość nie jest datą! Spróbuj według schematu: YYYY-MM-DD."
      ),
    check("newDate")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isDate()
      .withMessage(
        "Wprowadzona wartość nie jest datą! Spróbuj według schematu: YYYY-MM-DD."
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
              const checkHerd = await findHerdByName(
                Herds,
                req.body.herdName,
                authData.id
              );
              if (checkHerd) {
                const findAnimal = await findDeadAnimalByHerdNameAndIdentityNumber(
                  AnimalsDeads,
                  checkHerd.id,
                  req.body.identityNumberOfAnimal
                );
                if (findAnimal) {
                  const updateDateOfDead = await changeDateOfAnimalDead(
                    AnimalsDeads,
                    req.body.oldDate,
                    req.body.newDate,
                    findAnimal.identityNumber,
                    checkHerd.id
                  );
                  if (updateDateOfDead) {
                    res
                      .status(200)
                      .json({ Message: "Pomyślnie zmieniono datę śmierci!" });
                  } else {
                    res
                      .status(400)
                      .json({ Error: "Nie udało się zmienić daty!" });
                  }
                } else {
                  res.status(404).json({
                    Error:
                      "Nie znaleziono martwego zwierzęcia o podanym numerze identyfikacyjnym!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Nie znaleziono hodowli o wprowadzonej nazwie!",
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
 * /animals/born:
 *    delete:
 *      tags:
 *      - name: Animals
 *      summary: Delete new born animal
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *        - name: temporaryIdentityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 0123
 *        - name: confirmTemporaryIdentityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 0234
 *      responses:
 *        200:
 *          description: The new born animal deleted successfully!
 *        400:
 *          description: The animal could not be removed!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.delete(
  "/born",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("temporaryIdentityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("confirmTemporaryIdentityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!")
      .custom((value, { req }) => {
        if (value !== req.body.temporaryIdentityNumberOfAnimal) {
          throw new Error(
            "Wprowadzone numery identyfikacyjne zwierzęcia są różne!"
          );
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
              const checkHerd = await findHerdByName(
                Herds,
                req.body.herdName,
                authData.id
              );
              if (checkHerd) {
                const findAnimal = await findNewBornAnimalByIdentityNumber(
                  AnimalsBirths,
                  checkHerd.id,
                  req.body.temporaryIdentityNumberOfAnimal
                );
                if (findAnimal) {
                  const deleteAnimalByUser = await deleteAnimal(
                    AnimalsBirths,
                    checkHerd.id,
                    req.body.temporaryIdentityNumberOfAnimal
                  );
                  if (deleteAnimalByUser) {
                    res.status(200).json({
                      Message: "Młode zwierzę zostało trwale usunięte!",
                    });
                  } else {
                    res
                      .status(400)
                      .json({ Error: "Nie udało się usunąć zwierzęcia!" });
                  }
                } else {
                  res.status(404).json({
                    Error:
                      "Nie znaleziono zwierzęcia o podanym numerze identyfikacyjnym!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Nie znaleziono hodowli o wprowadzonej nazwie!",
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
 * /animals/dead:
 *    delete:
 *      tags:
 *      - name: Animals
 *      summary: Delete dead animal
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *        - name: identityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 4321
 *        - name: confirmIdentityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 4321
 *      responses:
 *        200:
 *          description: The dead animal deleted successfully!
 *        400:
 *          description: The animal could not be removed!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.delete(
  "/dead",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("identityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("confirmIdentityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!")
      .custom((value, { req }) => {
        if (value !== req.body.identityNumberOfAnimal) {
          throw new Error(
            "Wprowadzone numery identyfikacyjne zwierzęcia są różne!"
          );
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
              const checkHerd = await findHerdByName(
                Herds,
                req.body.herdName,
                authData.id
              );
              if (checkHerd) {
                const findAnimal = await findDeadAnimalByHerdNameAndIdentityNumber(
                  AnimalsDeads,
                  checkHerd.id,
                  req.body.identityNumberOfAnimal
                );
                if (findAnimal) {
                  const deleteAnimalByUser = await deleteAnimal(
                    AnimalsDeads,
                    checkHerd.id,
                    req.body.identityNumberOfAnimal
                  );
                  if (deleteAnimalByUser) {
                    res.status(200).json({
                      Message: "Zmarłe zwierzę zostało trwale usunięte!",
                    });
                  } else {
                    res
                      .status(400)
                      .json({ Error: "Nie udało się usunąć zwierzęcia!" });
                  }
                } else {
                  res.status(404).json({
                    Error:
                      "Nie znaleziono zwierzęcia o podanym numerze identyfikacyjnym!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Nie znaleziono hodowli o wprowadzonej nazwie!",
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
 * /animals/animal:
 *    delete:
 *      tags:
 *      - name: Animals
 *      summary: Delete animal from herd
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *        - name: identityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 4321
 *        - name: confirmIdentityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 4321
 *      responses:
 *        200:
 *          description: Animal deleted successfully!
 *        400:
 *          description: The animal could not be removed!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.delete(
  "/animal",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("identityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("confirmIdentityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!")
      .custom((value, { req }) => {
        if (value !== req.body.identityNumberOfAnimal) {
          throw new Error(
            "Wprowadzone numery identyfikacyjne zwierzęcia są różne!"
          );
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
              const checkHerd = await findHerdByName(
                Herds,
                req.body.herdName,
                authData.id
              );
              if (checkHerd) {
                const findAnimal = await findAnimalByHerdIdAndIdentityNumber(
                  AnimalsInHerd,
                  checkHerd.id,
                  req.body.identityNumberOfAnimal
                );
                if (findAnimal) {
                  const deleteAnimalByUser = await deleteAnimal(
                    AnimalsInHerd,
                    checkHerd.id,
                    req.body.identityNumberOfAnimal
                  );
                  if (deleteAnimalByUser) {
                    res.status(200).json({
                      Message: "Zwierzę zostało trwale usunięte ze stada!",
                    });
                  } else {
                    res
                      .status(400)
                      .json({ Error: "Nie udało się usunąć zwierzęcia!" });
                  }
                } else {
                  res.status(404).json({
                    Error:
                      "Nie znaleziono zwierzęcia o podanym numerze identyfikacyjnym!",
                  });
                }
              } else {
                res.status(404).json({
                  Error: "Nie znaleziono hodowli o wprowadzonej nazwie!",
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
