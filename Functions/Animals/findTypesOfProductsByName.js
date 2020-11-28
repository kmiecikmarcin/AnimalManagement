async function findTypesOfProductsByName(TypesOfProducts, productName) {
  const search = await TypesOfProducts.findOne({
    where: { name: productName },
  });
  if (search !== null) {
    return search;
  }
  return null;
}

module.exports = findTypesOfProductsByName;
