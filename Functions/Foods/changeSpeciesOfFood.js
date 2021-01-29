async function changeSpeciesOfFood(
  PurchasedFoodForHerd,
  identityNumberOfPurchasedFood,
  speciesId,
  userId
) {
  const updateSpecies = await PurchasedFoodForHerd.update(
    { SpeciesOfFoodId: speciesId },
    { where: { identityNumber: identityNumberOfPurchasedFood, UserId: userId } }
  );
  if (updateSpecies.includes(1)) {
    return updateSpecies;
  }
  return null;
}

module.exports = changeSpeciesOfFood;
