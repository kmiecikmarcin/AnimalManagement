async function changePriceOfSoldProductInTransaction(
  SoldProductsByUser,
  transactionId,
  productId,
  priceOfProduct
) {
  const updatePriceOfSoldProductInTransaction = await SoldProductsByUser.update(
    { price: priceOfProduct },
    {
      where: {
        UserTransactionId: transactionId,
        AllProductsFromAnimalId: productId,
      },
    }
  );
  if (updatePriceOfSoldProductInTransaction.includes(1)) {
    return updatePriceOfSoldProductInTransaction;
  }
  return null;
}

module.exports = changePriceOfSoldProductInTransaction;
