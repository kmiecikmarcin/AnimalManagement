async function findAllTypesOfProducts(TypesOfProducts) {
  const search = await TypesOfProducts.findAll({
    attributes: ["name"],
  });
  if (search !== null && Object.keys(search) !== 0) {
    return search;
  }
  return null;
}

module.exports = findAllTypesOfProducts;
