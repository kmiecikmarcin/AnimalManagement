const express = require("express");

const router = express.Router();
const verifyToken = require("../Functions/Users/verifyJwtToken");
require("dotenv").config();

router.post("/addNewFeed", [], verifyToken, () => {});

router.get("/takeFeedStatus", verifyToken, () => {});

router.get("/takeFeedStatusByItsType", verifyToken, () => {});

router.put("/editSpeciesOfFeed", verifyToken, () => {});

router.put("/editQuantityOfFeed", verifyToken, () => {});

router.put("/editDateOfPurchasedFeed", verifyToken, () => {});

router.post("/assignFeedToHerd", verifyToken, () => {});

router.get("/takeFeedStatusInHerd", verifyToken, () => {});

router.get("/takeFeedStatusInHerdByItsType", verifyToken, () => {});

router.put("/editQuantityOfFeedUsedForAnimals", verifyToken, () => {});

router.put("/editDateWhenUserUsedFeedForHerd", verifyToken, () => {});

router.delete("/deleteFeed", verifyToken, () => {});

module.exports = router;
