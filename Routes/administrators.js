const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
require("dotenv").config();
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
 *        201:
 *          description: Types of animals list.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no types of animals!, User doesn't have permissions! or User doesn't exists!
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

router.post("/addNewTypeOfAnimal", verifyToken, () => {});

router.delete("/deleteTypeOfAnimal", verifyToken, () => {});

router.post("/addNewKindOfAnimal", verifyToken, () => {});

router.delete("/deleteKindOfAnimal", verifyToken, () => {});

/**
 * @swagger
 * /administrators/takeAllTypesOfFoods:
 *    get:
 *      tags:
 *      - name: Administrators
 *      summary: Take all types of foods
 *      responses:
 *        201:
 *          description: Types of foods list.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no types of foods!, User doesn't have permissions! or User doesn't exists!
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

router.post("/addNewTypeOfFeed", verifyToken, () => {});

router.delete("/deleteTypeOfFeed", verifyToken, () => {});

router.post("/addNewSepciesOfFeed", verifyToken, () => {});

router.delete("/deleteSpeciesOfFeed", verifyToken, () => {});

/**
 * @swagger
 * /administrators/takeTypesOfUsersRoles:
 *    get:
 *      tags:
 *      - name: Administrators
 *      summary: Take all types of users roles
 *      responses:
 *        201:
 *          description: Types of users roles list.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no types of users roles!, User doesn't have permissions! or User doesn't exists!
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

router.post("/addNewTypeOfUserRole", verifyToken, () => {});

router.delete("/deleteTypeOfUserRole", verifyToken, () => {});

router.put("/editUserPermissions", verifyToken, () => {});

router.post("/addNewReasonOfAnimalDeath", verifyToken, () => {});

router.delete("/deleteReasonOfAnimalDeath", verifyToken, () => {});

router.post("/addNewTypeOfJoinToHerd", verifyToken, () => {});

router.delete("/deleteTypeOfJoinToHerd", verifyToken, () => {});

router.post("/addNewTypeOfProduct", verifyToken, () => {});

router.delete("/deleteTypeOfProduct", verifyToken, () => {});

/**
 * @swagger
 * /administrators/takeListOfUsers:
 *    get:
 *      tags:
 *      - name: Administrators
 *      summary: Take all users account in system
 *      responses:
 *        201:
 *          description: List of users.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: System has no users!, User doesn't have permissions! or User doesn't exists!
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
}); //

router.delete("/deleteUserAccount", verifyToken, () => {});

module.exports = router;
