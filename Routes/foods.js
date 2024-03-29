const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const verifyToken = require("../Functions/Users/verifyJwtToken");
require("dotenv").config();
const Users = require("../Models/Users");
const SpeciesOfFoods = require("../Models/SpeciesOfFoods");
const PurchasedFoodForHerd = require("../Models/PurchasedFoodForHerd");
const Herds = require("../Models/Herds");
const FoodUsedForHerd = require("../Models/FoodUsedForHerd");
const findUserById = require("../Functions/Users/findUserById");
const findSpeciesOfFoods = require("../Functions/Foods/findSpeciesOfFoods");
const checkIdentityNumberForFoodAndProducts = require("../Functions/Others/checkIdentityNumberForFoodAndProducts");
const createNewPurchasedFood = require("../Functions/Foods/createNewPurchasedFoods");
const findAllSpeciesOfFoods = require("../Functions/Foods/findAllSpeciesOfFoods");
const findAllUserFoodStatus = require("../Functions/Foods/findAllUserFoodStatus");
const findAllUserFoodsStatusByItsSpecies = require("../Functions/Foods/findAllUserFoodsStatusByItsSpecies");
const changeSpeciesOfFood = require("../Functions/Foods/changeSpeciesOfFood");
const changeQuantityOfFood = require("../Functions/Foods/changeQuantityOfFood");
const changeDateOfPurchasedFood = require("../Functions/Foods/changeDateOfPurchasedFood");
const findHerdByName = require("../Functions/Herds/findHerdByName");
const createNewFoodUsedForHerd = require("../Functions/Foods/createNewFoodUsedForHerd");
const checkEnteredIdentityNumber = require("../Functions/Others/checkEnteredIdentityNumber");
const changeCurrentQuantityOfFood = require("../Functions/Foods/changeCurrentQuantityOfFood");
const findAllUserHerds = require("../Functions/Herds/findAllUserHerds");
const findAllUsedFoodByUser = require("../Functions/Foods/findAllUsedFoodByUser");
const findAllUsedFoodByUserByFoodType = require("../Functions/Foods/findAllUsedFoodByUserByFoodType");
const changeQuantityOfFoodUsedForAnimals = require("../Functions/Foods/changeQuantityOfFoodUsedForAnimals");
const changeDateOfFoodUsedForHerd = require("../Functions/Foods/changeDateOfFoodUsedForHerd");
const checkPurchasedFoodId = require("../Functions/Foods/checkPurchasedFoodId");
const deletePurchasedFood = require("../Functions/Foods/deletePurchasedFood");
const deleteFoodUsedForHerd = require("../Functions/Foods/deleteFoodUsedForHerd");

/**
 * @swagger
 * /foods/allSpecies:
 *    get:
 *      tags:
 *      - name: Food
 *      summary: Take all species of food
 *      responses:
 *        200:
 *          description: List of data about species of food.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System doesn't have assigned species of food! or User doesn't exist!
 */
