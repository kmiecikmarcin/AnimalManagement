async function findKindOfAnimalsByName(KindOfAnimals, kindOfAnimalName) {
  const search = await KindOfAnimals.findOne({
    where: { name: kindOfAnimalName },
  });
  if (search !== null) {
    return search;
  }
  return null;
}

module.exports = findKindOfAnimalsByName;
