async function findProductByName(TypesOfProducts, typeName) {
  const findProducts = await TypesOfProducts.findOne({
    where: { name: typeName },
  });
  if (findProducts !== null) {
    return findProducts;
  }
  return null;
}

module.exports = findProductByName;
