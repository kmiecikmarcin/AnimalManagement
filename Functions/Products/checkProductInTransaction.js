async function checkProductInTransaction(
  SoldProductsByUser,
  porductId,
  transactionId
) {
  const findProductInTransaction = await SoldProductsByUser.findOne({
    where: {
      UserTransactionId: transactionId,
      AllProductsFromAnimalId: porductId,
    },
  });
  if (findProductInTransaction) {
    return findProductInTransaction;
  }
  return null;
}

module.exports = checkProductInTransaction;
