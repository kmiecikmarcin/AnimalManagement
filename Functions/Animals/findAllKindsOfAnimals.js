async function findAllKindsOfAnimals(KindsOfAnimals) {
  const search = await KindsOfAnimals.findAll({
    attributes: ["name"],
  });
  if (search !== null) {
    return search;
  }
  return null;
}

module.exports = findAllKindsOfAnimals;
