async function deleteProductAssignedToAnimal(
  ProductFromAnAnimal,
  animalId,
  productId
) {
  const deleteProduct = await ProductFromAnAnimal.destroy({
    where: { AnimalsInHerdId: animalId, AllProductsFromAnimalId: productId },
  });
  if (deleteProduct) {
    return deleteProduct;
  }
  return null;
}

module.exports = deleteProductAssignedToAnimal;
