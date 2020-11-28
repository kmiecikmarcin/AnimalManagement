async function findTypesOfFeedByName(TypesOfFeed, feedName) {
  const search = await TypesOfFeed.findOne({
    where: { name: feedName },
  });
  if (search !== null) {
    return search;
  }
  return null;
}

module.exports = findTypesOfFeedByName;
