const checkProductInTransaction = require("./checkProductInTransaction");

async function assignSoldProductToUserTransaction(
  SoldProductsByUser,
  porductId,
  transactionId,
  soldQuantityOfProduct,
  priceOfProduct,
  currentQuantityOfProduct
) {
  if (parseFloat(currentQuantityOfProduct, 10) > 0) {
    const checkProductId = await checkProductInTransaction(
      SoldProductsByUser,
      porductId,
      transactionId
    );
    if (checkProductId === null) {
      const assignProductToTransaction = await SoldProductsByUser.create({
        quantity: soldQuantityOfProduct,
        price: priceOfProduct,
        UserTransactionId: transactionId,
        AllProductsFromAnimalId: porductId,
      });
      if (assignProductToTransaction !== null) {
        return assignProductToTransaction;
      }
      return null;
    }
    return null;
  }
  return null;
}

module.exports = assignSoldProductToUserTransaction;
