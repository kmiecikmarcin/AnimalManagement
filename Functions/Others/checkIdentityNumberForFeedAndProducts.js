async function checkIdentityNumberForFeedAndProducts(
  Model,
  enteredIdentityNumber,
  userId
) {
  const checkData = await Model.findOne({
    where: { identityNumber: enteredIdentityNumber, UserId: userId },
  });
  if (checkData) {
    return checkData;
  }
  return null;
}

module.exports = checkIdentityNumberForFeedAndProducts;
