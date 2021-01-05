async function createNewPurchasedFeed(
  PurchasedFeedForHerd,
  identityNumberOfPurchasedFeed,
  quantityOfFeed,
  dateOfPurchasedFeed,
  checkSpeciesOfFeedId
) {
  const createNewFeed = await PurchasedFeedForHerd.create({
    identityNumber: identityNumberOfPurchasedFeed,
    quantity: quantityOfFeed,
    currentQuantity: quantityOfFeed,
    date: dateOfPurchasedFeed,
    PurchasedFeedForHerdId: checkSpeciesOfFeedId,
  });
  if (createNewFeed) {
    return createNewFeed;
  }
  return null;
}

module.exports = createNewPurchasedFeed;
