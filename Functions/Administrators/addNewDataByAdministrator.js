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
      .json({ Error: "Nie udało się dodać nowego typu zwierzęcia!" });
  }
  return null;
}

module.exports = addNewDataByAdministrator;
