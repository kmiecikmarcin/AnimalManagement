async function changeQuantityOfUserProduct(
  AllProductsFromAnimals,
  userId,
  productId,
  quantityOfProduct
) {
  const updateQuantity = await AllProductsFromAnimals.update(
    { quantity: quantityOfProduct, currentQuentity: quantityOfProduct },
    {
      where: { idProduct: productId, UserId: userId },
    }
  );
  console.log(updateQuantity);
  if (updateQuantity.includes(1)) {
    return updateQuantity;
  }
  return null;
}

module.exports = changeQuantityOfUserProduct;
