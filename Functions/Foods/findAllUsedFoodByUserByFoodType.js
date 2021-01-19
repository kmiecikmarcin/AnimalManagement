const FoodUsedForHerd = require("../../Models/FoodUsedForHerd");
const Herds = require("../../Models/Herds");
const SpeciesOfFoods = require("../../Models/SpeciesOfFoods");

async function findAllUsedFoodByUserByFoodType(
  PurchasedFoodForHerd,
  userId,
  foodTypeId
) {
  const findFood = await PurchasedFoodForHerd.findAll({
    raw: true,
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
    where: { UserId: userId, SpeciesOfFoodId: foodTypeId },
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

module.exports = findAllUsedFoodByUserByFoodType;
