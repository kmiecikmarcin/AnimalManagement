async function createNewUserProductFromAnimal(
  AllProductsFromAnimals,
  identityNumberOfProduct,
  quantityOfProduct,
  dateOfAddedProduct,
  productTypeId,
  userId
) {
  const addNewProduct = await AllProductsFromAnimals.create({
    identityNumber: identityNumberOfProduct,
    quantity: quantityOfProduct,
    currentQuantity: quantityOfProduct,
    date: dateOfAddedProduct,
    TypesOfProductId: productTypeId,
    UserId: userId,
  });
  if (addNewProduct) {
    return addNewProduct;
  }
  return null;
}

module.exports = createNewUserProductFromAnimal;
