async function changeReasonOfAnimalDeath(
  AnimalsDeads,
  reasonOfDeath,
  identityNumberOfAnimal,
  herdId
) {
  const updateReasonOfDeath = await AnimalsDeads.update(
    { date: reasonOfDeath },
    {
      where: {
        identityNumber: identityNumberOfAnimal,
        HerdId: herdId,
      },
    }
  );
  if (updateReasonOfDeath.includes(1)) {
    return updateReasonOfDeath;
  }
  return null;
}

module.exports = changeReasonOfAnimalDeath;
