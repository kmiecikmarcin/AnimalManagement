async function findSpeciesOfFeed(SpeciesOfFeed, speciesOfFeedName) {
  const search = await SpeciesOfFeed.findOne({
    where: { name: speciesOfFeedName },
  });
  if (search !== null) {
    return search;
  }
  return null;
}

module.exports = findSpeciesOfFeed;
