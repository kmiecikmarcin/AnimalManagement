async function findTypesOfAnimalsByName(TypesOfAnimals, typeOfAnimalName) {
  const search = await TypesOfAnimals.findOne({
    where: { name: typeOfAnimalName },
  });
  if (search !== null) {
    return search;
  }
  return null;
}

module.exports = findTypesOfAnimalsByName;
