async function changeDateOfAddedProductByUser(
  AllProductsFromAnimals,
  productId,
  newDateOfAddedProduct,
  userId
) {
  const updateDate = await AllProductsFromAnimals.update(
    { date: newDateOfAddedProduct },
    { where: { idProduct: productId, UserId: userId } }
  );
  if (updateDate.includes(1)) {
    return updateDate;
  }
  return null;
}

module.exports = changeDateOfAddedProductByUser;
