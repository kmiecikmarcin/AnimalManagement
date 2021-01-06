async function changeQuantityOfFood(
  PurchasedFoodForHerd,
  identityNumberOfPurchasedFood,
  quantityOfFood,
  oldQuantityOfFood,
  currentQuantityOfFood,
  userId
) {
  const differenceInQuantity =
    parseFloat(quantityOfFood, 10) - parseFloat(oldQuantityOfFood, 10);
  const differenceCurrentQuantityOfFood =
    differenceInQuantity + parseFloat(currentQuantityOfFood, 10);
  const updateQuantity = await PurchasedFoodForHerd.update(
    {
      quantity: quantityOfFood,
      currentQuantity: differenceCurrentQuantityOfFood,
    },
    {
      where: {
        identityNumber: identityNumberOfPurchasedFood,
        UserId: userId,
      },
    }
  );
  if (updateQuantity.includes(1)) {
    return updateQuantity;
  }
  return null;
}

module.exports = changeQuantityOfFood;
