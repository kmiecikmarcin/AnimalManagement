async function findTypesOfFoodByName(TypesOfFood, foodName) {
  const search = await TypesOfFood.findOne({
    where: { name: foodName },
  });
  if (search !== null) {
    return search;
  }
  return null;
}

module.exports = findTypesOfFoodByName;
