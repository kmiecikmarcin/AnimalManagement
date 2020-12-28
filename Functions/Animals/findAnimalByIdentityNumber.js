async function findAnimalByIdentityNumber(
  AnimalsInHerd,
  herdId,
  oldIdentityNumberOfAnimal
) {
  const findAnimal = await AnimalsInHerd.findOne({
    where: { identityNumber: oldIdentityNumberOfAnimal, idHerd: herdId },
  });
  if (findAnimal) {
    return findAnimal;
  }
  return null;
}

module.exports = findAnimalByIdentityNumber;
