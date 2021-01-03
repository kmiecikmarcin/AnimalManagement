async function checkEnteredName(Model, nameOfEnteredData, userId) {
  const checkData = await Model.findOne({
    where: { name: nameOfEnteredData, UserId: userId },
  });
  if (checkData) {
    return checkData;
  }
  return null;
}

module.exports = checkEnteredName;
