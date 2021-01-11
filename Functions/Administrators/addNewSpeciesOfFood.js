async function addNewSpeciesOfFood(
  res,
  SpeciesOfFoods,
  administratorPermission,
  nameOfData,
  idTypeOfFood
) {
  if (administratorPermission === process.env.S3_PERMISSION) {
    const addNewData = await SpeciesOfFoods.create({
      name: nameOfData,
      TypesOfFoodId: idTypeOfFood,
    });
    if (addNewData) {
      return addNewData;
    }
    return res.status(400).json({ Error: "Nie udało się dodać danych!" });
  }
  return null;
}

module.exports = addNewSpeciesOfFood;
