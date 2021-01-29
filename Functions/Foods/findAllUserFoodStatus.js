const SpeciesOfFoods = require("../../Models/SpeciesOfFoods");

async function findAllUserFoodStatus(PurchasedFoodForHerd, userId) {
  const search = await PurchasedFoodForHerd.findAll({
    raw: true,
    where: { UserId: userId },
    attributes: ["identityNumber", "quantity", "currentQuantity", "date"],
    include: [{ model: SpeciesOfFoods, attributes: ["name"] }],
  });
  if (search !== null && Object.keys(search) !== 0) {
    return search;
  }
  return null;
}

module.exports = findAllUserFoodStatus;
