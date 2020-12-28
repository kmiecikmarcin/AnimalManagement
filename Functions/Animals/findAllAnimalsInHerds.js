async function findAllAnimalsInHerds(AnimalsInHerd) {
  const search = await AnimalsInHerd.findAll({
    attributes: ["name"],
  });
  if (search !== null) {
    return search;
  }
  return null;
}

module.exports = findAllAnimalsInHerds;
