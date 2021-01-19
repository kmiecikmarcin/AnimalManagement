const AnimalsInHerd = require("../../Models/AnimalsInHerd");
const ProductFromAnAnimal = require("../../Models/ProductFromAnAnimal");
const TypesOfProducts = require("../../Models/TypesOfProducts");

async function findAllProductsAssignedToAnimal(
  AllProductsFromAnimals,
  animalId,
  herdId,
  userId
) {
  const findProducts = await AllProductsFromAnimals.findAll({
    where: { UserId: userId },
    attributes: {
      exclude: ["id", "createdAt", "updatedAt", "TypesOfProductId", "UserId"],
    },
    include: [
      {
        model: TypesOfProducts,
        attributes: ["name"],
      },
      {
        where: { idAnimal: animalId, HerdId: herdId },
        model: AnimalsInHerd,
        attributes: [],
        through: {
          model: ProductFromAnAnimal,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      },
    ],
    raw: true,
  });
  if (findProducts) {
    return findProducts;
  }
  return null;
}

module.exports = findAllProductsAssignedToAnimal;
