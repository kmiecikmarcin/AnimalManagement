async function changeCurrentQuantityOfProduct(
  AllProductsFromAnimals,
  currentQuantityOfProduct,
  soldQuantityOfProduct,
  productId,
  userId
) {
  const currentSoldQuantity =
    parseFloat(currentQuantityOfProduct, 10) -
    parseFloat(soldQuantityOfProduct, 10);
  if (parseFloat(currentSoldQuantity, 10) >= 0) {
    const updateCurrentQuantity = await AllProductsFromAnimals.update(
      { currentQuantity: currentSoldQuantity },
      { where: { idProduct: productId, UserId: userId } }
    );
    if (updateCurrentQuantity.includes(1)) {
      return updateCurrentQuantity;
    }
    return null;
  }
  return null;
}

module.exports = changeCurrentQuantityOfProduct;
