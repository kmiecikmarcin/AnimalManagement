async function deleteDataByAdministrator(
  res,
  Model,
  administratorPermission,
  idOfData,
  typeOfData
) {
  if (administratorPermission === process.env.S3_PERMISSION) {
    const deleteData = await Model.destroy({
      where: { id: idOfData, name: typeOfData },
    });
    if (deleteData) {
      return deleteData;
    }
    return res
      .status(400)
      .json({ Error: "Nie udało się usunąć wybranych danych!" });
  }
  return null;
}

module.exports = deleteDataByAdministrator;
