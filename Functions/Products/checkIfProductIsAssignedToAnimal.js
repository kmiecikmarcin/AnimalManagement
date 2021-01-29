async function checkIfProductIsAssignedToAnimal(
  ProductFromAnAnimal,
  productId
) {
  const findProduct = await ProductFromAnAnimal.findOne({
    where: { AllProductsFromAnimalId: productId },
  });
  if (findProduct) {
    return findProduct;
  }
  return null;
}

module.exports = checkIfProductIsAssignedToAnimal;
