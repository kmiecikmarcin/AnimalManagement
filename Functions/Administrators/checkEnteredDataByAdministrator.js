async function checkEnteredDataByAdministrator(Model, nameOfData) {
  const checkData = await Model.findOne({ where: { name: nameOfData } });
  if (checkData) {
    return checkData;
  }
  return null;
}

module.exports = checkEnteredDataByAdministrator;
