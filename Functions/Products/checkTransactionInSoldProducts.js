async function checkTransactionInSoldProducts(
  SoldProductsByUser,
  transactionId
) {
  const checkTransaction = await SoldProductsByUser.findOne({
    where: { UserTransactionId: transactionId },
  });
  if (checkTransaction) {
    return checkTransaction;
  }
  return null;
}

module.exports = checkTransactionInSoldProducts;
