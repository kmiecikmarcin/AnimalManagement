const FoodUsedForHerd = require("../../Models/FoodUsedForHerd");
const Herds = require("../../Models/Herds");

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
          exclude: [
            "id",
            "createdAt",
            "updatedAt",
            "UserId",
            "KindsOfAnimalId",
            "creationDate",
          ],
        },
        through: {
          model: FoodUsedForHerd,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "HerdId",
              "PurchasedFoodForHerdId",
            ],
          },
        },
      },
    ],
  });
  if (findFood) {
    return findFood;
  }
  return null;
}

module.exports = findAllUsedFoodByUser;
