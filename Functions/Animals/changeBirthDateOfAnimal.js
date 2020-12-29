async function changeBirthDateOfAnimal(
  AnimalsInHerd,
  herdId,
  identityNumberOfAnimal,
  oldBirthDate,
  newBirthDate
) {
  const updateBirthDate = await AnimalsInHerd.update(
    { birthDate: newBirthDate },
    {
      where: {
        identityNumber: identityNumberOfAnimal,
        birthDate: oldBirthDate,
        idHerd: herdId,
      },
    }
  );
  if (updateBirthDate) {
    return updateBirthDate;
  }
  return null;
}

module.exports = changeBirthDateOfAnimal;
