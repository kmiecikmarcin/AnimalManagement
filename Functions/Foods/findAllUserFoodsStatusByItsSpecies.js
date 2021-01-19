const SpeciesOfFoods = require("../../Models/SpeciesOfFoods");

async function findAllUserFoodsStatusByItsSpecies(
  PurchasedFoodForHerd,
  userId,
  speciesId
) {
  const findFood = await PurchasedFoodForHerd.findAll({
    raw: true,
    where: { SpeciesOfFoodId: speciesId, UserId: userId },
    attributes: ["identityNumber", "quantity", "currentQuantity", "date"],
    include: [{ model: SpeciesOfFoods, attributes: ["name"] }],
  });
  if (findFood) {
    return findFood;
  }
  return null;
}

module.exports = findAllUserFoodsStatusByItsSpecies;
