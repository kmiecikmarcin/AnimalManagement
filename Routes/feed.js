const express = require("express");

const router = express.Router();
const { check } = require("express-validator");
const verifyToken = require("../Functions/Users/verifyJwtToken");
require("dotenv").config();

/**
 * @swagger
 * /feed/addNewFeed:
 *    post:
 *      tags:
 *      - name: Feed
 *      summary: Add new feed
 *      parameters:
 *        - name: identityNumberOfPurchasedFeed
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *        - name: speciesOfFeedName
 *          in: formData
 *          required: true
 *          type: string
 *        - name: quantityOfFeed
 *          in: formData
 *          required: true
 *          type: number
 *          format: float
 *        - name: dateOfPurchasedFeed
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *      responses:
 *        201:
 *          description: New feed has been added!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User or species of feed doesn't exist!
 */
router.post(
  "/addNewFeed",
  [
    check("identityNumberOfPurchasedFeed")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest ciągiem liczbowym!"),
    check("speciesOfFeedName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ max: 256 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("quantityOfFeed")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isFloat()
      .withMessage("Wprowadzona wartość nie jest liczbą!"),
    check("dateOfPurchasedFeed")
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
 * /feed/takeFeedStatus:
 *    get:
 *      tags:
 *      - name: Feed
 *      summary: Take all feed status
 *      responses:
 *        201:
 *          description: List with data about feed status.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't have feed assigned to his account! or User doesn't exist!
 */
router.get("/takeFeedStatus", verifyToken, () => {});

/**
 * @swagger
 * /feed/takeFeedStatus/{typeName}:
 *    get:
 *      tags:
 *      - name: Feed
 *      summary: Take all feed status
 *      parameters:
 *        - name: typeName
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        201:
 *          description: List with data about feed status - but taking by feed type.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't have feed assigned to his account! or User doesn't exist!
 */
router.get("/takeFeedStatusByItsType/:typeName", verifyToken, () => {});

/**
 * @swagger
 * /feed/editSpeciesOfFeed:
 *    put:
 *      tags:
 *      - name: Feed
 *      summary: Edit species of feed
 *      parameters:
 *        - name: identityNumberOfPurchasedFeed
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *        - name: speciesOfFeedName
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
  "/editSpeciesOfFeed",
  [
    check("identityNumberOfPurchasedFeed")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest jest liczbą!!"),
    check("speciesOfFeedName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ max: 256 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
  ],
  verifyToken,
  () => {}
);

/**
 * @swagger
 * /feed/editQuantityOfFeed:
 *    put:
 *      tags:
 *      - name: Feed
 *      summary: Edit quantity of feed
 *      parameters:
 *        - name: identityNumberOfPurchasedFeed
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *        - name: quantityOfFeed
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
  "/editQuantityOfFeed",
  [
    check("identityNumberOfPurchasedFeed")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest liczbą!"),
    check("quantityOfFeed")
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
 * /feed/editDateOfPurchasedFeed:
 *    put:
 *      tags:
 *      - name: Feed
 *      summary: Edit date of purchased feed
 *      parameters:
 *        - name: identityNumberOfPurchasedFeed
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
  "/editDateOfPurchasedFeed",
  [
    check("identityNumberOfPurchasedFeed")
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
 * /feed/assignFeedToHerd:
 *    post:
 *      tags:
 *      - name: Feed
 *      summary: Assign feed to herd
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *        - name: identityNumberOfFeedUsedForHerd
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *        - name: quantityOfFeedUsedForHerd
 *          in: formData
 *          required: true
 *          type: number
 *          format: float
 *        - name: dateWhenFeedWasUsed
 *          in: formData
 *          required: true
 *          type: string
 *          format: date
 *      responses:
 *        201:
 *          description: New feed in herd has been added!
 *        400:
 *          description: Something went wrong!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User or herd doesn't exist!
 */
router.post(
  "/assignFeedToHerd",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("identityNumberOfFeedUsedForHerd")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest jest liczbą!!"),
    check("quantityOfFeedUsedForHerd")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isFloat()
      .withMessage("Wprowadzona wartość nie jest jest liczbą!!"),
    check("dateWhenFeedWasUsed")
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
 * /feed/takeFeedStatusInHerd:
 *    get:
 *      tags:
 *      - name: Feed
 *      summary: Take all feed status in herd
 *      responses:
 *        201:
 *          description: List with data about feed status in herd.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't have feed assigned to his herd! or User doesn't exist!
 */
router.get("/takeFeedStatusInHerd", verifyToken, () => {});

/**
 * @swagger
 * /feed/takeFeedStatusInHerdByItsType/{typeName}:
 *    get:
 *      tags:
 *      - name: Feed
 *      summary: Take all feed status in herd by its type
 *      parameters:
 *        - name: typeName
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        201:
 *          description: List with data about feed status - but taking by feed type.
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: User doesn't have feed assigned to his herd! or User doesn't exist!
 */
router.get("/takeFeedStatusInHerdByItsType/:typeName", verifyToken, () => {});

/**
 * @swagger
 * /feed/editQuantityOfFeedUsedForAnimals:
 *    put:
 *      tags:
 *      - name: Feed
 *      summary: Edit quantity of feed used for animals
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *        - name: identityNumberOfFeedUsedForHerd
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *        - name: newQuantityOfFeedUsedForHerd
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
  "/editQuantityOfFeedUsedForAnimals",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("identityNumberOfFeedUsedForHerd")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isInt()
      .withMessage("Wprowadzona wartość nie jest liczbą!"),
    check("newQuantityOfFeedUsedForHerd")
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
 * /feed/editDateWhenUserUsedFeedForHerd:
 *    put:
 *      tags:
 *      - name: Feed
 *      summary: Edit date when user used feed for herd
 *      parameters:
 *        - name: herdName
 *          in: formData
 *          required: true
 *          type: string
 *        - name: identityNumberOfFeedUsedForHerd
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
  "/editDateWhenUserUsedFeedForHerd",
  [
    check("herdName")
      .exists()
      .withMessage("Brak wymaganych danych!")
      .notEmpty()
      .withMessage("Wymagane pole jest puste!")
      .isLength({ min: 3, max: 40 })
      .withMessage("Długość wprowadzonej nazwy jest niezgodna z wymaganiami!"),
    check("identityNumberOfFeedUsedForHerd")
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
 * /feed/deleteFeed:
 *    delete:
 *      tags:
 *      - name: Feed
 *      summary: Delete feed
 *      parameters:
 *        - name: identityNumberOfPurchasedFeed
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *      responses:
 *        201:
 *          description: Feed deleted successfully!
 *        400:
 *          description: The feed couldn not be removed!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.delete(
  "/deleteFeed",
  [
    check("identityNumberOfPurchasedFeed")
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
 * /feed/deleteFeedUsedForHerd:
 *    delete:
 *      tags:
 *      - name: Feed
 *      summary: Delete feed assigned to herd
 *      parameters:
 *        - name: identityNumberOfFeedUsedForHerd
 *          in: formData
 *          required: true
 *          type: integer
 *          format: int64
 *      responses:
 *        201:
 *          description: Feed deleted successfully!
 *        400:
 *          description: The feed couldn not be removed!
 *        403:
 *          description: Authentication failed!
 *        404:
 *          description: Errors about empty data.
 */
router.delete(
  "/deleteFeedUsedForHerd",
  [
    check("identityNumberOfFeedUsedForHerd")
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
