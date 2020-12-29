async function changeWeightOfAnimal(
  AnimalsInHerd,
  herdId,
  identityNumberOfAnimal,
  oldAnimalWeight,
  newAnimalWeight
) {
  const updateWeight = await AnimalsInHerd.update(
    { weight: newAnimalWeight },
    {
      where: {
        identityNumber: identityNumberOfAnimal,
        weight: oldAnimalWeight,
        idHerd: herdId,
      },
    }
  );
  if (updateWeight) {
    return updateWeight;
  }
  return null;
}

module.exports = changeWeightOfAnimal;
