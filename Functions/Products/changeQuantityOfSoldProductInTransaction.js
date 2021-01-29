async function changeQuantityOfSoldProductInTransaction(
  SoldProductsByUser,
  quantityOfProduct,
  transactionId,
  productId
) {
  const updateQuantityOfSoldProduct = await SoldProductsByUser.update(
    { quantity: quantityOfProduct },
    {
      where: {
        UserTransactionId: transactionId,
        AllProductsFromAnimalId: productId,
      },
    }
  );
  if (updateQuantityOfSoldProduct.includes(1)) {
    return updateQuantityOfSoldProduct;
  }
  return null;
}

module.exports = changeQuantityOfSoldProductInTransaction;
