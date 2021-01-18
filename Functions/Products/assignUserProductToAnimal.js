const checkAssignedProdcutdToAnimalId = require("./checkAssignedProdcutdToAnimalId");

async function assignUserProductToAnimal(
  ProductFromAnAnimal,
  animalsInHerdId,
  allProductsFromAnimalId,
  dateWhenProductWasAdded
) {
  const checkAssignedProductId = await checkAssignedProdcutdToAnimalId(
    ProductFromAnAnimal,
    animalsInHerdId,
    allProductsFromAnimalId
  );
  if (checkAssignedProductId === null) {
    const assignToAnimal = await ProductFromAnAnimal.create({
      date: dateWhenProductWasAdded,
      AnimalsInHerdId: animalsInHerdId,
      AllProductsFromAnimalId: allProductsFromAnimalId,
    });
    if (assignToAnimal !== null) {
      return assignToAnimal;
    }
    return null;
  }
  return null;
}

module.exports = assignUserProductToAnimal;
