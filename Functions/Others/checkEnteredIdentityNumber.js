async function checkEnteredIdentityNumber(
  Model,
  enteredIdentityNumber,
  herdId
) {
  const checkData = await Model.findOne({
    where: { identityNumber: enteredIdentityNumber, HerdId: herdId },
  });
  if (checkData) {
    return checkData;
  }
  return null;
}

module.exports = checkEnteredIdentityNumber;
