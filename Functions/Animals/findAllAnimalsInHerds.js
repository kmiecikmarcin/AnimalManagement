async function findAllAnimalsInHerds(AnimalsInHerd) {
  const search = await AnimalsInHerd.findAll({
    attributes: [
      "identityNumberOfAnimal",
      "breedOfAnimal",
      "dateOfJoinToTheHerd",
      "birthDate",
      "animalWeight",
    ],
  });
  if (search !== null) {
    return search;
  }
  return null;
}

module.exports = findAllAnimalsInHerds;
