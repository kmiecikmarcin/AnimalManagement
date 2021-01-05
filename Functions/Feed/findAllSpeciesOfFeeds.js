async function findAllSpeciesOfFeeds(SpeciesOfFeeds) {
  const findSpecies = await SpeciesOfFeeds.findAll({ attributes: ["name"] });
  if (findSpecies !== null && Object.keys(findSpecies) !== 0) {
    return findSpecies;
  }
  return null;
}

module.exports = findAllSpeciesOfFeeds;
