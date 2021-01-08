const FoodUsedForHerd = require("../../Models/FoodUsedForHerd");
const Herds = require("../../Models/Herds");
const SpeciesOfFoods = require("../../Models/SpeciesOfFoods");

async function findAllUsedFoodByUser(PurchasedFoodForHerd, userId) {
  const findFood = await PurchasedFoodForHerd.findAll({
    attributes: {
      exclude: [
        "id",
        "identityNumber",
        "quantity",
        "currentQuantity",
        "date",
        "createdAt",
        "updatedAt",
        "SpeciesOfFoodId",
        "UserId",
      ],
    },
    where: { UserId: userId },
    include: [
      {
        model: Herds,
        attributes: {
          include: ["name"],
          exclude: [
            "id",
            "creationDate",
            "createdAt",
            "updatedAt",
            "UserId",
            "KindsOfAnimalId",
          ],
        },
        through: {
          model: FoodUsedForHerd,
          attributes: {
            include: ["identityNumber", "quentity", "date"],
            exclude: [
              "createdAt",
              "updatedAt",
              "HerdId",
              "PurchasedFoodForHerdId",
            ],
          },
        },
      },
      { model: SpeciesOfFoods, attributes: ["nameOfSpeciesFood"] },
    ],
  });
  if (findFood.length !== 0) {
    return findFood;
  }
  return null;
}

module.exports = findAllUsedFoodByUser;
