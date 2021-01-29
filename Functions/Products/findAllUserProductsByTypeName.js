async function findAllUserProductsByTypeName(
  AllProductsFromAnimals,
  userId,
  productdId
) {
  const findProducts = await AllProductsFromAnimals.findAll({
    where: { UserId: userId, TypesOfProductId: productdId },
    attributes: [
      "identityNumberOfProduct",
      "quantityOfProduct",
      "currentQuantityOfProduct",
      "dateOfAddedProduct",
    ],
  });
  if (findProducts) {
    return findProducts;
  }
  return null;
}

module.exports = findAllUserProductsByTypeName;
