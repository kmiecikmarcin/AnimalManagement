const SpeciesOfFoods = require("../../Models/SpeciesOfFoods");

async function findAllUserFoodStatus(PurchasedFoodForHerd) {
  const search = await PurchasedFoodForHerd.findAll({
    attributes: ["identityNumber", "quantity", "currentQuantity", "date"],
    include: [{ model: SpeciesOfFoods, attributes: ["name"] }],
  });
  console.log(Object.keys(search));
  if (search !== null && Object.keys(search) !== 0) {
    return search;
  }
  return null;
}

module.exports = findAllUserFoodStatus;
