async function checkAssignedProdcutdToAnimalId(
  ProductFromAnAnimal,
  animalsInHerdId,
  allProductsFromAnimalId
) {
  const checkAssignedProductId = await ProductFromAnAnimal.findOne({
    where: {
      AnimalsInHerdId: animalsInHerdId,
      AllProductsFromAnimalId: allProductsFromAnimalId,
    },
  });
  if (checkAssignedProductId) {
    return checkAssignedProductId;
  }
  return null;
}

module.exports = checkAssignedProdcutdToAnimalId;
