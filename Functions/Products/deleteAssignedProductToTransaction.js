async function deleteAssignedProductToTransaction(
  SoldProductsByUser,
  transactionId,
  productId
) {
  const deleteassignedProduct = await SoldProductsByUser.destroy({
    where: {
      UserTransactionId: transactionId,
      AllProductsFromAnimalId: productId,
    },
  });
  if (deleteassignedProduct) {
    return deleteassignedProduct;
  }
  return null;
}

module.exports = deleteAssignedProductToTransaction;
