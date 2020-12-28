async function changeAnimalIdentityNumber(
  AnimalsInHerd,
  oldIdentityNumberOfAnimal,
  newIdentityNumberOfAnimal,
  herdId
) {
  const updateData = await AnimalsInHerd.update(
    {
      identityNumber: newIdentityNumberOfAnimal,
    },
    { where: { identityNumber: oldIdentityNumberOfAnimal, idHerd: herdId } }
  );
  if (updateData) {
    return updateData;
  }
  return null;
}

module.exports = changeAnimalIdentityNumber;
