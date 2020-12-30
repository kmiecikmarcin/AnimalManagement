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
const findAnimalByHerdNameAndIdentityNumber = require("../Functions/Animals/findAnimalByHerdNameAndIdentityNumber");
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
            res.status(200).json({ Genders: findAnimalsGenders });
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
            res.status(200).json({ Genders: findKindsOfAnimals });
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
            res.status(200).json({ TypesOfJoin: findTypesOfJoinToTheHerd });
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

router.get("/findAllAnimalsInHerd/:herdName", verifyToken, (req, res) => {
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
                res.status(200).json({ AnimalsInHerd: findAnimalsInHerd });
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

router.put(
  "/editIdentityNumberOfAnimal",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długośc wprowadzonej nazwy jest niezgodna z wymaganiami!"),
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
                const findAnimal = await findAnimalByHerdNameAndIdentityNumber(
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
                    res.status(201).json({
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

router.put(
  "/editBreedOfAnimal",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długośc wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("identityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartośc nie jest ciągiem liczbowym!"),
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
                const findAnimal = await findAnimalByHerdNameAndIdentityNumber(
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
                    res.status(201).json({
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

router.put(
  "/editBirthDate",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długośc wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("identityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartośc nie jest ciągiem liczbowym!"),
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
                const findAnimal = await findAnimalByHerdNameAndIdentityNumber(
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
                    res.status(201).json({
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

router.put(
  "/editAnimalWeight",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długośc wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("identityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartośc nie jest ciągiem liczbowym!"),
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
                const findAnimal = await findAnimalByHerdNameAndIdentityNumber(
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
                    res.status(201).json({
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
              const addNewBornAnimal = await createNewBornAnimal(
                res,
                AnimalsBirths,
                authData.id,
                req.body.herdName,
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
                  Error: "Coś poszło nie tak!Sprawdź wprowadzone dane!",
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
  "/editNewBornAnimalBirthDate",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długośc wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("animalChildIdentityNumberOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartośc nie jest ciągiem liczbowym!"),
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
                    res.status(201).json({
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

router.get(
  "/takeAllNewBornAnimalsInHerd/:herdName",
  verifyToken,
  (req, res) => {
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
                  res
                    .status(200)
                    .json({ AnimalsBirths: findNewBornAnimalsInHerd });
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
  }
);

router.get("/takeAllReasonDeath", verifyToken, (req, res) => {
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
            res.status(200).json({ ReasonOfDeath: findReasonDeath });
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

router.post(
  "/addNewDeadAnimal",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długośc wprowadzonej nazwy jest niezgodna z wymaganiami!"),
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
              const addNewDeadAnimal = await createNewDeadAnimal(
                res,
                AnimalsDeads,
                authData.id,
                req.body.herdName,
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
              res.status(404).json({ Error: "Użytkownik nie istnieje!" });
            }
          }
        }
      );
    }
  }
);

router.get("/takeAllDeadsAnimalsInHerd/:herdName", verifyToken, (req, res) => {
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
                res.status(200).json({ AnimalsDeads: findDeadAnimalsInHerd });
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

router.get(
  "/findOneAnimalInHerd/:herdName/:identityNumber",
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
                const responseAboutFoundAnimal = await findAnimalByHerdNameAndIdentityNumber(
                  AnimalsInHerd,
                  findHerd.id,
                  req.params.identityNumber
                );
                if (responseAboutFoundAnimal !== null) {
                  res.status(200).json({ Animal: responseAboutFoundAnimal });
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

router.put("/editNewDeadAnimalIdentityNumber", [], verifyToken, () => {});

router.put("/editNewDeadAnimalDateOfDeath", [], verifyToken, () => {});

router.put("/editNewDeadAnimalReasonOfDeath", [], verifyToken, () => {});

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

module.exports = router;
