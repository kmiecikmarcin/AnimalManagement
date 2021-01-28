async function deleteProductWhichUserAdded(
  AllProductsFromAnimals,
  productId,
  userId
) {
  const deleteProduct = await AllProductsFromAnimals.destroy({
    where: { idProduct: productId, UserId: userId },
  });
  if (deleteProduct) {
    return deleteProduct;
  }
  return null;
}

module.exports = deleteProductWhichUserAdded;
