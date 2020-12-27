const express = require("express");

const router = express.Router();
require("dotenv").config();
const { check } = require("express-validator");
const verifyToken = require("../Functions/Users/verifyJwtToken");

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
      .isLength({ min: 2, max: 20 })
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
  () => {}
);

router.get("/takeAllAnimalGender", [], verifyToken, () => {});

router.get("/takeAllKindOfAnimals", [], verifyToken, () => {});

router.get("/takeAllJoinTypeToTheHerd", [], verifyToken, () => {});

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

router.get("/findAllAnimalsInHerds", [], verifyToken, () => {});

router.get("/findAnimalByKind", [], verifyToken, () => {});

router.get("/findAnimalByJoinType", [], verifyToken, () => {});

router.get("/findAnimalByHerd", [], verifyToken, () => {});

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

router.delete("/deleteDeadAnimal", [], verifyToken, () => {});

router.delete("/deleteNewBornAnimal", [], verifyToken, () => {});

router.get("/takeAllReasonDeath", [], verifyToken, () => {});

module.exports = router;
