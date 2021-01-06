async function changeCurrentQuantityOfFood(
  PurchasedFoodForHerd,
  currentQuantityOfFood,
  quantityOfFoodUsedForHerd,
  checkPurchasedFoodId,
  userId
) {
  const currentQuantityWhenUserUsedFood =
    parseFloat(currentQuantityOfFood, 10) -
    parseFloat(quantityOfFoodUsedForHerd, 10);
  if (parseFloat(currentQuantityWhenUserUsedFood, 10) > 0) {
    const updateCurrentQuantity = await PurchasedFoodForHerd.update(
      {
        currentQuantity: currentQuantityWhenUserUsedFood,
      },
      {
        where: {
          id: checkPurchasedFoodId,
          UserId: userId,
        },
      }
    );
    if (updateCurrentQuantity.includes(1)) {
      return updateCurrentQuantity;
    }
    return null;
  }
  return null;
}

module.exports = changeCurrentQuantityOfFood;
