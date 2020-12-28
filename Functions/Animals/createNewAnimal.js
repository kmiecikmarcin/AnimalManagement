const Herds = require("../../Models/Herds");
const TypesOfJoinToTheHerd = require("../../Models/TypesOfJoinToTheHerd");
const KindOfAnimals = require("../../Models/KindOfAnimals");
const GenderOfAnimal = require("../../Models/GenderOfAnimal");
const findHerdByName = require("../Herds/findHerdByName");
const findTypesOfJoinToTheHerd = require("./findTypesOfJoinToTheHerd");
const findKindOfAnimalsByName = require("./findKindOfAnimalsByName");
const findAnimalGender = require("./findAnimalGender");

async function createNewAnimal(
  res,
  AnimalsInHerd,
  userId,
  herdName,
  joinTypeName,
  kindOfAnimalName,
  animalGender,
  identityNumberOfAnimal,
  breedOfAnimal,
  dateOfJoinToTheHerd,
  animalBirthDate,
  animalWeight
) {
  const checkHerdName = await findHerdByName(Herds, herdName, userId);
  if (checkHerdName) {
    const checkJoinType = await findTypesOfJoinToTheHerd(
      TypesOfJoinToTheHerd,
      joinTypeName
    );
    if (checkJoinType) {
      const checkKindOfAnimal = await findKindOfAnimalsByName(
        KindOfAnimals,
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
            idHerd: checkHerdName.id,
            idJoinType: checkJoinType.id,
            idKindOfAnimal: checkKindOfAnimal.id,
            idAnimalGender: checkAnimalGender.id,
          });
          if (addNewAnimal) {
            return addNewAnimal;
          }
          return null;
        }
        return res
          .status(400)
          .json({ Error: "Wprowadzona płeć zwierzęcia nie istnieje!" });
      }
      return res
        .status(400)
        .json({ Error: "Wprowadzony rodzaj zwierzęcia nie istnieje!" });
    }
    return res.status(400).json({
      Error: "Wprowadzony typ dołączenia zwierzęcia do stada nie istnieje!",
    });
  }
  return res
    .status(400)
    .json({ Error: "Hodowla o wprowadzonej nazwie nie istnieje!" });
}

module.exports = createNewAnimal;
