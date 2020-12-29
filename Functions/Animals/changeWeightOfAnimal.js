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
  if (updateWeight.includes(1)) {
    return updateWeight;
  }
  return null;
}

module.exports = changeWeightOfAnimal;
