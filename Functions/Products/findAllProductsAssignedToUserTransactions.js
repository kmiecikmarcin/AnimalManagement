const SoldProductsByUser = require("../../Models/SoldProductsByUser");
const AllProductsFromAnimals = require("../../Models/AllProductsFromAnimals");

async function findAllProductsAssignedToUserTransactions(
  UserTransactions,
  identityNumberOfTransaction,
  userId
) {
  const findProductsInTransaction = await UserTransactions.findAll({
    where: { UserId: userId, identityNumber: identityNumberOfTransaction },
    raw: true,
    attributes: {
      exclude: [
        "id",
        "identityNumber",
        "date",
        "createdAt",
        "updatedAt",
        "UserId",
      ],
    },
    include: {
      model: AllProductsFromAnimals,
      attributes: ["identityNumberOfProduct"],
      through: {
        model: SoldProductsByUser,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    },
  });
  if (findProductsInTransaction) {
    return findProductsInTransaction;
  }
  return null;
}

module.exports = findAllProductsAssignedToUserTransactions;
