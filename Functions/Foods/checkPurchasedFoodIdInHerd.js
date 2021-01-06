async function checkPurchasedFoodIdInHerd(
  FoodUsedForHerd,
  purchasedFoodId,
  herdId
) {
  const checkFoodId = await FoodUsedForHerd.findOne({
    where: { HerdId: herdId, PurchasedFoodForHerdId: purchasedFoodId },
  });
  if (checkFoodId) {
    return checkFoodId;
  }
  return null;
}

module.exports = checkPurchasedFoodIdInHerd;
