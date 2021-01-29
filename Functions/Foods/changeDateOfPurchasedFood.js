async function changeDateOfPurchasedFood(
  PurchasedFoodForHerd,
  identityNumberOfPurchasedFood,
  oldDate,
  newDate,
  userId
) {
  const updateDate = await PurchasedFoodForHerd.update(
    { date: newDate },
    {
      where: {
        identityNumber: identityNumberOfPurchasedFood,
        date: oldDate,
        UserId: userId,
      },
    }
  );
  if (updateDate.includes(1)) {
    return updateDate;
  }
  return null;
}

module.exports = changeDateOfPurchasedFood;
