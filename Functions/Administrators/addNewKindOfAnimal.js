async function addNewKindOfAnimal(
  res,
  KindsOfAnimals,
  administratorPermission,
  nameOfData,
  idTypeOfAnimal
) {
  if (administratorPermission === process.env.S3_PERMISSION) {
    const addNewData = await KindsOfAnimals.create({
      name: nameOfData,
      TypesOfAnimalId: idTypeOfAnimal,
    });
    if (addNewData) {
      return addNewData;
    }
    return res.status(400).json({ Error: "Nie udało się dodać danych!" });
  }
  return null;
}

module.exports = addNewKindOfAnimal;
