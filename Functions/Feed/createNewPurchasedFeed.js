async function createNewPurchasedFeed(
  PurchasedFeedForHerd,
  identityNumberOfPurchasedFeed,
  quantityOfFeed,
  dateOfPurchasedFeed,
  checkSpeciesOfFeedId,
  userId
) {
  const createNewFeed = await PurchasedFeedForHerd.create({
    identityNumber: identityNumberOfPurchasedFeed,
    quantity: quantityOfFeed,
    currentQuantity: quantityOfFeed,
    date: dateOfPurchasedFeed,
    SpeciesOfFeedId: checkSpeciesOfFeedId,
    UserId: userId,
  });
  if (createNewFeed) {
    return createNewFeed;
  }
  return null;
}

module.exports = createNewPurchasedFeed;
