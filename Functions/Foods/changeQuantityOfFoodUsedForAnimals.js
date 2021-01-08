async function changeQuantityOfFoodUsedForAnimals(
  FoodUsedForHerd,
  herdId,
  purchasedFoodId,
  newQuantityOfFoodUsedForHerd
) {
  const updateDataAboutFoodQuantity = await FoodUsedForHerd.update(
    {
      quentity: newQuantityOfFoodUsedForHerd,
    },
    { where: { HerdId: herdId, PurchasedFoodForHerdId: purchasedFoodId } }
  );
  if (updateDataAboutFoodQuantity.includes(1)) {
    return updateDataAboutFoodQuantity;
  }
  return null;
}

module.exports = changeQuantityOfFoodUsedForAnimals;
