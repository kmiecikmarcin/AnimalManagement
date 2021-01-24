const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
require("dotenv").config();
const { check, validationResult } = require("express-validator");
const verifyToken = require("../Functions/Users/verifyJwtToken");
const Users = require("../Models/Users");
const findUserById = require("../Functions/Users/findUserById");
const findAllTypesOfProducts = require("../Functions/Products/findAllTypesOfProducts");
const TypesOfProducts = require("../Models/TypesOfProducts");
const AllProductsFromAnimals = require("../Models/AllProductsFromAnimals");
const Herds = require("../Models/Herds");
const AnimalsInHerd = require("../Models/AnimalsInHerd");
const ProductFromAnAnimal = require("../Models/ProductFromAnAnimal");
const UserTransactions = require("../Models/UserTransactions");
const SoldProductsByUser = require("../Models/SoldProductsByUser");
const findAllUserProducts = require("../Functions/Products/findAllUserProducts");
const findAllUserProductsByTypeName = require("../Functions/Products/findAllUserProductsByTypeName");
const findProductByName = require("../Functions/Products/findProductByName");
const checkIdentityNumberForFoodAndProducts = require("../Functions/Others/checkIdentityNumberForFoodAndProducts");
const createNewUserProductFromAnimal = require("../Functions/Products/createNewUserProductFromAnimal");
const findHerdByName = require("../Functions/Herds/findHerdByName");
const checkEnteredIdentityNumberForAnimals = require("../Functions/Others/checkEnteredIdentityNumberForAnimals");
const assignUserProductToAnimal = require("../Functions/Products/assignUserProductToAnimal");
const findAllProductsAssignedToAnimal = require("../Functions/Products/findAllProductsAssignedToAnimal");
const createNewUserTransaction = require("../Functions/Products/createNewUserTransaction");
const findAllUserTransactions = require("../Functions/Products/findAllUserTransactions");
const changeQuantityOfUserProduct = require("../Functions/Products/changeQuantityOfUserProduct");
const changeDateOfAddedProductByUser = require("../Functions/Products/changeDateOfAddedProductByUser");
const changeCurrentQuantityOfProduct = require("../Functions/Products/changeCurrentQuantityOfProduct");
const assignSoldProductToUserTransaction = require("../Functions/Products/assignSoldProductToUserTransaction");
const findAllProductsAssignedToUserTransactions = require("../Functions/Products/findAllProductsAssignedToUserTransactions");

/**
 * @swagger
 * /products/allTypes:
 *    get:
 *      tags:
 *      - name: Products
 *      summary: Take all types of products
 *      responses:
 *        200:
 *          description: List of types of products.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no types of products! or User doesn't exist!
 */
