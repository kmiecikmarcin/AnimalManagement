const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
require("dotenv").config();
const verifyToken = require("../Functions/Users/verifyJwtToken");
const Users = require("../Models/Users");
const findUserById = require("../Functions/Users/findUserById");
const findAllTypesOfProducts = require("../Functions/Products/findAllTypesOfProducts");
const TypesOfProducts = require("../Models/TypesOfProducts");

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
 * /products/takeAllProducts:
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
router.get("/takeAllProducts", verifyToken, () => {});

/**
 * @swagger
 * /products/takeProductsByType/{productType}:
 *    get:
 *      tags:
 *      - name: Products
 *      summary: Take products by its type
 *      parameters:
 *        - name: productType
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
router.get("/takeProductsByType/:productType", verifyToken, () => {});

/**
 * @swagger
 * /products/addNewProductFromAnimal:
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
router.post("/addNewProductFromAnimal", verifyToken, () => {});

/**
 * @swagger
 * /products/editTypeOfProduct:
 *    put:
 *      tags:
 *      - name: Products
 *      summary: Edit type of product
 *      parameters:
 *        - name: identityNumberOfProduct
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *          example: 01
 *        - name: oldProductType
 *          in: formData
 *          required: true
 *          type: string
 *          example: Jajko
 *        - name: newProductType
 *          in: formData
 *          required: true
 *          type: string
 *          example: Mięso
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
router.put("/editTypeOfProduct", verifyToken, () => {});

/**
 * @swagger
 * /products/editQuantityOfProduct:
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
router.put("/editQuantityOfProduct", verifyToken, () => {});

/**
 * @swagger
 * /products/editDateOfAddedProduct:
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
router.put("/editDateOfAddedProduct", verifyToken, () => {});

/**
 * @swagger
 * /products/assignProductToAnimal:
 *    post:
 *      tags:
 *      - name: Products
 *      summary: Assign product to animal
 *      parameters:
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
router.post("/assignProductToAnimal", verifyToken, () => {});

/**
 * @swagger
 * /products/takeAllAssignedProductToAnimal/{identityNumberOfAnimal}:
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
 *      responses:
 *        200:
 *          description: List of assigned products to animal.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't exist!
 */
router.get(
  "/takeAllAssignedProductToAnimal/:identityNumberOfAnimal",
  verifyToken,
  () => {}
);

/**
 * @swagger
 * /products/addNewTransaction:
 *    post:
 *      tags:
 *      - name: Products
 *      summary: Add new transaction
 *      parameters:
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
router.post("/addNewTransaction", verifyToken, () => {});

/**
 * @swagger
 * /products/takeAllTransactions:
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
router.get("/takeAllTransactions", verifyToken, () => {});

/**
 * @swagger
 * /products/assignProductToTransaction:
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
router.post("/assignProductToTransaction", verifyToken, () => {});

/**
 * @swagger
 * /products/takeProductFromTransaction/{identityNumberOfTransaction}:
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
  "/takeProductFromTransaction/:identityNumberOfTransaction",
  verifyToken,
  () => {}
);

/**
 * @swagger
 * /products/editQuantityOfProductInTransaction:
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
router.put("/editQuantityOfProductInTransaction", verifyToken, () => {});

/**
 * @swagger
 * /products/editPriceForProductInTransaction:
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
router.put("/editPriceForProductInTransaction", verifyToken, () => {});

/**
 * @swagger
 * /products/deleteProductFromAnimal:
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
router.delete("/deleteProductFromAnimal", verifyToken, () => {});

/**
 * @swagger
 * /products/deleteAssignedProductToAnimal:
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
router.delete("/deleteAssignedProductToAnimal", verifyToken, () => {});

/**
 * @swagger
 * /products/deleteTransaction:
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
router.delete("/deleteTransaction", verifyToken, () => {});

/**
 * @swagger
 * /products/deleteAssignedProductToTransaction:
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
router.delete("/deleteAssignedProductToTransaction", verifyToken, () => {});

module.exports = router;