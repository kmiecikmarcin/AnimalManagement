const express = require("express");

const router = express.Router();
require("dotenv").config();
const verifyToken = require("../Functions/Users/verifyJwtToken");

router.post("/addNewAnimal", [], verifyToken, () => {});

router.get("/takeAllAnimalGender", [], verifyToken, () => {});

router.get("/takeAllKindOfAnimals", [], verifyToken, () => {});

router.get("/takeAllJoinTypeToTheHerd", [], verifyToken, () => {});

router.put("/editIdentityNumberOfAnimal", [], verifyToken, () => {});

router.put("/editBreedOfAnimal", [], verifyToken, () => {});

router.put("/editBirthDate", [], verifyToken, () => {});

router.put("/editAnimalWeight", [], verifyToken, () => {});

router.put("/editJoinType", [], verifyToken, () => {});

router.get("/findAllAnimalsInHerds", [], verifyToken, () => {});

router.get("/findAnimalByKind", [], verifyToken, () => {});

router.get("/findAnimalByJoinType", [], verifyToken, () => {});

router.get("/findAnimalByHerd", [], verifyToken, () => {});

router.post("/addNewBornAnimal", [], verifyToken, () => {});

router.get("/takeAllNewBornAnimals", [], verifyToken, () => {});

router.get("/takeNewBornAnimalsInHerd", [], verifyToken, () => {});

router.post("/addNewDeadAnimal", [], verifyToken, () => {});

router.get("/takeAllReasonDeath", [], verifyToken, () => {});

router.get("/takeAllDeadAnimals", [], verifyToken, () => {});

router.get("/takeDeadAnimalsByReasonDeath", [], verifyToken, () => {});

router.delete("/deleteAnimal", [], verifyToken, () => {});

router.get("/takeAllReasonDeath", [], verifyToken, () => {});

module.exports = router;
