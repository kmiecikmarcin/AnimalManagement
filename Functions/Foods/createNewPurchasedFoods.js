async function createNewPurchasedFoods(
  PurchasedFoodForHerd,
  identityNumberOfPurchasedFood,
  quantityOfFood,
  dateOfPurchasedFood,
  checkSpeciesOfFoodId,
  userId
) {
  const createNewFeed = await PurchasedFoodForHerd.create({
    identityNumber: identityNumberOfPurchasedFood,
    quantity: quantityOfFood,
    currentQuantity: quantityOfFood,
    date: dateOfPurchasedFood,
    SpeciesOfFeedId: checkSpeciesOfFoodId,
    UserId: userId,
  });
  if (createNewFeed) {
    return createNewFeed;
  }
  return null;
}

module.exports = createNewPurchasedFoods;
