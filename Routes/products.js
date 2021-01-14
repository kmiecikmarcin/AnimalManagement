const express = require("express");

const router = express.Router();
require("dotenv").config();
const verifyToken = require("../Functions/Users/verifyJwtToken");

router.get("/takeAllTypesOfProducts", verifyToken, () => {});

router.get("/takeAllProducts", verifyToken, () => {});

router.get("/takeProductsByType/:productType", verifyToken, () => {});

router.post("/addNewProductFromAnimal", verifyToken, () => {});

router.put("/editTypeOfProduct", verifyToken, () => {});

router.put("/editQuantityOfProduct", verifyToken, () => {});

router.put("/editDateOfAddedProduct", verifyToken, () => {});

router.post("/assignProductToAnimal", verifyToken, () => {});

router.get(
  "/takeAllAssignedProductToAnimal/:identityNumberOfAnimal",
  verifyToken,
  () => {}
);

router.post("/addNewTransaction", verifyToken, () => {});

router.get("/takeAllTransactions", verifyToken, () => {});

router.post("/assignProductToTransaction", verifyToken, () => {});

router.get("/takeProductFromTransaction/:transactionId", verifyToken, () => {});

router.put("/editQuantityProductInTransaction", verifyToken, () => {});

router.put("/editPriceForProductInTransaction", verifyToken, () => {});

router.delete("/deleteProductFromAnimal", verifyToken, () => {});

router.delete("/deleteAssignedProductToAnimal", verifyToken, () => {});

router.delete("/deleteTransaction", verifyToken, () => {});

router.delete("/deleteAssignedProductToTransaction", verifyToken, () => {});

module.exports = router;