router.get("/allSpecies", verifyToken, (req, res) => {
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
            res.status(200).json(findSpecies);
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
 * /foods/food:
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
 *          example: 1234
 *        - name: speciesOfFoodName
 *          in: formData
 *          required: true
 *          type: string
 *          example: Przenica
 *        - name: quantityOfFood
 *          in: formData
 *          required: true
 *          type: number
 *          format: float
 *          example: 50 (kg)
 *        - name: dateOfPurchasedFood
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *          example: 01-01-2021
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
  "/food",
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
 * /foods/foodStatus:
 *    get:
 *      tags:
 *      - name: Food
 *      summary: Take all food status
 *      responses:
 *        200:
 *          description: List with data about food status.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't have food assigned to his account! or User doesn't exist!
 */
router.get("/foodStatus", verifyToken, (req, res) => {
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
            res.status(200).json(findUserFood);
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
 * /foods/foodStatus/{speciesName}:
 *    get:
 *      tags:
 *      - name: Food
 *      summary: Take all food status
 *      parameters:
 *        - name: speciesName
 *          in: formData
 *          required: true
 *          type: string
 *          example: Przenica
 *      responses:
 *        200:
 *          description: List with data about food status - but taking by food type.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't have food assigned to his account! or User doesn't exist!
 */
router.get("/foodStatus/:speciesName", verifyToken, (req, res) => {
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
                res.status(200).json(findFoodsStatusBySpecies);
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
 * /foods/species:
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
 *          example: 1234
 *        - name: speciesOfFoodName
 *          in: formData
 *          required: true
 *          type: string
 *          example: Burak
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
  "/species",
  [
    check("identityNumberOfPurchasedFood")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest jest liczbą!"),
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
                  res.status(200).json({
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
 * /foods/quantity:
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
 *          example: 1234
 *        - name: quantityOfFood
 *          in: formData
 *          required: true
 *          type: number
 *          format: float
 *          example: 40 (kg)
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
  "/quantity",
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
                  res.status(200).json({
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
 * /foods/dateOfPurchased:
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
 *          example: 1234
 *        - name: oldDate
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *          example: 01-01-2021
 *        - name: newDate
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *          example: 02-01-2021
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
  "/dateOfPurchased",
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
                const updateDate = await changeDateOfPurchasedFood(
                  PurchasedFoodForHerd,
                  checkIdentityNumber.identityNumber,
                  req.body.oldDate,
                  req.body.newDate,
                  authData.id
                );
                if (updateDate !== null) {
                  res
                    .status(200)
                    .json({ Message: "Data została zaktualizowana!" });
                } else {
                  res
                    .status(400)
                    .json({ Error: "Nie udało się zaktualizować daty!" });
                }
              } else {
                res.status(404).json({
                  Error:
                    "Pożywienie o wprowadzonym numerze identyfikacyjnym nie istnieje!",
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
 * /foods/assignToHerd:
 *    post:
 *      tags:
 *      - name: Food
 *      summary: Assign food to herd
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *        - name: identityNumberOfPurchasedFood
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          exmaple: 1234
 *        - name: identityNumberOfFoodUsedForHerd
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          exmaple: 4321
 *        - name: quantityOfFoodUsedForHerd
 *          in: formData
 *          required: true
 *          type: number
 *          format: float
 *          example: 30 (kg)
 *        - name: dateWhenFoodWasUsed
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *          example: 01-01-2021
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
  "/assignToHerd",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("identityNumberOfPurchasedFood")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest jest liczbą!"),
    check("identityNumberOfFoodUsedForHerd")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest jest liczbą!"),
    check("quantityOfFoodUsedForHerd")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isFloat()
      .withMessage("Wprowadzona wartość nie jest jest liczbą!"),
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
              if (checkHerd !== null) {
                const checkPurchasedFood = await checkIdentityNumberForFoodAndProducts(
                  PurchasedFoodForHerd,
                  req.body.identityNumberOfPurchasedFood,
                  authData.id
                );
                if (checkPurchasedFood !== null) {
                  const checkIdentityNumber = await checkEnteredIdentityNumber(
                    FoodUsedForHerd,
                    req.body.identityNumberOfFoodUsedForHerd,
                    checkHerd.id
                  );
                  if (checkIdentityNumber === null) {
                    const updateCurrentQuantityInPurchasedFoodTable = await changeCurrentQuantityOfFood(
                      PurchasedFoodForHerd,
                      checkPurchasedFood.currentQuantity,
                      req.body.quantityOfFoodUsedForHerd,
                      checkPurchasedFood.id,
                      authData.id
                    );
                    if (updateCurrentQuantityInPurchasedFoodTable !== null) {
                      const addNewFoodUsedForHerd = await createNewFoodUsedForHerd(
                        FoodUsedForHerd,
                        checkHerd.id,
                        checkPurchasedFood.id,
                        checkPurchasedFood.currentQuantity,
                        req.body.identityNumberOfFoodUsedForHerd,
                        req.body.quantityOfFoodUsedForHerd,
                        req.body.dateWhenFoodWasUsed
                      );
                      if (addNewFoodUsedForHerd !== null) {
                        res.status(201).json({
                          Message: "Udało się przypisać pożywienie do stada!",
                        });
                      } else {
                        res.status(400).json({
                          Error:
                            "Stado posiada przypisane do siebie wybrane pożywienie!",
                        });
                      }
                    } else {
                      res.status(400).json({
                        Error:
                          "Pożywienie nie posiada wystarczającej ilości, by przypisać je do stada!",
                      });
                    }
                  } else {
                    res.status(404).json({
                      Error:
                        "Użytkownik posiada już przypisane pożywienie do stada o podanym numerze identyfikacyjnym!",
                    });
                  }
                } else {
                  res.status(404).json({
                    Error:
                      "Użytkownik nie posiada pożywienia z wprowadzonym numerem identyfikacyjnym!",
                  });
                }
              } else {
                res.status(404).json({
                  Error:
                    "Użytkownik nie posiada hodowli o wprowadzonej nazwie!",
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
 * /foods/statusInHerd:
 *    get:
 *      tags:
 *      - name: Food
 *      summary: Take all food status in herd
 *      responses:
 *        200:
 *          description: List with data about food status in herd.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't have food assigned to his herd! or User doesn't exist!
 */
router.get("/statusInHerd", verifyToken, (req, res) => {
  jwt.verify(
    req.token,
    process.env.S3_SECRETKEY,
    async (jwtError, authData) => {
      if (jwtError) {
        res.status(403).json({ Error: "Błąd uwierzytelniania!" });
      } else {
        const checkUser = await findUserById(Users, authData);
        if (checkUser !== null) {
          const findHerd = findAllUserHerds(Herds, authData.id);
          if (findHerd !== null) {
            const findFood = await findAllUsedFoodByUser(
              PurchasedFoodForHerd,
              authData.id
            );
            if (findFood !== null) {
              res.status(200).json(findFood);
            } else {
              res
                .status(404)
                .json({ Error: "Użytkownik nie posiada żadnego pożywienia!" });
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

/**
 * @swagger
 * /foods/statusInHerd/{speciesName}:
 *    get:
 *      tags:
 *      - name: Food
 *      summary: Take all food status in herd by its type
 *      parameters:
 *        - name: speciesName
 *          in: formData
 *          required: true
 *          type: string
 *          example: Przenica
 *      responses:
 *        200:
 *          description: List with data about food status - but taking by food type.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't have food assigned to his herd! or User doesn't exist!
 */
router.get("/statusInHerd/:speciesName", verifyToken, (req, res) => {
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
            const checkFoodType = await findSpeciesOfFoods(
              SpeciesOfFoods,
              req.params.speciesName
            );
            if (checkFoodType !== null) {
              const findFoodByType = await findAllUsedFoodByUserByFoodType(
                PurchasedFoodForHerd,
                authData.id,
                checkFoodType.id
              );
              if (findFoodByType !== null) {
                res.status(200).json(findFoodByType);
              } else {
                res.status(404).json({
                  Error: "Użytkownik nie posiada żadnego pożywienia!",
                });
              }
            } else {
              res.status(404).json({
                Error: "Wprowadzony rodzaj pożywienia nie istnieje w systemie!",
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
 * /foods/quantityUsedForAnimals:
 *    put:
 *      tags:
 *      - name: Food
 *      summary: Edit quantity of food used for animals
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *        - name: identityNumberOfPurchasedFood
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 1234
 *        - name: newQuantityOfFoodUsedForHerd
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 30 (kg)
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
  "/quantityUsedForAnimals",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("identityNumberOfPurchasedFood")
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
              if (checkHerd !== null) {
                const checkIdentityNumberOfPurchasedFood = await checkIdentityNumberForFoodAndProducts(
                  PurchasedFoodForHerd,
                  req.body.identityNumberOfPurchasedFood,
                  authData.id,
                  req.body.newQuantityOfFoodUsedForHerd
                );
                if (checkIdentityNumberOfPurchasedFood !== null) {
                  const updateCurrentQuantityInPurchasedFoodTable = await changeCurrentQuantityOfFood(
                    PurchasedFoodForHerd,
                    checkIdentityNumberOfPurchasedFood.quantity,
                    req.body.newQuantityOfFoodUsedForHerd,
                    checkIdentityNumberOfPurchasedFood.id,
                    authData.id
                  );
                  if (updateCurrentQuantityInPurchasedFoodTable !== null) {
                    const updateQuantity = await changeQuantityOfFoodUsedForAnimals(
                      FoodUsedForHerd,
                      checkHerd.id,
                      checkIdentityNumberOfPurchasedFood.id,
                      req.body.newQuantityOfFoodUsedForHerd
                    );
                    if (updateQuantity !== null) {
                      res.status(200).json({
                        Message:
                          "Ilość wykorzystywanego pożywienia dla stada została zaktualizowana!",
                      });
                    } else {
                      res.status(400).json({
                        Error:
                          "Nie udało się zmienić ilości pożywienia wykorzystywanej dla stada!",
                      });
                    }
                  } else {
                    res.status(400).json({
                      Error:
                        "Brak pożywienia, by zmienić jego ilość wykorzystaną dla stada!",
                    });
                  }
                } else {
                  res.status(404).json({
                    Error:
                      "Użytkownik nie posiada pożywienia o wprowadzonym numerze identyfikacyjnym!",
                  });
                }
              } else {
                res
                  .status(404)
                  .json({ Error: "Użytkownik nie posiada żadnej hodowli!" });
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
 * /foods/dateWhenUsedForAnimals:
 *    put:
 *      tags:
 *      - name: Food
 *      summary: Edit date when user used food for herd
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *        - name: identityNumberOfFoodUsedForHerd
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
 *          example: 01-01-2021
 *        - name: newDate
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *          example: 02-01-2021
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
  "/dateWhenUsedForAnimals",
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
              if (checkHerd !== null) {
                const checkIdentityNumber = await checkEnteredIdentityNumber(
                  FoodUsedForHerd,
                  req.body.identityNumberOfFoodUsedForHerd,
                  checkHerd.id
                );
                if (checkIdentityNumber !== null) {
                  const updateDateOfFoodUsedForHerd = await changeDateOfFoodUsedForHerd(
                    FoodUsedForHerd,
                    req.body.oldDate,
                    req.body.newDate,
                    checkHerd.id,
                    checkIdentityNumber.PurchasedFoodForHerdId
                  );
                  if (updateDateOfFoodUsedForHerd !== null) {
                    res
                      .status(200)
                      .json({ Message: "Data została zmieniona pomyślnie!" });
                  } else {
                    res
                      .status(400)
                      .json({ Error: "Nie udało się zaktualizować daty!" });
                  }
                } else {
                  res.status(404).json({
                    Error:
                      "Użytkownik nie posiada przypisanego pożywienia do stada o wprowadzonym numerze identyfikacyjnym!",
                  });
                }
              } else {
                res
                  .status(404)
                  .json({ Error: "Użytkownik nie posiada żadnej hodowli!" });
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
 * /foods/purchased:
 *    delete:
 *      tags:
 *      - name: Food
 *      summary: Delete purchased food
 *      parameters:
 *        - name: identityNumberOfPurchasedFood
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 1234
 *      responses:
 *        200:
 *          description: Food deleted successfully!
 *        400:
 *          description: The food couldn not be removed!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.delete(
  "/purchased",
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
            const checkUser = findUserById(Users, authData);
            if (checkUser !== null) {
              const checkIdentityNumber = await checkIdentityNumberForFoodAndProducts(
                PurchasedFoodForHerd,
                req.body.identityNumberOfPurchasedFood,
                authData.id
              );
              if (checkIdentityNumber !== null) {
                const checkFoodId = await checkPurchasedFoodId(
                  FoodUsedForHerd,
                  checkIdentityNumber.id
                );
                if (checkFoodId === null) {
                  const deleteFood = await deletePurchasedFood(
                    PurchasedFoodForHerd,
                    authData.id,
                    req.body.identityNumberOfPurchasedFood
                  );
                  if (deleteFood !== null) {
                    res
                      .status(200)
                      .json({ Error: "Wybrane pożywienie zostało usunięte!" });
                  } else {
                    res
                      .status(400)
                      .json({ Error: "Nie udało się usunąć pożywienia!" });
                  }
                } else {
                  res.status(404).json({
                    Error:
                      "Nie można usunąć pożywienia, ponieważ jest przypisane do stada!",
                  });
                }
              } else {
                res.status(404).json({
                  Error:
                    "Użytkownik nie posiada pożywienia o wprowadzonym numerze identyfikacyjnym!",
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
 * /foods/usedForHerd:
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
 *          example: 4321
 *      responses:
 *        200:
 *          description: Food deleted successfully!
 *        400:
 *          description: The food couldn not be removed!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.delete(
  "/usedForHerd",
  [
    check("identityNumberOfFoodUsedForHerd")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest jest liczbą!"),
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
            const checkUser = findUserById(Users, authData);
            if (checkUser !== null) {
              const deleteFood = await deleteFoodUsedForHerd(
                FoodUsedForHerd,
                authData.id,
                req.body.identityNumberOfFoodUsedForHerd
              );
              if (deleteFood != null) {
                res
                  .status(200)
                  .json({ Error: "Pożywienie zostało usunięte ze stada!" });
              } else {
                res.status(400).json({
                  Error:
                    "Nie udało się usunąć pożywienia przypisanego do stada!",
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
