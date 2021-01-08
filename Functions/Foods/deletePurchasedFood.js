async function deletePurchasedFood(
  PurchasedFoodForHerd,
  userId,
  identityNumberOfPurchasedFood
) {
  const deleteFood = await PurchasedFoodForHerd.destroy({
    where: { identityNumber: identityNumberOfPurchasedFood, UserId: userId },
  });
  if (deleteFood) {
    return deleteFood;
  }
  return null;
}

module.exports = deletePurchasedFood;
