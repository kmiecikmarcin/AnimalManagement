async function findAllAnimalsInHerds(AnimalsInHerd, herdId) {
  const search = await AnimalsInHerd.findAll({
    where: { idHerd: herdId },
    attributes: [
      "identityNumberOfAnimal",
      "breedOfAnimal",
      "dateOfJoinToTheHerd",
      "birthDate",
      "animalWeight",
    ],
  });
  if (search !== null && Object.keys(search).length !== 0) {
    return search;
  }
  return null;
}

module.exports = findAllAnimalsInHerds;
