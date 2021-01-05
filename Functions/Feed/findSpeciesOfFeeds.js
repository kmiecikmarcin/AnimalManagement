async function findSpeciesOfFeeds(SpeciesOfFeeds, speciesOfFeedName) {
  const search = await SpeciesOfFeeds.findOne({
    where: { name: speciesOfFeedName },
  });
  if (search !== null) {
    return search;
  }
  return null;
}

module.exports = findSpeciesOfFeeds;
