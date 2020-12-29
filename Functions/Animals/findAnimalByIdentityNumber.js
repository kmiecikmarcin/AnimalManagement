async function findAnimalByIdentityNumber(
  AnimalsInHerd,
  herdId,
  identityNumberOfAnimal
) {
  const findAnimal = await AnimalsInHerd.findOne({
    where: { identityNumber: identityNumberOfAnimal, idHerd: herdId },
  });
  if (findAnimal) {
    return findAnimal;
  }
  return null;
}

module.exports = findAnimalByIdentityNumber;
