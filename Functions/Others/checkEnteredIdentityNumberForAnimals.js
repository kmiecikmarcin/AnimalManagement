async function checkEnteredIdentityNumberForAnimals(
  Model,
  enteredIdentityNumber,
  herdId
) {
  const checkData = await Model.findOne({
    where: { identityNumber: enteredIdentityNumber, idHerd: herdId },
  });
  if (checkData) {
    return checkData;
  }
  return null;
}

module.exports = checkEnteredIdentityNumberForAnimals;
