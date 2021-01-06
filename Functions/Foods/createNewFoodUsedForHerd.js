const checkPurchasedFoodIdInHerd = require("./checkPurchasedFoodIdInHerd");

async function createNewFoodUsedForHerd(
  FoodUsedForHerd,
  herdId,
  purchasedFoodId,
  currentQuantityOfPurchasedFood,
  identityNumberOfFoodUsedForHerd,
  quantityOfFoodUsedForHerd,
  dateOfAdded
) {
  if (parseFloat(currentQuantityOfPurchasedFood, 10) > 0) {
    const checkFoodId = await checkPurchasedFoodIdInHerd(
      FoodUsedForHerd,
      purchasedFoodId,
      herdId
    );
    if (checkFoodId === null) {
      const addNewFoodWhichUsed = await FoodUsedForHerd.create({
        HerdId: herdId,
        PurchasedFoodForHerdId: purchasedFoodId,
        identityNumber: identityNumberOfFoodUsedForHerd,
        quentity: quantityOfFoodUsedForHerd,
        date: dateOfAdded,
      });
      if (addNewFoodWhichUsed !== null) {
        return addNewFoodWhichUsed;
      }
      return null;
    }
    return null;
  }
  return null;
}

module.exports = createNewFoodUsedForHerd;
