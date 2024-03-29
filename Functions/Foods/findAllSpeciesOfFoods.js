async function findAllSpeciesOfFoods(SpeciesOfFoods) {
  const findSpecies = await SpeciesOfFoods.findAll({
    raw: true,
    attributes: ["name"],
  });
  if (findSpecies !== null && Object.keys(findSpecies) !== 0) {
    return findSpecies;
  }
  return null;
}

module.exports = findAllSpeciesOfFoods;
