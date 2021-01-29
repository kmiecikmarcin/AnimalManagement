async function findSpeciesOfFoods(SpeciesOfFoods, speciesOfFoodName) {
  const search = await SpeciesOfFoods.findOne({
    where: { name: speciesOfFoodName },
  });
  if (search !== null) {
    return search;
  }
  return null;
}

module.exports = findSpeciesOfFoods;
