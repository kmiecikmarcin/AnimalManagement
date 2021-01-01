async function changeBreedOfAnimal(
  AnimalsInHerd,
  herdId,
  identityNumberOfAnimal,
  oldBreedOfAnimal,
  newBreedOfAnimal
) {
  const updateBreed = await AnimalsInHerd.update(
    { breed: newBreedOfAnimal },
    {
      where: {
        identityNumber: identityNumberOfAnimal,
        breed: oldBreedOfAnimal,
        idHerd: herdId,
      },
    }
  );
  if (updateBreed.includes(1)) {
    return updateBreed;
  }
  return null;
}

module.exports = changeBreedOfAnimal;
