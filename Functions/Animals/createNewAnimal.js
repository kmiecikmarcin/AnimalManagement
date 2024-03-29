const TypesOfJoinToTheHerd = require("../../Models/TypesOfJoinToTheHerd");
const KindsOfAnimals = require("../../Models/KindsOfAnimals");
const GenderOfAnimal = require("../../Models/GenderOfAnimal");
const findTypesOfJoinToTheHerd = require("./findTypesOfJoinToTheHerd");
const findKindOfAnimalsByName = require("./findKindOfAnimalsByName");
const findAnimalGender = require("./findAnimalGender");

async function createNewAnimal(
  res,
  AnimalsInHerd,
  herdId,
  joinTypeName,
  kindOfAnimalName,
  animalGender,
  identityNumberOfAnimal,
  breedOfAnimal,
  dateOfJoinToTheHerd,
  animalBirthDate,
  animalWeight
) {
  const checkJoinType = await findTypesOfJoinToTheHerd(
    TypesOfJoinToTheHerd,
    joinTypeName
  );
  if (checkJoinType) {
    const checkKindOfAnimal = await findKindOfAnimalsByName(
      KindsOfAnimals,
      kindOfAnimalName
    );
    if (checkKindOfAnimal) {
      const checkAnimalGender = await findAnimalGender(
        GenderOfAnimal,
        animalGender
      );
      if (checkAnimalGender) {
        const addNewAnimal = await AnimalsInHerd.create({
          identityNumber: identityNumberOfAnimal,
          breed: breedOfAnimal,
          joinDate: dateOfJoinToTheHerd,
          birthDate: animalBirthDate,
          weight: animalWeight,
          lifeStatusOfAnimal: true,
          HerdId: herdId,
          TypesOfJoinToTheHerdId: checkJoinType.id,
          KindsOfAnimalId: checkKindOfAnimal.id,
          GenderOfAnimalId: checkAnimalGender.id,
        });
        if (addNewAnimal) {
          return addNewAnimal;
        }
        return null;
      }
      return res
        .status(404)
        .json({ Error: "Wprowadzona płeć zwierzęcia nie istnieje!" });
    }
    return res
      .status(404)
      .json({ Error: "Wprowadzony rodzaj zwierzęcia nie istnieje!" });
  }
  return res.status(404).json({
    Error: "Wprowadzony typ dołączenia zwierzęcia do stada nie istnieje!",
  });
}

module.exports = createNewAnimal;
