const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
require("dotenv").config();
const { check } = require("express-validator");
const verifyToken = require("../Functions/Users/verifyJwtToken");
const Users = require("../Models/Users");
const TypesOfAnimals = require("../Models/TypesOfAnimals");
const TypesOfFood = require("../Models/TypesOfFood");
const TypesOfUsersRoles = require("../Models/TypesOfUsersRoles");
const findUserById = require("../Functions/Users/findUserById");
const takeAllSelectedTypesOfData = require("../Functions/Administrators/takeAllSelectedTypesOfData");

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
 *          description: User doesn't have permissions!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has this type of animal! or User doesn't exists!
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
  () => {}
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
 *          description: User doesn't have permissions!
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
  () => {}
);

/**
 * @swagger
 * /administrators/addNewKindOfAnimal:
 *    post:
 *      tags:
 *      - name: Administrators
 *      summary: Add new kind of animal
 *      parameters:
 *        - name: new kind of animal
 *          in: formData
 *          required: true
 *          type: string
 *          example: Kaczka
 *      responses:
 *        201:
 *          description: New kind of animal has been added!
 *        400:
 *          description: User doesn't have permissions!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has this kind of animal! or User doesn't exists!
 */
router.post(
  "/addNewKindOfAnimal",
  [
    check("newKindOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 256 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
  ],
  verifyToken,
  () => {}
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
 *          description: User doesn't have permissions!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no this kind of animal! or User doesn't exists!
 */
router.delete(
  "/deleteKindOfAnimal",
  [
    check("newKindOfAnimal")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 256 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
  ],
  verifyToken,
  () => {}
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
 *          description: User doesn't have permissions!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has this type of food! or User doesn't exists!
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
  () => {}
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
 *          description: User doesn't have permissions!
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
  () => {}
);

/**
 * @swagger
 * /administrators/addNewSpeciesOfFood:
 *    post:
 *      tags:
 *      - name: Administrators
 *      summary: Add new species of food
 *      parameters:
 *        - name: new species of food
 *          in: formData
 *          required: true
 *          type: string
 *          example: Siano
 *      responses:
 *        201:
 *          description: New species of food has been added!
 *        400:
 *          description: User doesn't have permissions!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has this species of food! or User doesn't exists!
 */
router.post(
  "/addNewSpeciesOfFood",
  [
    check("newSpeciesOfFood")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 1, max: 256 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
  ],
  verifyToken,
  () => {}
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
 *          description: User doesn't have permissions!
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
  () => {}
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
 *          description: User doesn't have permissions!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has this type of user role! or User doesn't exists!
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
  () => {}
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
 *          description: User doesn't have permissions!
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
  () => {}
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
 *          description: User doesn't have permissions!
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
 *          description: User doesn't have permissions!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has this reason of animal death! or User doesn't exists!
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
  () => {}
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
 *          description: User doesn't have permissions!
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
  () => {}
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
 *          description: User doesn't have permissions!
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
  () => {}
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
 *          description: User doesn't have permissions!
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
  () => {}
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
 *          description: User doesn't have permissions!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has this type of product! or User doesn't exists!
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
  () => {}
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
 *          description: User doesn't have permissions!
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
  () => {}
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
 *          description: User doesn't have permissions!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no this user! or User doesn't exists!
 */
router.delete(
  "/deleteUserAccount",
  [
    check("userId")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isUUID()
      .withMessage("Wprowadzony typ danych jest nieprawidłowy!"),
  ],
  verifyToken,
  () => {}
);

module.exports = router;
