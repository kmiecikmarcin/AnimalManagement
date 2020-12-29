async function changeBirthDateOfNewBornAnimal(
  AnimalsBirths,
  herdId,
  identityNumberOfNewBornAnimal,
  oldBirthDate,
  newBirthDate
) {
  const updateBirthDate = await AnimalsBirths.update(
    { dateOfBirth: newBirthDate },
    {
      where: {
        identityNumber: identityNumberOfNewBornAnimal,
        dateOfBirth: oldBirthDate,
        idHerd: herdId,
      },
    }
  );
  if (updateBirthDate.includes(1)) {
    return updateBirthDate;
  }
  return null;
}

module.exports = changeBirthDateOfNewBornAnimal;