router.get("/allTypes", verifyToken, (req, res) => {
  jwt.verify(
    req.token,
    process.env.S3_SECRETKEY,
    async (jwtError, authData) => {
      if (jwtError) {
        res.status(403).json({ Error: "Błąd uwierzytelniania!" });
      } else {
        const checkUser = await findUserById(Users, authData);
        if (checkUser !== null) {
          const findTypesOfProducts = await findAllTypesOfProducts(
            TypesOfProducts
          );
          if (findTypesOfProducts !== null) {
            res.status(200).json(findTypesOfProducts);
          } else {
            res.status(404).json({
              Error: "Dane dotyczące typów productu nie istnieją w systemie!",
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
 * /products/allProducts:
 *    get:
 *      tags:
 *      - name: Products
 *      summary: Take all user products
 *      responses:
 *        200:
 *          description: List of user products.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't have assigned products! or User doesn't exist!
 */
router.get("/allProducts", verifyToken, (req, res) => {
  jwt.verify(
    req.token,
    process.env.S3_SECRETKEY,
    async (jwtError, authData) => {
      if (jwtError) {
        res.status(403).json({ Error: "Błąd uwierzytelniania!" });
      } else {
        const checkUser = await findUserById(Users, authData);
        if (checkUser !== null) {
          const findProducts = await findAllUserProducts(
            AllProductsFromAnimals,
            authData.id
          );
          if (findProducts !== null) {
            res.status(200).json(findProducts);
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
});

/**
 * @swagger
 * /products/byType/{typeName}:
 *    get:
 *      tags:
 *      - name: Products
 *      summary: Take products by its type
 *      parameters:
 *        - name: typeName
 *          in: formData
 *          required: true
 *          type: string
 *          example: Jajka
 *      responses:
 *        200:
 *          description: List of user products.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't have assigned products with entered type! or User doesn't exist!
 */
router.get("/byType/:typeName", verifyToken, (req, res) => {
  if (req.params.typeName) {
    jwt.verify(
      req.token,
      process.env.S3_SECRETKEY,
      async (jwtError, authData) => {
        if (jwtError) {
          res.status(403).json({ Error: "Błąd uwierzytelniania!" });
        } else {
          const checkUser = await findUserById(Users, authData);
          if (checkUser !== null) {
            const findProduct = await findProductByName(
              TypesOfProducts,
              req.params.typeName
            );
            if (findProduct !== null) {
              const findProducts = await findAllUserProductsByTypeName(
                AllProductsFromAnimals,
                authData.id,
                findProduct.id
              );
              if (findProducts !== null) {
                res.status(200).json(findProducts);
              } else {
                res.status(400).json({
                  Error: "Coś poszło nie tak! Sprawdź wprowadzone dane!",
                });
              }
            } else {
              res
                .status(404)
                .json({ Error: "Wybrany typ productu nie istnieje!" });
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
 * /products/fromAnimal:
 *    post:
 *      tags:
 *      - name: Products
 *      summary: Add new product
 *      parameters:
 *        - name: identityNumberOfProduct
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 01
 *        - name: quantityOfProduct
 *          in: formData
 *          required: true
 *          type: number
 *          format: float
 *          example: 3
 *        - name: currentQuantityOfProduct
 *          in: formData
 *          required: true
 *          type: number
 *          format: float
 *          example: 3
 *        - name: dateOfAddedProduct
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *          example: 2021-01-14
 *        - name: nameOfProductType
 *          in: formData
 *          required: true
 *          type: string
 *          example: Jajka
 *      responses:
 *        201:
 *          description: New product has been added!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist!
 */
router.post(
  "/fromAnimal",
  [
    check("identityNumberOfProduct")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("quantityOfProduct")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isFloat()
      .withMessage("Wprowadzona wartość nie jest liczbą!"),
    check("currentQuantityOfProduct")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isFloat()
      .withMessage("Wprowadzona wartość nie jest liczbą!"),
    check("dateOfAddedProduct")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isDate()
      .withMessage(
        "Wprowadzona wartość nie jest datą! Spróbuj według schematu: YYYY-MM-DD."
      ),
    check("nameOfProductType")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ max: 64 })
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
              const checkIdentityNumber = await checkIdentityNumberForFoodAndProducts(
                AllProductsFromAnimals,
                req.body.identityNumberOfProduct,
                authData.id
              );
              if (checkIdentityNumber === null) {
                const findProductsByType = await findProductByName(
                  TypesOfProducts,
                  req.body.nameOfProductType
                );
                if (findProductsByType !== null) {
                  const addNewProduct = await createNewUserProductFromAnimal(
                    AllProductsFromAnimals,
                    req.body.identityNumberOfProduct,
                    req.body.quantityOfProduct,
                    req.body.dateOfAddedProduct,
                    findProductsByType.id,
                    authData.id
                  );
                  if (addNewProduct !== null) {
                    res
                      .status(201)
                      .json({ Message: "Pomyślnie utworzono nowy produkt!" });
                  } else {
                    res.status(400).json({
                      Error: "Coś poszło nie tak! Sprawdź wprowadzone dane!",
                    });
                  }
                } else {
                  res
                    .status(404)
                    .json({ Error: "Wprowadzony typ produktu nie istnieje!" });
                }
              } else {
                res.status(400).json({
                  Error:
                    "Wprowadzony numer identyfikacyjny jest już przypisany!",
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
 * /products/quantity:
 *    put:
 *      tags:
 *      - name: Products
 *      summary: Edit quantity of product
 *      parameters:
 *        - name: identityNumberOfProduct
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 01
 *        - name: newQuantityOfProduct
 *          in: formData
 *          required: true
 *          type: number
 *          format: float
 *          example: 30
 *      responses:
 *        201:
 *          description: Data updated successfully!
 *        400:
 *          description: Data has not been updated!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist!
 */
router.put(
  "/quantity",
  [
    check("identityNumberOfProduct")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("quantityOfProduct")
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
              const checkIdentityNumberOfProduct = await checkIdentityNumberForFoodAndProducts(
                AllProductsFromAnimals,
                req.body.identityNumberOfProduct,
                authData.id
              );
              if (checkIdentityNumberOfProduct !== null) {
                const updateQuantity = await changeQuantityOfUserProduct(
                  AllProductsFromAnimals,
                  authData.id,
                  checkIdentityNumberOfProduct.id,
                  req.body.quantityOfProduct
                );
                if (updateQuantity !== null) {
                  res
                    .status(200)
                    .json({ Message: "Pomyślnie zmieniono ilość produktu!" });
                } else {
                  res.status(400).json({
                    Error:
                      "Nie udało się zaktualizować typu produktu! Sprawdź wprowadzone dane!",
                  });
                }
              } else {
                res.status(400).json({
                  Error:
                    "Produkt o wprowadzonym numerze identyfikacyjnym nie istnieje!",
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
 * /products/dateOfAdded:
 *    put:
 *      tags:
 *      - name: Products
 *      summary: Edit date of added product
 *      parameters:
 *        - name: identityNumberOfProduct
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 01
 *        - name: newDate
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *          example: 2021-01-14
 *      responses:
 *        201:
 *          description: Data updated successfully!
 *        400:
 *          description: Data has not been updated!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist!
 */
router.put(
  "/dateOfAdded",
  [
    check("identityNumberOfProduct")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("newDateOfAddedProduct")
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
              const checkIdentityNumberOfProduct = await checkIdentityNumberForFoodAndProducts(
                AllProductsFromAnimals,
                req.body.identityNumberOfProduct,
                authData.id
              );
              if (checkIdentityNumberOfProduct !== null) {
                const updateDate = await changeDateOfAddedProductByUser(
                  AllProductsFromAnimals,
                  checkIdentityNumberOfProduct.id,
                  req.body.newDateOfAddedProduct,
                  authData.id
                );
                if (updateDate !== null) {
                  res.status(200).json({
                    Message:
                      "Pomyślnie zaktualizowano datę wprowadzenia produktu!",
                  });
                } else {
                  res.status(400).json({
                    Erro:
                      "Nie udało się zaktualizować daty wprowadzenia produktu! Sprawdź wprowadzone dane!",
                  });
                }
              } else {
                res.status(400).json({
                  Error:
                    "Produkt o wprowadzonym numerze identyfikacyjnym nie istnieje!",
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
 * /products/assignToAnimal:
 *    post:
 *      tags:
 *      - name: Products
 *      summary: Assign product to animal
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
 *          example: 1234
 *        - name: identityNumberOfProduct
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 01
 *        - name: dateWhenProductWasAdded
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 01
 *      responses:
 *        201:
 *          description: New product has been assigned to animal!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist!
 */
router.post(
  "/assignToAnimal",
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
    check("identityNumberOfProduct")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("dateWhenProductWasAdded")
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
                const checkIdentityNumberOfAnimal = await checkEnteredIdentityNumberForAnimals(
                  AnimalsInHerd,
                  req.body.identityNumberOfAnimal,
                  checkHerd.id
                );
                if (checkIdentityNumberOfAnimal !== null) {
                  const checkIdentityNumberOfProduct = await checkIdentityNumberForFoodAndProducts(
                    AllProductsFromAnimals,
                    req.body.identityNumberOfProduct,
                    authData.id
                  );
                  if (checkIdentityNumberOfProduct !== null) {
                    const assignToAnimal = await assignUserProductToAnimal(
                      ProductFromAnAnimal,
                      checkIdentityNumberOfAnimal.id,
                      checkIdentityNumberOfProduct.id,
                      req.body.dateWhenProductWasAdded
                    );
                    if (assignToAnimal !== null) {
                      res.status(201).json({
                        Message: "Pomyślnie przypisano produkt do zwierzęcia!",
                      });
                    } else {
                      res.status(400).json({
                        Error:
                          "Nie udało się przypisać produktu do zwierzęcia! Sprawdź dane!",
                      });
                    }
                  } else {
                    res.status(404).json({
                      Error:
                        "Wprowadzony numer identyfikacyjny produktu nie istnieje!",
                    });
                  }
                } else {
                  res.status(404).json({
                    Error:
                      "Wprowadzony numer identyfikacyjny zwierzęcia nie istnieje!",
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
 * /products/allAssignedToAnimal/{identityNumberOfAnimal}:
 *    get:
 *      tags:
 *      - name: Products
 *      summary: Take all assigned product to animal
 *      parameters:
 *        - name: identityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 1234
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *          example: thebestherd
 *      responses:
 *        200:
 *          description: List of assigned products to animal.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist!
 */
router.get(
  "/allAssignedToAnimal/:identityNumberOfAnimal/:herdName",
  verifyToken,
  (req, res) => {
    if (req.params.identityNumberOfAnimal && req.params.herdName) {
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
                req.params.herdName,
                authData.id
              );
              if (checkHerd !== null) {
                const checkIdentityNumberOfAnimal = await checkEnteredIdentityNumberForAnimals(
                  AnimalsInHerd,
                  req.params.identityNumberOfAnimal,
                  checkHerd.id
                );
                if (checkIdentityNumberOfAnimal !== null) {
                  const findProducts = await findAllProductsAssignedToAnimal(
                    AllProductsFromAnimals,
                    checkIdentityNumberOfAnimal.id,
                    checkHerd.id,
                    authData.id
                  );
                  if (findProducts !== null) {
                    res.status(200).json(findProducts);
                  } else {
                    res.status(400).json({
                      Error: "Wystąpił błąd. Sprawdź wprowadzone dane!",
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
                  Error: "Użytkownik nie posiada stada o podanej nazwie!",
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
  }
);

/**
 * @swagger
 * /products/transaction:
 *    post:
 *      tags:
 *      - name: Products
 *      summary: Add new transaction
 *      parameters:
 *        - name: identityNumberOfTransaction
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 1234
 *        - name: dateOfSoldProduct
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *          example: 2021-01-14
 *      responses:
 *        201:
 *          description: New transaction has been added!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist!
 */
router.post(
  "/transaction",
  [
    check("identityNumberOfTransaction")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("dateOfSoldProduct")
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
              const checkIdentityNumberOfTransaction = await checkIdentityNumberForFoodAndProducts(
                UserTransactions,
                req.body.identityNumberOfTransaction,
                authData.id
              );
              if (checkIdentityNumberOfTransaction === null) {
                const addNewTransaction = await createNewUserTransaction(
                  UserTransactions,
                  req.body.identityNumberOfTransaction,
                  req.body.dateOfSoldProduct,
                  authData.id
                );
                if (addNewTransaction !== null) {
                  res
                    .status(201)
                    .json({ Message: "Pomyślnie utworzono nową transakcję!" });
                } else {
                  res.status(400).json({
                    Error: "Coś poszło nmie tak! Sprawdź wprowadzone dane!",
                  });
                }
              } else {
                res.status(400).json({
                  Error:
                    "Wprowadzony numer identyfikacyjny jest już przypisany do innej transakcji!",
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
 * /products/allTransactions:
 *    get:
 *      tags:
 *      - name: Products
 *      summary: Take all user transactions
 *      responses:
 *        200:
 *          description: List of user transactions.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist!
 */
router.get("/allTransactions", verifyToken, (req, res) => {
  jwt.verify(
    req.token,
    process.env.S3_SECRETKEY,
    async (jwtError, authData) => {
      if (jwtError) {
        res.status(403).json({ Error: "Błąd uwierzytelniania!" });
      } else {
        const checkUser = await findUserById(Users, authData);
        if (checkUser !== null) {
          const findAllTransactions = await findAllUserTransactions(
            UserTransactions,
            authData.id
          );
          if (findAllTransactions !== null) {
            res.status(200).json(findAllTransactions);
          } else {
            res
              .status(400)
              .json({ Error: "Coś poszło nie tak! Sprawdź wprowadzone dane!" });
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
 * /products/assignToTransaction:
 *    post:
 *      tags:
 *      - name: Products
 *      summary: Assign product to transaction
 *      parameters:
 *        - name: identityNumberOfTransaction
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 567
 *        - name: identityNumberOfProduct
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 01
 *        - name: soldQuantityOfProduct
 *          in: formData
 *          required: true
 *          type: number
 *          format: float
 *          example: 20
 *        - name: price
 *          in: formData
 *          required: true
 *          type: number
 *          format: float
 *          example: 5,20
 *      responses:
 *        201:
 *          description: New product has been assigned to transaction!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist!
 */
router.post(
  "/assignToTransaction",
  [
    check("identityNumberOfTransaction")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("identityNumberOfProduct")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("soldQuantityOfProduct")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isFloat()
      .withMessage("Wprowadzona wartość nie jest liczbą!"),
    check("price")
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
              const checkTransactionIdentityNumber = await checkIdentityNumberForFoodAndProducts(
                UserTransactions,
                req.body.identityNumberOfTransaction,
                authData.id
              );
              if (checkTransactionIdentityNumber !== null) {
                const checkProductIdentityNumber = await checkIdentityNumberForFoodAndProducts(
                  AllProductsFromAnimals,
                  req.body.identityNumberOfProduct,
                  authData.id
                );
                if (checkProductIdentityNumber !== null) {
                  const updateCurrentQuantityOfProduct = await changeCurrentQuantityOfProduct(
                    AllProductsFromAnimals,
                    checkProductIdentityNumber.currentQuantity,
                    req.body.soldQuantityOfProduct,
                    checkProductIdentityNumber.id,
                    authData.id
                  );
                  if (updateCurrentQuantityOfProduct !== null) {
                    const assignProductToTransaction = await assignSoldProductToUserTransaction(
                      SoldProductsByUser,
                      checkProductIdentityNumber.id,
                      checkTransactionIdentityNumber.id,
                      req.body.soldQuantityOfProduct,
                      req.body.price,
                      checkProductIdentityNumber.currentQuantity
                    );
                    if (assignProductToTransaction !== null) {
                      res.status(201).json({
                        Message: "Pomyślnie przypisano produkt do transakcji!",
                      });
                    } else {
                      res.status(400).json({
                        Error:
                          "Nie udało się przypisać produktu do transakcji!",
                      });
                    }
                  } else {
                    res
                      .status(400)
                      .json({ Error: "Brak wymaganej ilości produktu!" });
                  }
                } else {
                  res.status(404).json({
                    Error:
                      "Wprowadzony identyfikacyjny numer produktu nie istnieje!",
                  });
                }
              } else {
                res.status(404).json({
                  Error:
                    "Wprowadzony identyfikacyjny numer transakcji nie istnieje!",
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
 * /products/FromTransaction/{identityNumberOfTransaction}:
 *    get:
 *      tags:
 *      - name: Products
 *      summary: Take product from transaction
 *      parametrs:
 *        - name: identityNumberOfTransaction
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 567
 *      responses:
 *        200:
 *          description: List of products in transaction.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist!
 */
router.get(
  "/FromTransaction/:identityNumberOfTransaction",
  verifyToken,
  (req, res) => {
    if (req.params.identityNumberOfTransaction) {
      jwt.verify(
        req.token,
        process.env.S3_SECRETKEY,
        async (jwtError, authData) => {
          if (jwtError) {
            res.status(403).json({ Error: "Błąd uwierzytelniania!" });
          } else {
            const checkUser = await findUserById(Users, authData);
            if (checkUser !== null) {
              const findProductsInTransaction = await findAllProductsAssignedToUserTransactions(
                UserTransactions,
                req.params.identityNumberOfTransaction,
                authData.id
              );
              if (findProductsInTransaction !== null) {
                res.status(200).json(findProductsInTransaction);
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
    } else {
      res.status(400).json({ Error: "Nie wprowadzono wymaganych danych!" });
    }
  }
);

/**
 * @swagger
 * /products/quantityInTransaction:
 *    put:
 *      tags:
 *      - name: Products
 *      summary: Edit quantity of product in transaction
 *      parameters:
 *        - name: identityNumberOfProduct
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 01
 *        - name: identityNumberOfTransaction
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 567
 *        - name: quantityOfProduct
 *          in: formData
 *          required: true
 *          type: number
 *          format: float
 *          example: 10
 *      responses:
 *        201:
 *          description: Data updated successfully!
 *        400:
 *          description: Data has not been updated!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist!
 */
router.put("/quantityInTransaction", verifyToken, () => {});

/**
 * @swagger
 * /products/priceInTransaction:
 *    put:
 *      tags:
 *      - name: Products
 *      summary: Edit price for product in transaction
 *      parameters:
 *        - name: identityNumberOfProduct
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 01
 *        - name: identityNumberOfTransaction
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 567
 *        - name: price
 *          in: formData
 *          required: true
 *          type: number
 *          format: float
 *          example: 2,60
 *      responses:
 *        201:
 *          description: Data updated successfully!
 *        400:
 *          description: Data has not been updated!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist!
 */
router.put("/priceInTransaction", verifyToken, () => {});

/**
 * @swagger
 * /products/fromAnimal:
 *    delete:
 *      tags:
 *      - name: Products
 *      summary: Delete product from animal
 *      parameters:
 *        - name: identityNumberOfProduct
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 01
 *      responses:
 *        200:
 *          description: Product deleted successfully!
 *        400:
 *          description: The product could not be removed!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.delete("/fromAnimal", verifyToken, () => {});

/**
 * @swagger
 * /products/assignedToAnimal:
 *    delete:
 *      tags:
 *      - name: Products
 *      summary: Delete assigned product to animal
 *      parameters:
 *        - name: identityNumberOfAnimal
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 123
 *        - name: identityNumberOfProduct
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 01
 *      responses:
 *        200:
 *          description: Assigned product to animal deleted successfully!
 *        400:
 *          description: The product could not be removed!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.delete("/assignedToAnimal", verifyToken, () => {});

/**
 * @swagger
 * /products/transaction:
 *    delete:
 *      tags:
 *      - name: Products
 *      summary: Delete transaction
 *      parameters:
 *        - name: identityNumberOfTransaction
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 567
 *      responses:
 *        200:
 *          description: Product deleted successfully!
 *        400:
 *          description: The transaction could not be removed!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.delete("/transaction", verifyToken, () => {});

/**
 * @swagger
 * /products/assignedToTransaction:
 *    delete:
 *      tags:
 *      - name: Products
 *      summary: Delete assigned product to transaction
 *      parameters:
 *        - name: identityNumberOfTransaction
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 567
 *        - name: identityNumberOfProduct
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 01
 *      responses:
 *        200:
 *          description: Assigned product to transaction deleted successfully!
 *        400:
 *          description: The assigned product could not be removed!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.delete("/assignedToTransaction", verifyToken, () => {});

module.exports = router;
