const KindsOfAnimals = require("../../Models/KindsOfAnimals");
const AnimalsInHerd = require("../../Models/AnimalsInHerd");

const findKindOfAnimalsByName = require("./findKindOfAnimalsByName");
const findAnimalByHerdNameAndIdentityNumber = require("./findAnimalByHerdIdAndIdentityNumber");

async function createNewBornAnimal(
  res,
  AnimalsBirths,
  herdId,
  kindOfAnimalName,
  parentIdentityNumber,
  birthDate,
  temporaryIdentityNumberOfAnimal
) {
  const checkKindOfAnimal = await findKindOfAnimalsByName(
    KindsOfAnimals,
    kindOfAnimalName
  );
  if (checkKindOfAnimal) {
    const checkParentIdentiTyNumber = await findAnimalByHerdNameAndIdentityNumber(
      AnimalsInHerd,
      herdId,
      parentIdentityNumber
    );
    if (checkParentIdentiTyNumber) {
      const addNewBornAnimal = AnimalsBirths.create({
        dateOfBirth: birthDate,
        identityNumber: temporaryIdentityNumberOfAnimal,
        parentIdentityNumber: checkParentIdentiTyNumber.identityNumber,
        KindsOfAnimalId: checkKindOfAnimal.id,
        HerdId: herdId,
      });
      if (addNewBornAnimal) {
        return addNewBornAnimal;
      }
      return null;
    }
    return res.status(404).json({
      Error: "Rodzic o wprowadzonym numerze identyfikacyjnym nie istnieje!",
    });
  }
  return res
    .status(404)
    .json({ Error: "Wprowadzony rodzaj zwierzęcia nie istnieje!" });
}

module.exports = createNewBornAnimal;
