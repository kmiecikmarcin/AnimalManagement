async function findTypesOfProductByName(TypesOfProduct, productName) {
  const search = await TypesOfProduct.findOne({
    where: { name: productName },
  });
  if (search !== null) {
    return search;
  }
  return null;
}

module.exports = findTypesOfProductByName;
