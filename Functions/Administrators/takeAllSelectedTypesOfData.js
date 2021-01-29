async function takeAllSelectedTypesOfData(
  res,
  TypesOfAnimals,
  administratorPermission
) {
  if (administratorPermission === process.env.S3_PERMISSION) {
    const takeTypesOfFood = await TypesOfAnimals.findAll({
      raw: true,
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
    });
    if (takeTypesOfFood) {
      return takeTypesOfFood;
    }
    return res.status(404).json({ Error: "Brak danych w systemie!" });
  }
  return null;
}

module.exports = takeAllSelectedTypesOfData;
