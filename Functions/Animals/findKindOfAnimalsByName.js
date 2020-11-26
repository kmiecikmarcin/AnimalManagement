async function findKindOfAnimalsbyName(KindOfAnimals, kindOfAnimalName) {
  const search = await KindOfAnimals.findOne({
    where: { name: kindOfAnimalName },
  });
  if (search !== null) {
    return search;
  }
  return null;
}

module.exports = findKindOfAnimalsbyName;
