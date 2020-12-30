const Herds = require("../../Models/Herds");
const KindsOfAnimals = require("../../Models/KindsOfAnimals");
const AnimalsInHerd = require("../../Models/AnimalsInHerd");

const findHerdByName = require("../Herds/findHerdByName");
const findKindOfAnimalsByName = require("./findKindOfAnimalsByName");
const findAnimalByHerdNameAndIdentityNumber = require("./findAnimalByHerdNameAndIdentityNumber");

async function createNewBornAnimal(
  res,
  AnimalsBirths,
  userId,
  herdName,
  kindOfAnimalName,
  parentIdentityNumber,
  birthDate,
  temporaryIdentityNumberOfAnimal
) {
  const checkHerdName = await findHerdByName(Herds, herdName, userId);
  if (checkHerdName) {
    const checkKindOfAnimal = await findKindOfAnimalsByName(
      KindsOfAnimals,
      kindOfAnimalName
    );
    if (checkKindOfAnimal) {
      const checkParentIdentiTyNumber = await findAnimalByHerdNameAndIdentityNumber(
        AnimalsInHerd,
        checkHerdName.id,
        parentIdentityNumber
      );
      if (checkParentIdentiTyNumber) {
        const addNewBornAnimal = AnimalsBirths.create({
          dateOfBirth: birthDate,
          identityNumber: temporaryIdentityNumberOfAnimal,
          AnimalsInHerdId: checkParentIdentiTyNumber.id,
          KindsOfAnimalId: checkKindOfAnimal.id,
          HerdId: checkHerdName.id,
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
      .status(400)
      .json({ Error: "Wprowadzony rodzaj zwierzęcia nie istnieje!" });
  }
  return res
    .status(400)
    .json({ Error: "Hodowla o wprowadzonej nazwie nie istnieje!" });
}

module.exports = createNewBornAnimal;
