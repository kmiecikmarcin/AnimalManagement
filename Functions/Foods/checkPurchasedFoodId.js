async function checkPurchasedFoodId(FoodUsedForHerd, purchasedFoodForHerdId) {
  const checkFoodId = await FoodUsedForHerd.findOne({
    where: { PurchasedFoodForHerdId: purchasedFoodForHerdId },
  });
  if (checkFoodId) {
    return checkFoodId;
  }
  return null;
}

module.exports = checkPurchasedFoodId;
