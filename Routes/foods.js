const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const verifyToken = require("../Functions/Users/verifyJwtToken");
require("dotenv").config();
const Users = require("../Models/Users");
const SpeciesOfFoods = require("../Models/SpeciesOfFoods");
const PurchasedFoodForHerd = require("../Models/PurchasedFoodForHerd");
const findUserById = require("../Functions/Users/findUserById");
const findSpeciesOfFoods = require("../Functions/Foods/findSpeciesOfFoods");
const checkIdentityNumberForFoodAndProducts = require("../Functions/Others/checkIdentityNumberForFoodAndProducts");
const createNewPurchasedFood = require("../Functions/Foods/createNewPurchasedFoods");
const findAllSpeciesOfFoods = require("../Functions/Foods/findAllSpeciesOfFoods");
const findAllUserFoodStatus = require("../Functions/Foods/findAllUserFoodStatus");
const findAllUserFoodsStatusByItsSpecies = require("../Functions/Foods/findAllUserFoodsStatusByItsSpecies");
const changeSpeciesOfFood = require("../Functions/Foods/changeSpeciesOfFood");
const changeQuantityOfFood = require("../Functions/Foods/changeQuantityOfFood");

/**
 * @swagger
 * /food/takeAllSpeciesOfFood:
 *    get:
 *      tags:
 *      - name: Food
 *      summary: Take all species of food
 *      responses:
 *        201:
 *          description: List of data about species of food.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System doesn't have assigned species of food! or User doesn't exist!
 */
