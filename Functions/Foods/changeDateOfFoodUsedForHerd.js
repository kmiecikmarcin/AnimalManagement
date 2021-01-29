async function changeDateOfFoodUsedForHerd(
  FoodUsedForHerd,
  oldDate,
  newDate,
  herdId,
  purchasedFoodForHerdId
) {
  const updateDate = await FoodUsedForHerd.update(
    { date: newDate },
    {
      where: {
        date: oldDate,
        HerdId: herdId,
        PurchasedFoodForHerdId: purchasedFoodForHerdId,
      },
    }
  );
  if (updateDate.includes(1)) {
    return updateDate;
  }
  return null;
}

module.exports = changeDateOfFoodUsedForHerd;
