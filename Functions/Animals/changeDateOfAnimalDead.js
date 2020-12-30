async function changeDateOfAnimalDead(
  AnimalsDeads,
  oldDate,
  newDate,
  identityNumberOfAnimal,
  herdId
) {
  console.log(identityNumberOfAnimal);
  const updateDate = await AnimalsDeads.update(
    { date: newDate },
    {
      where: {
        identityNumber: identityNumberOfAnimal,
        date: oldDate,
        HerdId: herdId,
      },
    }
  );
  if (updateDate.includes(1)) {
    return updateDate;
  }
  return null;
}

module.exports = changeDateOfAnimalDead;