router.get("/takeAllSpeciesOfFood", verifyToken, (req, res) => {
  jwt.verify(
    req.token,
    process.env.S3_SECRETKEY,
    async (jwtError, authData) => {
      if (jwtError) {
        res.status(403).json({ Error: "Błąd uwierzytelniania!" });
      } else {
        const checkUser = await findUserById(Users, authData);
        if (checkUser !== null) {
          const findSpecies = await findAllSpeciesOfFoods(SpeciesOfFoods);
          if (findSpecies) {
            res.status(200).json({ SpeciesOfFoods: findSpecies });
          } else {
            res.status(404).json({
              Error: "System nie posiada przypisanych gatunków pożywienia",
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
 * /food/addNewFood:
 *    post:
 *      tags:
 *      - name: Food
 *      summary: Add new food
 *      parameters:
 *        - name: identityNumberOfPurchasedFood
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *        - name: speciesOfFoodName
 *          in: formData
 *          required: true
 *          type: string
 *        - name: quantityOfFood
 *          in: formData
 *          required: true
 *          type: number
 *          format: float
 *        - name: dateOfPurchasedFood
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *      responses:
 *        201:
 *          description: New food has been added!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User or species of food doesn't exist!
 */
router.post(
  "/addNewFood",
  [
    check("identityNumberOfPurchasedFood")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("speciesOfFoodName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ max: 256 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("quantityOfFood")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isFloat()
      .withMessage("Wprowadzona wartość nie jest liczbą!"),
    check("dateOfPurchasedFood")
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
              const checkSpeciesOfFood = await findSpeciesOfFoods(
                SpeciesOfFoods,
                req.body.speciesOfFoodName
              );
              if (checkSpeciesOfFood !== null) {
                const checkIdentityNumber = await checkIdentityNumberForFoodAndProducts(
                  PurchasedFoodForHerd,
                  req.body.identityNumberOfPurchasedFood,
                  authData.id
                );
                if (checkIdentityNumber === null) {
                  const addNewFood = await createNewPurchasedFood(
                    PurchasedFoodForHerd,
                    req.body.identityNumberOfPurchasedFood,
                    req.body.quantityOfFood,
                    req.body.dateOfPurchasedFood,
                    checkSpeciesOfFood.id,
                    authData.id
                  );
                  if (addNewFood !== null) {
                    res.status(201).json({
                      Message: "Pomyślnie dodano zakupione pożywienie!",
                    });
                  } else {
                    res.status(400).json({
                      Error: "Nie udało się dodać nowego pożywienia!",
                    });
                  }
                } else {
                  res.status(400).json({
                    Error:
                      "Wprowadzony numer identyfikacyjny jest już przypisany do innego zakupionego pożywienia!",
                  });
                }
              } else {
                res.status(404).json({
                  Error:
                    "Wprowadzony gatunek pożywienia nie istnieje w systemie!",
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
 * /food/takeFoodStatus:
 *    get:
 *      tags:
 *      - name: Food
 *      summary: Take all food status
 *      responses:
 *        201:
 *          description: List with data about food status.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't have food assigned to his account! or User doesn't exist!
 */
router.get("/takeFoodStatus", verifyToken, (req, res) => {
  jwt.verify(
    req.token,
    process.env.S3_SECRETKEY,
    async (jwtError, authData) => {
      if (jwtError) {
        res.status(403).json({ Error: "Błąd uwierzytelniania!" });
      } else {
        const checkUser = await findUserById(Users, authData);
        if (checkUser !== null) {
          const findUserFood = await findAllUserFoodStatus(
            PurchasedFoodForHerd,
            authData.id
          );
          if (findUserFood !== null) {
            res.status(200).json({ FoodStatus: findUserFood });
          } else {
            res.status(404).json({
              Error: "Użytkownik nie posiada żadnego przypisanego pożywienia!",
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
 * /food/takeFoodStatus/{typeName}:
 *    get:
 *      tags:
 *      - name: Food
 *      summary: Take all food status
 *      parameters:
 *        - name: typeName
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        201:
 *          description: List with data about food status - but taking by food type.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't have food assigned to his account! or User doesn't exist!
 */
router.get("/takeFoodStatusByItsType/:speciesName", verifyToken, (req, res) => {
  console.log(req.params.speciesName);
  if (req.params.speciesName) {
    jwt.verify(
      req.token,
      process.env.S3_SECRETKEY,
      async (jwtError, authData) => {
        if (jwtError) {
          res.status(403).json({ Error: "Błąd uwierzytelniania!" });
        } else {
          const checkUser = await findUserById(Users, authData);
          if (checkUser !== null) {
            const findSpecies = await findSpeciesOfFoods(
              SpeciesOfFoods,
              req.params.speciesName
            );
            if (findSpecies !== null) {
              const findFoodsStatusBySpecies = await findAllUserFoodsStatusByItsSpecies(
                PurchasedFoodForHerd,
                authData.id,
                findSpecies.id
              );
              if (findFoodsStatusBySpecies !== null) {
                res.status(200).json({ FoodsStatus: findFoodsStatusBySpecies });
              } else {
                res.status(404).json({
                  Error: "Użytkownik nie posiada pożywienia wybranego gatunku!",
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
  } else {
    res.status(400).json({ Error: "Nie wprowadzono danych!" });
  }
});

/**
 * @swagger
 * /food/editSpeciesOfFood:
 *    put:
 *      tags:
 *      - name: Food
 *      summary: Edit species of food
 *      parameters:
 *        - name: identityNumberOfPurchasedFood
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *        - name: speciesOfFoodName
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        201:
 *          description: Data updated successfully!
 *        400:
 *          description: Data has not been updated!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.put(
  "/editSpeciesOfFood",
  [
    check("identityNumberOfPurchasedFood")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest jest liczbą!!"),
    check("speciesOfFoodName")
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
              const checkSpecies = await findSpeciesOfFoods(
                SpeciesOfFoods,
                req.body.speciesOfFoodName
              );
              if (checkSpecies !== null) {
                const updateSpecies = await changeSpeciesOfFood(
                  PurchasedFoodForHerd,
                  req.body.identityNumberOfPurchasedFood,
                  checkSpecies.id,
                  authData.id
                );
                if (updateSpecies !== null) {
                  res.status(201).json({
                    Message: "Pomyślnie zmieniono gatunek pożywienia!",
                  });
                } else {
                  res.status(400).json({
                    Error: "Nie udało się zmienić gatunku pożywienia!",
                  });
                }
              } else {
                res.status(404).json({
                  Error:
                    "Wprowadzony gatunek pożywienia nie istnieje w systemie!",
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
 * /food/editQuantityOfFood:
 *    put:
 *      tags:
 *      - name: Food
 *      summary: Edit quantity of food
 *      parameters:
 *        - name: identityNumberOfPurchasedFood
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *        - name: quantityOfFood
 *          in: formData
 *          required: true
 *          type: number
 *          format: float
 *      responses:
 *        201:
 *          description: Data updated successfully!
 *        400:
 *          description: Data has not been updated!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.put(
  "/editQuantityOfFood",
  [
    check("identityNumberOfPurchasedFood")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest liczbą!"),
    check("quantityOfFood")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isFloat()
      .withMessage("Wprowadzona wartość nie jest liczbą!"),
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
              const checkIdentityNumber = await checkIdentityNumberForFoodAndProducts(
                PurchasedFoodForHerd,
                req.body.identityNumberOfPurchasedFood,
                authData.id
              );
              if (checkIdentityNumber !== null) {
                const updateQuantity = await changeQuantityOfFood(
                  PurchasedFoodForHerd,
                  req.body.identityNumberOfPurchasedFood,
                  req.body.quantityOfFood,
                  checkIdentityNumber.quantity,
                  checkIdentityNumber.currentQuantity,
                  authData.id
                );
                if (updateQuantity !== null) {
                  res.status(201).json({
                    Message:
                      "Pomyślnie zaktualizowano ilość zakupionego pokarmu!",
                  });
                } else {
                  res.status(400).json({
                    Error: "Nie udało się zmienić ilości zakupionego pokarmu!",
                  });
                }
              } else {
                res.status(404).json({
                  Error:
                    "Użytkownik nie posiada pożywienia z wprowadzonym numerem identyfikacyjnym!",
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
 * /food/editDateOfPurchasedFood:
 *    put:
 *      tags:
 *      - name: Food
 *      summary: Edit date of purchased food
 *      parameters:
 *        - name: identityNumberOfPurchasedFood
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *        - name: oldDate
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *        - name: newDate
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *      responses:
 *        201:
 *          description: Data updated successfully!
 *        400:
 *          description: Data has not been updated!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.put(
  "/editDateOfPurchasedFood",
  [
    check("identityNumberOfPurchasedFood")
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
  () => {}
);

/**
 * @swagger
 * /food/assignFoodToHerd:
 *    post:
 *      tags:
 *      - name: Food
 *      summary: Assign food to herd
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *        - name: identityNumberOfFoodUsedForHerd
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *        - name: quantityOfFoodUsedForHerd
 *          in: formData
 *          required: true
 *          type: number
 *          format: float
 *        - name: dateWhenFoodWasUsed
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *      responses:
 *        201:
 *          description: New food in herd has been added!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User or herd doesn't exist!
 */
router.post(
  "/assignFoodToHerd",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("identityNumberOfFoodUsedForHerd")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest jest liczbą!!"),
    check("quantityOfFoodUsedForHerd")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isFloat()
      .withMessage("Wprowadzona wartość nie jest jest liczbą!!"),
    check("dateWhenFoodWasUsed")
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

/**
 * @swagger
 * /food/takeFoodStatusInHerd:
 *    get:
 *      tags:
 *      - name: Food
 *      summary: Take all food status in herd
 *      responses:
 *        201:
 *          description: List with data about food status in herd.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't have food assigned to his herd! or User doesn't exist!
 */
router.get("/takeFoodStatusInHerd", verifyToken, () => {});

/**
 * @swagger
 * /food/takeFoodStatusInHerdByItsType/{typeName}:
 *    get:
 *      tags:
 *      - name: Food
 *      summary: Take all food status in herd by its type
 *      parameters:
 *        - name: typeName
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        201:
 *          description: List with data about food status - but taking by food type.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't have food assigned to his herd! or User doesn't exist!
 */
router.get("/takeFoodStatusInHerdByItsType/:typeName", verifyToken, () => {});

/**
 * @swagger
 * /food/editQuantityOfFoodUsedForAnimals:
 *    put:
 *      tags:
 *      - name: Food
 *      summary: Edit quantity of food used for animals
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *        - name: identityNumberOfFoodUsedForHerd
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *        - name: newQuantityOfFoodUsedForHerd
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *      responses:
 *        201:
 *          description: Data updated successfully!
 *        400:
 *          description: Data has not been updated!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.put(
  "/editQuantityOfFoodUsedForAnimals",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("identityNumberOfFoodUsedForHerd")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest liczbą!"),
    check("newQuantityOfFoodUsedForHerd")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isFloat()
      .withMessage("Wprowadzona wartość nie jest liczbą!"),
  ],
  verifyToken,
  () => {}
);

/**
 * @swagger
 * /food/editDateWhenUserUsedFoodForHerd:
 *    put:
 *      tags:
 *      - name: Food
 *      summary: Edit date when user used food for herd
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *        - name: identityNumberOfFoodUsedForHerd
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *        - name: oldDate
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *        - name: newDate
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *      responses:
 *        201:
 *          description: Data updated successfully!
 *        400:
 *          description: Data has not been updated!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.put(
  "/editDateWhenUserUsedFoodForHerd",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("identityNumberOfFoodUsedForHerd")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest liczbą!"),
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
  () => {}
);

/**
 * @swagger
 * /food/deleteFood:
 *    delete:
 *      tags:
 *      - name: Food
 *      summary: Delete food
 *      parameters:
 *        - name: identityNumberOfPurchasedFood
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *      responses:
 *        201:
 *          description: Food deleted successfully!
 *        400:
 *          description: The food couldn not be removed!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.delete(
  "/deleteFood",
  [
    check("identityNumberOfPurchasedFood")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
  ],
  verifyToken,
  () => {}
);

/**
 * @swagger
 * /food/deleteFoodUsedForHerd:
 *    delete:
 *      tags:
 *      - name: Food
 *      summary: Delete food assigned to herd
 *      parameters:
 *        - name: identityNumberOfFoodUsedForHerd
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *      responses:
 *        201:
 *          description: Food deleted successfully!
 *        400:
 *          description: The food couldn not be removed!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.delete(
  "/deleteFoodUsedForHerd",
  [
    check("identityNumberOfFoodUsedForHerd")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest jest liczbą!!"),
  ],
  verifyToken,
  () => {}
);

module.exports = router;
