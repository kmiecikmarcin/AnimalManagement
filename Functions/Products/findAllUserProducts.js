const TypesOfProducts = require("../../Models/TypesOfProducts");

async function findAllUserProducts(AllProductsFromAnimals, userId) {
  const findProducts = await AllProductsFromAnimals.findAll({
    where: { UserId: userId },
    include: [{ model: TypesOfProducts, attributes: ["name"] }],
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

module.exports = findAllUserProducts;
