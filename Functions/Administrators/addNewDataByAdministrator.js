async function addNewDataByAdministrator(
  res,
  Model,
  administratorPermission,
  typeOfData
) {
  if (administratorPermission === process.env.S3_PERMISSION) {
    const addNewData = await Model.create({ name: typeOfData });
    if (addNewData) {
      return addNewData;
    }
    return res
      .status(400)
      .json({ Error: "Proces dodawanie nie powiodło się!" });
  }
  return null;
}

module.exports = addNewDataByAdministrator;
