async function changeQuantityOfFood(
  PurchasedFoodForHerd,
  identityNumberOfPurchasedFood,
  quantityOfFood,
  oldQuantityOfFood,
  currentQuantityOfFood,
  userId
) {
  const differenceInQuantity =
    parseInt(quantityOfFood, 10) - parseInt(oldQuantityOfFood, 10);
  const differenceCurrentQuantityOfFood =
    differenceInQuantity + parseInt(currentQuantityOfFood, 10);
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
  console.log(updateQuantity);
  if (updateQuantity.includes(1)) {
    return updateQuantity;
  }
  return null;
}

module.exports = changeQuantityOfFood;
