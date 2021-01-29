async function findAllKindsOfAnimals(KindsOfAnimals) {
  const search = await KindsOfAnimals.findAll({
    raw: true,
    attributes: ["name"],
  });
  if (search !== null && Object.keys(search) !== 0) {
    return search;
  }
  return null;
}

module.exports = findAllKindsOfAnimals;
