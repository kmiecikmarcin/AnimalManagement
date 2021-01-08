const PurchasedFoodForHerd = require("../../Models/PurchasedFoodForHerd");

async function deleteFoodUsedForHerd(
  FoodUsedForHerd,
  userId,
  identityNumberOfFoodUsedForHerd
) {
  const deleteFood = await FoodUsedForHerd.destroy({
    includes: [{ model: PurchasedFoodForHerd }, { where: { UserId: userId } }],
    where: { identityNumber: identityNumberOfFoodUsedForHerd },
  });
  if (deleteFood) {
    return deleteFood;
  }
  return null;
}

module.exports = deleteFoodUsedForHerd;
