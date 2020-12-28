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
const findUserById = require("../Functions/Users/findUserById");
const createNewAnimal = require("../Functions/Animals/createNewAnimal");
const findAllAnimalsGenders = require("../Functions/Animals/findAllAnimalsGenders");
const findAllKindsOfAnimals = require("../Functions/Animals/findAllKindsOfAnimals");
const findAllJoinTypeToTheHerd = require("../Functions/Animals/findAllJoinTypeToTheHerd");
const findAllAnimalsInHerds = require("../Functions/Animals/findAllAnimalsInHerds");
const findAnimalByKindName = require("../Functions/Animals/findAnimalByKindName");
const findAllUserHerds = require("../Functions/Herds/findAllUserHerds");

router.get("/takeAllAnimalsGenders", verifyToken, (req, res) => {
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
            res.status(201).json({ Genders: findAnimalsGenders });
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

router.get("/takeAllKindsOfAnimals", verifyToken, (req, res) => {
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
            res.status(201).json({ Genders: findKindsOfAnimals });
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

router.get("/takeAllJoinTypeToTheHerd", verifyToken, (req, res) => {
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
            res.status(201).json({ TypesOfJoin: findTypesOfJoinToTheHerd });
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

router.post(
  "/addNewAnimal",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długośc wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("joinTypeName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 256 })
      .withMessage("Długośc wprowadzonej nazwy jest niezgodna z wymaganiami!"),
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
      .withMessage("Wprowadzona wartośc nie jest ciągiem liczbowym!"),
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
            const addNewAnimal = await createNewAnimal(
              res,
              AnimalsInHerd,
              authData.id,
              req.body.herdName,
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
            res.status(404).json({ Error: "Użytkownik nie istnieje!" });
          }
        }
      );
    }
  }
);

router.get("/findAllAnimalsInHerds", verifyToken, (req, res) => {
  jwt.verify(
    req.token,
    process.env.S3_SECRETKEY,
    async (jwtError, authData) => {
      if (jwtError) {
        res.status(403).json({ Error: "Błąd uwierzytelniania!" });
      } else {
        const checkUser = await findUserById(Users, authData);
        if (checkUser !== null) {
          const findHerd = await findAllUserHerds(Herds);
          if (findHerd) {
            const findAnimalsInHerd = await findAllAnimalsInHerds(
              AnimalsInHerd
            );
            if (findAnimalsInHerd !== null) {
              res.status(201).json({ AnimalsInHerd: findAnimalsInHerd });
            } else {
              res.status(404).json({
                Error:
                  "Użytkownik nie posiada zwierząt przypisanych do jakiejkolwiek hodowli!",
              });
            }
          } else {
            res.status(404).json({ Error: "Użytkownik nie posiada hodowli!" });
          }
        } else {
          res.status(404).json({ Error: "Użytkownik nie istnieje!" });
        }
      }
    }
  );
});

router.get("/findAnimalByTheirKindName/:name", verifyToken, (req, res) => {
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
            const findAnimal = await findAnimalByKindName(
              AnimalsInHerd,
              KindsOfAnimals,
              req.params.name
            );
            if (findAnimal) {
              res.status(201).json({ Animals: findAnimal });
            } else {
              res.status(404).json({
                Error: "Użytkownik nie posiada zwierząt tego rodzaju!",
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

router.get("/findAnimalByJoinType/:joinTypeName", verifyToken, () => {});

router.get("/findAnimalByHerdName/:name", verifyToken, () => {});

router.put(
  "/editIdentityNumberOfAnimal",
  [
    check("oldIdentityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartośc nie jest ciągiem liczbowym!"),
    check("newIdentityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartośc nie jest ciągiem liczbowym!"),
  ],
  verifyToken,
  () => {}
);

router.put(
  "/editBreedOfAnimal",
  [
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
  () => {}
);

router.put(
  "/editBirthDate",
  [
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
  () => {}
);

router.put(
  "/editAnimalWeight",
  [
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
  () => {}
);

router.put(
  "/editJoinType",
  [
    check("oldJoinTypeName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 256 })
      .withMessage("Długośc wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("newJoinTypeName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 256 })
      .withMessage("Długośc wprowadzonej nazwy jest niezgodna z wymaganiami!"),
  ],
  verifyToken,
  () => {}
);

router.post(
  "/addNewBornAnimal",
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
      .withMessage("Wprowadzona wartośc nie jest ciągiem liczbowym!"),
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długośc wprowadzonej nazwy jest niezgodna z wymaganiami!"),
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
      .withMessage("Wprowadzona wartośc nie jest ciągiem liczbowym!"),
  ],
  verifyToken,
  () => {}
);

router.put("/editNewBornAnimalBirthDate", [], verifyToken, () => {});

router.put("/editNewDeadAnimalIdentityNumber", [], verifyToken, () => {});

router.get("/takeAllNewBornAnimals", [], verifyToken, () => {});

router.get("/takeNewBornAnimalsInHerd", [], verifyToken, () => {});

router.post(
  "/addNewDeadAnimal",
  [
    check("identityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartośc nie jest ciągiem liczbowym!"),
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
      .withMessage("Długośc wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("description")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 256 })
      .withMessage("Długośc wprowadzonej nazwy jest niezgodna z wymaganiami!"),
  ],
  verifyToken,
  () => {}
);

router.put("/editNewDeadAnimalDateOfDeath", [], verifyToken, () => {});

router.put("/editNewDeadAnimalReasonOfDeath", [], verifyToken, () => {});

router.put("/editNewDeadAnimalDescription", [], verifyToken, () => {});

router.get("/takeAllReasonDeath", [], verifyToken, () => {});

router.get("/takeAllDeadAnimals", [], verifyToken, () => {});

router.get("/takeDeadAnimalsByReasonDeath", [], verifyToken, () => {});

router.delete(
  "/deleteAnimal",
  [
    check("identityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartośc nie jest ciągiem liczbowym!"),
    check("confirmIdentityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartośc nie jest ciągiem liczbowym!"),
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
  () => {}
);

router.delete(
  "/deleteDeadAnimal",
  [
    check("identityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartośc nie jest ciągiem liczbowym!"),
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
  () => {}
);

router.delete(
  "/deleteNewBornAnimal",
  [
    check("temporaryIdentityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartośc nie jest ciągiem liczbowym!"),
    check("confirmTemporaryIdentityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartośc nie jest ciągiem liczbowym!"),
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
  () => {}
);

router.get("/takeAllReasonDeath", [], verifyToken, () => {});

module.exports = router;
